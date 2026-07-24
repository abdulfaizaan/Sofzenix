import React from "react";

export function SkipToContent(): React.JSX.Element {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-bg focus:font-semibold focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2"
    >
      Skip to main content
    </a>
  );
}
