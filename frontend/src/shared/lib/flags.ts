import { flag } from '@vercel/flags/next';

// Feature flag for the AI Chatbot
export const showChatbot = flag({
  key: 'showChatbot',
  async decide() {
    // We can conditionally check process.env or edge config here
    // For now, enabled if EDGE_CONFIG exists or in local dev
    return process.env.NODE_ENV !== 'production' || !!process.env.EDGE_CONFIG;
  },
  defaultValue: true,
});

// Feature flag for Theme Customizer
export const showThemeCustomizer = flag({
  key: 'showThemeCustomizer',
  async decide() {
    return true;
  },
  defaultValue: true,
});

// Feature flag for Advanced Search
export const showAdvancedSearch = flag({
  key: 'showAdvancedSearch',
  async decide() {
    return true;
  },
  defaultValue: true,
});
