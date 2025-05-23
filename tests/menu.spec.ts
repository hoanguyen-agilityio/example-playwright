import { PRODUCTS, PRODUCTS_URL } from "@/constants";
import { expect, test } from "@/fixtures";

test.describe('Menu Tests', () => {
  test.beforeEach(async ({ page }) => {
    await test.step('Navigate to product page', async () => {
      await page.goto(PRODUCTS_URL);
    });
  })
  test('Verify user can close hamburger menu from details', async ({ inventoryPage, sidebarMenu }) => {
    await test.step('Click on product title by name', async () => {
      await inventoryPage.goToProductDetailByName(PRODUCTS.BACKPACK);
    });

    await test.step('Verify hamburger menu is closed', async () => {
      await sidebarMenu.closeMenu();
      await expect(sidebarMenu.menu).toBeHidden();
    });
  });
})