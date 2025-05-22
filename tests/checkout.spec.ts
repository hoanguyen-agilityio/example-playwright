// Libs
import { test, expect } from '@playwright/test';

// Constants
import {
  CHECKOUT_STEP_ONE,
  CHECKOUT_URL,
  ERROR_MESSAGES,
  HEADINGS,
  PRODUCTS,
  PRODUCTS_URL,
  USER
} from '@/constants';

// Pages
import { CartPage, CheckoutPage } from '@/pages';

test.describe('Checkout Tests', () => {
  let cart: CartPage;
  let checkout: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    cart = new CartPage(page);
    checkout = new CheckoutPage(page);

    await test.step('Navigate to product page', async () => {
      await page.goto(PRODUCTS_URL);
    });

    await test.step('Add "Sauce Labs Backpack" to cart', async () => {
      const addToCartButton = page.locator('.inventory_item')
        .filter({ hasText: PRODUCTS.BACKPACK })
        .getByRole('button', { name: 'Add to cart' });

      await addToCartButton.click();
    });

    await test.step('Proceed to checkout', async () => {
      await cart.openCart();
      await cart.checkoutButton.click();
    });
  });

  test('Verify checkout success after adding item', async ({ page }) => {
    await test.step('Complete the checkout form', async () => {
      await checkout.completeCheckout(USER.FIRST_NAME, USER.LAST_NAME, USER.POSTAL_CODE);
    });

    await test.step('Verify checkout completion', async () => {
      await expect(page).toHaveURL(CHECKOUT_URL);
      await expect(checkout.title).toBeVisible();
      await expect(checkout.title).toHaveText(HEADINGS.CHECKOUT_COMPLETE);
    });
  });

  test('Verify user cannot checkout with empty fields', async ({ page }) => {
    await test.step('Try to submit empty form', async () => {
      await checkout.fillCheckoutForm(USER.EMPTY, USER.EMPTY, USER.EMPTY);
      await checkout.continueButton.click();
    });

    await test.step('Verify checkout failure', async () => {
      await expect(page).toHaveURL(CHECKOUT_STEP_ONE);
      await expect(checkout.errorMessage).toBeVisible();
      await expect(checkout.errorMessage).toHaveText(ERROR_MESSAGES.FIRST_NAME_REQUIRED);
    });
  });
});
