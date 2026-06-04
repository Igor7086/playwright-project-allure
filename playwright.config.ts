/// <reference types="node" />

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['line'],                // standart console reporter
    ['allure-playwright']    // adds Allure reporter
  ],
  use: {
    baseURL: 'https://qacart-todo.herokuapp.com',
    headless: !!process.env.CI, // locally browser opens, in CI — headless
    trace: 'on-first-retry',
    video: 'on',
    screenshot: 'on',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // 👇 additional project for explicit headed execution
    {
      name: 'headed',
      use: { ...devices['Desktop Chrome'], headless: false },
    },
  ],
  // webServer can be enabled if needed
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
