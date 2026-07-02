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
  { id: "l1", text: "ENGINEERING DIGITAL", emphasis: "normal" as const },
  { id: "l2", text: "SOLUTIONS.", emphasis: "accent" as const },
  { id: "l3", text: "SHAPING FUTURES.", emphasis: "outline" as const },
];

export default function HomePage(): JSX.Element {
  return (
    <>
      <Hero
        eyebrow="SOFZENIX · Studio · Est. 2021"
        lines={HERO_LINES}
        description="SOFZENIX designs and engineers premium digital products — web, mobile, and cloud — for ambitious companies that refuse to ship mediocrity."
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