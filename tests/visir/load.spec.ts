import { test, expect } from '@playwright/test';
import { PageManager } from '../../pages/PageManager';

test.describe('visir load', () => {
  test('homepage loads with status 200 and body is visible', async ({ page }) => {
    const response = await page.goto('/');
    expect(response).not.toBeNull();
    expect(response!.status()).toBe(200);

    const pageManager = new PageManager(page);
    await pageManager.expectBodyVisible();
  });
});
