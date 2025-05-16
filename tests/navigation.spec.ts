import test, { expect } from "@playwright/test";
import { CartPage } from "../pages/CartPage";
import { InventoryPage } from "../pages/InventoryPage";

test.describe('Cart and Navigation Tests', () => {
  test('Verify user is able to access cart page', async ({ page }) => {
    const cart = new CartPage(page);

    await cart.openCart();
    await expect(page).toHaveURL(/.*cart/);

    const cartTitle = await cart.title.textContent();
    expect(cartTitle).toContain('Your Cart');
  });

  test('Verify user can navigate from cart to all items', async ({ page }) => {
    const cart = new CartPage(page);
    const inventory = new InventoryPage(page);

    await cart.openCart();
    await cart.goToAllItems();
    await expect(page).toHaveURL(/.*inventory/);

    const allItemsTitle = await inventory.title.textContent();
    expect(allItemsTitle).toContain('Products');
  });
})