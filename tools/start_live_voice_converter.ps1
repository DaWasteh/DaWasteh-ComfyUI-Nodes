[CmdletBinding()]param([Parameter(Mandatory=$true)][string]$InstallPath,[int]$Port=18888)
$ErrorActionPreference='Stop';if($Port -ne 18888){throw 'Pinned b2332 uses fixed port 18888.'}
$Verifier=Join-Path $PSScriptRoot 'install_live_voice_converter.py';$Python=(Get-Command python -ErrorAction Stop).Source
& $Python $Verifier --destination $InstallPath --verify-destination;if($LASTEXITCODE -ne 0){throw 'Pinned runtime tree verification failed.'}
$Exe=Join-Path $InstallPath 'MMVCServerSIO.exe';if(Get-NetTCPConnection -LocalPort $Port -State Listen -ErrorAction SilentlyContinue){throw "Port $Port is already listening."}
$process=Start-Process -FilePath $Exe -ArgumentList @('--launch-browser','false','--log-level','info') -WorkingDirectory $InstallPath -PassThru
$deadline=(Get-Date).AddSeconds(300);$healthy=$false
while((Get-Date)-lt $deadline -and -not $process.HasExited){try{$r=Invoke-WebRequest -Uri "http://127.0.0.1:$Port/" -UseBasicParsing -TimeoutSec 2;if($r.StatusCode -eq 200){$healthy=$true;break}}catch{};Start-Sleep 1}
if(-not $healthy){throw "Converter did not become healthy within 300 seconds; use tools/stop_live_voice_converter.ps1 -ProcessId $($process.Id) after inspecting it."}
Write-Host "Voice converter ready: http://127.0.0.1:$Port/ (PID $($process.Id))";Write-Host "Controlled stop: powershell -ExecutionPolicy Bypass -File tools/stop_live_voice_converter.ps1 -ProcessId $($process.Id) -InstallPath '$InstallPath'"
