# Run UI Bug Tests (PowerShell)

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Running UI Bug Detection Tests" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

# Check if node_modules exists
if (-not (Test-Path "node_modules")) {
    Write-Host "❌ Dependencies not installed. Running setup first..." -ForegroundColor Red
    .\setup.ps1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Setup failed" -ForegroundColor Red
        exit 1
    }
}

# Create test results directory
New-Item -ItemType Directory -Force -Path "test-results/screenshots" | Out-Null

Write-Host "🧪 Running Playwright tests..." -ForegroundColor Yellow
Write-Host ""

# Run tests
npm test

$testExitCode = $LASTEXITCODE

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan

if ($testExitCode -eq 0) {
    Write-Host "✅ All tests completed successfully!" -ForegroundColor Green
} else {
    Write-Host "⚠️  Some tests failed or detected issues" -ForegroundColor Yellow
}

Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📊 Test Results:"
Write-Host "  - Screenshots: test-results/screenshots/"
Write-Host "  - HTML Report: test-results/html/"
Write-Host "  - JSON Results: test-results/results.json"
Write-Host ""
Write-Host "View HTML report: npx playwright show-report test-results/html"
Write-Host ""

exit $testExitCode
