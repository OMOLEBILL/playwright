import { Page, Locator } from '@playwright/test';
import { FamilyData } from './types';

export class VisitPage {
    readonly page: Page;
    readonly surnameField: Locator;
    readonly incomeField: Locator;
    readonly residenceField: Locator;

    constructor(page: Page) {
      this.page = page;
      this.surnameField = page.locator('h3.d-none.d-lg-block');
      this.incomeField = page.locator('div.col-6.d-flex.flex-wrap');
      this.residenceField = page.locator('div.col-3.text-right h3');
    }


    async getFamilyData(): Promise<FamilyData> {
      const income = await this.incomeField.textContent();
      const surname = await this.surnameField.first().textContent();
      const residence = await this.residenceField.textContent();


      return {
        income: income?.match(/\d+/)?.[0].trim() || '',
        residence: residence?.trim() || '',
        surname: surname?.trim() || '',
      };
    }
}
