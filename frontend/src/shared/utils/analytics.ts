/**
 * Type-safe analytics event tracking utility.
 * Integrates with Plausible Analytics (and any other configured provider).
 */

type AnalyticsEvent = "form_submit" | "link_click" | "scroll_depth";

interface AnalyticsPayload {
  form_submit: { formId: string; success: boolean };
  link_click: { url: string; label: string };
  scroll_depth: { depth: number; path: string };
}

export function trackEvent<T extends AnalyticsEvent>(
  eventName: T,
  payload?: AnalyticsPayload[T]
): void {
  try {
    // Plausible Analytics tracking
    if (typeof window !== "undefined" && window.plausible) {
      window.plausible(eventName, { props: payload });
    }
    
    // Add additional providers here if needed (e.g. GA4)
  } catch (error) {
    console.error("Failed to track event:", error);
  }
}

// Ensure typescript knows about the plausible function on the window object
declare global {
  interface Window {
    plausible?: (eventName: string, options?: { props?: Record<string, any> }) => void;
  }
}
