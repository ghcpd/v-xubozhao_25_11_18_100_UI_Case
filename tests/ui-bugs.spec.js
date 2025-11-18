import { test, expect } from '@playwright/test';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const buggyPagePath = path.resolve(__dirname, '../buggy/index.html');
const fixedPagePath = path.resolve(__dirname, '../fixed/index.html');

test.describe('UI-001: Button overlaps with title on small screens', () => {
  test('Buggy version shows overlap at 380px width', async ({ page }) => {
    await page.goto(`file://${buggyPagePath}`);
    await page.setViewportSize({ width: 380, height: 800 });
    
    const header = page.locator('header');
    const title = page.locator('#page-title');
    const button = page.locator('#action-button');
    
    // Get bounding boxes
    const headerBox = await header.boundingBox();
    const titleBox = await title.boundingBox();
    const buttonBox = await button.boundingBox();
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/buggy-ui001-overlap.png',
      fullPage: true 
    });
    
    // Check if elements are on same line (Y positions similar)
    const onSameLine = Math.abs((titleBox?.y || 0) - (buttonBox?.y || 0)) < 10;
    
    // Check if button extends beyond header or overlaps title
    const headerRight = (headerBox?.x || 0) + (headerBox?.width || 0);
    const buttonRight = (buttonBox?.x || 0) + (buttonBox?.width || 0);
    const titleRight = (titleBox?.x || 0) + (titleBox?.width || 0);
    
    // Bug detected: Elements overlap or button overflows
    const hasOverflow = buttonRight > headerRight - 10; // 10px tolerance
    const hasOverlap = onSameLine && (buttonBox?.x || 0) < titleRight + 10;
    
    console.log('UI-001 Buggy Test Results:');
    console.log(`  Same line: ${onSameLine}`);
    console.log(`  Overflow detected: ${hasOverflow}`);
    console.log(`  Overlap detected: ${hasOverlap}`);
    
    // Expect to find the bug
    expect(hasOverflow || hasOverlap).toBeTruthy();
  });
  
  test('Fixed version has no overlap at 380px width', async ({ page }) => {
    await page.goto(`file://${fixedPagePath}`);
    await page.setViewportSize({ width: 380, height: 800 });
    
    const header = page.locator('header');
    const title = page.locator('#page-title');
    const button = page.locator('#action-button');
    
    // Get bounding boxes
    const headerBox = await header.boundingBox();
    const titleBox = await title.boundingBox();
    const buttonBox = await button.boundingBox();
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/fixed-ui001-no-overlap.png',
      fullPage: true 
    });
    
    // Check if elements are on different lines (vertically stacked)
    const verticallyStacked = Math.abs((titleBox?.y || 0) - (buttonBox?.y || 0)) > 30;
    
    // Check no overflow
    const headerRight = (headerBox?.x || 0) + (headerBox?.width || 0);
    const buttonRight = (buttonBox?.x || 0) + (buttonBox?.width || 0);
    const titleRight = (titleBox?.x || 0) + (titleBox?.width || 0);
    
    const noOverflow = buttonRight <= headerRight + 10; // 10px tolerance
    const noOverlap = verticallyStacked || (buttonBox?.x || 0) >= titleRight;
    
    console.log('UI-001 Fixed Test Results:');
    console.log(`  Vertically stacked: ${verticallyStacked}`);
    console.log(`  No overflow: ${noOverflow}`);
    console.log(`  No overlap: ${noOverlap}`);
    
    // Expect fix to work
    expect(verticallyStacked).toBeTruthy();
    expect(noOverflow && noOverlap).toBeTruthy();
  });
});

test.describe('UI-002: Text input placeholder unreadable in dark mode', () => {
  test('Buggy version has poor contrast in dark mode', async ({ page }) => {
    await page.goto(`file://${buggyPagePath}`);
    
    // Enable dark mode
    await page.click('#theme-toggle');
    await page.waitForTimeout(500); // Wait for transition
    
    const input = page.locator('#username');
    
    // Get computed styles
    const backgroundColor = await input.evaluate(el => {
      return window.getComputedStyle(el).backgroundColor;
    });
    
    const placeholderColor = await input.evaluate(el => {
      const computed = window.getComputedStyle(el, '::placeholder');
      return computed.color;
    });
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/buggy-ui002-poor-contrast.png',
      fullPage: true 
    });
    
    console.log('UI-002 Buggy Test Results:');
    console.log(`  Background: ${backgroundColor}`);
    console.log(`  Placeholder: ${placeholderColor}`);
    
    // Parse RGB values for contrast calculation
    const bgMatch = backgroundColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    const plMatch = placeholderColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    
    if (bgMatch && plMatch) {
      const bgLum = (parseInt(bgMatch[1]) + parseInt(bgMatch[2]) + parseInt(bgMatch[3])) / 3;
      const plLum = (parseInt(plMatch[1]) + parseInt(plMatch[2]) + parseInt(plMatch[3])) / 3;
      const contrast = Math.abs(bgLum - plLum);
      
      console.log(`  Luminance difference: ${contrast.toFixed(2)}`);
      
      // Bug: Poor contrast (less than 80 luminance difference)
      expect(contrast).toBeLessThan(80);
    }
  });
  
  test('Fixed version has good contrast in dark mode', async ({ page }) => {
    await page.goto(`file://${fixedPagePath}`);
    
    // Enable dark mode
    await page.click('#theme-toggle');
    await page.waitForTimeout(500);
    
    const input = page.locator('#username');
    
    const backgroundColor = await input.evaluate(el => {
      return window.getComputedStyle(el).backgroundColor;
    });
    
    const placeholderColor = await input.evaluate(el => {
      const computed = window.getComputedStyle(el, '::placeholder');
      return computed.color;
    });
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/fixed-ui002-good-contrast.png',
      fullPage: true 
    });
    
    console.log('UI-002 Fixed Test Results:');
    console.log(`  Background: ${backgroundColor}`);
    console.log(`  Placeholder: ${placeholderColor}`);
    
    // Parse RGB values
    const bgMatch = backgroundColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    const plMatch = placeholderColor.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    
    if (bgMatch && plMatch) {
      const bgLum = (parseInt(bgMatch[1]) + parseInt(bgMatch[2]) + parseInt(bgMatch[3])) / 3;
      const plLum = (parseInt(plMatch[1]) + parseInt(plMatch[2]) + parseInt(plMatch[3])) / 3;
      const contrast = Math.abs(bgLum - plLum);
      
      console.log(`  Luminance difference: ${contrast.toFixed(2)}`);
      
      // Fix: Good contrast (at least 80 luminance difference)
      expect(contrast).toBeGreaterThanOrEqual(80);
    }
  });
});

test.describe('UI-003: Modal dialog does not center vertically', () => {
  test('Buggy version modal is not vertically centered', async ({ page }) => {
    await page.goto(`file://${buggyPagePath}`);
    
    // Open modal
    await page.click('#open-modal-btn');
    await page.waitForTimeout(300);
    
    const modal = page.locator('.modal');
    const modalContent = page.locator('.modal-content');
    
    // Get viewport height
    const viewportHeight = page.viewportSize()?.height || 0;
    
    // Get modal content position
    const contentBox = await modalContent.boundingBox();
    const contentY = contentBox?.y || 0;
    const contentHeight = contentBox?.height || 0;
    const contentCenter = contentY + contentHeight / 2;
    
    // Calculate viewport center
    const viewportCenter = viewportHeight / 2;
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/buggy-ui003-not-centered.png',
      fullPage: true 
    });
    
    const offset = Math.abs(contentCenter - viewportCenter);
    const isCentered = offset < 50; // 50px tolerance
    
    console.log('UI-003 Buggy Test Results:');
    console.log(`  Viewport height: ${viewportHeight}px`);
    console.log(`  Viewport center: ${viewportCenter}px`);
    console.log(`  Modal center: ${contentCenter.toFixed(2)}px`);
    console.log(`  Offset: ${offset.toFixed(2)}px`);
    console.log(`  Is centered: ${isCentered}`);
    
    // Bug: Modal not centered
    expect(isCentered).toBeFalsy();
  });
  
  test('Fixed version modal is vertically centered', async ({ page }) => {
    await page.goto(`file://${fixedPagePath}`);
    
    // Open modal
    await page.click('#open-modal-btn');
    await page.waitForTimeout(300);
    
    const modal = page.locator('.modal');
    const modalContent = page.locator('.modal-content');
    
    // Get viewport height
    const viewportHeight = page.viewportSize()?.height || 0;
    
    // Get modal content position
    const contentBox = await modalContent.boundingBox();
    const contentY = contentBox?.y || 0;
    const contentHeight = contentBox?.height || 0;
    const contentCenter = contentY + contentHeight / 2;
    
    // Calculate viewport center
    const viewportCenter = viewportHeight / 2;
    
    // Take screenshot
    await page.screenshot({ 
      path: 'test-results/screenshots/fixed-ui003-centered.png',
      fullPage: true 
    });
    
    const offset = Math.abs(contentCenter - viewportCenter);
    const isCentered = offset < 50; // 50px tolerance
    
    console.log('UI-003 Fixed Test Results:');
    console.log(`  Viewport height: ${viewportHeight}px`);
    console.log(`  Viewport center: ${viewportCenter}px`);
    console.log(`  Modal center: ${contentCenter.toFixed(2)}px`);
    console.log(`  Offset: ${offset.toFixed(2)}px`);
    console.log(`  Is centered: ${isCentered}`);
    
    // Fix: Modal centered
    expect(isCentered).toBeTruthy();
  });
});
