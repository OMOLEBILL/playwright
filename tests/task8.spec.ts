import {test, expect, Locator, Page} from '@playwright/test';

class DataTablesPage {
    private page : Page;

    constructor(page: Page) {
        this.page = page;
        this.table = () => this.page.locator('#example');
        this.tableHeader = () => this.page.locator('#example thead th');
        this.paginationButtons = () => this.page.locator('button[data-dt-idx]:not([aria-label])');
        this.previousButton = () => this.page.locator('button[data-dt-idx="previous"]');
        this.nextButton = () => this.page.locator('button[data-dt-idx="next"]');
    }

    async navigate(): Promise<void> {
        await this.page.goto('https://datatables.net/examples/basic_init/flexible_width.html');
    }

    async resetPagination() {
        const firstButton = this.paginationButtons().first();
        if (await firstButton.isVisible()) {
            
          await firstButton.click();
        }
      }
}

test.describe('DataTables Verification tests', () => {
    test('Verify that the table is visible', async ({page}) => {

        const dataTablesPage = new DataTablesPage(page);

        await test.step('Navigate to the page', async () => {
            await dataTablesPage.navigate();
        });

        await test.step('Verify that the table is visible', async () => {
            await expect(dataTablesPage.table()).toBeVisible();
        });

        await test.step('Verify that the table header is visible', async () => {
            const textContent = await dataTablesPage.tableHeader().allTextContents();
            await expect(textContent).toEqual(['Name', 'Position', 'Office', 'Age', 'Start date', 'Salary']);
        });

    });

    test('Verify pagination functionality', async ({page}) => {

        const dataTablesPage = new DataTablesPage(page);

        await test.step('Navigate to the page', async () => {
            await page.goto('https://datatables.net/examples/basic_init/flexible_width.html');
        });

        await test.step('Verify pagination buttons', async () => {
            const pages = await dataTablesPage.paginationButtons().count();
            for (let i = 0; i < pages; i++){
                await dataTablesPage.paginationButtons().nth(i).click();
                await expect(await dataTablesPage.table()).toBeVisible();
            }
        });

        await test.step('Verify Previous and Next buttons', async () => {
            await dataTablesPage.resetPagination();
            await dataTablesPage.nextButton().click();
            await expect(await dataTablesPage.table()).toBeVisible();
            await dataTablesPage.previousButton().click();
            await expect(await dataTablesPage.table()).toBeVisible();
        });

    });


});