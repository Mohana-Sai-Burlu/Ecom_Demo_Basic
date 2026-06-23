// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { report } from 'node:process';

/**
otenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  timeout: 50* 10000,
  expect: {
    timeout: 30 *1000
  },
  reporter: 'html',

  use: {
    browserName: 'chromium',
    headless: false
  },


});
module.exports = config
