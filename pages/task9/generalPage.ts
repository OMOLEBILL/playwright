import { Page, Locator} from '@playwright/test';
import { faker } from '@faker-js/faker';
import { FamilyData } from './types';
import { BASE_URL } from '../../env'; 

export class GeneralPage {
    readonly page: Page;
    readonly slider: Locator;
    readonly familyCards: Locator;
    readonly spinner: Locator;
    readonly subscribe: Locator;


    constructor(page: Page) {
      this.page = page;
      this.slider = page.locator('button.Slider_Handle__YniwT');
      this.familyCards = page.locator('.Media_Container__l2PkG');
      this.subscribe = page.getByRole('button', { name: 'Maybe later' });
    }


    async navigate() {
      await this.page.goto(BASE_URL);
      await this.subscribe.click()
    }


    async moveSlider(targetValue: number, sliderIndex: number): Promise<void> {
      const sliderHandle = this.slider.nth(sliderIndex);
    
      const handleBox = await sliderHandle.boundingBox();
      if (!handleBox) throw new Error(`Slider ${sliderIndex} handle not found.`);
    
      const min = await sliderHandle.getAttribute('aria-valuemin');
      const max = await sliderHandle.getAttribute('aria-valuemax');
    
      if (!min || !max) throw new Error('Failed to retrieve slider attributes.');
    
      const minValue = parseFloat(min);
      const maxValue = parseFloat(max);
    
      const clampedValue = Math.max(minValue, Math.min(targetValue, maxValue));
      const sliderTrack = await sliderHandle.evaluate((el) => el.parentElement?.getBoundingClientRect());
      if (!sliderTrack) throw new Error('Slider track not found.');
    
      const sliderWidth = sliderTrack.width;
      const valueRatio = (clampedValue - minValue) / (maxValue - minValue);
    
      const targetX = sliderTrack.left + valueRatio * sliderWidth;
      const targetY = sliderTrack.top + sliderTrack.height / 2;
      
      //wrap the response 
      const waitForResponse = this.page.waitForResponse(response => response.url().includes('/v1/search/families'));

      // Simulate dragging the slider handle to the target position
      await this.page.mouse.move(handleBox.x + handleBox.width / 2, targetY);
      await this.page.mouse.down();
      await this.page.mouse.move(targetX, targetY, { steps: 20 });
      await this.page.mouse.up();
  
      //await for the data to be loaded in the page
      await waitForResponse;
    }

    async selectRandomFamily(): Promise<FamilyData> {
      const total = await this.familyCards.count();
      const randomIndex = faker.number.int({ min: 0, max: total - 1 });
  
      const selectedFamily = this.familyCards.nth(randomIndex);
      await selectedFamily.scrollIntoViewIfNeeded();
  
      const income = await selectedFamily.locator('.Media_Label__SWsj_ span').nth(0).textContent();
      const residence = await selectedFamily.locator('span').nth(1).textContent();
  
      await selectedFamily.click();
  
      return {
        income: income?.match(/\d+/)?.[0].trim() || '',
        residence: residence?.trim() || '',
      };
    }
  }
