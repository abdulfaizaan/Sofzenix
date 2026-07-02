import type * as React from "react";
import type { Metadata } from "next";
import { Hero } from "@/widgets/hero";
import { Services } from "@/widgets/services";
import { ContactCta } from "@/widgets/contact-cta";
import { SITE } from "@/shared/constants/site";

export const metadata: Metadata = {
  title: `Services | ${SITE.name}`,
  description: "Discover our capabilities and how we can accelerate your digital initiatives.",
};

export default function ServicesPage(): React.JSX.Element {
  return (
    <>
      <Hero
        eyebrow="CAPABILITIES"
        lines={[
          { id: "s1", text: "DESIGNED TO", emphasis: "normal" },
          { id: "s2", text: "SCALE.", emphasis: "outline" },
          { id: "s3", text: "BUILT TO LAST.", emphasis: "accent" },
        ]}
        description="We provide end-to-end engineering and design services for ambitious companies that refuse to ship mediocrity."
        showStats={false}
        showScrollIndicator={true}
      />
      <Services />
      <ContactCta />
    </>
  );
}
