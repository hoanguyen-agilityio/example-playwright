// Libs
import { test as setup } from '@playwright/test';
import path from 'path';

// Constants
import { BASE_URL, PRODUCTS_URL, USER } from '@/constants';

const authFile = path.join(__dirname, '../.auth/standard_user.json');

setup('authenticate', async ({ page }) => {
  await page.goto(BASE_URL);
  await page.getByPlaceholder('Username').fill(USER.STANDARD_USER);
  await page.getByPlaceholder('Password').fill(USER.PASSWORD);
  await page.getByRole('button', { name: 'Login'}).click();
  await page.waitForURL(PRODUCTS_URL);

  await page.context().storageState({ path: authFile });
});