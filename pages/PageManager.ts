import { Page } from '@playwright/test';

/**
 * Base page manager for shared page interactions.
 * Use this for common checks (e.g. body visible) or extend per-site POMs as needed.
 */
export class PageManager {
  constructor(protected readonly page: Page) {}

  /**
   * Navigates to the given path and waits for the document to be loaded.
   * Assumes baseURL is set in the project config.
   */
  async goto(path: string = '/'): Promise<void> {
    const response = await this.page.goto(path, { waitUntil: 'domcontentloaded' });
    if (response && !response.ok()) {
      throw new Error(`Navigation to ${path} returned status ${response.status()}`);
    }
  }

  /**
   * Asserts that the document body is visible.
   */
  async expectBodyVisible(): Promise<void> {
    await this.page.locator('body').waitFor({ state: 'visible' });
  }
}
