import { test, expect } from "@/fixtures";
import { DETAILS_PAGE_URL, PRODUCTS, PRODUCTS_URL } from "@/constants";

test.describe('Navigation Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    await test.step('Navigate to products page', async () => {
      await page.goto(PRODUCTS_URL);
    });
  })

  test('Verify user can navigate to product details by name', async ({ page, inventoryPage, detailPage }) => {
    await test.step('Click on product title by name', async () => {
      await inventoryPage.goToProductDetailByName(PRODUCTS.BACKPACK);
    });

    await test.step('Verify user is on product detail page', async () => {
      await expect(page).toHaveURL(DETAILS_PAGE_URL);
      await expect(detailPage.productName).toHaveText(PRODUCTS.BACKPACK);
    });
  });

  test('Verify user can navigate to product details by image', async ({ page, inventoryPage, detailPage }) => {
    await test.step('Click on product image', async () => {
      await inventoryPage.goToProductDetailByImage('item-4-img-link');
    });

    await test.step('Verify user is on product detail page', async () => {
      await expect(page).toHaveURL(DETAILS_PAGE_URL);
      await expect(detailPage.productImage).toBeVisible();
    })
  })
});
