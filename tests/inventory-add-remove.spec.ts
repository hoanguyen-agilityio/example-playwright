import { test, expect } from "@/fixtures";
import { PRODUCTS_URL } from "@/constants";

test.describe('Cart tests', () => {
  test.beforeEach(async ({ page, inventoryPage }) => {
    await test.step('Navigate to product page', async () => {
      await page.goto(PRODUCTS_URL);
    });

    await test.step('Click on "Add to cart" button', async () => {
      await inventoryPage.getAddToCartButton('add-to-cart-sauce-labs-backpack').click();
    });
  })

  test('Verify user can add a product to the cart', async ({ inventoryPage }) => {
    await test.step('Verify the "Remove" button is visible', async () => {
      await expect(inventoryPage.getRemoveButton()).toBeVisible();
    });
  });

  test('Verify user can remove a product from the cart', async ({ inventoryPage }) => {
    await test.step('Click on "Remove" button', async () => {
      await inventoryPage.getRemoveButton().click();
    });

    await test.step('Verify the "Add to cart" button is visible', async () => {
      await expect(inventoryPage.getAddToCartButton('add-to-cart-sauce-labs-backpack')).toBeVisible();
    });
  });
});
