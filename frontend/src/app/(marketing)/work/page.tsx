import type * as React from "react";
import type { Metadata } from "next";
import { Hero } from "@/widgets/hero";
import { Portfolio } from "@/widgets/portfolio";
import { ContactCta } from "@/widgets/contact-cta";
import { SITE } from "@/shared/constants/site";

export const metadata: Metadata = {
  title: `Our Work | ${SITE.name}`,
  description: "Explore our portfolio of premium digital products and case studies.",
};

export default function WorkPage(): React.JSX.Element {
  return (
    <>
      <Hero
        eyebrow="SELECTED WORK"
        lines={[
          { id: "w1", text: "PRODUCTS THAT", emphasis: "normal" },
          { id: "w2", text: "EARN THEIR", emphasis: "outline" },
          { id: "w3", text: "PLACE.", emphasis: "accent" },
        ]}
        description="A curated selection of our recent collaborations across fintech, climate, health, and logistics. Each project ships with measurable outcomes."
        showStats={false}
        showScrollIndicator={true}
      />
      <Portfolio />
      <ContactCta />
    </>
  );
}
