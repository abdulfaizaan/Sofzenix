export interface AboutMeta {
  readonly id: string;
  readonly value: string;
  readonly label: string;
  readonly numeric?: number;
  readonly suffix?: string;
  readonly prefix?: string;
}

export const ABOUT_META: readonly AboutMeta[] = [
  { id: "founded", value: "2025", label: "Founded", numeric: 2025 },
  { id: "services", value: "7", label: "Core Services", numeric: 7 },
  {
    id: "engagements",
    value: "100",
    label: "Successful Projects",
    numeric: 100,
    suffix: "+",
  },
  { id: "status", value: "Now booking", label: "Accepting new clients" },
] as const;

export interface AboutPrinciple {
  readonly id: string;
  readonly title: string;
  readonly body: string;
}

export const ABOUT_PRINCIPLES: readonly AboutPrinciple[] = [
  {
    id: "consultancy",
    title: "IT Consultancy & Development.",
    body: "Providing information technology and computer-related services, including software development, IT consultancy, and system integration.",
  },
  {
    id: "innovation",
    title: "Research & Innovation.",
    body: "We undertake research, development, design, testing, and implementation of advanced IT systems for various clients and industries.",
  },
  {
    id: "value",
    title: "Commitment to Value.",
    body: "Driven by an unwavering passion to create exceptional value for our clients, we focus on sustainable growth, sound governance, and accountability.",
  },
] as const;