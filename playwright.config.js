// @ts-check
import { defineConfig, devices } from '@playwright/test';
require('dotenv').config();



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
export default defineConfig({
  testDir: './tests',
 timeout:10*10000,
  use: {
    browserName:'chromium',
     baseURL: process.env.BASE_URL
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    }
    // , {
    //         name: 'setup',
    //         testMatch: /auth\.setup\.js/,
    //     },
    //     {
    //         name: 'chromium',
    //         use: {
    //             browserName: 'chromium',
    //             storageState: 'playwright/.auth/user.json'
    //         },
    //         dependencies: ['setup']
    //     }
  ]
});

