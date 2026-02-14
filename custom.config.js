// @ts-check
import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */

const config = ({

  // In line 16, the config is a JavaScript object which is in key-value pairs.
  testDir: './tests',
  // retries should come under config global view and not under any projects because it's common for any project and not specific to something
  retries: 1,
  // Workers is the property that controls how many test files can run in parallel
  workers: 3,
  /* Run tests in files in parallel */
  timeout: 50 * 1000,
    expect: {
      timeout: 35 * 1000,
    },
  fullyParallel: true,
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */

  projects: [

    {
      name: 'chromium',
      use: {
      /* Base URL to use in actions like `await page.goto('')`. */
      // baseURL: 'http://localhost:3000',

      /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
      browserName : 'chromium',
      //...devices['Galaxy S8 landscape'],
      headless : false,
      screenshot : 'only-on-failure',
      trace : 'retain-on-failure',
      launchOptions: {
        args: ['--start-maximized']
      },
      viewport: null,
      permissions:['geolocation'],
      ignoreHttpsErrors: true
    }
  },

  {
    name: 'firefox',
    use: {
      /* Base URL to use in actions like `await page.goto('')`. */
      // baseURL: 'http://localhost:3000',

      /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
      browserName : 'firefox',
      //...devices['Galaxy Note II'],
      headless : false,
      screenshot : 'only-on-failure',
      trace : 'retain-on-failure',
      launchOptions: {
        args: ['--start-maximized']
      },
      viewport: null,
      permissions:['geolocation'],
      ignoreHttpsErrors: false
    }
  }
  ]
});

module.exports = config; // exports is required so that the config is available across the project globally.
