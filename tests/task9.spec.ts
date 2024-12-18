import { test, expect } from '@playwright/test';
import { GeneralPage } from '../pages/task9/generalPage';
import { FamilyPage } from '../pages/task9/familyPage';
import { VisitPage } from '../pages/task9/visitPage';
import { FamilyData } from '../pages/task9/types';

test.describe('Dollar Street Family Tests', () => {
  let generalPageFamilyData: FamilyData;
  let familyPageData: FamilyData;
  let visitPageData: FamilyData;

  test('Verify family data across pages', async ({ page }) => {
    const generalPage = new GeneralPage(page);
    const familyPage = new FamilyPage(page);
    const visitPage = new VisitPage(page);

    // Step 1: Navigate and set income range
    await test.step('Navigate to Dollar Street and set income range', async () => {
      await generalPage.navigate();
      await generalPage.moveSlider(10000, 0);
    });

    // Step 2: Select random family
    await test.step('Select a random family and capture data', async () => {
      generalPageFamilyData = await generalPage.selectRandomFamily();
    });

    // Step 3: Verify data on family page
    await test.step('Verify family page data', async () => {
      familyPageData = await familyPage.getFamilyData();
      expect(familyPageData).toMatchObject({
        income: generalPageFamilyData.income,
        residence: generalPageFamilyData.residence,
      });
    });

    // Step 4: Visit family and verify data
    await test.step('Visit family page and verify data', async () => {
      await familyPage.visitFamily();
      visitPageData = await visitPage.getFamilyData();
      expect(visitPageData).toMatchObject(familyPageData);
    });
  });
});