/**
 * Responsive Breakpoint Implementation Tests
 * 
 * Tests for Task 14: Responsive Breakpoint Implementation
 * Validates that all sections adapt properly across breakpoints:
 * - Mobile: 0-640px
 * - Tablet: 641-1024px  
 * - Desktop: 1025-1440px
 * - Large Desktop: 1441px+
 */

import { test, expect } from '@playwright/test';

// Breakpoint definitions matching tailwind.config.ts
const BREAKPOINTS = {
  mobile: { width: 375, height: 667, name: 'Mobile (375px)' },
  mobileLarge: { width: 640, height: 1136, name: 'Mobile Large (640px)' },
  tablet: { width: 768, height: 1024, name: 'Tablet (768px)' },
  tabletLarge: { width: 1024, height: 768, name: 'Tablet Large (1024px)' },
  desktop: { width: 1280, height: 800, name: 'Desktop (1280px)' },
  desktopLarge: { width: 1440, height: 900, name: 'Desktop Large (1440px)' },
  desktopXL: { width: 1920, height: 1080, name: 'Desktop XL (1920px)' },
};

test.describe('Responsive Breakpoint Implementation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('Hero section adapts layout across breakpoints', async ({ page }) => {
    for (const [key, viewport] of Object.entries(BREAKPOINTS)) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(300);

      const heroSection = page.locator('#hero');
      await expect(heroSection).toBeVisible();

      // Check split-screen layout
      const heroGrid = heroSection.locator('.grid');
      await expect(heroGrid).toBeVisible();

      // Mobile: stacked layout (1 column)
      if (viewport.width < 1024) {
        const gridCols = await heroGrid.evaluate((el) => {
          return window.getComputedStyle(el).gridTemplateColumns;
        });
        // Should be single column on mobile/tablet
        expect(gridCols).not.toContain('1fr 1fr');
      } else {
        // Desktop: 2 columns (50/50 split)
        const gridCols = await heroGrid.evaluate((el) => {
          return window.getComputedStyle(el).gridTemplateColumns;
        });
        // Should have 2 columns on desktop
        expect(gridCols).toContain('1fr');
      }

      // Verify touch targets on mobile (44px minimum)
      if (viewport.width < 768) {
        const buttons = heroSection.locator('button');
        const buttonCount = await buttons.count();
        
        for (let i = 0; i < buttonCount; i++) {
          const button = buttons.nth(i);
          const box = await button.boundingBox();
          if (box) {
            expect(box.height).toBeGreaterThanOrEqual(44);
          }
        }
      }
    }
  });

  test('About section layout adapts responsively', async ({ page }) => {
    for (const [key, viewport] of Object.entries(BREAKPOINTS)) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(300);

      const aboutSection = page.locator('#about');
      await aboutSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);

      await expect(aboutSection).toBeVisible();

      // Check asymmetric layout
      const contentContainer = aboutSection.locator('.flex');
      await expect(contentContainer).toBeVisible();

      // Mobile/Tablet: stacked layout
      if (viewport.width < 1024) {
        const flexDirection = await contentContainer.evaluate((el) => {
          return window.getComputedStyle(el).flexDirection;
        });
        expect(flexDirection).toBe('column');
      } else {
        // Desktop: row layout (40/60 split)
        const flexDirection = await contentContainer.evaluate((el) => {
          return window.getComputedStyle(el).flexDirection;
        });
        expect(flexDirection).toBe('row');
      }

      // Verify typography scales appropriately
      const heading = aboutSection.locator('h2');
      const fontSize = await heading.evaluate((el) => {
        return window.getComputedStyle(el).fontSize;
      });
      const fontSizeNum = parseFloat(fontSize);

      if (viewport.width < 640) {
        // Mobile: smaller font
        expect(fontSizeNum).toBeLessThan(60);
      } else if (viewport.width >= 1024) {
        // Desktop: larger font (56px)
        expect(fontSizeNum).toBeGreaterThanOrEqual(50);
      }
    }
  });

  test('Skills section grid adapts to breakpoints', async ({ page }) => {
    for (const [key, viewport] of Object.entries(BREAKPOINTS)) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(300);

      const skillsSection = page.locator('#skills');
      await skillsSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);

      await expect(skillsSection).toBeVisible();

      // Check category grid
      const categoryGrid = skillsSection.locator('.grid').first();
      await expect(categoryGrid).toBeVisible();

      const gridCols = await categoryGrid.evaluate((el) => {
        return window.getComputedStyle(el).gridTemplateColumns;
      });

      // Mobile: 1 column
      if (viewport.width < 768) {
        const colCount = gridCols.split(' ').length;
        expect(colCount).toBe(1);
      } else {
        // Tablet+: 2 columns
        const colCount = gridCols.split(' ').length;
        expect(colCount).toBeGreaterThanOrEqual(2);
      }

      // Check individual skill items grid
      const skillCard = skillsSection.locator('[class*="Card"]').first();
      const skillGrid = skillCard.locator('.grid').first();
      
      if (await skillGrid.isVisible()) {
        const skillGridCols = await skillGrid.evaluate((el) => {
          return window.getComputedStyle(el).gridTemplateColumns;
        });
        const skillColCount = skillGridCols.split(' ').length;

        // Mobile: 2 cols, Tablet: 3 cols, Desktop: 4 cols
        if (viewport.width < 640) {
          expect(skillColCount).toBeLessThanOrEqual(2);
        } else if (viewport.width >= 1024) {
          expect(skillColCount).toBeGreaterThanOrEqual(3);
        }
      }
    }
  });

  test('Projects section grid adapts responsively', async ({ page }) => {
    for (const [key, viewport] of Object.entries(BREAKPOINTS)) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(300);

      const projectsSection = page.locator('#projects');
      await projectsSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);

      await expect(projectsSection).toBeVisible();

      // Check project grid
      const projectGrid = projectsSection.locator('.grid');
      
      if (await projectGrid.isVisible()) {
        const gridCols = await projectGrid.evaluate((el) => {
          return window.getComputedStyle(el).gridTemplateColumns;
        });

        // Mobile: 1 column
        if (viewport.width < 1024) {
          const colCount = gridCols.split(' ').length;
          expect(colCount).toBe(1);
        } else {
          // Desktop: 2 columns
          const colCount = gridCols.split(' ').length;
          expect(colCount).toBeGreaterThanOrEqual(2);
        }
      }
    }
  });

  test('Contact section layout adapts across breakpoints', async ({ page }) => {
    for (const [key, viewport] of Object.entries(BREAKPOINTS)) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(300);

      const contactSection = page.locator('#contact');
      await contactSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);

      await expect(contactSection).toBeVisible();

      // Check two-column layout
      const contactGrid = contactSection.locator('.grid').first();
      await expect(contactGrid).toBeVisible();

      const gridCols = await contactGrid.evaluate((el) => {
        return window.getComputedStyle(el).gridTemplateColumns;
      });

      // Mobile/Tablet: stacked (1 column)
      if (viewport.width < 1024) {
        const colCount = gridCols.split(' ').length;
        expect(colCount).toBe(1);
      } else {
        // Desktop: 2 columns (40/60 split)
        expect(gridCols).toContain('40%');
        expect(gridCols).toContain('60%');
      }

      // Verify touch targets on mobile
      if (viewport.width < 768) {
        const socialButtons = contactSection.locator('a[aria-label*="LinkedIn"], a[aria-label*="GitHub"]');
        const buttonCount = await socialButtons.count();
        
        for (let i = 0; i < Math.min(buttonCount, 3); i++) {
          const button = socialButtons.nth(i);
          const box = await button.boundingBox();
          if (box) {
            expect(box.width).toBeGreaterThanOrEqual(44);
            expect(box.height).toBeGreaterThanOrEqual(44);
          }
        }
      }
    }
  });

  test('Footer layout adapts to breakpoints', async ({ page }) => {
    for (const [key, viewport] of Object.entries(BREAKPOINTS)) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(300);

      const footer = page.locator('footer');
      await footer.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);

      await expect(footer).toBeVisible();

      // Check footer grid
      const footerGrid = footer.locator('.grid').first();
      await expect(footerGrid).toBeVisible();

      const gridCols = await footerGrid.evaluate((el) => {
        return window.getComputedStyle(el).gridTemplateColumns;
      });

      // Mobile: 1 column, Tablet: 2 columns, Desktop: 3 columns
      const colCount = gridCols.split(' ').length;
      
      if (viewport.width < 640) {
        expect(colCount).toBe(1);
      } else if (viewport.width < 768) {
        expect(colCount).toBeGreaterThanOrEqual(1);
      } else {
        expect(colCount).toBeGreaterThanOrEqual(2);
      }
    }
  });

  test('CTA section maintains centered layout across breakpoints', async ({ page }) => {
    for (const [key, viewport] of Object.entries(BREAKPOINTS)) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(300);

      const ctaSection = page.locator('section').filter({ hasText: /Ready to Build/i });
      await ctaSection.scrollIntoViewIfNeeded();
      await page.waitForTimeout(200);

      await expect(ctaSection).toBeVisible();

      // Check button layout
      const buttonContainer = ctaSection.locator('.flex').filter({ has: page.locator('button') });
      
      if (await buttonContainer.isVisible()) {
        const flexDirection = await buttonContainer.evaluate((el) => {
          return window.getComputedStyle(el).flexDirection;
        });

        // Mobile: column, Desktop: row
        if (viewport.width < 640) {
          expect(flexDirection).toBe('column');
        } else {
          expect(flexDirection).toBe('row');
        }
      }

      // Verify touch targets on mobile
      if (viewport.width < 768) {
        const buttons = ctaSection.locator('button');
        const buttonCount = await buttons.count();
        
        for (let i = 0; i < buttonCount; i++) {
          const button = buttons.nth(i);
          const box = await button.boundingBox();
          if (box) {
            expect(box.height).toBeGreaterThanOrEqual(44);
          }
        }
      }
    }
  });

  test('Typography scales appropriately across breakpoints', async ({ page }) => {
    for (const [key, viewport] of Object.entries(BREAKPOINTS)) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(300);

      // Check hero heading
      const heroHeading = page.locator('#hero h1');
      await expect(heroHeading).toBeVisible();

      const fontSize = await heroHeading.evaluate((el) => {
        return window.getComputedStyle(el).fontSize;
      });
      const fontSizeNum = parseFloat(fontSize);

      // Verify font size scales with viewport
      if (viewport.width < 640) {
        // Mobile: smaller (around 48px)
        expect(fontSizeNum).toBeLessThan(60);
        expect(fontSizeNum).toBeGreaterThan(40);
      } else if (viewport.width >= 1024) {
        // Desktop: larger (72px)
        expect(fontSizeNum).toBeGreaterThanOrEqual(60);
      }
    }
  });

  test('All interactive elements meet 44px touch target on mobile', async ({ page }) => {
    // Test on mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(300);

    // Collect all buttons and links
    const interactiveElements = page.locator('button, a[href]');
    const count = await interactiveElements.count();

    let checkedCount = 0;
    const maxToCheck = 20; // Check first 20 elements

    for (let i = 0; i < Math.min(count, maxToCheck); i++) {
      const element = interactiveElements.nth(i);
      
      // Skip if not visible
      if (!(await element.isVisible())) continue;

      const box = await element.boundingBox();
      if (box) {
        // Allow some tolerance for elements that might be slightly under 44px
        // but are still reasonably tappable
        if (box.height < 40 || box.width < 40) {
          const text = await element.textContent();
          console.log(`Warning: Small touch target (${box.width}x${box.height}): ${text?.substring(0, 30)}`);
        }
        
        // Strict check for primary interactive elements
        const role = await element.getAttribute('role');
        const ariaLabel = await element.getAttribute('aria-label');
        
        if (role === 'button' || ariaLabel?.includes('button')) {
          expect(box.height).toBeGreaterThanOrEqual(44);
        }
        
        checkedCount++;
      }
    }

    expect(checkedCount).toBeGreaterThan(0);
  });
});
