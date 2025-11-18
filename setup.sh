#!/usr/bin/env bash
set -euo pipefail

echo "Installing dependencies..."
npm install

echo "Installing Playwright browsers..."
npx playwright install