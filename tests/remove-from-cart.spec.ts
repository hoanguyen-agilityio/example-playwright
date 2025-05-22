import { PRODUCTS_URL } from "@/constants";
import test, { expect } from "@playwright/test";

test.describe('Remove From Cart Tests', () => {
  test.beforeEach(async ({ page }) => {
    await test.step('Navigate to product page', async () => {
      await page.goto(PRODUCTS_URL);
    });

    await test.step('Add multiple items to cart', async () => {
      const itemSelectors = [
        '[data-test="add-to-cart-sauce-labs-backpack"]',
        '[data-test="add-to-cart-sauce-labs-bike-light"]',
        '[data-test="add-to-cart-sauce-labs-onesie"]'
      ];

      for (const selector of itemSelectors) {
        await page.click(selector);
      }
    });

    await test.step('Navigate to cart page', async () => {
      const cartButton = page.getByTestId('shopping-cart-link');
      await cartButton.click();
    })
  });

  test('Verify user can remove a single product from cart', async ({ page }) => {
    await test.step('remove product "Sauce Labs Backpack"', async () => {
      const removeButton = page.getByTestId('remove-sauce-labs-backpack');
      await removeButton.click();
    });

    await test.step('Verify product is removed from cart', async () => {
      const cartProduct = page.getByTestId('cart-product-sauce-labs-backpack');
      await expect(cartProduct).toBeHidden();
    });
  })
})