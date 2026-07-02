export interface Stat {
  readonly id: string;
  readonly value: string;
  readonly label: string;
  readonly tone?: "default" | "accent";
}

export const STATS: readonly Stat[] = [
  { id: "projects", value: "120+", label: "Products shipped", tone: "accent" },
  { id: "clients", value: "40", label: "Global clients" },
  { id: "uptime", value: "99.99%", label: "Avg. platform uptime" },
  { id: "team", value: "32", label: "Engineers & designers" },
] as const;