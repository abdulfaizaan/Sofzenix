import type * as React from "react";
import type { Metadata } from "next";
import { Hero } from "@/widgets/hero";
import { Services } from "@/widgets/services";
import { Portfolio } from "@/widgets/portfolio";
import { About } from "@/widgets/about";
import { ContactCta } from "@/widgets/contact-cta";
import { SITE } from "@/shared/constants/site";

export const metadata: Metadata = {
  title: "Engineering Digital Excellence",
  description: SITE.description,
};

const HERO_LINES = [
  { id: "l1", text: "YOUR VISION,", emphasis: "normal" as const },
  { id: "l2", text: "OUR CODE.", emphasis: "accent" as const },
];

export default function HomePage(): React.JSX.Element {
  return (
    <>
      <Hero
        eyebrow="Sofzenix IT Solutions LLP"
        lines={HERO_LINES}
        description="We build modern web, mobile, and marketing solutions for your brand. Grow your business with our tailored digital systems."
        primaryCta={{ label: "Start a project", href: "/contact" }}
        secondaryCta={{ label: "See our work", href: "/work" }}
        showStats
        showScrollIndicator
      />

      <Services />

      <Portfolio />

      <About />

      <ContactCta />
    </>
  );
}