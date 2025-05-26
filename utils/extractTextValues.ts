import { Locator } from "@playwright/test";

export const extractTextValues = async (locator: Locator): Promise<string[]> => {
  const count = await locator.count();
  const values: string[] = [];

  for(let i = 0; i < count; i++) {
    const text = await locator.nth(i).textContent();
    if (text) {
      values.push(text.trim());
    }
  }
  return values;
}
