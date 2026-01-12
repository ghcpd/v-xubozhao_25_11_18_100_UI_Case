#!/bin/bash
# Run UI Bug Tests

echo "=========================================="
echo "Running UI Bug Detection Tests"
echo "=========================================="
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "❌ Dependencies not installed. Running setup first..."
    ./setup.sh
    if [ $? -ne 0 ]; then
        echo "❌ Setup failed"
        exit 1
    fi
fi

# Create test results directory
mkdir -p test-results/screenshots

echo "🧪 Running Playwright tests..."
echo ""

# Run tests
npm test

TEST_EXIT_CODE=$?

echo ""
echo "=========================================="

if [ $TEST_EXIT_CODE -eq 0 ]; then
    echo "✅ All tests completed successfully!"
else
    echo "⚠️  Some tests failed or detected issues"
fi

echo "=========================================="
echo ""
echo "📊 Test Results:"
echo "  - Screenshots: test-results/screenshots/"
echo "  - HTML Report: test-results/html/"
echo "  - JSON Results: test-results/results.json"
echo ""
echo "View HTML report: npx playwright show-report test-results/html"
echo ""

exit $TEST_EXIT_CODE
