import type { Project } from "./project.types";

/**
 * Curated portfolio. Image URLs use the Unsplash allow-list from next.config.
 * Swap with proprietary assets when case studies launch.
 */
export const PROJECTS: readonly Project[] = [
  {
    id: "northwind",
    slug: "northwind",
    index: "01",
    title: "Northwind Banking",
    client: "Northwind Financial",
    year: "2025",
    category: "Platform",
    summary:
      "A consumer banking platform rebuilt for scale. Migrated 3.2M users off legacy mainframe with zero downtime and cut page loads by 68%.",
    image: {
      src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1600&q=80",
      alt: "A dashboard interface rendered in cool blue tones.",
    },
    metrics: [
      { value: "3.2M", label: "Users migrated" },
      { value: "68%", label: "Faster loads" },
      { value: "0", label: "Downtime minutes" },
    ],
    accent: "accent",
  },
  {
    id: "helios",
    slug: "helios",
    index: "02",
    title: "Helios Energy OS",
    client: "Helios Renewables",
    year: "2025",
    category: "Web",
    summary:
      "An operations console for a distributed solar fleet. Real-time telemetry, predictive maintenance, and a design system engineers actually enjoy using.",
    image: {
      src: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1600&q=80",
      alt: "Solar panels under a clear sky.",
    },
    metrics: [
      { value: "1.4M", label: "Devices connected" },
      { value: "12s", label: "Telemetry latency" },
      { value: "4.9★", label: "Engineer NPS" },
    ],
    accent: "secondary",
  },
  {
    id: "aurora",
    slug: "aurora",
    index: "03",
    title: "Aurora Health Companion",
    client: "Aurora Therapeutics",
    year: "2024",
    category: "AI",
    summary:
      "An AI-powered care companion that turns complex regimens into clear daily guidance. HIPAA-grade architecture, clinician-reviewed tone.",
    image: {
      src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=1600&q=80",
      alt: "A clinician reviewing data on a tablet.",
    },
    metrics: [
      { value: "82%", label: "Adherence lift" },
      { value: "1.1M", label: "Active patients" },
      { value: "100%", label: "HIPAA compliant" },
    ],
    accent: "accent",
  },
  {
    id: "meridian",
    slug: "meridian",
    index: "04",
    title: "Meridian Logistics",
    client: "Meridian Freight",
    year: "2024",
    category: "Mobile",
    summary:
      "Native iOS and Android apps for last-mile drivers. Offline-first routing, signature capture, and instant dispatch.",
    image: {
      src: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=1600&q=80",
      alt: "A logistics yard at dusk.",
    },
    metrics: [
      { value: "47%", label: "Fewer missed ETAs" },
      { value: "60K", label: "Daily active drivers" },
      { value: "4.8★", label: "App store rating" },
    ],
    accent: "secondary",
  },
] as const;