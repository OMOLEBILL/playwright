import { test, expect } from '@playwright/test';
import { DataTablesPage } from '../pages/task8/dataTablePage'


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
            await dataTablesPage.navigate();
        });

        await test.step('Verify pagination buttons', async () => {
            const pages = await dataTablesPage.paginationButtons().count();
            let previousFirstRowText: string | null = null;
            for (let i = 0; i < pages; i++){
                await dataTablesPage.paginationButtons().nth(i).click();
                const currentFirstRowText = await dataTablesPage.table().first().textContent();
                expect (currentFirstRowText).not.toBeNull();
                expect (previousFirstRowText).not.toEqual(currentFirstRowText)
                previousFirstRowText = currentFirstRowText
            }
        });

        await test.step('Verify Previous and Next buttons', async () => {
            await dataTablesPage.resetPagination();
            await dataTablesPage.nextButton().click();
            const previousFirstRowText = await dataTablesPage.table().first().textContent();
            await dataTablesPage.previousButton().click();
            const currentFirstRowText = await dataTablesPage.table().first().textContent();
            await expect(previousFirstRowText).not.toEqual(currentFirstRowText)
        })

    });

    test('Verify table length functionality', async ({page}) => {

        const dataTablesPage = new DataTablesPage(page);
        const expectedOptions = ['10','25','50','100']

        await test.step("Navigate to the page",  async () => {
            await dataTablesPage.navigate();
        });

        await test.step("Verify that the available options", async () => {
            const options = await dataTablesPage.options().allTextContents();
            expect(options.join('')).toEqual(expectedOptions.join('')); 
        });

        await test.step("verify that the table data is updated accordingly", async () => {
            for(const option of expectedOptions){
                await dataTablesPage.options().selectOption(option);
                const rowCount = await dataTablesPage.tableData().count();
                expect(rowCount).toBeLessThanOrEqual(parseInt(option));
            }
        });

        await test.step("Verify selected option is highlighted in the drop-down menu", async () => {
            for(const option of expectedOptions){
                await dataTablesPage.options().selectOption(option);
                await expect(dataTablesPage.options()).toHaveValue(option)
            }
        })
    });

    test("Verify the search functionality", async ({page}) => {

        const dataTablesPage = new DataTablesPage(page);

        await test.step("Navigate to the page", async () => {
            await dataTablesPage.navigate();
        });

        await test.step("Verify the search the functionality", async () => {
            
            const input = "Zorita Serrano";
            await dataTablesPage.search().fill(input);

            //Verify that the number of rows displayed on the page is updated.
            const rowCount = await dataTablesPage.tableData().count();
            expect(rowCount).toEqual(1)

            //Verify that the table data is updated with the search results.
            const textFound = await dataTablesPage.tableData().first().locator('td').first().innerText();
            expect(input).toEqual(textFound)

            //Verify that the pagination buttons are updated
            const paginationButtonsCount = await dataTablesPage.paginationButtons().count();
            expect(paginationButtonsCount).toEqual(1)
        });

    });

    test("Verify the sorting functionality", async ({page}) => {

        const dataTablesPage = new DataTablesPage(page);

        await test.step("Navigate to page", async () => {
            await dataTablesPage.navigate()
        });

        for (const [columnName, expectedValues] of Object.entries(dataTablesPage.expectedTableData)) {
            await test.step(`Verify sorting for column: ${columnName}`, async () => {
              // Find the index of the column header by matching its name
              const headers = await dataTablesPage.tableHeader().allTextContents();
              const columnIndex = headers.findIndex((header) => header.trim() === columnName);
        
              // Click the header to sort in ascending order
              await dataTablesPage.tableHeader().nth(columnIndex).click();
              await expect(dataTablesPage.tableHeader().nth(columnIndex)).toHaveAttribute(
                'aria-label', `${columnName}: Activate to invert sorting`)
              const ascendingData = await dataTablesPage.getColumnData(columnIndex);
              expect(ascendingData[0]).toEqual(expectedValues[0]); 
        
              // Click the header to sort in descending order
              await dataTablesPage.tableHeader().nth(columnIndex).click();
              await expect(dataTablesPage.tableHeader().nth(columnIndex)).toHaveAttribute(
                'aria-label', `${columnName}: Activate to remove sorting`)
              const descendingData = await dataTablesPage.getColumnData(columnIndex);
              expect(descendingData[0]).toEqual(expectedValues[1]);
            });
        }

    });

});