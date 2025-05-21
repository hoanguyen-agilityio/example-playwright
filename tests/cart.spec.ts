import { PRODUCTS_URL } from "@/constants";
import test, { expect } from "@playwright/test";

test.describe('Cart tests', () => {
  test('Verify user is able to add a product to the cart by clicking the "Add to cart" button', async ({ page }) => {
    await test.step('Navigate to product page', async () => {
      await page.goto(PRODUCTS_URL);
    });

    await test.step('Click on "Add to cart" button', async () => {
      const addToCartButton = page.getByTestId('add-to-cart-sauce-labs-backpack');
  
      await addToCartButton.click();
    });

    await test.step('Verify the "Remove" button is visible', async () => {
      const removeButton = page.getByRole('button', { name: 'Remove' });
      await expect (removeButton).toBeVisible();
    })
  });
})