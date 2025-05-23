// Libs
import { test, expect } from '@/fixtures';

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

test.describe('Checkout Tests', () => {
  test.beforeEach(async ({ page, cartPage }) => {
    await test.step('Navigate to product page', async () => {
      await page.goto(PRODUCTS_URL);
    });

    await test.step('Add "Sauce Labs Backpack" to cart', async () => {
      const addToCartButton = page.locator('.inventory_item')
        .filter({ hasText: PRODUCTS.BACKPACK })
        .getByRole('button', { name: 'Add to cart' });

      await addToCartButton.click();
    });

    await test.step('Open cart', async () => {
      await cartPage.openCart();
    });

    await test.step('Proceed to checkout', async () => {
      await cartPage.clickCheckoutButton();
    });
  });

  test('Verify checkout success after adding item', async ({ page, checkoutPage }) => {
    await test.step('Complete the checkout form', async () => {
      await checkoutPage.completeCheckout(USER.FIRST_NAME, USER.LAST_NAME, USER.POSTAL_CODE);
    });

    await test.step('Verify checkout completion', async () => {
      await expect(page).toHaveURL(CHECKOUT_URL);
      await expect(checkoutPage.title).toBeVisible();
      await expect(checkoutPage.title).toHaveText(HEADINGS.CHECKOUT_COMPLETE);
    });
  });

  test('Verify user cannot checkout with empty fields', async ({ page, checkoutPage }) => {
    await test.step('Try to submit empty form', async () => {
      await checkoutPage.fillCheckoutForm(USER.EMPTY, USER.EMPTY, USER.EMPTY);
      await checkoutPage.continueButton.click();
    });

    await test.step('Verify checkout failure', async () => {
      await expect(page).toHaveURL(CHECKOUT_STEP_ONE);
      await expect(checkoutPage.errorMessage).toBeVisible();
      await expect(checkoutPage.errorMessage).toHaveText(ERROR_MESSAGES.FIRST_NAME_REQUIRED);
    });
  });

  test('Verify user cannot checkout with only first and last name', async ({ page, checkoutPage }) => {
    await test.step('Try to submit incomplete form', async () => {
      await checkoutPage.fillCheckoutForm(USER.FIRST_NAME, USER.LAST_NAME, USER.EMPTY);
      await checkoutPage.continueButton.click();
    });

    await test.step('Verify checkout failure', async () => {
      await expect(page).toHaveURL(CHECKOUT_STEP_ONE);
      await expect(checkoutPage.errorMessage).toBeVisible();
      await expect(checkoutPage.errorMessage).toHaveText(ERROR_MESSAGES.POSTAL_CODE);
    });
  })
});
