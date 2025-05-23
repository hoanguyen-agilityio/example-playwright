import { test as base, expect } from '@playwright/test';
import { CartPage, CheckoutPage, DetailPage, InventoryPage, LoginPage, SidebarMenu } from "@/pages"

type PageFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  sidebarMenu: SidebarMenu;
  detailPage: DetailPage;
};

const test = base.extend<PageFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.goto();
    await use(loginPage);
  },

  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    
    await use(inventoryPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);

    await use(cartPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);

    await use(checkoutPage);
  },

  sidebarMenu: async ({ page }, use) => {
    const sidebarMenu = new SidebarMenu(page);

    await use(sidebarMenu);
  },

  detailPage: async ({ page }, use) => {
    const detailPage = new DetailPage(page);

    await use(detailPage);
  }
});

export { test, expect }
