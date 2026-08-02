@echo off
chcp 65001 >nul
set PYTHONUTF8=1
set "CONFIG=L:\ComfyUI\config\live-avatar-12.json"
if not "%~1"=="" set "CONFIG=%~1"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0start_live_avatar_workflow12.ps1" -ConfigPath "%CONFIG%"
if errorlevel 1 (
  echo.
  echo Workflow 12 konnte nicht sicher gestartet werden.
  pause
)
