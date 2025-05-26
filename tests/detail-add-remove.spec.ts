// Fixtures
import { expect, test } from "@/fixtures";

// Constants
import { PRODUCTS, PRODUCTS_URL } from "@/constants";

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
    await test.step('Verify the product is added to the cart', async () => {
      const cartBadge = inventoryPage.getCartBadge(); 
      await expect(cartBadge).toHaveText('1'); 
    });

    await test.step('Verify the "Remove" button is visible', async () => {
      await expect(inventoryPage.getRemoveButton()).toBeVisible();
    });
  });

  test('Verify user can remove a product from cart in details', async ({ inventoryPage }) => {
    await test.step('Click on "Remove" button', async () => {
      await inventoryPage.getRemoveButton().click();
    });

    await test.step('Verify the "Add to cart" button is visible', async () => {
      await expect(inventoryPage.getAddToCartButton('add-to-cart')).toBeVisible();
    });
  })
})