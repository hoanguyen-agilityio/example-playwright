import test, { expect } from "@playwright/test";
import { PRODUCTS_URL } from "../constants";
import { CartPage } from "../pages/CartPage";
import { InventoryPage } from "../pages/InventoryPage";

test.describe('Cart and Navigation Tests', () => {
  test('Verify user is able to access cart page', async ({ page }) => {
    const cart = new CartPage(page);

    await page.goto(PRODUCTS_URL);
    await cart.openCart();
    await expect(page).toHaveURL(/.*cart/);
    await expect(cart.title).toBeVisible();
    await expect(cart.title).toHaveText('Your Cart');
  });

  test('Verify user can navigate from cart to all items', async ({ page }) => {
    const cart = new CartPage(page);
    const inventory = new InventoryPage(page);
    
    await page.goto(PRODUCTS_URL);
    await cart.openCart();
    await cart.goToAllItems();
    await expect(page).toHaveURL(/.*inventory/);
    await expect(inventory.title).toBeVisible();
    await expect(inventory.title).toHaveText('Products')
  });
})