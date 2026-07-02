import type { Project } from "./project.types";

/**
 * Curated portfolio. Image URLs use the Unsplash allow-list from next.config.
 * Swap with proprietary assets when case studies launch.
 */
export const PROJECTS: readonly Project[] = [
  {
    id: "sf-cloud",
    slug: "sf-cloud",
    index: "01",
    title: "Apex Logistics ERP",
    client: "Apex Freight Corp",
    year: "2025",
    category: "Salesforce",
    summary:
      "A complete Salesforce Cloud implementation uniting 4 disjointed logistics systems. Reduced quote turnaround time by 60% and improved lead conversion by 30%.",
    image: {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80",
      alt: "A logistics dashboard interface rendered in cool blue tones.",
    },
    metrics: [
      { value: "4", label: "Systems unified" },
      { value: "60%", label: "Faster quotes" },
      { value: "30%", label: "Conversion lift" },
    ],
    accent: "accent",
  },
  {
    id: "ai-auto",
    slug: "ai-auto",
    index: "02",
    title: "OmniHealth Companion",
    client: "OmniHealth Network",
    year: "2024",
    category: "AI & Automation",
    summary:
      "An AI-powered care companion that automates patient triage and schedules appointments. Deployed with strict HIPAA compliance.",
    image: {
      src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80",
      alt: "A clinician reviewing data on a tablet.",
    },
    metrics: [
      { value: "40%", label: "Reduced admin hours" },
      { value: "1.2M", label: "Active patients" },
      { value: "100%", label: "HIPAA compliant" },
    ],
    accent: "secondary",
  },
  {
    id: "mobile-fin",
    slug: "mobile-fin",
    index: "03",
    title: "Nexus PayApp",
    client: "Nexus Financial",
    year: "2024",
    category: "Mobile",
    summary:
      "A cross-platform native mobile application built for Gen-Z banking. Handled high-throughput microtransactions with zero drops.",
    image: {
      src: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1600&q=80",
      alt: "Mobile phone showing banking application.",
    },
    metrics: [
      { value: "85%", label: "Engagement lift" },
      { value: "500K", label: "Downloads in Q1" },
      { value: "4.9★", label: "App store rating" },
    ],
    accent: "accent",
  },
  {
    id: "web-corp",
    slug: "web-corp",
    index: "04",
    title: "Lumina Energy Portal",
    client: "Lumina Renewables",
    year: "2023",
    category: "Web Platform",
    summary:
      "A scalable corporate web platform replacing a monolithic legacy system. Beautiful UI/UX design resulting in a seamless customer journey.",
    image: {
      src: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80",
      alt: "Solar panels under a clear sky.",
    },
    metrics: [
      { value: "12s", label: "Faster load times" },
      { value: "3x", label: "Lead generation" },
      { value: "100%", label: "Uptime" },
    ],
    accent: "secondary",
  },
] as const;