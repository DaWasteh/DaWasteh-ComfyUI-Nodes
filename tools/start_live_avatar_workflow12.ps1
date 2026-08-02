[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)][string]$ConfigPath,
    [string]$RunRoot = 'L:/ComfyUI/logs/live-avatar-12',
    [string]$PythonPath = 'L:/ComfyUI/.venv/Scripts/python.exe',
    [int]$ReadyTimeoutSeconds = 300
)
$ErrorActionPreference = 'Stop'
Set-StrictMode -Version Latest

function Get-Sha256([string]$Path) {
    $stream = [IO.File]::OpenRead($Path)
    try {
        $algorithm = [Security.Cryptography.SHA256]::Create()
        try { return ([BitConverter]::ToString($algorithm.ComputeHash($stream))).Replace('-', '').ToLowerInvariant() }
        finally { $algorithm.Dispose() }
    } finally { $stream.Dispose() }
}

function New-RunToken {
    $bytes = New-Object byte[] 32
    $generator = [Security.Cryptography.RandomNumberGenerator]::Create()
    try { $generator.GetBytes($bytes) } finally { $generator.Dispose() }
    return ([BitConverter]::ToString($bytes)).Replace('-', '').ToLowerInvariant()
}

function Write-JsonAtomic([object]$Value, [string]$Path) {
    $temporary = "$Path.$([guid]::NewGuid().ToString('N')).tmp"
    $Value | ConvertTo-Json -Depth 12 | Set-Content -LiteralPath $temporary -Encoding utf8
    Move-Item -LiteralPath $temporary -Destination $Path -Force
}

function Assert-LoopbackUrl([string]$Value, [string]$Label, [bool]$AllowEmpty = $false) {
    if ($AllowEmpty -and [string]::IsNullOrWhiteSpace($Value)) { return $null }
    try { $uri = [Uri]$Value } catch { throw "$Label is not a valid URI." }
    if ($uri.Scheme -ne 'http' -or $uri.Host -notin @('127.0.0.1', 'localhost', '[::1]', '::1') -or $uri.Port -le 0) {
        throw "$Label must be an explicit HTTP loopback URL with a port."
    }
    return $uri
}

function Test-PortListening([int]$Port) {
    return $null -ne (Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue | Select-Object -First 1)
}

function Assert-ExpectedHealth([object]$Actual, [object]$Expected, [string]$ServiceName) {
    foreach ($property in $Expected.PSObject.Properties) {
        $actualProperty = $Actual.PSObject.Properties[$property.Name]
        if ($null -eq $actualProperty) { throw "$ServiceName health identity is missing '$($property.Name)'." }
        $expectedValue = $property.Value
        $actualValue = $actualProperty.Value
        if ($expectedValue -is [bool]) {
            if ($actualValue -isnot [bool] -or $actualValue -ne $expectedValue) { throw "$ServiceName Boolean health mismatch for '$($property.Name)'." }
        } elseif ($expectedValue -is [string]) {
            if ($actualValue -isnot [string] -or $actualValue -cne $expectedValue) { throw "$ServiceName string health mismatch for '$($property.Name)'." }
        } elseif ($actualValue.GetType().FullName -ne $expectedValue.GetType().FullName -or $actualValue -ne $expectedValue) {
            throw "$ServiceName typed health mismatch for '$($property.Name)'."
        }
    }
}

function Assert-NotCancelled([string]$StopSignal) {
    if (Test-Path -LiteralPath $StopSignal) { throw [OperationCanceledException]::new('Workflow 12 stop requested.') }
}

function Assert-VerifiedAssets([object[]]$Assets) {
    foreach ($asset in $Assets) {
        $actual = Get-Sha256 ([string]$asset.path)
        if ($actual -ne ([string]$asset.sha256).ToLowerInvariant()) { throw "Authorized $($asset.purpose) asset changed after preflight." }
    }
}

function Test-IsProcessDescendant([int]$ChildPid, [int]$AncestorPid) {
    $current = $ChildPid
    for ($depth = 0; $depth -lt 12 -and $current -gt 0; $depth++) {
        if ($current -eq $AncestorPid) { return $true }
        $record = Get-CimInstance Win32_Process -Filter "ProcessId=$current" -ErrorAction SilentlyContinue
        if ($null -eq $record) { return $false }
        $current = [int]$record.ParentProcessId
    }
    return $false
}

function Invoke-ReadyCheck([object]$Service, [System.Diagnostics.Process]$Process, [string]$Token, [string]$Name, [string]$StopSignal) {
    $healthUri = Assert-LoopbackUrl ([string]$Service.health_url) "$Name health_url"
    $headers = @{ Authorization = "Bearer $Token"; 'X-LiveAvatar-Run' = $Token }
    $deadline = (Get-Date).AddSeconds($ReadyTimeoutSeconds)
    do {
        Assert-NotCancelled $StopSignal
        if ($Process.HasExited) { throw "$Name exited before readiness (exit $($Process.ExitCode))." }
        try {
            $actual = Invoke-RestMethod -Uri $healthUri -Headers $headers -Method Get -TimeoutSec 3
            Assert-ExpectedHealth $actual $Service.expected_health $Name
            $listener = Get-NetTCPConnection -LocalPort $healthUri.Port -State Listen -ErrorAction Stop | Select-Object -First 1
            $reportedPid = if ($actual.PSObject.Properties['process_id']) { [int]$actual.process_id } else { 0 }
            if ($null -eq $listener -or $reportedPid -ne [int]$listener.OwningProcess -or -not (Test-IsProcessDescendant $reportedPid $Process.Id)) {
                throw "$Name health listener/process_id is not owned by the launched process tree."
            }
            return
        } catch {
            if ((Get-Date) -ge $deadline) { throw "$Name did not return its expected health identity within $ReadyTimeoutSeconds seconds: $($_.Exception.Message)" }
            Start-Sleep -Milliseconds 500
        }
    } while ($true)
}

function Assert-ControlBoundary([object]$Service, [string]$Token, [string]$Name) {
    $hostileOrigin = "https://$([guid]::NewGuid().ToString('N')).invalid"
    $endpoints = @(
        [ordered]@{ Label = 'health'; Uri = Assert-LoopbackUrl ([string]$Service.health_url) "$Name health_url"; Method = 'Get' },
        [ordered]@{ Label = 'warmup'; Uri = Assert-LoopbackUrl ([string]$Service.warmup_url) "$Name warmup_url"; Method = 'Post' },
        [ordered]@{ Label = 'shutdown'; Uri = Assert-LoopbackUrl ([string]$Service.shutdown_url) "$Name shutdown_url"; Method = 'Post' }
    )
    foreach ($endpoint in $endpoints) {
        $probes = @(
            [ordered]@{ Label = 'missing token'; Headers = @{ Origin = 'http://127.0.0.1' }; Allowed = @(401, 403) },
            [ordered]@{ Label = 'wrong token'; Headers = @{ Authorization = 'Bearer invalid'; Origin = 'http://127.0.0.1' }; Allowed = @(401, 403) },
            [ordered]@{ Label = 'hostile origin'; Headers = @{ Authorization = "Bearer $Token"; Origin = $hostileOrigin }; Allowed = @(403) }
        )
        foreach ($probe in $probes) {
            try {
                $parameters = @{ Uri = $endpoint.Uri; Headers = $probe.Headers; Method = $endpoint.Method; UseBasicParsing = $true; TimeoutSec = 3 }
                if ($endpoint.Method -eq 'Post') { $parameters.ContentType = 'application/json'; $parameters.Body = '{}' }
                Invoke-WebRequest @parameters | Out-Null
                throw "$Name accepted the $($probe.Label) probe on $($endpoint.Label)."
            } catch {
                $status = $null
                if ($_.Exception.Response) { $status = [int]$_.Exception.Response.StatusCode }
                if ($status -notin $probe.Allowed) { throw "$Name did not explicitly reject the $($probe.Label) probe on $($endpoint.Label)." }
            }
        }
    }
}

function Invoke-Warmup([object]$Service, [System.Diagnostics.Process]$Process, [string]$Token, [string]$Name, [string]$StopSignal) {
    Assert-NotCancelled $StopSignal
    $warmupUri = Assert-LoopbackUrl ([string]$Service.warmup_url) "$Name warmup_url"
    $headers = @{ Authorization = "Bearer $Token"; 'X-LiveAvatar-Run' = $Token }
    # Warm-up must acknowledge promptly; long model work continues behind the cancellation-aware health poll.
    $response = Invoke-RestMethod -Uri $warmupUri -Headers $headers -Method Post -ContentType 'application/json' -Body '{}' -TimeoutSec 3
    $acceptedProperty = if ($null -ne $response) { $response.PSObject.Properties['accepted'] } else { $null }
    if ($null -eq $acceptedProperty -or $acceptedProperty.Value -isnot [bool] -or $acceptedProperty.Value -ne $true) {
        throw "$Name warm-up must return Boolean accepted=true within three seconds."
    }
    Assert-NotCancelled $StopSignal
    Invoke-ReadyCheck $Service $Process $Token $Name $StopSignal
}

function Assert-SpoutSender([object]$ExpectedHealth, [string]$PythonExecutable) {
    $probe = Join-Path $PSScriptRoot 'check_workflow12_spout_sender.py'
    $probeOutput = & $PythonExecutable $probe --sender ([string]$ExpectedHealth.spout_sender_name) --width ([string]$ExpectedHealth.output_width) --height ([string]$ExpectedHealth.output_height) --timeout '10'
    if ($LASTEXITCODE -ne 0) { throw "External face-clone service reported ready but its Spout sender was not present: $probeOutput" }
}

function ConvertTo-WindowsCommandLineArgument([string]$Value) {
    if ($Value.Length -gt 0 -and $Value -notmatch '[\s"]') { return $Value }
    $builder = New-Object Text.StringBuilder
    [void]$builder.Append('"')
    $slashes = 0
    foreach ($character in $Value.ToCharArray()) {
        if ($character -eq [char]92) { $slashes++; continue }
        if ($character -eq '"') {
            [void]$builder.Append(('\' * (2 * $slashes + 1)))
            [void]$builder.Append('"')
        } else {
            if ($slashes -gt 0) { [void]$builder.Append(('\' * $slashes)) }
            [void]$builder.Append($character)
        }
        $slashes = 0
    }
    if ($slashes -gt 0) { [void]$builder.Append(('\' * (2 * $slashes))) }
    [void]$builder.Append('"')
    return $builder.ToString()
}

function Resolve-Arguments([object[]]$Arguments, [string]$RunDirectory, [hashtable]$Assets, [object[]]$Models) {
    $resolved = @()
    foreach ($argument in $Arguments) {
        if ($argument -isnot [string]) { throw 'Every service argument must be a string.' }
        $value = $argument.Replace('{RUN_TOKEN_FILE}', (Join-Path $RunDirectory 'run-token.txt')).Replace('{RUN_DIR}', $RunDirectory).Replace('{IDENTITY_ID}', $Assets.IdentityId).Replace('{SPOUT_SENDER}', [string]$Assets.SpoutSender)
        for ($modelIndex = 0; $modelIndex -lt $Models.Count; $modelIndex++) {
            $value = $value.Replace("{MODEL_$modelIndex}", [string]$Models[$modelIndex].path)
        }
        foreach ($purpose in @('FACE', 'VOICE', 'VRM')) {
            $placeholder = "{$($purpose)_ASSET}"
            if ($value.Contains($placeholder)) {
                $assetPath = [string]$Assets[$purpose.ToLowerInvariant()]
                if ([string]::IsNullOrWhiteSpace($assetPath)) { throw "No verified $purpose asset exists for typed argument placeholder." }
                $value = $value.Replace($placeholder, $assetPath)
            }
        }
        if ($value -match '\{[A-Z0-9_]+\}') { throw "Unresolved service argument placeholder: $value" }
        $resolved += $value
    }
    return $resolved
}

function Start-VerifiedService([string]$Name, [object]$Service, [string]$Token, [string]$RunDirectory, [bool]$NeedsHealth, [hashtable]$Assets) {
    $executable = [IO.Path]::GetFullPath([string]$Service.executable)
    if (-not (Test-Path -LiteralPath $executable -PathType Leaf)) { throw "$Name executable is missing." }
    $actualHash = Get-Sha256 $executable
    if ($actualHash -ne ([string]$Service.executable_sha256).ToLowerInvariant()) { throw "$Name executable SHA-256 mismatch." }
    $workingDirectory = if ($Service.PSObject.Properties['working_directory'] -and $Service.working_directory) { [IO.Path]::GetFullPath([string]$Service.working_directory) } else { Split-Path -Parent $executable }
    if (-not (Test-Path -LiteralPath $workingDirectory -PathType Container)) { throw "$Name working directory is missing." }
    $verifiedModels = @()
    $configuredModels = if ($Service.PSObject.Properties['models']) { @($Service.models) } else { @() }
    foreach ($model in $configuredModels) {
        $modelPath = [IO.Path]::GetFullPath([string]$model.path)
        if (-not (Test-Path -LiteralPath $modelPath -PathType Leaf)) { throw "$Name model is missing: $modelPath" }
        $modelHash = Get-Sha256 $modelPath
        if ($modelHash -ne ([string]$model.sha256).ToLowerInvariant()) { throw "$Name model SHA-256 mismatch: $modelPath" }
        $verifiedModels += [ordered]@{ path = $modelPath; sha256 = $modelHash }
    }
    $arguments = Resolve-Arguments @($Service.arguments) $RunDirectory $Assets $verifiedModels
    $stdout = Join-Path $RunDirectory "$Name.out.log"
    $stderr = Join-Path $RunDirectory "$Name.err.log"
    $startParameters = @{
        FilePath = $executable
        WorkingDirectory = $workingDirectory
        PassThru = $true
        RedirectStandardOutput = $stdout
        RedirectStandardError = $stderr
    }
    if ($arguments.Count -gt 0) {
        $startParameters.ArgumentList = (($arguments | ForEach-Object { ConvertTo-WindowsCommandLineArgument $_ }) -join ' ')
    }
    $process = Start-Process @startParameters
    Start-Sleep -Milliseconds 200
    if ($process.HasExited) { throw "$Name exited immediately (exit $($process.ExitCode))." }
    $record = [ordered]@{
        name = $Name
        pid = $process.Id
        startTimeFileUtc = $process.StartTime.ToFileTimeUtc()
        executable = $executable
        executableSha256 = $actualHash
        arguments = @($Service.arguments)
        workingDirectory = $workingDirectory
        healthUrl = if ($NeedsHealth) { [string]$Service.health_url } else { '' }
        warmupUrl = if ($NeedsHealth) { [string]$Service.warmup_url } else { '' }
        shutdownUrl = if ($Service.PSObject.Properties['shutdown_url']) { [string]$Service.shutdown_url } else { '' }
        expectedHealth = if ($Service.PSObject.Properties['expected_health']) { $Service.expected_health } else { @{} }
        ports = @()
        models = $verifiedModels
        stdout = $stdout
        stderr = $stderr
    }
    if ($NeedsHealth) {
        $record.ports = @(([Uri][string]$Service.health_url).Port, ([Uri][string]$Service.warmup_url).Port) | Select-Object -Unique
    }
    return [ordered]@{ Process = $process; Record = $record; Config = $Service; NeedsHealth = $NeedsHealth }
}

if (-not (Test-Path -LiteralPath $PythonPath -PathType Leaf)) { throw "Preflight Python is missing: $PythonPath" }
$runRootPath = [IO.Path]::GetFullPath($RunRoot)
New-Item -ItemType Directory -Force -Path $runRootPath | Out-Null
$runDirectory = Join-Path $runRootPath ((Get-Date).ToUniversalTime().ToString('yyyyMMdd-HHmmss') + '-' + [guid]::NewGuid().ToString('N'))
New-Item -ItemType Directory -Path $runDirectory | Out-Null
$currentIdentity = [Security.Principal.WindowsIdentity]::GetCurrent().Name
& icacls.exe $runDirectory '/inheritance:r' '/grant:r' "$currentIdentity`:(OI)(CI)F" | Out-Null
if ($LASTEXITCODE -ne 0) { throw "Could not restrict run-directory ACL (icacls exit $LASTEXITCODE)." }

$sourceConfig = (Resolve-Path -LiteralPath $ConfigPath).Path
$configFile = Join-Path $runDirectory 'config.snapshot.json'
Copy-Item -LiteralPath $sourceConfig -Destination $configFile -Force
$configSnapshotHash = Get-Sha256 $configFile
$preflightScript = Join-Path (Split-Path -Parent $PSScriptRoot) 'custom_nodes/ComfyUI-DaWasteh-LiveAvatar/preflight.py'
$preflightJson = & $PythonPath $preflightScript --config $configFile
if ($LASTEXITCODE -ne 0) { throw "Workflow 12 fail-closed preflight rejected this immutable config snapshot: $preflightJson" }
$preflight = $preflightJson | ConvertFrom-Json
$configBytes = [IO.File]::ReadAllBytes($configFile)
$hashAlgorithm = [Security.Cryptography.SHA256]::Create()
try { $bufferHash = ([BitConverter]::ToString($hashAlgorithm.ComputeHash($configBytes))).Replace('-', '').ToLowerInvariant() }
finally { $hashAlgorithm.Dispose() }
if (-not $preflight.ready -or [string]$preflight.verified.config_sha256 -ne $configSnapshotHash -or $bufferHash -ne $configSnapshotHash) {
    throw 'Workflow 12 preflight result does not match the exact config bytes being parsed.'
}
$configText = [Text.Encoding]::UTF8.GetString($configBytes)
$config = $configText | ConvertFrom-Json
& icacls.exe $configFile '/inheritance:r' '/grant:r' "$currentIdentity`:R" | Out-Null
if ($LASTEXITCODE -ne 0) { throw "Could not seal config snapshot ACL (icacls exit $LASTEXITCODE)." }
if ([string]::IsNullOrWhiteSpace([string]$config.visible_disclosure)) { throw 'Visible AI-avatar disclosure is mandatory.' }
if ($config.mode -notin @('face_clone', 'quality', 'vrm')) { throw 'Unsupported mode.' }
$videoConfig = switch ($config.mode) {
    'face_clone' { $config.candidate }
    'quality' { $config.quality }
    'vrm' { $config.vrm }
}
if (-not $videoConfig.enabled) { throw "Configured video mode '$($config.mode)' is disabled." }

$assetValues = @{
    IdentityId = [string]$preflight.verified.identity_id
    SpoutSender = ''
    face = ''
    voice = ''
    vrm = ''
}
foreach ($asset in @($preflight.verified.assets)) { $assetValues[[string]$asset.purpose] = [string]$asset.path }
if ($config.mode -eq 'face_clone') {
    $runId = Split-Path -Leaf $runDirectory
    $dynamicSender = ([string]$videoConfig.expected_health.spout_sender_name).Replace('{RUN_ID}', $runId)
    if ($dynamicSender -match '\{[A-Z0-9_]+\}' -or [string]::IsNullOrWhiteSpace($dynamicSender)) { throw 'Could not resolve per-run Spout sender name.' }
    $videoConfig.expected_health.spout_sender_name = $dynamicSender
    $assetValues.SpoutSender = $dynamicSender
}

$servicesToCheck = @()
if ($config.rvc.enabled) { $servicesToCheck += [ordered]@{ Name = 'rvc'; Config = $config.rvc } }
$servicesToCheck += [ordered]@{ Name = 'video'; Config = $videoConfig }
$ports = @{}
foreach ($service in $servicesToCheck) {
    foreach ($urlName in @('health_url', 'warmup_url')) {
        $uri = Assert-LoopbackUrl ([string]$service.Config.$urlName) "$($service.Name) $urlName"
        $key = [string]$uri.Port
        if ($ports.ContainsKey($key) -and $ports[$key] -ne $service.Name) {
            throw "Configured port collision: loopback port $($uri.Port) belongs to both $($ports[$key]) and $($service.Name)."
        }
        if (-not $ports.ContainsKey($key)) {
            if (Test-PortListening $uri.Port) { throw "Port collision on loopback port $($uri.Port). Refusing to treat another process as ready." }
            $ports[$key] = $service.Name
        }
    }
}

$manifestPath = Join-Path $runDirectory 'manifest.json'
$stopSignal = Join-Path $runDirectory 'STOP'
$tokenPath = Join-Path $runDirectory 'run-token.txt'
$token = New-RunToken
Set-Content -LiteralPath $tokenPath -Value $token -Encoding ascii -NoNewline
$manifest = [ordered]@{
    version = 1
    runId = Split-Path -Leaf $runDirectory
    status = 'starting'
    startedAt = (Get-Date).ToUniversalTime().ToString('o')
    mode = [string]$config.mode
    disclosure = [string]$config.visible_disclosure
    configPath = $configFile
    configSha256 = $configSnapshotHash
    identityId = [string]$preflight.verified.identity_id
    assetHashes = @($preflight.verified.assets | ForEach-Object { [ordered]@{ purpose = $_.purpose; sha256 = $_.sha256 } })
    stopSignal = $stopSignal
    tokenPath = $tokenPath
    supervisorPid = $PID
    supervisorStartTimeFileUtc = (Get-Process -Id $PID).StartTime.ToFileTimeUtc()
    services = @()
    publicStreamLaunchRequested = $false
}
Write-JsonAtomic $manifest $manifestPath
Set-Content -LiteralPath (Join-Path $runRootPath 'current-manifest.txt') -Value $manifestPath -Encoding utf8

$started = @()
try {
    Assert-NotCancelled $stopSignal
    Assert-VerifiedAssets @($preflight.verified.assets)
    if ($config.rvc.enabled) {
        $rvc = Start-VerifiedService 'rvc' $config.rvc $token $runDirectory $true $assetValues
        $started += $rvc
        $manifest.services += $rvc.Record
        Write-JsonAtomic $manifest $manifestPath
        Assert-NotCancelled $stopSignal
        Invoke-ReadyCheck $config.rvc $rvc.Process $token 'rvc' $stopSignal
        Assert-ControlBoundary $config.rvc $token 'rvc'
        Invoke-Warmup $config.rvc $rvc.Process $token 'rvc' $stopSignal
    }

    Assert-NotCancelled $stopSignal
    Assert-VerifiedAssets @($preflight.verified.assets)
    $video = Start-VerifiedService 'video' $videoConfig $token $runDirectory $true $assetValues
    $started += $video
    $manifest.services += $video.Record
    Write-JsonAtomic $manifest $manifestPath
    Assert-NotCancelled $stopSignal
    Invoke-ReadyCheck $videoConfig $video.Process $token 'video' $stopSignal
    Assert-ControlBoundary $videoConfig $token 'video'
    Invoke-Warmup $videoConfig $video.Process $token 'video' $stopSignal
    if ($config.mode -eq 'face_clone') {
        Assert-NotCancelled $stopSignal
        Assert-SpoutSender $videoConfig.expected_health $PythonPath
    }

    Assert-NotCancelled $stopSignal
    Assert-VerifiedAssets @($preflight.verified.assets)
    if ($config.obs.enabled) {
        foreach ($argument in @($config.obs.arguments)) {
            $normalizedArgument = ([string]$argument).Trim().ToLowerInvariant()
            if ($normalizedArgument.StartsWith('--startstreaming') -or $normalizedArgument.StartsWith('--startrecording')) { throw 'OBS auto-stream/auto-record arguments are forbidden.' }
        }
        $obs = Start-VerifiedService 'obs' $config.obs $token $runDirectory $false $assetValues
        $started += $obs
        $manifest.services += $obs.Record
        Write-JsonAtomic $manifest $manifestPath
        Assert-NotCancelled $stopSignal
    }

    $manifest.status = 'ready'
    $manifest.readyAt = (Get-Date).ToUniversalTime().ToString('o')
    Write-JsonAtomic $manifest $manifestPath
    Write-Host "READY: $($config.mode)"
    Write-Host "Manifest: $manifestPath"
    Write-Host "Disclosure required in OBS: $($config.visible_disclosure)"
    Write-Host 'No public-stream command was requested by this supervisor. Verify OBS output state manually before streaming.'

    while (-not (Test-Path -LiteralPath $stopSignal)) {
        foreach ($service in $started) {
            if ($service.Process.HasExited) { throw "$($service.Record.name) exited unexpectedly." }
        }
        Start-Sleep -Milliseconds 500
    }
} finally {
    if (-not (Test-Path -LiteralPath $stopSignal)) { New-Item -ItemType File -Path $stopSignal -Force | Out-Null }
    if (Test-Path -LiteralPath $manifestPath) {
        & (Join-Path $PSScriptRoot 'stop_live_avatar_workflow12.ps1') -ManifestPath $manifestPath -RunRoot $runRootPath -FromSupervisor
    }
}
