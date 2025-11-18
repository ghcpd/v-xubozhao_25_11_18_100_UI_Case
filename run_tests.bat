@echo off
REM Test Runner Script (Windows)
REM Usage: run_tests.bat [buggy|fixed]

set VERSION=%1
if "%VERSION%"=="" set VERSION=buggy
set BASE_URL=%BASE_URL%
if "%BASE_URL%"=="" set BASE_URL=http://localhost:8080

echo 🧪 UI Bug Inspection Test Suite
echo =================================
echo.
echo Version: %VERSION%
echo Base URL: %BASE_URL%
echo.

REM Check if server is running (simple check)
curl -s %BASE_URL% >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo ⚠️  Server not running. Please start it manually:
    echo   npm run serve
    echo.
    echo Or run in another terminal window.
    echo.
    pause
)

REM Run tests
echo Running tests for %VERSION% version...
echo.

set VERSION=%VERSION%
set BASE_URL=%BASE_URL%
call npm test

REM Generate report
echo.
echo 📊 Generating test report...
node tests\generate-report.js %VERSION%

echo.
echo ✅ Test run completed!
pause

