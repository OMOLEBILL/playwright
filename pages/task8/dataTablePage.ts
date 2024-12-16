import { Page, Locator } from '@playwright/test'


export class DataTablesPage {
    table : () => Locator;
    search : () => Locator;
    options: () => Locator;
    tableData: () => Locator;
    nextButton: () => Locator;
    tableHeader : () => Locator;
    previousButton : () => Locator;
    paginationButtons: () => Locator;
    tableColumnCells : (columnIndex) => Locator;


    expectedTableData = {
        "Position" : ["Accountant", "Technical Author"],
        "Office": ["Edinburgh", "Tokyo"],
        "Age": ["19", "66"],
        "Salary": ["$75,650", "$1,200,000"]
    };



    constructor(readonly page: Page) {
        this.table = () => this.page.locator('#example');
        this.tableData = () => this.page.locator('#example tbody tr')
        this.tableHeader = () => this.page.locator('#example thead th');
        this.paginationButtons = () => this.page.locator('button[data-dt-idx]:not([aria-label])');
        this.previousButton = () => this.page.locator('button[data-dt-idx="previous"]');
        this.nextButton = () => this.page.locator('button[data-dt-idx="next"]');
        this.options = () => this.page.locator('#dt-length-0');
        this.search = () => this.page.locator('#dt-search-0');
        this.tableColumnCells = (columnIndex) => page.locator(`#example tbody tr td:nth-child(${columnIndex + 1})`);

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

    async getColumnData(columnIndex) {
        const cells = this.tableColumnCells(columnIndex);
        const cellTexts = await cells.allTextContents();
        return cellTexts.map((text) => text.trim());
    }
}

