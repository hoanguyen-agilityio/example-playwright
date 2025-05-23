// Libs
import { test, expect } from "@/fixtures";

// Constants
import { CART_URL, HEADINGS, INVENTORY_URL, PRODUCTS_URL } from "@/constants";

test.describe('Cart and Navigation Tests', () => {
  test.beforeEach(async ({ page, cartPage }) => {
    await test.step('Navigate to products page', async () => {
      await page.goto(PRODUCTS_URL);
    });

    await test.step('Open cart', async () => {
      await cartPage.openCart();
    });
  })
  test('Verify user is able to access cart page', async ({ page, cartPage }) => {
    await test.step('Verify cart page is displayed', async () => {
      await expect(page).toHaveURL(CART_URL);
      await expect(cartPage.title).toBeVisible();
      await expect(cartPage.title).toHaveText(HEADINGS.YOUR_CART);
    });
  });

  test('Verify user can navigate from cart to all items', async ({ page, cartPage, inventoryPage }) => {
    await test.step('Navigate back to all items', async () => {
      await cartPage.goToAllItems();
    });

    await test.step('Verify inventory page is displayed', async () => {
      await expect(page).toHaveURL(INVENTORY_URL);
      await expect(inventoryPage.title).toBeVisible();
      await expect(inventoryPage.title).toHaveText(HEADINGS.PRODUCTS);
    });
  });

  test('Verify user can return to products from cart', async ({ page, inventoryPage, cartPage }) => {
    await test.step('Click the "Continue Shopping" button to return to the product page', async () => {
      await cartPage.clickContinueShopping();
    });

    await test.step('Verify products page is displayed', async () => {
      await expect(page).toHaveURL(INVENTORY_URL);
      await expect(inventoryPage.title).toBeVisible();
      await expect(inventoryPage.title).toHaveText(HEADINGS.PRODUCTS);
    });
  });

  test('Verify user can return to cart from checkout form', async ({ page, cartPage }) => {
    await test.step('Navigate to checkout form', async () => {
      await cartPage.clickCheckoutButton();
    });

    await test.step('Click the "Cancel" button to return to cart', async () => {
      await cartPage.clickCancelButton();
    });

    await test.step('Verify cart page is displayed', async () => {
      await expect(page).toHaveURL(CART_URL);
      await expect(cartPage.title).toBeVisible();
      await expect(cartPage.title).toHaveText(HEADINGS.YOUR_CART);
    });
  });
});
