// Libs
import { Locator, Page } from "@playwright/test";

export class SidebarMenuPage {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;
  readonly closeMenuButton: Locator;
  readonly menu: Locator;
  readonly allItemsLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.getByTestId('logout-sidebar-link');
    this.closeMenuButton = page.getByRole('button', { name: 'Close Menu' });
    this.menu = page.locator('.bm-menu-wrap');
    this.allItemsLink = page.getByTestId('inventory-sidebar-link');
  }

  async clickMenuItem(itemName: Locator) {
    await this.menuButton.click();
    await itemName.click();
  }

  async logout() {
    await this.clickMenuItem(this.logoutLink)
  }

  async closeMenu() {
    await this.clickMenuItem(this.closeMenuButton)
  }

  async goToAllItems() {
    await this.clickMenuItem(this.allItemsLink)
  }
};
