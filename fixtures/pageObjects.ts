import { test as base, expect } from '@playwright/test';
import { InventoryPage, LoginPage } from "@/pages"

type PageObjects = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
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
  }
});

export { test, expect }