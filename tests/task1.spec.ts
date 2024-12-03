import { test, expect } from '@playwright/test';
test.describe('Sauce Demo Site Automation', () => {
    // Task 1: Locked Out User Test
    test('Locked out user login attempt', async ({ page }) => {
      await page.goto('https://www.saucedemo.com/');
  
      // Enter credentials
      await page.fill('input[name="user-name"]', 'locked_out_user');
      await page.fill('input[name="password"]', 'secret_sauce');
      await page.click('input[name="login-button"]');
  
      // Check that user is on the login page
      await expect(page.locator('.login_logo')).toBeVisible();
  
      // Check for warning message
      const warningMessage = page.locator('.error-message-container');
      await expect(warningMessage).toContainText('Epic sadface: Sorry, this user has been locked out.');
  
      // Close the warning message
      await page.click('.error-button');
    });
});