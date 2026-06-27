import { Compass, PenTool, Code2, CloudCog } from "lucide-react";
import type { Service } from "./service.types";

export const SERVICES: readonly Service[] = [
  {
    id: "strategy",
    index: "01",
    title: "Strategy",
    tagline: "Find the problem worth solving.",
    description:
      "Discovery, market research, opportunity sizing, and roadmap design. We help leadership teams de-risk bets before a single pixel is drawn.",
    capabilities: [
      "Discovery Sprints",
      "Product Strategy",
      "Roadmap Architecture",
      "GTM Planning",
    ],
    icon: Compass,
  },
  {
    id: "design",
    index: "02",
    title: "Design",
    tagline: "Interfaces that feel inevitable.",
    description:
      "Brand systems, product UI, motion language, and design ops. We ship design systems that engineers actually adopt.",
    capabilities: [
      "Brand Identity",
      "Product Design",
      "Design Systems",
      "Motion & Prototyping",
    ],
    icon: PenTool,
  },
  {
    id: "engineering",
    index: "03",
    title: "Engineering",
    tagline: "Production code, not demos.",
    description:
      "Full-stack web, native mobile, and applied AI. We build software that runs in the real world — observability, testing, and operability baked in.",
    capabilities: ["Web Platforms", "Mobile Apps", "Applied AI", "Platform Modernization"],
    icon: Code2,
  },
  {
    id: "cloud",
    index: "04",
    title: "Cloud & Reliability",
    tagline: "Boring infrastructure on purpose.",
    description:
      "Cloud architecture, CI/CD, observability, and 24/7 reliability. We make sure the product you launch is the product you keep.",
    capabilities: [
      "Cloud Architecture",
      "DevSecOps",
      "SRE & Observability",
      "Cost Optimization",
    ],
    icon: CloudCog,
  },
] as const;