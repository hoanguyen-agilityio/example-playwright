import { test, expect, Page } from '@playwright/test';
import { PRODUCTS_URL } from '../constants';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

const navigateToProductsPage = async (page: Page) => {
  await test.step('Navigate to product page', async () => {
    await page.goto(PRODUCTS_URL)
  })
}

const addItemToCart = async (page: Page, itemName: string) => {
  await test.step(`Add "${itemName}" to cart`, async () => {
    const addToCartButton = page.locator('.inventory_item')
      .filter({ hasText: itemName})
      .getByRole('button', { name: 'Add to cart'})

    await addToCartButton.click();
  })
}

const proceedToCheckout = async (cart: CartPage) => {
  await test.step('Proceed to checkout', async () => {
    await cart.openCart();
    await cart.checkoutButton.click();
  });
}

const completeCheckout = async (checkout: CheckoutPage, firstName: string, lastName: string, postalCode: string) => {
  await test.step('Complete the checkout form', async () => {
    await checkout.completeCheckout(firstName, lastName, postalCode);
  })
}

const verifyCheckoutSuccess = async (page: Page, checkout: CheckoutPage) => {
  await test.step('Verify checkout completion', async () => {
    await expect(page).toHaveURL(/.*checkout-complete/);
  
    const checkoutSuccessfulTitle = await checkout.title.textContent();
    expect(checkoutSuccessfulTitle).toContain('Checkout: Complete!');
  })
}

test.describe('Checkout Tests', () => {
  test('Verify checkout success after adding item', async ({ page }) => {
    const cart = new CartPage(page);
    const checkout = new CheckoutPage(page);

    await navigateToProductsPage(page);
    await addItemToCart(page, 'Sauce Labs Backpack');
    await proceedToCheckout(cart);
    await completeCheckout(checkout ,'Hoa', 'Nguyen', '12345');
    await verifyCheckoutSuccess(page, checkout)
  });
})
