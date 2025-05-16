import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { USER } from "../constants";

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
  
    const inventoryTitle = await inventory.title.textContent();
    expect(inventoryTitle).toContain('Products');
  });
  
  test('Verify user gets error when logging in as locked out user', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login(USER.LOCKED_OUT_USER, USER.PASSWORD);
  
    const errorMessage = await login.errorMessage.textContent();
    expect(errorMessage).toContain('Epic sadface: Sorry, this user has been locked out.');
  });
})