import { PRODUCTS, PRODUCTS_URL } from "@/constants";
import { expect, test } from "@/fixtures";

test.describe('Cart functionality on detail page', () => {
  test.beforeEach(async ({ page, inventoryPage }) => {
    await test.step('Navigate to product page', async () => {
      await page.goto(PRODUCTS_URL);
    });

    await test.step('Click on product title by name', async () => {
      await inventoryPage.goToProductDetailByName(PRODUCTS.BACKPACK);
    });

    await test.step('Click on "Add to cart" button', async () => {
      await inventoryPage.getAddToCartButton('add-to-cart').click();
    });
  });

  test('Verify user can add a product to cart from details', async ({ inventoryPage }) => {
    await test.step('Verify the "Remove" button is visible', async () => {
      await expect(inventoryPage.getRemoveButton()).toBeVisible();
    });
  })
})