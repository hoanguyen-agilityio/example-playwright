import { test, expect } from '@playwright/test';

test('Verify title contains "Swag Labs"', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('Verify user is able to login successful with standard user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  const usernameInput = page.locator('[data-test="username"]');
  const passwordInput = page.locator('[data-test="password"]');
  const loginButton = page.locator('[data-test="login-button"]');
  const title = page.locator('.title');

  await usernameInput.fill('standard_user');
  await passwordInput.fill('secret_sauce');
  await loginButton.click();
  await expect(page).toHaveURL(/.*inventory/);

  const inventoryTitle = await title.textContent();
  expect(inventoryTitle).toContain('Products');
});

test('Verify user gets error when logging in as locked out user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  const usernameInput = page.locator('[data-test="username"]');
  const passwordInput = page.locator('[data-test="password"]');
  const loginButton = page.locator('[data-test="login-button"]');
  const errorMessageLocator = page.locator('[data-test="error"]');

  await usernameInput.fill('locked_out_user');
  await passwordInput.fill('secret_sauce');
  await loginButton.click();

  const errorMessage = await errorMessageLocator.textContent();
  expect(errorMessage).toContain('Epic sadface: Sorry, this user has been locked out.');
});

test('Verify user is able to access cart page', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  const usernameInput = page.locator('[data-test="username"]');
  const passwordInput = page.locator('[data-test="password"]');
  const loginButton = page.locator('[data-test="login-button"]');
  const cartButton = page.locator('[data-test="shopping-cart-link"]');
  const cartTitleLocator = page.locator('.title');

  await usernameInput.fill('standard_user');
  await passwordInput.fill('secret_sauce');
  await loginButton.click();
  await cartButton.click();

  await expect(page).toHaveURL(/.*cart/);
  const cartTitle = await cartTitleLocator.textContent();
  expect(cartTitle).toContain('Your Cart');
});

test('Verify user can navigate from cart to all items', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  const usernameInput = page.locator('[data-test="username"]');
  const passwordInput = page.locator('[data-test="password"]');
  const loginButton = page.locator('[data-test="login-button"]');
  const cartButton = page.locator('[data-test="shopping-cart-link"]');
  const burgerMenuButton = page.locator('.bm-burger-button');
  const allItemButton = page.locator('[data-test="inventory-sidebar-link"]');
  const allItemsTitleLocator = page.locator('.title');

  
  await usernameInput.fill('standard_user');
  await passwordInput.fill('secret_sauce');
  await loginButton.click();
  await cartButton.click();
  await burgerMenuButton.click();
  await allItemButton.click();

  await expect(page).toHaveURL(/.*inventory/);
  const allItemsTitle = await allItemsTitleLocator.textContent();
  expect(allItemsTitle).toContain('Products');
});

test('Verify checkout success after adding item', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  const usernameInput = page.locator('[data-test="username"]');
  const passwordInput = page.locator('[data-test="password"]');
  const loginButton = page.locator('[data-test="login-button"]');
  const addToCartButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
  const cartButton = page.locator('[data-test="shopping-cart-link"]');
  const checkoutButton = page.locator('[data-test="checkout"]');
  const firstNameInput = page.locator('[data-test="firstName"]');
  const lastNameInput = page.locator('[data-test="lastName"]');
  const postalCodeInput = page.locator('[data-test="postalCode"]');
  const continueButton = page.locator('[data-test="continue"]');
  const finishButton = page.locator('[data-test="finish"]');
  const checkoutSuccessfulTitleLocator = page.locator('.title');

  await usernameInput.fill('standard_user');
  await passwordInput.fill('secret_sauce');
  await loginButton.click();
  await addToCartButton.click();
  await cartButton.click();
  await checkoutButton.click();
  await firstNameInput.fill('Hoa');
  await lastNameInput.fill('Nguyen');
  await postalCodeInput.fill('12345');
  await continueButton.click();
  await finishButton.click();
  await expect(page).toHaveURL(/.*checkout-complete/);

  const checkoutSuccessfulTitle = await checkoutSuccessfulTitleLocator.textContent();
  expect(checkoutSuccessfulTitle).toContain('Checkout: Complete!');
});

test('Verify sorting of items by price ascending', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  const usernameInput = page.locator('[data-test="username"]');
  const passwordInput = page.locator('[data-test="password"]');
  const loginButton = page.locator('[data-test="login-button"]');
  const sortSelect = page.locator('[data-test="product-sort-container"]');
  const lohiOption = sortSelect.locator('option[value="lohi"]');
  
  await usernameInput.fill('standard_user');
  await passwordInput.fill('secret_sauce');
  await loginButton.click();
  await expect(page).toHaveURL(/.*inventory/);
  await expect(lohiOption).toHaveText('Price (low to high)');
  await sortSelect.selectOption('lohi');
  
  const firstItem = page.locator('[data-test="inventory-item"]').first();
  const priceText = await firstItem.locator('[data-test="inventory-item-price"]').textContent();

  expect(priceText?.trim()).toBe('$7.99');
});
