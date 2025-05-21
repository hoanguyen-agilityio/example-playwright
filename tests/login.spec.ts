// Libs
import { test as PageObjects, expect } from "@/fixtures";

// Constants
import { ERROR_MESSAGES, HEADINGS, INVENTORY_URL, USER } from "@/constants";

PageObjects.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

PageObjects.describe('Login Tests', () => {
  PageObjects('Verify title contains "Swag Labs"', async ({ loginPage }) => {
    await expect(loginPage.page).toHaveTitle(HEADINGS.SWAG_LABS);
  });
  
  PageObjects('Verify user is able to login successful with standard user', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.login(USER.STANDARD_USER, USER.PASSWORD);
    await expect(page).toHaveURL(INVENTORY_URL);
    await expect(inventoryPage.title).toBeVisible();
    await expect(inventoryPage.title).toHaveText(HEADINGS.PRODUCTS);
  });
  
  PageObjects('Verify user gets error when logging in as locked out user', async ({ loginPage }) => {
    await loginPage.login(USER.LOCKED_OUT_USER, USER.PASSWORD);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(ERROR_MESSAGES.USER_LOCKED)
  });

  PageObjects('Verify user cannot login with empty username and password', async ({ loginPage }) => {
    await loginPage.login('', '');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(ERROR_MESSAGES.USERNAME_REQUIRED)
  });

  PageObjects('Verify user cannot login with valid username and empty password', async ({ loginPage }) => {
    await loginPage.login(USER.STANDARD_USER, '');
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(ERROR_MESSAGES.PASSWORD_REQUIRED)
  });

  PageObjects('Verify user cannot login with empty username and valid password', async ({ loginPage }) => {
    await loginPage.login('', USER.PASSWORD);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(ERROR_MESSAGES.USERNAME_REQUIRED);
  });

  PageObjects('Verify user cannot login with invalid username and password', async ({ loginPage }) => {
    await loginPage.login(USER.INVALID_USERNAME, USER.INVALID_PASSWORD);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(ERROR_MESSAGES.INVALID_ACCOUNT);
  });

  PageObjects('Verify user cannot login with correct username and incorrect password', async ({ loginPage }) => {
    await loginPage.login(USER.STANDARD_USER, USER.INVALID_PASSWORD);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(ERROR_MESSAGES.INVALID_ACCOUNT);
  });

  PageObjects('Verify user cannot login with incorrect username and correct password', async ({ loginPage }) => {
    await loginPage.login(USER.INVALID_USERNAME, USER.PASSWORD);
    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toHaveText(ERROR_MESSAGES.INVALID_ACCOUNT);
  });
});
