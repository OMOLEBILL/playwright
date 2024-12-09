import { Page } from '@playwright/test';

export class LoginPage {
  private page: Page;
  private usernameInput;
  private passwordInput;
  private loginButton;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = this.page.locator('input[name="user-name"]');
    this.passwordInput = this.page.locator('input[name="password"]');
    this.loginButton = this.page.locator('input[name="login-button"]');
  }

  async navigate(): Promise<void> {
    await this.page.goto('https://www.saucedemo.com/');
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}