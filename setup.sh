#!/bin/bash
# Setup script for UI Bug Testing Environment

echo "=========================================="
echo "UI Bug Testing Environment Setup"
echo "=========================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✓ Node.js version: $(node --version)"
echo "✓ npm version: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing npm dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install npm dependencies"
    exit 1
fi
echo "✓ Dependencies installed successfully"
echo ""

# Install Playwright browsers
echo "🌐 Installing Playwright browsers..."
npx playwright install chromium
if [ $? -ne 0 ]; then
    echo "❌ Failed to install Playwright browsers"
    exit 1
fi
echo "✓ Playwright browsers installed successfully"
echo ""

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p test-results/screenshots
mkdir -p test-results/html
mkdir -p test-results/artifacts
echo "✓ Directories created"
echo ""

echo "=========================================="
echo "✅ Setup completed successfully!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "  1. Run tests: ./run_tests.sh"
echo "  2. Or manually: npm test"
echo "  3. View HTML report: npx playwright show-report test-results/html"
echo ""
