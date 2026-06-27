import type { LucideIcon } from "lucide-react";

export interface Service {
  readonly id: string;
  readonly index: string;
  readonly title: string;
  readonly tagline: string;
  readonly description: string;
  readonly capabilities: readonly string[];
  readonly icon: LucideIcon;
}

export type ServiceId = Service["id"];