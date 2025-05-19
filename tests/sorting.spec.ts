import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/loginPage";
import { InventoryPage } from "../pages/InventoryPage";
import { PRODUCTS_URL } from "../constants";

test.describe('Sorting Tests', () => {
  test('Verify sorting of items by price ascending', async ({ page }) => {
    const inventory = new InventoryPage(page);
    
    await page.goto(PRODUCTS_URL);
    await inventory.sortByPriceLowToHigh();
    await expect(page).toHaveURL(/.*inventory/);
    
    const prices = await inventory.getAllItemPrices();
    const sorted = [...prices].sort((a, b) => a - b);

    expect(prices).toEqual(sorted);
  });
})