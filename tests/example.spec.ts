import { test, expect } from '@playwright/test';

test('Verify title contains "Swag Labs"', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Swag Labs/);
});

test('Verify user is able to login successful with standard user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  const inventoryTitle = await page.locator('.title').textContent();
  expect(inventoryTitle).toContain('Products');
});

test('Verify user gets error when logging in as locked out user', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('locked_out_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  const errorMessage = await page.locator('[data-test="error"]').textContent();
  expect(errorMessage).toContain('Epic sadface: Sorry, this user has been locked out.');
});

test('Verify user is able to access cart page', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  const cartTitle = await page.locator('.title').textContent();
  expect(cartTitle).toContain('Your Cart');
});

test('Verify user can navigate from cart to all items', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('.bm-burger-button').click();
  await page.locator('[data-test="inventory-sidebar-link"]').click();
  const allItemsTitle = await page.locator('.title').textContent();
  expect(allItemsTitle).toContain('Products');
});

test('Verify checkout success after adding item', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();
  await page.locator('[data-test="checkout"]').click();
  await page.locator('[data-test="firstName"]').click();
  await page.locator('[data-test="firstName"]').fill('Hoa');
  await page.locator('[data-test="lastName"]').click();
  await page.locator('[data-test="lastName"]').fill('Nguyen');
  await page.locator('[data-test="postalCode"]').click();
  await page.locator('[data-test="postalCode"]').fill('12345');
  await page.locator('[data-test="continue"]').click();
  await page.locator('[data-test="finish"]').click();
  const checkoutSuccessfulTitle = await page.locator('.title').textContent();
  expect(checkoutSuccessfulTitle).toContain('Checkout: Complete!');
});

test('Verify sorting of items by price ascending', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  const sortSelect = page.locator('[data-test="product-sort-container"]');
  const lohiOption = sortSelect.locator('option[value="lohi"]');

  await expect(lohiOption).toHaveText('Price (low to high)');
  await sortSelect.selectOption('lohi');

  const firstItem = page.locator('[data-test="inventory-item"]').first();
  const priceText = await firstItem.locator('[data-test="inventory-item-price"]').textContent();

  expect(priceText?.trim()).toBe('$7.99');
});
