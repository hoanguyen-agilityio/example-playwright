import { PRODUCTS_URL } from "@/constants";
import test, { expect } from "@playwright/test";

test.describe('Cart tests', () => {
  test.beforeEach(async ({ page }) => {
    await test.step('Navigate to product page', async () => {
      await page.goto(PRODUCTS_URL);
    });

    await test.step('Click on "Add to cart" button', async () => {
      const addToCartButton = page.getByTestId('add-to-cart-sauce-labs-backpack');

      await addToCartButton.click();
    });
  })

  test('Verify user can add a product to the cart', async ({ page }) => {
    await test.step('Verify the "Remove" button is visible', async () => {
      const removeButton = page.getByRole('button', { name: 'Remove' });
      await expect(removeButton).toBeVisible();
    });
  });

  test('Verify user can remove a product from the cart', async ({ page }) => {
    await test.step('Click on "Remove" button', async () => {
      const removeButton = page.getByRole('button', { name: 'Remove' });

      await removeButton.click();
    });

    await test.step('Verify the "Add to cart" button is visible', async () => {
      const addToCartButton = page.getByTestId('add-to-cart-sauce-labs-backpack');

      await expect(addToCartButton).toBeVisible();
    });
  });
});
