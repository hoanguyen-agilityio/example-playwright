// Fixtures
import { test, expect } from "@/fixtures";

// Constants
import { 
  BASE_URL, 
  HEADINGS, 
  PRODUCTS_URL 
} from "@/constants";

test.describe('Logout Tests', () => {
  test('Verify user is able to logout successfully', async ({ page, sidebarMenuPage }) => {
    await test.step('Navigate to product page', async () => {
      await page.goto(PRODUCTS_URL)
    });

    await test.step('Click on logout link', async () => {
      await sidebarMenuPage.logout();
    });

    await test.step('Verify user is logged out', async () => {
      await expect(page).toHaveURL(BASE_URL);
      await expect(page).toHaveTitle(HEADINGS.SWAG_LABS);
    });
  });
});
