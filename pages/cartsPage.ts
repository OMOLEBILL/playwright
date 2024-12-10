import { expect, Page, Locator } from '@playwright/test';

export class CartPage {
  private page: Page;
  cartItems: () => Locator;
  continueShoppingButton: () => Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = () => this.page.locator('.cart_item');
    this.continueShoppingButton = () => this.page.locator('button').filter({hasText : "Continue Shopping"});
  }

  async verifyProductInCart(productDetails: { name: string, price: string }): Promise<void> {
    const cartItemLocator = this.cartItems().filter({hasText : `${productDetails.name}`});
    await expect(cartItemLocator.locator('.inventory_item_name')).toHaveText(productDetails.name);
    await expect(cartItemLocator.locator('.inventory_item_price')).toHaveText(productDetails.price);
  }

  async removeProductFromCart(itemName: string): Promise<void> {
    const cartItemLocator = this.cartItems().filter({hasText : `${itemName}`});
    await cartItemLocator.locator('button:has-text("Remove")').click();
  }

  async verifyCartIsEmpty(): Promise<void> {
    await expect(this.cartItems()).toBeHidden();
  }

  async continueShopping(): Promise<void> {
    await this.continueShoppingButton().click();
  }

  async checkout(): Promise<void> {
    await this.page.click('button:has-text("Checkout")');
  }
}
