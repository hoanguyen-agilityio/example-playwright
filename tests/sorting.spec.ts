// Fixtures
import { test, expect } from "@/fixtures";

// Constants
import { INVENTORY_URL, PRODUCTS_URL } from "@/constants";

test.describe('Sorting Tests', () => {
  test.beforeEach(async ({ page }) => {
    await test.step('Navigate to product page', async () => {
      await page.goto(PRODUCTS_URL);
    });
  });

  test('Verify sorting of items by price ascending', async ({ page, inventoryPage }) => {
    await test.step('Sort items by price low to high', async () => {
      await inventoryPage.sortByPriceLowToHigh();
    });

    await test.step('Verify URL is correct after sorting', async () => {
      await expect(page).toHaveURL(INVENTORY_URL);
    });

    await test.step('Get all item prices and verify ascending sort', async () => {
      const prices = await inventoryPage.getAllItemPrices();
      const sorted = [...prices].sort((a, b) => a - b);

      expect(prices).toEqual(sorted);
    });
  });

  test('Verify user can sort products by name (Z to A)', async ({ page, inventoryPage }) => {
    await test.step('Sort items by name Z to A', async () => {
      await inventoryPage.sortByNameZToA();
    });

    await test.step('Verify URL is correct after sorting', async () => {
      await expect(page).toHaveURL(INVENTORY_URL);
    });

    await test.step('Get all item names and verify Z to A sort', async () => {
      const names = await inventoryPage.getAllItemNames();
      const sorted = [...names].sort((a, b) => b.localeCompare(a));

      expect(names).toEqual(sorted);
    });
  });

  test('Verify user can sort products by price (high to low)', async ({ page, inventoryPage }) => {
    await test.step('Sort items by price high to low', async () => {
      await inventoryPage.sortByPriceHighToLow();
    });

    await test.step('Verify URL is correct after sorting', async () => {
      await expect(page).toHaveURL(INVENTORY_URL);
    });

    await test.step('Get all item prices and verify high to low sort', async () => {
      const prices = await inventoryPage.getAllItemPrices();
      const sorted = [...prices].sort((a, b) => b - a);

      expect(prices).toEqual(sorted);
    })
  })
});
