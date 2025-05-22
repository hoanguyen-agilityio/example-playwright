import { test, expect } from "@/fixtures";
import { ERROR_MESSAGES, HEADINGS, INVENTORY_URL, USER } from "@/constants";

test.use({
  storageState: {
    cookies: [],
    origins: [],
  },
});

test.describe('Login Tests', () => {
  test('Verify title contains "Swag Labs"', async ({ loginPage }) => {
    await expect(loginPage.page).toHaveTitle(HEADINGS.SWAG_LABS);
  });

  test('Verify user is able to login successfully with standard user', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.login(USER.STANDARD_USER, USER.PASSWORD);
    await expect(page).toHaveURL(INVENTORY_URL);
    await expect(inventoryPage.title).toBeVisible();
    await expect(inventoryPage.title).toHaveText(HEADINGS.PRODUCTS);
  });

  test('Verify user gets error when logging in as locked out user', async ({ loginPage }) => {
    await loginPage.login(USER.LOCKED_OUT_USER, USER.PASSWORD);
    await loginPage.expectError(ERROR_MESSAGES.USER_LOCKED);
  });

  test('Verify user cannot login with empty username and password', async ({ loginPage }) => {
    await loginPage.login(USER.EMPTY, USER.EMPTY);
    await loginPage.expectError(ERROR_MESSAGES.USERNAME_REQUIRED);
  });

  test('Verify user cannot login with valid username and empty password', async ({ loginPage }) => {
    await loginPage.login(USER.STANDARD_USER, USER.EMPTY);
    await loginPage.expectError(ERROR_MESSAGES.PASSWORD_REQUIRED);
  });

  test('Verify user cannot login with empty username and valid password', async ({ loginPage }) => {
    await loginPage.login(USER.EMPTY, USER.PASSWORD);
    await loginPage.expectError(ERROR_MESSAGES.USERNAME_REQUIRED);
  });

  test('Verify user cannot login with invalid username and password', async ({ loginPage }) => {
    await loginPage.login(USER.INVALID_USERNAME, USER.INVALID_PASSWORD);
    await loginPage.expectError(ERROR_MESSAGES.INVALID_ACCOUNT);
  });

  test('Verify user cannot login with correct username and incorrect password', async ({ loginPage }) => {
    await loginPage.login(USER.STANDARD_USER, USER.INVALID_PASSWORD);
    await loginPage.expectError(ERROR_MESSAGES.INVALID_ACCOUNT);
  });

  test('Verify user cannot login with incorrect username and correct password', async ({ loginPage }) => {
    await loginPage.login(USER.INVALID_USERNAME, USER.PASSWORD);
    await loginPage.expectError(ERROR_MESSAGES.INVALID_ACCOUNT);
  });
});
