import { Locator, Page } from "@playwright/test";

export class DetailPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;
  readonly productImage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.getByTestId('inventory-item-name');
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.removeButton = page.getByRole('button', { name: 'Remove' });
    this.productImage = page.locator('.inventory_details_img');
  }
}