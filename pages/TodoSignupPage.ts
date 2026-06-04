import { Page } from '@playwright/test';
import config from '../playwright.config';

export default class TodoSignupPage {
  private get signupButton() {
    return 'a[href="/signup"]';
  }

  async load(page: Page) {
    await page.goto(`${config.use?.baseURL}/todo/signup`);
  }

  async clickSignup(page: Page) {
    await page.click(this.signupButton);
    await page.waitForURL(`${config.use?.baseURL}/signup`);
  }
}
