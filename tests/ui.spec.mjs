import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { test, expect } from '@playwright/test';

const fileUrl = pathToFileURL(path.resolve(process.cwd(), 'index.html')).href;

test.describe('UI issue detection', () => {
  test('problematic button overlaps the title on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto(fileUrl);
    const title = await page.locator('#problematic .title').boundingBox();
    const button = await page.locator('#problematic .action').boundingBox();
    expect(title).not.toBeNull();
    expect(button).not.toBeNull();
    if (!title || !button) return;
    expect(button.y).toBeLessThan(title.y + title.height - 4);
  });

  test('fixed layout keeps the button below the title on small screens', async ({ page }) => {
    await page.setViewportSize({ width: 360, height: 640 });
    await page.goto(fileUrl);
    const title = await page.locator('#fixed .title').boundingBox();
    const button = await page.locator('#fixed .action').boundingBox();
    expect(title).not.toBeNull();
    expect(button).not.toBeNull();
    if (!title || !button) return;
    expect(button.y).toBeGreaterThanOrEqual(title.y + title.height - 2);
  });

  test('problematic placeholder lacks contrast in dark mode', async ({ page }) => {
    await page.goto(fileUrl);
    const color = await page
      .locator('#problematic .dark-mode input')
      .evaluate((el) => getComputedStyle(el, '::placeholder').color);
    expect(color).toContain('0.05');
  });

  test('fixed placeholder color is readable in dark mode', async ({ page }) => {
    await page.goto(fileUrl);
    const color = await page
      .locator('#fixed .dark-mode input')
      .evaluate((el) => getComputedStyle(el, '::placeholder').color);
    expect(color).toContain('0.85');
  });

  test('problematic modal is stuck near the top while the fixed modal centers vertically', async ({ page }) => {
    await page.goto(fileUrl);
    await page.click('#open-problematic-modal');
    await page.click('#open-fixed-modal');
    const problemModal = page.locator('.problem-modal');
    const fixedModal = page.locator('.fixed-modal');
    await expect(problemModal).toBeVisible();
    await expect(fixedModal).toBeVisible();
    const problemBounds = await problemModal.boundingBox();
    const fixedBounds = await fixedModal.boundingBox();
    expect(problemBounds).not.toBeNull();
    expect(fixedBounds).not.toBeNull();
    if (!problemBounds || !fixedBounds) return;
    expect(problemBounds.y).toBeLessThan(fixedBounds.y - 20);
  });
});