import type { ReactNode } from "react";

export interface HeroLine {
  readonly id: string;
  readonly text: ReactNode;
  readonly emphasis?: "normal" | "accent" | "outline";
}

export interface HeroCta {
  readonly label: string;
  readonly href: string;
  readonly external?: boolean;
}

export interface HeroProps {
  readonly eyebrow?: string;
  readonly lines: readonly HeroLine[];
  readonly description?: string;
  readonly primaryCta?: HeroCta;
  readonly secondaryCta?: HeroCta;
  readonly showStats?: boolean;
  readonly showScrollIndicator?: boolean;
}