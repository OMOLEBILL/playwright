import { Page, Locator } from '@playwright/test';
import { FamilyData } from './types';

export class FamilyPage {
    readonly page: Page;
    readonly incomeField: Locator;
    readonly residenceField: Locator;
    readonly surnameField: Locator;
    readonly visitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.incomeField = page.locator('span.mb-0');
        this.residenceField = page.locator('div.LightboxDesktop_ContentWrapper__1dkjw h5');
        this.visitButton = page.getByRole('link', { name: 'Visit this family' });
    }


    async getFamilyData(): Promise<FamilyData> {
        const income = await this.incomeField.textContent();
        const [surname, residence] = (await this.residenceField.textContent())?.split(',') || ['', ''];
    
        return {
          income: income?.match(/\d+/)?.[0].trim() || '',
          residence: residence.trim(),
          surname: surname.trim(),
        };
    }

    async visitFamily() {
        await this.visitButton.click();
    }
}
