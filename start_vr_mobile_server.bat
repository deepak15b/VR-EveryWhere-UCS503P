@echo off
title VR Everywhere - Mobile VR Development Server
cls
echo ================================================================
echo        VR EVERYWHERE - 360 DEGREE MOBILE VR SERVER
echo ================================================================
echo.
echo Starting Vite with HTTPS and local network broadcast...
echo.

:: Show active IPv4 addresses
echo Active Network Addresses:
ipconfig | findstr /i "IPv4"
echo.
echo ================================================================
echo  INSTRUCTIONS FOR MOBILE PHONE VR HEADSET:
echo  1. Connect your phone to the SAME Wi-Fi network as this PC.
echo  2. Open Chrome or Safari on your phone and navigate to:
echo     https://192.168.31.133:5173
echo.
echo  3. On the first visit, bypass the local certificate notice:
echo     - Android: Tap Advanced -> Proceed to 192.168.31.133 (unsafe)
echo     - iPhone:  Tap Show Details -> visit this website
echo.
echo  4. Enter any tour, tap the VR Headset (Glasses) icon,
echo     and insert phone into VR goggles/Cardboard.
echo ================================================================
echo.

cd /d "%~dp0code\frontend"
npm run dev
pause
