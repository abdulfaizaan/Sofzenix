import type * as React from "react";
import type { Metadata } from "next";
import { Hero } from "@/widgets/hero";
import { About } from "@/widgets/about";
import { ContactCta } from "@/widgets/contact-cta";
import { SITE } from "@/shared/constants/site";

export const metadata: Metadata = {
  title: `About Us | ${SITE.name}`,
  description: "Learn more about our mission, vision, and the team engineering digital excellence.",
};

export default function AboutPage(): React.JSX.Element {
  return (
    <>
      <Hero
        eyebrow="ABOUT US"
        lines={[
          { id: "a1", text: "ENGINEERING", emphasis: "normal" },
          { id: "a2", text: "DIGITAL", emphasis: "outline" },
          { id: "a3", text: "EXCELLENCE.", emphasis: "accent" },
        ]}
        description="We are a collective of engineers, designers, and strategists dedicated to pushing the boundaries of what's possible on the web."
        showStats={false}
        showScrollIndicator={true}
      />
      <About />
      <ContactCta />
    </>
  );
}
