// Libs
import test, { expect } from "@playwright/test";

// Constants
import { BASE_URL, HEADINGS, PRODUCTS_URL } from "@/constants";

test.describe('Logout Tests', () => {
  test('Verify user is able to logout successfully', async ({ page }) => {
    const menuButton = await page.getByRole('button', { name: 'Open Menu' });
    const logoutLink = await page.getByTestId('logout-sidebar-link');

    await test.step('Navigate to product page', async () => {
      await page.goto(PRODUCTS_URL)
    });

    await test.step('Open menu', async () => {
      await menuButton.click();
    });

    await test.step('Click on logout link', async () => {
      await logoutLink.click();
    })

    await test.step('Verify user is logged out', async () => {
      await expect(page).toHaveURL(BASE_URL);
      await expect(page).toHaveTitle(HEADINGS.SWAG_LABS);
    });
  })
})
