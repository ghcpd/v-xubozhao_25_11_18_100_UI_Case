import { defineConfig, devices } from '@playwright/test';
import path from 'node:path';

export default defineConfig({
  testDir: 'tests',
  timeout: 30_000,
  use: {
    baseURL: '',
    viewport: { width: 1280, height: 720 },
    actionTimeout: 5_000
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  reporter: [['line'], ['json', { outputFile: 'logs/playwright-report.json' }]],
  webServer: undefined
});