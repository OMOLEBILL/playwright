import { test, expect } from '@playwright/test';

test.describe('Automation Practice Shop Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://practice.automationtesting.in/shop/');
    const consentButton = page.locator('//button[@aria-label="Consent"]');
    if (await consentButton.isVisible()) {
      await consentButton.click();
    }
  });

  test('Filter by Price Button is Clickable', async ({ page }) => {
    const filterButton = page.locator('//button[contains(text(), "Filter")]');
    await expect(filterButton).toBeVisible();
    await filterButton.click();
  });

  test('Verify Product Category - JavaScript is Present', async ({ page }) => {
    const javascriptCategory = page.locator('//a[text()="JavaScript"]');
    await expect(javascriptCategory).toBeVisible();
  });

  test('Verify Android Quick Start Guide is Visible', async ({ page }) => {
    const androidGuide = page.locator('//h3[text()="Android Quick Start Guide"]');
    await expect(androidGuide).toBeVisible();
  });

  test('Verify Sort By Newness Option', async ({ page }) => {
    const selectElement = page.locator('select[name="orderby"]');
    await selectElement.click();

    await selectElement.selectOption({ label: 'Sort by newness' });
    await expect(selectElement).toHaveValue('date');
  });

  test('Verify Subscribe Email Field is Present', async ({ page }) => {
    const subscribeField = page.locator('//input[@placeholder="Your email address"]');
    await expect(subscribeField).toBeVisible();
  });

  test('Verify Automation Practice Site Footer Year', async ({ page }) => {
    const footerYear = page.locator('//div[@class="footer-text-inner"]//div[@class="one"]');
    await expect(footerYear).toContainText('2024');
  });

  test('Verify Test Cases Link in Header', async ({ page }) => {
    const testCasesLink = page.locator('//a[text()="Test Cases"]');
    await expect(testCasesLink).toBeVisible();
    await testCasesLink.click();
  });
});
