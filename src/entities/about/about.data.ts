export interface AboutMeta {
  readonly id: string;
  readonly value: string;
  readonly label: string;
  readonly numeric?: number;
  readonly suffix?: string;
  readonly prefix?: string;
}

export const ABOUT_META: readonly AboutMeta[] = [
  { id: "founded", value: "2021", label: "Founded", numeric: 2021 },
  { id: "team", value: "32", label: "Engineers & designers", numeric: 32 },
  {
    id: "engagements",
    value: "120",
    label: "Engagements delivered",
    numeric: 120,
    suffix: "+",
  },
  { id: "status", value: "Now booking", label: "Q3 2026 availability" },
] as const;

export interface AboutPrinciple {
  readonly id: string;
  readonly title: string;
  readonly body: string;
}

export const ABOUT_PRINCIPLES: readonly AboutPrinciple[] = [
  {
    id: "engineering",
    title: "Engineering first.",
    body: "We treat design and code as a single craft. Beautiful interfaces that don't ship are props, not products.",
  },
  {
    id: "evidence",
    title: "Evidence over opinion.",
    body: "Every decision is reversible until it isn't. We measure, we instrument, we learn out loud.",
  },
  {
    id: "longevity",
    title: "Built to be operated.",
    body: "We design for the team that inherits the code after us. Clarity, observability, and discipline outlast trends.",
  },
] as const;