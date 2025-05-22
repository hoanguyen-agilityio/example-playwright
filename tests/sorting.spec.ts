// Libs
import test, { expect } from "@playwright/test";

// Constants
import { INVENTORY_URL, PRODUCTS_URL } from "@/constants";

// Pages
import { InventoryPage } from "@/pages";

test.describe('Sorting Tests', () => {
  test('Verify sorting of items by price ascending', async ({ page }) => {
    const inventory = new InventoryPage(page);
    
    await page.goto(PRODUCTS_URL);
    await inventory.sortByPriceLowToHigh();
    await expect(page).toHaveURL(INVENTORY_URL);
    
    const prices = await inventory.getAllItemPrices();
    const sorted = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sorted);
  });

  test('Verify user can sort products by name (Z to A)', async ({ page }) => {
    const inventory = new InventoryPage(page);

    await page.goto(PRODUCTS_URL);
    await inventory.sortByNameZToA();
    await expect(page).toHaveURL(INVENTORY_URL);

    const names = await inventory.getAllItemNames();
    const sorted = [...names].sort((a, b) => b.localeCompare(a));
    
    expect(names).toEqual(sorted);
  });
});