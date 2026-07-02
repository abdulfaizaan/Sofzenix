import type * as React from "react";
import type { Metadata } from "next";
import { Hero } from "@/widgets/hero";
import { ContactForm } from "@/widgets/contact-form";
import { Container } from "@/shared/components/ui/Container";
import { Section } from "@/shared/components/ui/Section";
import { Heading } from "@/shared/components/ui/Heading";
import { SITE } from "@/shared/constants/site";

export const metadata: Metadata = {
  title: `Contact | ${SITE.name}`,
  description: "Start a project with us or simply get in touch.",
};

export default function ContactPage(): React.JSX.Element {
  return (
    <>
      <Hero
        eyebrow="GET IN TOUCH"
        lines={[
          { id: "c1", text: "LET'S BUILD", emphasis: "normal" },
          { id: "c2", text: "SOMETHING", emphasis: "outline" },
          { id: "c3", text: "GREAT.", emphasis: "accent" },
        ]}
        description="Whether you have a specific project in mind or just want to explore possibilities, we're ready to listen."
        showStats={false}
        showScrollIndicator={true}
      />
      <Section spacing="loose" tone="surface">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 space-y-8">
              <div>
                <Heading level="h3">Reach Out</Heading>
                <p className="text-muted mt-4 text-lg">
                  Fill out the form and our team will get back to you within 24 hours to schedule an introductory call.
                </p>
              </div>
              <div className="space-y-4 pt-8 border-t border-border">
                <div>
                  <span className="block text-small font-medium text-muted uppercase tracking-wider mb-1">Email</span>
                  <a href={`mailto:${SITE.email}`} className="text-xl hover:text-accent transition-colors">{SITE.email}</a>
                </div>
                <div>
                  <span className="block text-small font-medium text-muted uppercase tracking-wider mb-1">Office</span>
                  <address className="not-italic text-lg text-muted">
                    {SITE.address.city}, {SITE.address.country}
                  </address>
                </div>
              </div>
            </div>
            <div className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
