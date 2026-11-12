@echo off
echo ===================================================
echo   Starting Taks-Fixs Application Backend Server...
echo ===================================================
cd /d "%~dp0backend"
node server.js
pause
