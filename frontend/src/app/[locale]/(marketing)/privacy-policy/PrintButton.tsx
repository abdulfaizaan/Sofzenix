"use client";

import { Printer } from "lucide-react";
import type * as React from "react";

export function PrintButton(): React.JSX.Element {
  return (
    <button 
      onClick={() => window.print()} 
      className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-text hover:bg-border transition-colors text-sm font-medium"
    >
      <Printer className="w-4 h-4" />
      Print Policy
    </button>
  );
}
