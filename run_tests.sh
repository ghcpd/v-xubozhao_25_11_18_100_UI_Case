#!/bin/bash

# Test Runner Script
# Usage: ./run_tests.sh [buggy|fixed]

VERSION=${1:-buggy}
BASE_URL=${BASE_URL:-http://localhost:8080}

echo "🧪 UI Bug Inspection Test Suite"
echo "================================="
echo ""
echo "Version: $VERSION"
echo "Base URL: $BASE_URL"
echo ""

# Check if server is running
if ! curl -s "$BASE_URL" > /dev/null 2>&1; then
    echo "⚠️  Server not running. Starting server in background..."
    npm run serve &
    SERVER_PID=$!
    sleep 3
    
    # Wait for server to be ready
    for i in {1..10}; do
        if curl -s "$BASE_URL" > /dev/null 2>&1; then
            echo "✅ Server is ready!"
            break
        fi
        sleep 1
    done
fi

# Run tests
echo "Running tests for $VERSION version..."
echo ""

VERSION=$VERSION BASE_URL=$BASE_URL npm test

# Capture exit code
TEST_EXIT_CODE=$?

# Cleanup background server if we started it
if [ ! -z "$SERVER_PID" ]; then
    echo ""
    echo "Stopping background server..."
    kill $SERVER_PID 2>/dev/null
fi

# Generate report
echo ""
echo "📊 Generating test report..."
node tests/generate-report.js $VERSION

exit $TEST_EXIT_CODE

