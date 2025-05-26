import { Locator } from "@playwright/test";

export async function openMenuIfNotVisible(menuButton: Locator, menu: Locator) {
  const isVisible = await menu.isVisible();
  if (!isVisible) {
    await menuButton.click();
  };
};
