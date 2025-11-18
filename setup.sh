#!/bin/bash

# Setup script for UI Bug Inspection Environment

echo "🔧 Setting up UI Bug Inspection Environment..."
echo "================================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm --version)"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Install Playwright browsers
echo ""
echo "🌐 Installing Playwright browsers..."
npx playwright install chromium

# Create necessary directories
echo ""
echo "📁 Creating directories..."
mkdir -p tests/screenshots
mkdir -p tests/results

echo ""
echo "✅ Setup completed successfully!"
echo ""
echo "To run tests:"
echo "  ./run_tests.sh [buggy|fixed]"
echo ""
echo "To start the server manually:"
echo "  npm run serve"
echo ""

