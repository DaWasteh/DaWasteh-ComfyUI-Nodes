[CmdletBinding()]
param(
    [Parameter(Mandatory = $true)][ValidateSet('DeepFaceLive', 'Deep-Live-Cam', 'FaceFusion')][string]$Candidate,
    [Parameter(Mandatory = $true)][ValidateSet('R9700', 'RX-9070-XT')][string]$Gpu,
    [Parameter(Mandatory = $true)][ValidateSet(720, 1080)][int]$Height,
    [Parameter(Mandatory = $true)][string]$SenderName,
    [double]$DurationSeconds = 600,
    [int]$ProcessId = 0,
    [Nullable[double]]$CaptureToSpoutMs,
    [Parameter(Mandatory = $true)][string]$OutputPath,
    [string]$PythonPath = 'L:/ComfyUI/.venv/Scripts/python.exe'
)
$ErrorActionPreference = 'Stop'
if (-not (Test-Path -LiteralPath $PythonPath -PathType Leaf)) {
    throw "Python executable not found: $PythonPath"
}
$scriptPath = Join-Path $PSScriptRoot 'benchmark_workflow12_spout.py'
$arguments = @(
    $scriptPath,
    '--candidate', $Candidate,
    '--gpu', $Gpu,
    '--height', [string]$Height,
    '--sender', $SenderName,
    '--duration', [string]$DurationSeconds,
    '--output', $OutputPath
)
if ($ProcessId -gt 0) {
    $arguments += @('--pid', [string]$ProcessId)
}
if ($null -ne $CaptureToSpoutMs) {
    $arguments += @('--capture-to-spout-ms', [string]$CaptureToSpoutMs.Value)
}
& $PythonPath @arguments
if ($LASTEXITCODE -ne 0) {
    throw "Workflow 12 benchmark failed with exit code $LASTEXITCODE"
}
