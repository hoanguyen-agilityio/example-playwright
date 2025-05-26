import { HEADINGS } from "@/constants";
import { expect, Locator, Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly title: Locator;
  readonly sortSelect: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByText(HEADINGS.PRODUCTS);
    this.sortSelect = page.getByTestId('product-sort-container');
  }

  getAddToCartButton(itemTest: string): Locator {
    return this.page.getByTestId(itemTest);
  }

  getRemoveButton(): Locator {
    return this.page.getByRole('button', { name: 'Remove' });
  }

  getCartBadge(): Locator {
    return this.page.locator('[data-test="shopping-cart-badge"]');
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

  async sortByPriceHighToLow() {
    await this.sortSelect.selectOption('hilo');
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

  async goToProductDetailByName(productName: string) {
    const productCard = this.page.locator('.inventory_item').filter({ hasText: productName });
    const productTitle = productCard.getByTestId('inventory-item-name');

    await expect(productCard).toBeVisible();
    await productTitle.click();
  }

  async goToProductDetailByImage(productImage: string) {
    const productImg = this.page.getByTestId(productImage);

    await expect(productImg).toBeVisible();
    await productImg.click();
  }

  async addProductToCart(productName: string) {
    const addToCartButton = this.page.locator('.inventory_item')
      .filter({ hasText: productName })
      .getByRole('button', { name: 'Add to cart' });

    await addToCartButton.click();
  }
}
