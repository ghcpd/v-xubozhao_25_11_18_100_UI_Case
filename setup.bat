@echo off
REM Setup script for UI Bug Inspection Environment (Windows)

echo 🔧 Setting up UI Bug Inspection Environment...
echo ================================================
echo.

REM Check if Node.js is installed
where node >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 16+ first.
    exit /b 1
)

echo ✅ Node.js version:
node --version

REM Check if npm is installed
where npm >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ❌ npm is not installed. Please install npm first.
    exit /b 1
)

echo ✅ npm version:
npm --version

REM Install dependencies
echo.
echo 📦 Installing dependencies...
call npm install

REM Install Playwright browsers
echo.
echo 🌐 Installing Playwright browsers...
call npx playwright install chromium

REM Create necessary directories
echo.
echo 📁 Creating directories...
if not exist "tests\screenshots" mkdir tests\screenshots
if not exist "tests\results" mkdir tests\results

echo.
echo ✅ Setup completed successfully!
echo.
echo To run tests:
echo   run_tests.bat [buggy^|fixed]
echo.
echo To start the server manually:
echo   npm run serve
echo.

pause

