import { Locator, Page } from "@playwright/test";

export class DetailPage {
  readonly page: Page;
  readonly productName: Locator;
  readonly addToCartButton: Locator;
  readonly removeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.getByTestId('inventory-item-name');
    this.addToCartButton = page.getByRole('button', { name: 'Add to cart' });
    this.removeButton = page.getByRole('button', { name: 'Remove' });
  }
}