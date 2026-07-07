/// <reference types="node" />

import { defineConfig, devices } from '@playwright/test';
import { environments, Environment } from './config/environments';

const env = (process.env.ENV || 'prod') as Environment;

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined, // Number of threads

  reporter: [
    ['line'],               // Standard console reporter
    ['allure-playwright'],  // Adds Allure reporter
  ],

  use: {
    baseURL: environments[env], // Base URL for all tests
    headless: !!process.env.CI,                   // Headless in CI, headed locally
    trace: 'on-first-retry', //If the test fails, open playwright show-trace and step
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    },

	// headed only for local runs
	// ...(process.env.CI ? [] : [{
	// name: 'headed',
	// use: { ...devices['Desktop Chrome'], headless: false },
	// }]),
  ],

});
