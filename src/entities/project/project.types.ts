export type ProjectCategory = "Web" | "Mobile" | "Platform" | "AI" | "Brand";

export interface ProjectMetric {
  readonly value: string;
  readonly label: string;
}

export interface Project {
  readonly id: string;
  readonly slug: string;
  readonly index: string;
  readonly title: string;
  readonly client: string;
  readonly year: string;
  readonly category: ProjectCategory;
  readonly summary: string;
  readonly image: {
    readonly src: string;
    readonly alt: string;
  };
  readonly metrics: readonly ProjectMetric[];
  readonly accent: "accent" | "secondary";
}

export type ProjectId = Project["id"];