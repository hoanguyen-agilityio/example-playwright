import { Locator, Page } from "@playwright/test";

export class SidebarMenu {
  readonly page: Page;
  readonly menuButton: Locator;
  readonly logoutLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.menuButton = page.getByRole('button', { name: 'Open Menu' });
    this.logoutLink = page.getByTestId('logout-sidebar-link');
  }

  async logout() {
    await this.menuButton.click();
    await this.logoutLink.click();
  }
}
