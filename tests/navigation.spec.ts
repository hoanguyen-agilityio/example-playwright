// Libs
import test, { expect } from "@playwright/test";

// Constants
import { CART_URL, HEADINGS, INVENTORY_URL, PRODUCTS_URL } from "@/constants";

// Pages
import { CartPage, InventoryPage } from "@/pages";

test.describe('Cart and Navigation Tests', () => {
  test('Verify user is able to access cart page', async ({ page }) => {
    const cart = new CartPage(page);

    await page.goto(PRODUCTS_URL);
    await cart.openCart();
    await expect(page).toHaveURL(CART_URL);
    await expect(cart.title).toBeVisible();
    await expect(cart.title).toHaveText(HEADINGS.YOUR_CART);
  });

  test('Verify user can navigate from cart to all items', async ({ page }) => {
    const cart = new CartPage(page);
    const inventory = new InventoryPage(page);
    
    await page.goto(PRODUCTS_URL);
    await cart.openCart();
    await cart.goToAllItems();
    await expect(page).toHaveURL(INVENTORY_URL);
    await expect(inventory.title).toBeVisible();
    await expect(inventory.title).toHaveText(HEADINGS.PRODUCTS)
  });
})