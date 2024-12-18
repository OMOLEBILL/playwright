import { expect, Page, Locator } from '@playwright/test';

export class ProductsPage {
  private page: Page;
  inventoryContainer: () => Locator;
  productSortDropdown: () => Locator;
  cartBadge: () => Locator;
  productItem: (itemName: string) => Locator;

  constructor(page: Page) {
    this.page = page;
    this.inventoryContainer = () => this.page.locator('#inventory_container');
    this.productSortDropdown = () => this.page.locator('.product_sort_container');
    this.cartBadge = () => this.page.locator('.shopping_cart_badge');
    this.productItem = (itemName: string) => 
      this.page.locator(`text=${itemName}`).locator('xpath=ancestor::div[contains(@class,"inventory_item")]');
  }

  async verifyOnProductsPage(): Promise<void> {
    await expect(this.inventoryContainer().first()).toBeVisible();
  }

  async sortByPriceLowToHigh(): Promise<void> {
    await this.productSortDropdown().selectOption({ label: 'Price (low to high)' });
  }

  async verifySortedByPrice(): Promise<void> {
    const itemPrices = await this.page.$$eval('.inventory_item_price', prices =>
      prices.map(price => parseFloat(price.textContent!.replace('$', '')))
    );
    expect(itemPrices).toEqual(itemPrices.sort((a, b) => a - b));
  }

  async addItemToCart(itemName: string): Promise<void> {
    await this.productItem(itemName).locator('button:has-text("Add to cart")').click();
  }

  async verifyCartCount(expectedCount: number): Promise<void> {
    await expect(this.cartBadge()).toHaveText(String(expectedCount));
  }

  async getProductDetails(itemName: string): Promise<{ name: string, price: string }> {
    const item = this.productItem(itemName);
    const name = await item.locator('.inventory_item_name').textContent();
    const price = await item.locator('.inventory_item_price').textContent();
    return { name: name!, price: price! };
  }

  async goToCart(): Promise<void> {
    await this.page.click('.shopping_cart_link');
  }
}
