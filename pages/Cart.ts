import { Locator, Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly cartButton: Locator;
  readonly checkoutButton: Locator;
  readonly title: Locator; 
  readonly menuButton: Locator;
  readonly cartItems: Locator;
  readonly removeButtons: Locator;
  readonly continueShoppingButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartButton = page.getByTestId('shopping-cart-link');
    this.checkoutButton = page.getByRole('button', { name: 'Checkout' });
    this.title = page.getByTestId('title');
    this.menuButton = page.getByRole('button', { name: 'Open Menu' }); 
    this.cartItems = page.locator('.cart_item');
    this.removeButtons = page.getByRole('button', { name: 'Remove' });
    this.continueShoppingButton = page.getByRole('button', { name: 'Continue Shopping' });
    this.cancelButton = page.getByRole('button', { name: 'Cancel' });
  }

  async openCart() {
    await this.cartButton.click();
  }

  async removeItemByTestId(testId: string) {
    const removeButton = this.page.getByTestId(testId);
    await removeButton.click();
  }

  async getCartItemByTestId(testId: string): Promise<Locator> {
    return this.page.getByTestId(testId);
  }

  async removeAllItems() {
    while (await this.removeButtons.count() > 0) {
      await this.removeButtons.nth(0).click();
    }
  }

  async clickContinueShopping() {
    await this.continueShoppingButton.click();
  }

  async clickCheckoutButton() {
    await this.checkoutButton.click();
  }

  async clickCancelButton() {
    await this.cancelButton.click();
  }
}