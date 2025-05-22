import { test, expect } from "@/fixtures";
import { CART_URL, DETAILS_PAGE_URL, HEADINGS, INVENTORY_URL, PRODUCTS, PRODUCTS_URL } from "@/constants";

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
  });

  test('Verify user can access empty cart page', async ({ page, inventoryPage, cartPage }) => {
    await test.step('Click on product title by name', async () => {
      await inventoryPage.goToProductDetailByName(PRODUCTS.BACKPACK);
    });

    await test.step('Open cart', async () => {
      await cartPage.openCart();
    });

    await test.step('Verify cart page is displayed', async () => {
      await expect(page).toHaveURL(CART_URL);
      await expect(cartPage.title).toBeVisible();
      await expect(cartPage.title).toHaveText(HEADINGS.YOUR_CART);
    });
  });

  test('Verify user can return to products from details', async ({ page, inventoryPage, detailPage }) => {
    await test.step('Click on product title by name', async () => {
      await inventoryPage.goToProductDetailByName(PRODUCTS.BACKPACK);
    });

    await test.step('Click the "Back to product" button to return to the product page', async () => {
      await detailPage.clickBackToProductsButton();
    });

    await test.step('Verify inventory page is displayed', async () => {
      await expect(page).toHaveURL(INVENTORY_URL);
      await expect(inventoryPage.title).toBeVisible();
      await expect(inventoryPage.title).toHaveText(HEADINGS.PRODUCTS);
    });
  });

  test('Verify user can navigate to all items from details', async ({ page, inventoryPage, cartPage }) => {
    await test.step('Click on product title by name', async () => {
      await inventoryPage.goToProductDetailByName(PRODUCTS.BACKPACK);
    });

    await test.step('Navigate back to all items', async () => {
      await cartPage.goToAllItems();
    });

    await test.step('Verify inventory page is displayed', async () => {
      await expect(page).toHaveURL(INVENTORY_URL);
      await expect(inventoryPage.title).toBeVisible();
      await expect(inventoryPage.title).toHaveText(HEADINGS.PRODUCTS);
    });
  })
});
