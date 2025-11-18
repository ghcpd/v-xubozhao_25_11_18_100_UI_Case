// Playwright UI Tests for Bug Detection

const { test, expect } = require('@playwright/test');

// Test configuration
const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';
const VERSION = process.env.VERSION || 'buggy'; // 'buggy' or 'fixed'

test.describe('UI Bug Detection Tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/${VERSION}/index.html`);
  });

  test('UI-001: Button should not overlap title on small viewports (< 400px)', async ({ page }) => {
    // Set viewport to trigger the bug - use smaller width to ensure layout issues
    await page.setViewportSize({ width: 320, height: 800 });
    await page.waitForTimeout(200); // Wait for layout to settle
    
    const title = page.locator('.title');
    const button = page.locator('.action-button');
    const header = page.locator('header');
    
    // Wait for elements to be visible
    await title.waitFor({ state: 'visible' });
    await button.waitFor({ state: 'visible' });
    
    // Get bounding boxes and viewport
    const titleBox = await title.boundingBox();
    const buttonBox = await button.boundingBox();
    const viewportSize = page.viewportSize();
    
    // Check if button overlaps with title OR if layout is broken (title/button extends beyond viewport)
    // Overlap occurs if they're on the same row (similar Y positions) 
    // AND button starts before title ends (horizontal overlap)
    const sameRow = Math.abs(titleBox.y - buttonBox.y) < 30; // Within 30px vertically
    const horizontalOverlap = buttonBox.x < (titleBox.x + titleBox.width) && 
                              buttonBox.x + buttonBox.width > titleBox.x;
    const overlap = sameRow && horizontalOverlap;
    
    // Also check if content extends beyond viewport (layout bug)
    const titleOverflows = (titleBox.x + titleBox.width) > viewportSize.width;
    const buttonOffScreen = buttonBox.x > viewportSize.width || (buttonBox.x + buttonBox.width) > viewportSize.width;
    const layoutBroken = titleOverflows || buttonOffScreen;
    
    if (VERSION === 'buggy') {
      // In buggy version, we expect layout issues on small screens:
      // - Title overflows viewport, OR
      // - Button is pushed off-screen, OR  
      // - Actual overlap occurs
      console.log(`Testing UI-001: Viewport: ${viewportSize.width}px, Title: ${titleBox.width.toFixed(0)}px at x=${titleBox.x.toFixed(0)}, Button: ${buttonBox.width.toFixed(0)}px at x=${buttonBox.x.toFixed(0)}`);
      console.log(`Title overflows: ${titleOverflows}, Button off-screen: ${buttonOffScreen}, Overlap: ${overlap}`);
      
      // The bug is that layout breaks on small screens - either overlap or content extends beyond viewport
      const hasLayoutBug = overlap || layoutBroken;
      expect(hasLayoutBug).toBe(true);
      console.log(`❌ UI-001 BUG DETECTED: Layout breaks on small viewport (overlap: ${overlap}, overflow: ${layoutBroken})`);
    } else {
      // In fixed version, no overlap should occur and content should fit within viewport
      expect(overlap).toBe(false);
      expect(layoutBroken).toBe(false);
      console.log(`✅ UI-001 FIXED: Layout works correctly on small viewport`);
    }
  });

  test('UI-002: Placeholder text should be readable in dark mode', async ({ page }) => {
    // Enable dark mode
    await page.evaluate(() => {
      document.body.classList.add('dark-mode');
    });
    
    const input = page.locator('#userInput');
    await input.waitFor({ state: 'visible' });
    
    // Get computed styles
    const placeholderColor = await page.evaluate((el) => {
      const style = window.getComputedStyle(el, '::placeholder');
      return style.color;
    }, await input.elementHandle());
    
    // Parse RGB color
    const rgbMatch = placeholderColor.match(/\d+/g);
    const brightness = rgbMatch ? 
      (parseInt(rgbMatch[0]) + parseInt(rgbMatch[1]) + parseInt(rgbMatch[2])) / 3 : 0;
    
    // In dark mode, placeholder should be optimized for better contrast
    // Buggy version uses #999 (brightness 153) which is the same in light and dark mode
    // Fixed version should use a lighter color in dark mode for better readability
    if (VERSION === 'buggy') {
      // Bug: placeholder color is not optimized for dark mode
      // It uses the same color (#999) in both modes, which may not have optimal contrast
      // The brightness should be higher in dark mode (lighter color) but isn't
      console.log(`❌ UI-002 BUG DETECTED: Placeholder color brightness: ${brightness.toFixed(2)} (not optimized for dark mode)`);
      // Check that it's using the default color (not a dark-mode-specific lighter color)
      // #999 has brightness 153, but for dark mode it should be lighter (brightness > 180)
      expect(brightness).toBeLessThan(180); // Should be lighter in dark mode but isn't
    } else {
      // In fixed version, placeholder should be readable
      const isReadable = brightness > 100;
      console.log(`✅ UI-002 FIXED: Placeholder color brightness: ${brightness.toFixed(2)}`);
      expect(isReadable).toBe(true);
    }
  });

  test('UI-003: Modal should be centered vertically', async ({ page }) => {
    // Open modal
    await page.click('#openModal');
    await page.waitForSelector('.modal.show', { state: 'visible' });
    
    const modal = page.locator('.modal');
    const modalContent = page.locator('.modal-content');
    
    // Get viewport and modal dimensions
    const viewportSize = page.viewportSize();
    const modalBox = await modal.boundingBox();
    const contentBox = await modalContent.boundingBox();
    
    // Calculate vertical center
    const viewportCenterY = viewportSize.height / 2;
    const contentCenterY = contentBox.y + (contentBox.height / 2);
    
    // Check if modal content is centered (within 50px tolerance)
    const verticalOffset = Math.abs(viewportCenterY - contentCenterY);
    
    if (VERSION === 'buggy') {
      // In buggy version, modal is not centered (using 15% margin)
      console.log(`❌ UI-003 BUG DETECTED: Modal vertical offset: ${verticalOffset.toFixed(2)}px`);
      expect(verticalOffset).toBeGreaterThan(50);
    } else {
      // In fixed version, modal should be centered
      console.log(`✅ UI-003 FIXED: Modal vertical offset: ${verticalOffset.toFixed(2)}px`);
      expect(verticalOffset).toBeLessThan(50);
    }
  });

  test('Accessibility: Check color contrast', async ({ page }) => {
    const input = page.locator('#userInput');
    
    // Test in both light and dark mode
    for (const mode of ['light', 'dark']) {
      if (mode === 'dark') {
        await page.evaluate(() => {
          document.body.classList.add('dark-mode');
        });
      } else {
        await page.evaluate(() => {
          document.body.classList.remove('dark-mode');
        });
      }
      
      await page.waitForTimeout(100);
      
      const bgColor = await page.evaluate((el) => {
        return window.getComputedStyle(el).backgroundColor;
      }, await input.elementHandle());
      
      const textColor = await page.evaluate((el) => {
        return window.getComputedStyle(el).color;
      }, await input.elementHandle());
      
      console.log(`${mode} mode - Background: ${bgColor}, Text: ${textColor}`);
    }
  });
});

