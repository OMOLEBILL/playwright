import { expect, Page } from '@playwright/test';

export class CheckoutPage {
  private page: Page;
  private firstNameInput;
  private lastNameInput;
  private postalCodeInput;
  private continueButton;
  private finishButton;
  private thankYouImage;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = this.page.locator('input[name="firstName"]');
    this.lastNameInput = this.page.locator('input[name="lastName"]');
    this.postalCodeInput = this.page.locator('input[name="postalCode"]');
    this.continueButton = this.page.locator('input[name="continue"]');
    this.finishButton = this.page.locator('button:has-text("Finish")');
    this.thankYouImage = this.page.locator('img[alt="Pony Express"]');
  }

  async fillCheckoutForm(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }

  async continueToOverview(): Promise<void> {
    await this.continueButton.click();
  }

  async verifyItemTotal(expectedTotal: string): Promise<void> {
    const itemTotal = await this.page.locator('.summary_subtotal_label').textContent();
    await expect(itemTotal).toContain(expectedTotal);
  }

  async finishCheckout(): Promise<void> {
    await this.finishButton.click();
  }

  async verifyThankYouScreen(): Promise<void> {
    await expect(this.thankYouImage).toBeVisible();
  }
}