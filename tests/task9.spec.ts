import { test, expect } from '@playwright/test';
import { GeneralPage } from '../pages/task9/generalPage';
import { FamilyPage } from '../pages/task9/familyPage';
import { VisitPage } from '../pages/task9/visitPage';

test.describe('Dollar Street Family Tests', () => {
    test('Verify family data across pages', async ({ page }) => {
      const generalPage = new GeneralPage(page);
      const familyPage = new FamilyPage(page);
      const visitPage = new VisitPage(page);
  
      // Step 1: Navigate to Dollar Street and set income range
      await test.step('Navigate to Dollar Street and select income range', async () => {
        await generalPage.navigate();
        await generalPage.moveSlider(2000, 0);
      });
  
      // Step 2: Select a random family and capture data
      let generalPageFamilyData;
      await test.step('Select a random family and capture data', async () => {
        generalPageFamilyData = await generalPage.selectRandomFamily();
      });
  
      // Step 3: Verify data on family page
      let familyPageData;
      await test.step('Verify data on family page', async () => {
        familyPageData = await familyPage.getFamilyData();
        expect(familyPageData.income).toEqual(generalPageFamilyData.income);
        expect(familyPageData.residence).toEqual(generalPageFamilyData.residence);
      });
  
      // Step 4: Visit this family and verify data
      let visitPageData;
      await test.step('Click on Visit This Family and verify data', async () => {
        await familyPage.clickVisitFamily();
        visitPageData = await visitPage.getFamilyData();
        expect(visitPageData.income).toEqual(familyPageData.income);
        expect(visitPageData.residence).toEqual(familyPageData.residence);
        expect(visitPageData.surname).toEqual(familyPageData.surname);
      });
    });
  });