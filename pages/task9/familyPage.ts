import { Page, Locator } from '@playwright/test';

export class FamilyPage {
    readonly page: Page;
    readonly incomeField: Locator;
    readonly residenceField: Locator;
    readonly surnameField: Locator;
    readonly visitButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.incomeField = page.locator('span.mb-0');
        this.residenceField = page.locator('div.LightboxDesktop_ContentWrapper__1dkjw.d-flex.flex-fill.h-100.w-100')
        this.visitButton = page.getByRole('link', { name: 'Visit this family' });
    }


    async getFamilyData() {
        const income = await this.incomeField.textContent();
        const familyInfo = await this.residenceField.locator("h5").textContent();
        const familyInfoList = familyInfo?.split(",")

        if (!familyInfoList) {
            throw new Error("Failed to retrieve family information.");
        }

        return {
        income: income?.match(/\d+/)?.[0].trim(),
        residence: familyInfoList[1].trim(),
        surname: familyInfoList[0].trim(),
        };
    }

    async clickVisitFamily() {
        await this.visitButton.click();
    }
}
