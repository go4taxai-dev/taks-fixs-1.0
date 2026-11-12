@echo off
title Taks-Fixs Launch Pad
echo ===================================================
echo           Launching Taks-Fixs Application          
echo ===================================================
echo.
echo [1/2] Starting Backend Server...
start "Taks-Fixs Server" /min cmd /c "cd /d %~dp0backend && node server.js"
echo Server started in background window.
echo.
echo [2/2] Waiting for server to initialize...
ping 127.0.0.1 -n 4 >nul
echo.
echo Launching default web browser to http://localhost:3000...
start http://localhost:3000
echo.
echo ===================================================
echo Application is running! You can close this window.
echo ===================================================
ping 127.0.0.1 -n 3 >nul
exit
