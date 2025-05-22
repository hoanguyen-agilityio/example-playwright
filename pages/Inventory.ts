import { Locator, Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly sortSelect: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId('title');
    this.sortSelect = page.getByTestId('product-sort-container');
  }

  async getAllItemPrices() {
    const priceElements = await this.page.locator('[data-test="inventory-item-price"]');
    const count = await priceElements.count();
    const prices: number[] = [];

    for (let i = 0; i < count; i++) {
      const priceText = await priceElements.nth(i).textContent();
      if (priceText) {
        const price = parseFloat(priceText.replace('$', ''));
        prices.push(price);
      }
    }

    return prices;
  };

  async sortByPriceLowToHigh() {
    await this.sortSelect.selectOption('lohi');
  };

  async sortByNameZToA() {
    await this.sortSelect.selectOption('za');
  };

  async getAllItemNames() {
    const nameElements = await this.page.locator('[data-test="inventory-item-name"]');
    const cont = await nameElements.count();
    const names: string[] = [];

    for (let i = 0; i < cont; i++) {
      const nameText = await nameElements.nth(i).textContent();
      if (nameText) {
        names.push(nameText);
      }
    }

    return names; 
  }
}
