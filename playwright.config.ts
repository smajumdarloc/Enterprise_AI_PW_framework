import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 1,

  reporter: [
    ['html', { outputFolder: 'reports/html' }],
    ['allure-playwright']
  ],

  use: {
    baseURL: process.env.BASE_URL || 'https://sauce-demo.myshopify.com',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },

  projects: [
  { name: "setup", 
    testMatch: /.*\.setup\.ts/ 
  },
  {
    name: "chromium",
    use: {
      browserName: "chromium",
      storageState: "playwright/.auth/user.json",
    },
    dependencies: ["setup"],
  },
]
,
});