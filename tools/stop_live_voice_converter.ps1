[CmdletBinding()]param([Parameter(Mandatory=$true)][int]$ProcessId,[Parameter(Mandatory=$true)][string]$InstallPath)
$ErrorActionPreference='Stop';$expected=(Join-Path $InstallPath 'MMVCServerSIO.exe');$p=Get-CimInstance Win32_Process -Filter "ProcessId=$ProcessId" -ErrorAction Stop
if(-not $p -or [IO.Path]::GetFullPath($p.ExecutablePath) -ne [IO.Path]::GetFullPath($expected)){throw 'PID is not the requested pinned converter executable.'}
# b2332 has no authenticated shutdown endpoint. This verified process termination is controlled, not graceful.
Stop-Process -Id $ProcessId -ErrorAction Stop;Write-Host "Stopped verified converter PID $ProcessId."
