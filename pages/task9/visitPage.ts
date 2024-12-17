import { Page, Locator } from '@playwright/test';

export class VisitPage {
    readonly page: Page;
    readonly incomeField: Locator;
    readonly residenceField: Locator;
    readonly surnameField: Locator;

    constructor(page: Page) {
        this.page = page;
        this.surnameField = page.locator('h3.d-none.d-lg-block')
        this.incomeField = page.locator('div.col-6.d-flex.flex-wrap');
        this.residenceField = page.locator('div.col-3.text-right')
    }


    async getFamilyData() {
        const income = await this.incomeField.textContent();
        const surname = await this.surnameField.first().textContent();
        const residence = await this.residenceField.locator('h3').textContent();

        return {
        income: income?.match(/\d+/)?.[0].trim(),
        residence: residence?.trim(),
        surname: surname?.trim(),
        };
    }


}
