import { PRODUCTS_URL } from "@/constants";
import { test, expect } from "@/fixtures";

test.describe('Remove From Cart Tests', () => {
  test.beforeEach(async ({ page, cartPage }) => {
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
      await cartPage.openCart();
    });
  });

  test('Verify user can remove a single product from cart', async ({ cartPage }) => {
    await test.step('Remove product "Sauce Labs Backpack"', async () => {
      await cartPage.removeItemByTestId('remove-sauce-labs-backpack');
    });

    await test.step('Verify product is removed from cart', async () => {
      const removedItem = await cartPage.getCartItemByTestId('cart-product-sauce-labs-backpack');
      await expect(removedItem).toBeHidden();
    });
  });

  test('Verify user can remove all products from cart', async ({ cartPage }) => {
    await test.step('Remove all products from cart', async () => {
      await cartPage.removeAllItems();
    });

    await test.step('Verify cart is empty', async () => {
      await expect(cartPage.cartItems).toHaveCount(0);
    });
  });
});
