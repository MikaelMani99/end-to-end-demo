import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for multiple independent websites.
 * Each site runs as a separate project with its own baseURL.
 * Tests run in parallel across projects and workers.
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 2 : undefined,
  reporter: [['html', { open: 'never' }]],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'lolesports',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://lolesports.com',
      },
      testMatch: /tests\/lolesports\/.*\.spec\.ts/,
    },
    {
      name: 'visir',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.visir.is',
      },
      testMatch: /tests\/visir\/.*\.spec\.ts/,
    },
    {
      name: 'google',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://www.google.com',
      },
      testMatch: /tests\/google\/.*\.spec\.ts/,
    },
    {
      name: 'loldle',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'https://loldle.net',
      },
      testMatch: /tests\/loldle\/.*\.spec\.ts/,
    },
  ],
});
