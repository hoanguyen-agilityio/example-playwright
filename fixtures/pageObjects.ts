import { test as base, expect } from '@playwright/test';
import { CartPage, CheckoutPage, InventoryPage, LoginPage, SidebarMenu } from "@/pages"

type PageObjects = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  sidebarMenu: SidebarMenu;
};

const test = base.extend<PageObjects>({
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
  }
});

export { test, expect }