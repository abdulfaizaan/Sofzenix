import { test, expect } from '@playwright/test';

test('homepage renders correctly', async ({ page }) => {
  // Navigate to the homepage
  await page.goto('/');

  // Check if the title is correct (adjust to your actual site title)
  await expect(page).toHaveTitle(/SOFZENIX/i);

  // Check if the main heading is visible
  const heading = page.locator('h1').first();
  await expect(heading).toBeVisible();
});

test('chatbot widget is accessible', async ({ page }) => {
  await page.goto('/');
  
  // Look for the chatbot trigger button (adjust selector if needed)
  // Assuming the ChatbotWidget has a button with aria-label="Open chat" or similar text
  // We'll just check if the Chatbot container is mounted
  const chatWidget = page.locator('.chatbot-widget-container, button[aria-label*="chat" i], button:has-text("Chat")').first();
  
  // It might not be visible immediately due to animations or feature flags,
  // but it should be attached to the DOM if enabled.
  await expect(chatWidget).toBeAttached({ timeout: 10000 });
});
