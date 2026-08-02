@echo off
chcp 65001 >nul
set PYTHONUTF8=1
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0stop_live_avatar_workflow12.ps1" -RunRoot "L:/ComfyUI/logs/live-avatar-12"
if errorlevel 1 (
  echo.
  echo Workflow 12 konnte nicht verifiziert gestoppt werden.
  pause
)
