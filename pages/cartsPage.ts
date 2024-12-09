import { expect, Page, Locator } from '@playwright/test';

export class CartPage {
  private page: Page;
  cartItems: () => Locator;
  continueShoppingButton: () => Locator;
  cartItem: (itemName: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = () => this.page.locator('.cart_item');
    this.continueShoppingButton = () => this.page.locator('button:has-text("Continue Shopping")');
    this.cartItem = (itemName: string) => this.page.locator(`.cart_item:has-text("${itemName}")`);
  }

  async verifyProductInCart(productDetails: { name: string, price: string }): Promise<void> {
    const cartItemLocator = this.cartItem(productDetails.name);
    await expect(cartItemLocator.locator('.inventory_item_name')).toHaveText(productDetails.name);
    await expect(cartItemLocator.locator('.inventory_item_price')).toHaveText(productDetails.price);
  }

  async removeProductFromCart(itemName: string): Promise<void> {
    const cartItemLocator = this.cartItem(itemName);
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
