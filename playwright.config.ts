/// <reference types="node" />

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['line'],               // Standard console reporter
    ['allure-playwright'],  // Adds Allure reporter
  ],

  use: {
    baseURL: 'https://qacart-todo.herokuapp.com', // ✅ Fixed base URL for all tests
    headless: !!process.env.CI,                   // Headless in CI, headed locally
    trace: 'on-first-retry',
    video: 'on',
    screenshot: 'on',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
	// headed only for local runs
	...(process.env.CI ? [] : [{
	name: 'headed',
	use: { ...devices['Desktop Chrome'], headless: false },
	}]),
  ],

  // Optional local dev server (disabled for CI)
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
