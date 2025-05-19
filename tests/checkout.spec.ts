import { test, expect, Page } from '@playwright/test';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { PRODUCTS_URL } from '../constants';

async function addItemToCart(page: Page, itemName: string) {
  await test.step(`Add "${itemName}" to cart`, async () => {
    const addToCartButton = page.locator('.inventory_item')
      .filter({ hasText: itemName})
      .getByRole('button', { name: 'Add to cart'})

    await addToCartButton.click();
  })
}

async function proceedToCheckout(cart: CartPage) {
  await test.step('Proceed to checkout', async () => {
    await cart.openCart();
    await cart.checkoutButton.click();
  });
}

test.describe('Checkout Tests', () => {
  test('Verify checkout success after adding item', async ({ page }) => {
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await page.goto(PRODUCTS_URL);
    await addItemToCart(page, 'Sauce Labs Backpack');
    await proceedToCheckout(cart);
    await checkout.completeCheckout('Hoa', 'Nguyen', '12345');
    await expect(page).toHaveURL(/.*checkout-complete/);
  
    const checkoutSuccessfulTitle = await checkout.title.textContent();
    expect(checkoutSuccessfulTitle).toContain('Checkout: Complete!');
  });
})
