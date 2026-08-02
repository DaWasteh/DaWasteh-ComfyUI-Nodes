[CmdletBinding()]
param(
    [string]$ManifestPath = '',
    [string]$RunRoot = 'L:/ComfyUI/logs/live-avatar-12',
    [int]$GraceSeconds = 8,
    [switch]$FromSupervisor
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

function Write-JsonAtomic([object]$Value, [string]$Path) {
    $temporary = "$Path.$([guid]::NewGuid().ToString('N')).tmp"
    $Value | ConvertTo-Json -Depth 12 | Set-Content -LiteralPath $temporary -Encoding utf8
    Move-Item -LiteralPath $temporary -Destination $Path -Force
}

function Test-SamePath([string]$Left, [string]$Right) {
    return [string]::Equals(
        [IO.Path]::GetFullPath($Left),
        [IO.Path]::GetFullPath($Right),
        [StringComparison]::OrdinalIgnoreCase
    )
}

function Assert-LoopbackUrl([string]$Value) {
    if ([string]::IsNullOrWhiteSpace($Value)) { return $null }
    $uri = [Uri]$Value
    if ($uri.Scheme -ne 'http' -or $uri.Host -notin @('127.0.0.1', 'localhost', '[::1]', '::1') -or $uri.Port -le 0) {
        throw 'Refusing non-loopback shutdown URL.'
    }
    return $uri
}

function Get-VerifiedProcess([object]$Service) {
    if (-not $Service.pid -or -not $Service.startTimeFileUtc -or -not $Service.executable -or -not $Service.executableSha256) {
        throw "Refusing unrecorded service '$($Service.name)'."
    }
    $process = Get-Process -Id ([int]$Service.pid) -ErrorAction SilentlyContinue
    if ($null -eq $process) { return $null }
    if ([int64]$process.StartTime.ToFileTimeUtc() -ne [int64]$Service.startTimeFileUtc) {
        throw "Refusing PID reuse for '$($Service.name)'."
    }
    if (-not (Test-SamePath $process.Path ([string]$Service.executable))) {
        throw "Refusing executable path mismatch for '$($Service.name)'."
    }
    $currentHash = Get-Sha256 ([string]$Service.executable)
    if ($currentHash -ne ([string]$Service.executableSha256).ToLowerInvariant()) {
        throw "Refusing executable hash mismatch for '$($Service.name)'."
    }
    return $process
}

$runRootPath = [IO.Path]::GetFullPath($RunRoot).TrimEnd('\', '/')
$pointer = Join-Path $runRootPath 'current-manifest.txt'
if ([string]::IsNullOrWhiteSpace($ManifestPath)) {
    if (-not (Test-Path -LiteralPath $pointer -PathType Leaf)) { throw 'No current Workflow 12 run manifest pointer exists.' }
    $ManifestPath = (Get-Content -LiteralPath $pointer -Raw -Encoding utf8).Trim()
}
$manifestFile = (Resolve-Path -LiteralPath $ManifestPath).Path
$runDirectory = Split-Path -Parent $manifestFile
if ((Split-Path -Leaf $manifestFile) -ne 'manifest.json' -or -not (Test-SamePath (Split-Path -Parent $runDirectory) $runRootPath)) {
    throw 'Manifest must be exactly <RunRoot>/<run-id>/manifest.json.'
}
$manifest = Get-Content -LiteralPath $manifestFile -Raw -Encoding utf8 | ConvertFrom-Json
if ($manifest.version -ne 1 -or -not $manifest.stopSignal -or $null -eq $manifest.services) {
    throw 'Refusing malformed or unsupported run manifest.'
}
$expectedStop = Join-Path $runDirectory 'STOP'
$expectedToken = Join-Path $runDirectory 'run-token.txt'
if (-not (Test-SamePath ([string]$manifest.stopSignal) $expectedStop) -or -not (Test-SamePath ([string]$manifest.tokenPath) $expectedToken)) {
    throw 'Manifest stop/token paths do not belong to the verified run directory.'
}
New-Item -ItemType File -Path $expectedStop -Force | Out-Null

if (-not $FromSupervisor) {
    $supervisor = Get-Process -Id ([int]$manifest.supervisorPid) -ErrorAction SilentlyContinue
    if ($null -ne $supervisor) {
        if ([int64]$supervisor.StartTime.ToFileTimeUtc() -ne [int64]$manifest.supervisorStartTimeFileUtc) {
            throw 'Refusing reused supervisor PID.'
        }
        $deadline = (Get-Date).AddSeconds([Math]::Max(15, $GraceSeconds * 3))
        while ((Get-Date) -lt $deadline -and $null -ne (Get-Process -Id $supervisor.Id -ErrorAction SilentlyContinue)) {
            Start-Sleep -Milliseconds 250
        }
        if ($null -ne (Get-Process -Id $supervisor.Id -ErrorAction SilentlyContinue)) {
            throw 'Supervisor acknowledged STOP but did not exit; refusing concurrent forced shutdown.'
        }
        $final = Get-Content -LiteralPath $manifestFile -Raw -Encoding utf8 | ConvertFrom-Json
        if ($final.status -ne 'stopped') { throw 'Supervisor exited without a verified stopped manifest.' }
        Write-Host "Workflow 12 stopped by its verified supervisor. Manifest: $manifestFile"
        return
    }
}

# Supervisor is executing this branch, or it is already gone. Reload the latest service list.
$manifest = Get-Content -LiteralPath $manifestFile -Raw -Encoding utf8 | ConvertFrom-Json
$token = if (Test-Path -LiteralPath $expectedToken -PathType Leaf) { (Get-Content -LiteralPath $expectedToken -Raw -Encoding ascii).Trim() } else { '' }
$services = @($manifest.services)
[array]::Reverse($services)
foreach ($service in $services) {
    $process = Get-VerifiedProcess $service
    if ($null -eq $process) { continue }
    $shutdownUri = Assert-LoopbackUrl ([string]$service.shutdownUrl)
    if ($null -ne $shutdownUri -and -not [string]::IsNullOrWhiteSpace($token)) {
        try {
            $headers = @{ Authorization = "Bearer $token"; 'X-LiveAvatar-Run' = $token; Origin = 'http://127.0.0.1' }
            Invoke-RestMethod -Uri $shutdownUri -Headers $headers -Method Post -ContentType 'application/json' -Body '{}' -TimeoutSec 3 | Out-Null
        } catch {
            Write-Warning "$($service.name) loopback shutdown failed; continuing with re-verified local shutdown."
        }
    }
    try { [void]$process.CloseMainWindow() } catch { }
    try { Wait-Process -Id $process.Id -Timeout $GraceSeconds -ErrorAction Stop } catch { }
    $remaining = Get-VerifiedProcess $service
    if ($null -ne $remaining) {
        # Re-attested immediately before the forced tree stop; never kill by name or port.
        & taskkill.exe /PID $remaining.Id /T /F | Out-Null
        if ($LASTEXITCODE -ne 0) { throw "Verified process-tree shutdown failed for '$($service.name)' (taskkill exit $LASTEXITCODE)." }
        Wait-Process -Id $remaining.Id -Timeout $GraceSeconds -ErrorAction SilentlyContinue
        if ($null -ne (Get-Process -Id $remaining.Id -ErrorAction SilentlyContinue)) {
            throw "Verified process '$($service.name)' is still alive; refusing stopped status."
        }
    }
}

$manifest.status = 'stopped'
$manifest | Add-Member -NotePropertyName stoppedAt -NotePropertyValue ((Get-Date).ToUniversalTime().ToString('o')) -Force
Write-JsonAtomic $manifest $manifestFile
Remove-Item -LiteralPath $expectedToken -Force -ErrorAction SilentlyContinue
if (Test-Path -LiteralPath $pointer -PathType Leaf) {
    $pointed = (Get-Content -LiteralPath $pointer -Raw -Encoding utf8).Trim()
    if (Test-SamePath $pointed $manifestFile) { Remove-Item -LiteralPath $pointer -Force }
}
Write-Host "Workflow 12 stopped in verified reverse order. Manifest: $manifestFile"
