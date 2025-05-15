import { test, expect } from '@playwright/test';

test.describe('Login Tests', () => {
  test('Verify title contains "Swag Labs"', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  
    // Expect a title "to contain" a substring.
    await expect(page).toHaveTitle(/Swag Labs/);
  });
  
  test('Verify user is able to login successful with standard user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  
    const usernameInput = page.getByPlaceholder('Username');
    const passwordInput = page.getByPlaceholder('Password');
    const loginButton = page.getByRole('button', { name: 'Login'});
    const title = page.getByTestId('title');
  
    await usernameInput.fill('standard_user');
    await passwordInput.fill('secret_sauce');
    await loginButton.click();
    await expect(page).toHaveURL(/.*inventory/);
  
    const inventoryTitle = await title.textContent();
    expect(inventoryTitle).toContain('Products');
  });
  
  test('Verify user gets error when logging in as locked out user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  
    const usernameInput = page.getByPlaceholder('Username');
    const passwordInput = page.getByPlaceholder('Password');
    const loginButton = page.getByRole('button', { name: 'Login'});
    const errorMessageLocator = page.getByTestId('error');
  
    await usernameInput.fill('locked_out_user');
    await passwordInput.fill('secret_sauce');
    await loginButton.click();
  
    const errorMessage = await errorMessageLocator.textContent();
    expect(errorMessage).toContain('Epic sadface: Sorry, this user has been locked out.');
  });
})

test.describe('Cart and Navigation Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    
    const usernameInput = page.getByPlaceholder('Username');
    const passwordInput = page.getByPlaceholder('Password');
    const loginButton = page.getByRole('button', { name: 'Login'});

    await usernameInput.fill('standard_user');
    await passwordInput.fill('secret_sauce');
    await loginButton.click();
  })
  test('Verify user is able to access cart page', async ({ page }) => {
    const cartButton = page.getByTestId('shopping-cart-link');
    const cartTitleLocator = page.getByTestId('title');
  
    await cartButton.click();
    await expect(page).toHaveURL(/.*cart/);

    const cartTitle = await cartTitleLocator.textContent();
    expect(cartTitle).toContain('Your Cart');
  });

  test('Verify user can navigate from cart to all items', async ({ page }) => {
    const cartButton = page.getByTestId('shopping-cart-link');
    const burgerMenuButton = page.getByRole('button', { name: 'Open Menu'});
    const allItemButton = page.getByTestId('inventory-sidebar-link');
    const allItemsTitleLocator = page.getByTestId('title');
  
    await cartButton.click();
    await burgerMenuButton.click();
    await allItemButton.click();
    await expect(page).toHaveURL(/.*inventory/);

    const allItemsTitle = await allItemsTitleLocator.textContent();
    expect(allItemsTitle).toContain('Products');
  });
})

test.describe('Checkout Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  
    const usernameInput = page.getByPlaceholder('Username');
    const passwordInput = page.getByPlaceholder('Password');
    const loginButton = page.getByRole('button', { name: 'Login'});

    await usernameInput.fill('standard_user');
    await passwordInput.fill('secret_sauce');
    await loginButton.click();
  })
  test('Verify checkout success after adding item', async ({ page }) => {
    const addToCartButton = page.locator('.inventory_item')
      .filter({ hasText: 'Sauce Labs Backpack'})
      .getByRole('button', { name: 'Add to cart'})
    const cartButton = page.getByTestId('shopping-cart-link');
    const checkoutButton = page.getByRole('button', { name: 'Checkout'});
    const firstNameInput = page.getByPlaceholder('First Name');
    const lastNameInput = page.getByPlaceholder('Last Name');
    const postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
    const continueButton = page.getByRole('button', { name: 'Continue'});
    const finishButton = page.getByRole('button', { name: 'Finish'});
    const checkoutSuccessfulTitleLocator = page.getByTestId('title');
  
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
})

test.describe('Sorting Tests', () => {
  test.beforeEach(async ({ page}) => {
    await page.goto('https://www.saucedemo.com/');
  
    const usernameInput = page.getByPlaceholder('Username');
    const passwordInput = page.getByPlaceholder('Password');
    const loginButton = page.getByRole('button', { name: 'Login'});

    await usernameInput.fill('standard_user');
    await passwordInput.fill('secret_sauce');
    await loginButton.click();
  })
  test('Verify sorting of items by price ascending', async ({ page }) => {
    const sortSelect = page.getByTestId('product-sort-container');
    
    await expect(page).toHaveURL(/.*inventory/);
    await sortSelect.selectOption('lohi');
    
    const firstItem = page.getByTestId('inventory-item').first();
    const priceText = await firstItem.nth(0).getByTestId('inventory-item-price').textContent();
    expect(priceText?.trim()).toBe('$7.99');
  });
})
