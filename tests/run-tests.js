// Test Runner Script
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const VERSION = process.argv[2] || 'buggy';
const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';

console.log('🧪 UI Bug Inspection Test Suite');
console.log('================================\n');
console.log(`Testing version: ${VERSION}`);
console.log(`Base URL: ${BASE_URL}\n`);

// Ensure screenshots directory exists
const screenshotsDir = path.join(__dirname, 'screenshots');
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

try {
  // Run Playwright tests
  console.log('Running Playwright tests...\n');
  
  const testCommand = `npx playwright test tests/ui-tests.spec.js --reporter=list --project=chromium`;
  process.env.VERSION = VERSION;
  process.env.BASE_URL = BASE_URL;
  
  execSync(testCommand, { 
    stdio: 'inherit',
    env: { ...process.env, VERSION, BASE_URL }
  });
  
  console.log('\n✅ Tests completed successfully!');
} catch (error) {
  console.error('\n❌ Tests failed:', error.message);
  process.exit(1);
}

