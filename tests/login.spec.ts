// Libs
import test, { expect } from "@playwright/test";

// Constants
import { ERROR_MESSAGES, HEADINGS, INVENTORY_URL, USER } from "@/constants";

// Pages
import { LoginPage, InventoryPage } from "@/pages";

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

test.describe('Login Tests', () => {
  test('Verify title contains "Swag Labs"', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await expect(page).toHaveTitle(HEADINGS.SWAG_LABS);
  });
  
  test('Verify user is able to login successful with standard user', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.login(USER.STANDARD_USER, USER.PASSWORD);
    await expect(page).toHaveURL(INVENTORY_URL);
    await expect(inventory.title).toBeVisible();
    await expect(inventory.title).toHaveText(HEADINGS.PRODUCTS);
  });
  
  test('Verify user gets error when logging in as locked out user', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login(USER.LOCKED_OUT_USER, USER.PASSWORD);
    await expect(login.errorMessage).toBeVisible();
    await expect(login.errorMessage).toHaveText(ERROR_MESSAGES.USER_LOCKED)
  });
})