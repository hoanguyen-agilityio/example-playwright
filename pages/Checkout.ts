import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly title: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByPlaceholder('First Name');
    this.lastNameInput = page.getByPlaceholder('Last Name');
    this.postalCodeInput = page.getByPlaceholder('Zip/Postal Code');
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    this.finishButton = page.getByRole('button', { name: 'Finish' });
    this.title = page.getByTestId('title');
    this.errorMessage = page.getByTestId('error');
  }

  async fillCheckoutForm(first: string, last: string, zip: string) {
    await this.firstNameInput.fill(first);
    await this.lastNameInput.fill(last);
    await this.postalCodeInput.fill(zip);
  }

  async continueToFinish() {
    await this.continueButton.click();
    await this.finishButton.click();
  }

  async completeCheckout(first: string, last: string, zip: string) {
    await this.fillCheckoutForm(first, last, zip);
    await this.continueToFinish();
  }
}
