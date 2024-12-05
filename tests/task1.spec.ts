import { test, expect } from '@playwright/test';
test.describe('Sauce Demo Site Automation', () => {
    test('Login with a locked out user', async ({ page }) => {
      await test.step('Navigate to the login page', async () => {
          await page.goto('https://www.saucedemo.com/');
      });
    
      await test.step('Enter credentials', async () => {
        await page.fill('input[name="user-name"]', 'locked_out_user');
        await page.fill('input[name="password"]', 'secret_sauce');
        await page.click('input[name="login-button"]');
      });
    
      await test.step('Check that user is on the login page', async () => {
        await expect(page.locator('.login_logo')).toBeVisible();
      });
    
      await test.step('Check for warning message', async () => {
        const warningMessage = page.locator('.error-message-container');
        await expect(warningMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
      });
    
      await test.step('Close the warning message', async () => {
        await page.click('.error-button');
      });
    });
});