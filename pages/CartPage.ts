import { Locator, Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartButton: Locator;
  readonly checkoutButton: Locator;
  readonly title: Locator; 
  readonly menuButton: Locator;
  readonly allItemsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartButton = page.getByTestId('shopping-cart-link');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.title = page.getByTestId('title');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.allItemsLink = page.getByTestId('inventory-sidebar-link');
  }

  async openCart() {
    await this.cartButton.click();
  }

  async goToAllItems() {
    await this.menuButton.click();
    await this.allItemsLink.click();
  }
}