import type * as React from "react";
import type { Metadata } from "next";

import { ContactForm } from "@/widgets/contact-form";
import { ContactInfoTabs } from "@/widgets/contact-form/ContactInfoTabs";

import { SITE } from "@/shared/constants/site";

export const metadata: Metadata = {
  title: `Contact | ${SITE.name}`,
  description: "Start a project with us or simply get in touch.",
};

export default function ContactPage(): React.JSX.Element {
  return (
    <div className="min-h-screen bg-bg flex flex-col lg:flex-row pt-20 lg:pt-0">
      {/* Left side: Dark background */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between pt-12 lg:pt-32 pb-16 px-6 md:px-12 lg:px-16 xl:px-24">
        <ContactInfoTabs />
      </div>

      {/* Right side: Surface card */}
      <div className="w-full lg:w-1/2 p-4 lg:p-6 lg:sticky lg:top-0 lg:min-h-screen flex items-center justify-center">
        <div className="w-full bg-surface/40 border border-border/50 rounded-3xl p-6 md:p-10 lg:p-12 text-text shadow-2xl relative overflow-hidden flex flex-col my-auto">
          {/* Subtle gradient overlay at top right */}
          <div className="absolute top-0 right-0 w-full h-64 bg-gradient-to-bl from-accent/10 to-transparent pointer-events-none rounded-tr-3xl" />
          
          <div className="relative z-10 flex-1 flex flex-col">
            <h2 className="text-4xl md:text-[2.75rem] font-sans font-bold tracking-tight mb-3">Get in touch</h2>
            <p className="text-muted text-lg mb-8 font-medium">We&apos;d love to hear from you and your team</p>
            
            <div className="w-full max-w-xl">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
