import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

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
    await login.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/.*inventory/);
  
    const inventoryTitle = await inventory.title.textContent();
    expect(inventoryTitle).toContain('Products');
  });
  
  test('Verify user gets error when logging in as locked out user', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('locked_out_user', 'secret_sauce');
  
    const errorMessage = await login.errorMessage.textContent();
    expect(errorMessage).toContain('Epic sadface: Sorry, this user has been locked out.');
  });
})

test.describe('Cart and Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('standard_user', 'secret_sauce')
  })
  test('Verify user is able to access cart page', async ({ page }) => {
    const cart = new CartPage(page);

    await cart.openCart();
    await expect(page).toHaveURL(/.*cart/);

    const cartTitle = await cart.title.textContent();
    expect(cartTitle).toContain('Your Cart');
  });

  test('Verify user can navigate from cart to all items', async ({ page }) => {
    const cart = new CartPage(page);
    const inventory = new InventoryPage(page);

    await cart.openCart();
    await cart.goToAllItems();
    await expect(page).toHaveURL(/.*inventory/);

    const allItemsTitle = await inventory.title.textContent();
    expect(allItemsTitle).toContain('Products');
  });
})

test.describe('Checkout Tests', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('standard_user', 'secret_sauce');
  })
  test('Verify checkout success after adding item', async ({ page }) => {
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    const addToCartButton = page.locator('.inventory_item')
      .filter({ hasText: 'Sauce Labs Backpack'})
      .getByRole('button', { name: 'Add to cart'})
  
    await addToCartButton.click();
    await cart.openCart();
    await cart.checkoutButton.click();
    await checkout.completeCheckout('Hoa', 'Nguyen', '12345');
    await expect(page).toHaveURL(/.*checkout-complete/);
  
    const checkoutSuccessfulTitle = await checkout.title.textContent();
    expect(checkoutSuccessfulTitle).toContain('Checkout: Complete!');
  });
})

test.describe('Sorting Tests', () => {
  test.beforeEach(async ({ page}) => {
    const login = new LoginPage(page);

    await login.goto();
    await login.login('standard_user', 'secret_sauce');
  })
  test('Verify sorting of items by price ascending', async ({ page }) => {
    const inventory = new InventoryPage(page);

    await inventory.sortByPriceLowToHigh();
    
    await expect(page).toHaveURL(/.*inventory/);
    const prices = await inventory.getAllItemPrices();
    const sorted = [...prices].sort((a, b) => a - b);
    
    expect(prices).toEqual(sorted);
  });
})
