// Fixtures
import { test, expect } from "@/fixtures";

// Constants
import { 
  PATH,  
  PRODUCTS, 
  PRODUCTS_URL 
} from "@/constants";

test.describe('Navigation Detail Page', () => {
  test.beforeEach(async ({ page }) => {
    await test.step('Navigate to products page', async () => {
      await page.goto(PRODUCTS_URL);
    });
  });

  test('Verify user can navigate to product details by name', async ({ page, inventoryPage, detailPage }) => {
    await test.step('Click on product title by name', async () => {
      await inventoryPage.goToProductDetailByName(PRODUCTS.BACKPACK);
    });

    await test.step('Verify user is on product detail page', async () => {
      await expect(page).toHaveURL(PATH.DETAILS_PAGE);
      await expect(detailPage.productName).toHaveText(PRODUCTS.BACKPACK);
    });
  });

  test('Verify user can navigate to product details by image', async ({ page, inventoryPage, detailPage }) => {
    await test.step('Click on product image', async () => {
      await inventoryPage.goToProductDetailByImage('item-4-img-link');
    });

    await test.step('Verify user is on product detail page', async () => {
      await expect(page).toHaveURL(PATH.DETAILS_PAGE);
      await expect(detailPage.productImage).toBeVisible();
    });
  });

  test('Verify user can access empty cart page', async ({ page, inventoryPage, cartPage }) => {
    await test.step('Click on product title by name', async () => {
      await inventoryPage.goToProductDetailByName(PRODUCTS.BACKPACK);
    });

    await test.step('Navigate to cart page', async () => {
      await cartPage.openCart();
    });

    await test.step('Verify cart page is displayed', async () => {
      await expect(page).toHaveURL(PATH.CART);
      await expect(cartPage.title).toBeVisible();
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
      await expect(page).toHaveURL(PATH.INVENTORY);
      await expect(inventoryPage.title).toBeVisible();
    });
  });

  test('Verify user can navigate to all items from details', async ({ page, inventoryPage, sidebarMenuPage }) => {
    await test.step('Click on product title by name', async () => {
      await inventoryPage.goToProductDetailByName(PRODUCTS.BACKPACK);
    });

    await test.step('Navigate back to all items', async () => {
      await sidebarMenuPage.goToAllItems();
    });

    await test.step('Verify inventory page is displayed', async () => {
      await expect(page).toHaveURL(PATH.INVENTORY);
      await expect(inventoryPage.title).toBeVisible();
    });
  });

  test('Verify user can access cart with items from details', async ({ page, inventoryPage, cartPage }) => {
    await test.step('Click on product title by name', async () => {
      await inventoryPage.goToProductDetailByName(PRODUCTS.BACKPACK);
    });

    await test.step('Click on "Add to cart" button', async () => {
      await inventoryPage.getAddToCartButton('add-to-cart').click();
    });

    await test.step('Navigate to cart page', async () => {
      await cartPage.openCart();
    });

    await test.step('Verify cart page is displayed', async () => {
      await expect(page).toHaveURL(PATH.CART);
      await expect(cartPage.title).toBeVisible();
    });
  });

  test('Verify user can navigate to product details from cart', async ({ page, inventoryPage, cartPage, detailPage }) => {
    await test.step('Click on "Add to cart" button', async () => {
      await inventoryPage.getAddToCartButton('add-to-cart-sauce-labs-backpack').click();
    });

    await test.step('Navigate to cart page', async () => {
      await cartPage.openCart();
    });

    await test.step('Click on product title by name', async () => {
      const productName = await page.getByTestId('inventory-item-name');
      await productName.click();
    });

    await test.step('Verify user is on product detail page', async () => {
      await expect(page).toHaveURL(PATH.DETAILS_PAGE);
      await expect(detailPage.productName).toHaveText(PRODUCTS.BACKPACK);
    });
  });
});
