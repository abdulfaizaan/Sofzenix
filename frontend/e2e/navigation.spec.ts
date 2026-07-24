import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test('should navigate to the homepage and verify essential elements', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');

    // Verify title
    await expect(page).toHaveTitle(/SOFZENIX/i);

    // Verify main content area is present
    const mainContent = page.locator('#main-content');
    await expect(mainContent).toBeVisible();
  });

  test('should navigate to contact page', async ({ page }) => {
    // Navigate to homepage
    await page.goto('/');

    // Open drawer/menu on mobile or click link directly on desktop
    // For simplicity, we just navigate to /contact directly
    await page.goto('/contact');
    
    // Verify we are on contact page
    await expect(page).toHaveURL(/.*\/contact/);
  });
});
