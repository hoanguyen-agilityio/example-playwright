// Fixtures
import { test, expect } from '@/fixtures';

// Constants
import {
  CHECKOUT_STEP_ONE_URL,
  ERROR_MESSAGES,
  PATH,
  PRODUCTS,
  PRODUCTS_URL,
  USER
} from '@/constants';

test.describe('Checkout Tests', () => {
  test.beforeEach(async ({ page, inventoryPage }) => {
    await test.step('Navigate to product page', async () => {
      await page.goto(PRODUCTS_URL);
    });

    await test.step('Add "Sauce Labs Backpack" to cart', async () => {
      await inventoryPage.addProductToCart(PRODUCTS.BACKPACK);
    });

    await test.step('Navigate to checkout page', async () => {
      await page.goto(CHECKOUT_STEP_ONE_URL);
    });
  });

  test('Verify checkout success after adding item', async ({ page, checkoutPage }) => {
    await test.step('Verify checkout step one page', async () => {
      await expect(page).toHaveURL(PATH.CHECKOUT_STEP_ONE);
    });

    await test.step('Complete the checkout form', async () => {
      await checkoutPage.completeCheckout(
        USER.INFO_USER.FIRST_NAME,
        USER.INFO_USER.LAST_NAME,
        USER.INFO_USER.POSTAL_CODE
      );
      await checkoutPage.clickContinueButton();
      await checkoutPage.clickFinishButton();
    });

    await test.step('Verify checkout completion', async () => {
      await expect(page).toHaveURL(PATH.CHECKOUT_COMPLETE);
      await expect(checkoutPage.title).toBeVisible();
    });
  });

  test('Verify user cannot checkout with empty fields', async ({ page, checkoutPage }) => {
    await test.step('Verify checkout step one page', async () => {
      await expect(page).toHaveURL(PATH.CHECKOUT_STEP_ONE);
    });

    await test.step('Try to submit empty form', async () => {
      await checkoutPage.fillCheckoutForm(USER.EMPTY, USER.EMPTY, USER.EMPTY);
      await checkoutPage.continueButton.click();
    });

    await test.step('Verify checkout failure', async () => {
      await expect(page).toHaveURL(PATH.CHECKOUT_STEP_ONE);
      await expect(checkoutPage.errorMessage).toBeVisible();
      await expect(checkoutPage.errorMessage).toHaveText(ERROR_MESSAGES.FIRST_NAME_REQUIRED);
    });
  });

  test('Verify user cannot checkout with only first and last name', async ({ page, checkoutPage }) => {
    await test.step('Verify checkout step one page', async () => {
      await expect(page).toHaveURL(PATH.CHECKOUT_STEP_ONE);
    });
    
    await test.step('Try to submit incomplete form', async () => {
      await checkoutPage.fillCheckoutForm(
        USER.INFO_USER.FIRST_NAME,
        USER.INFO_USER.LAST_NAME,
        USER.EMPTY
      );
      await checkoutPage.continueButton.click();
    });

    await test.step('Verify checkout failure', async () => {
      await expect(page).toHaveURL(PATH.CHECKOUT_STEP_ONE);
      await expect(checkoutPage.errorMessage).toBeVisible();
      await expect(checkoutPage.errorMessage).toHaveText(ERROR_MESSAGES.POSTAL_CODE);
    });
  });
});
