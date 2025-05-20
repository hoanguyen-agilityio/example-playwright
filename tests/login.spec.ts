import test, { expect } from "@playwright/test";
import { USER } from "../constants";
import { LoginPage } from "../pages/loginPage";
import { InventoryPage } from "../pages/InventoryPage";

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
    await expect(page).toHaveTitle(/Swag Labs/);
  });
  
  test('Verify user is able to login successful with standard user', async ({ page }) => {
    const login = new LoginPage(page);
    const inventory = new InventoryPage(page);

    await login.goto();
    await login.login(USER.STANDARD_USER, USER.PASSWORD);
    await expect(page).toHaveURL(/.*inventory/);
    await expect(inventory.title).toBeVisible();
    await expect(inventory.title).toHaveText('Products');
  });
  
  test('Verify user gets error when logging in as locked out user', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login(USER.LOCKED_OUT_USER, USER.PASSWORD);
    await expect(login.errorMessage).toBeVisible();
    await expect(login.errorMessage).toHaveText('Epic sadface: Sorry, this user has been locked out.')
  });
})