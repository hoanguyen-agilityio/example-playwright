// Libs
import { test as setup } from '@playwright/test';
import path from 'path';

// Constants
import { PRODUCTS_URL, USER } from '@/constants';

// Pages
import { LoginPage } from '@/pages';

const authFile = path.join(__dirname, '../.auth/standard_user.json');

setup('authenticate', async ({ page }) => {
  const login = new LoginPage(page);

  await setup.step('Navigate to login page', async () => {
    await login.goto();
  });

  await setup.step('Login', async () => {
    await login.login(USER.STANDARD_USER.USERNAME, USER.STANDARD_USER.PASSWORD)
  })

  await setup.step('Wait for product page to load', async () => {
    await page.waitForURL(PRODUCTS_URL);
  });

  await setup.step('Save authenticated storage state', async () => {
    await page.context().storageState({ path: authFile });
  });
});