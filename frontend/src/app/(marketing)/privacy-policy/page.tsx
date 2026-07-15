import type * as React from "react";
import type { Metadata } from "next";
import { Container } from "@/shared/components/ui/Container";
import { SITE } from "@/shared/constants/site";
import { Mail } from "lucide-react";
import { PrintButton } from "./PrintButton";

export const metadata: Metadata = {
  title: `Privacy Policy | ${SITE.name}`,
  description: "Clear, readable, and transparent privacy policy without the legal jargon.",
};

export default function PrivacyPolicyPage(): React.JSX.Element {
  const sections = [
    { id: "at-a-glance", title: "At a Glance" },
    { id: "data-collection", title: "1. Information We Collect" },
    { id: "data-use", title: "2. How We Use Information" },
    { id: "data-sharing", title: "3. Information Sharing" },
    { id: "user-rights", title: "4. Your Rights & Choices" },
    { id: "contact", title: "5. Contact Us" },
  ];

  return (
    <div className="pt-32 pb-24">
      <Container size="default">
        <header className="mb-16 border-b border-border pb-8">
          <h1 className="text-h2 font-display font-semibold tracking-tight text-text">
            Privacy Policy
          </h1>
          <p className="mt-4 text-lg text-muted max-w-2xl">
            We believe your data belongs to you. This policy explains in clear terms how we handle your personal information, what we collect, and how you can control it. No hidden clauses, no dark patterns.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <PrintButton />
            <a href={`mailto:${SITE.email}`} className="flex items-center gap-2 px-4 py-2 bg-surface border border-border rounded-lg text-text hover:bg-border transition-colors text-sm font-medium">
              <Mail className="w-4 h-4" />
              Contact Privacy Team
            </a>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Sticky Sidebar Navigation */}
          <aside className="lg:col-span-3 lg:sticky lg:top-32 hidden lg:block">
            <nav aria-label="Table of Contents">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted mb-4">Table of Contents</h2>
              <ul className="space-y-3">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a href={`#${section.id}`} className="text-base text-text/70 hover:text-accent transition-colors block">
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-16 text-lg text-text/90 leading-relaxed max-w-3xl">
            
            {/* At a Glance Section */}
            <section id="at-a-glance" className="bg-surface border border-border rounded-xl p-8 scroll-mt-32">
              <h2 className="text-2xl font-semibold text-text mb-6">Privacy at a Glance</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-medium text-text mb-4 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-success"></span> What we do
                  </h3>
                  <ul className="space-y-3 text-base text-muted list-disc pl-5">
                    <li>Only collect data we absolutely need to provide our services.</li>
                    <li>Protect your data with industry-standard security protocols.</li>
                    <li>Delete your personal data upon your request.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-text mb-4 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> What we don&apos;t do
                  </h3>
                  <ul className="space-y-3 text-base text-muted list-disc pl-5">
                    <li>We never sell your personal data to advertisers.</li>
                    <li>We don&apos;t use dark patterns or pre-ticked consent boxes.</li>
                    <li>We don&apos;t share data with third parties without your explicit consent.</li>
                  </ul>
                </div>
              </div>
            </section>

            <section id="data-collection" className="scroll-mt-32">
              <h2 className="text-2xl font-semibold text-text mb-4">1. Information We Collect</h2>
              <p className="mb-4">
                We are committed to data minimization. We only collect the personal data that is strictly necessary to provide our services. This may include:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-text">Contact Information:</strong> Such as your name, email address, and phone number when you fill out our contact form or subscribe to our newsletter.</li>
                <li><strong className="text-text">Usage Data:</strong> Basic, anonymized telemetry on how you interact with our website to help us improve the user experience.</li>
              </ul>
            </section>

            <section id="data-use" className="scroll-mt-32">
              <h2 className="text-2xl font-semibold text-text mb-4">2. How We Use Information</h2>
              <p className="mb-4">
                Your data is exclusively used for the purposes you intended when providing it. Specifically:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To respond to your inquiries and support requests efficiently.</li>
                <li>To deliver our services and maintain the core functionality of our website.</li>
                <li>To communicate important updates, security alerts, or administrative notices.</li>
              </ul>
              <p className="mt-4">
                We do not use your information for automated decision-making or intrusive profiling.
              </p>
            </section>

            <section id="data-sharing" className="scroll-mt-32">
              <h2 className="text-2xl font-semibold text-text mb-4">3. Information Sharing</h2>
              <p className="mb-4">
                We do not sell, rent, or monetize your personal data. We only share information in the following limited circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-text">Service Providers:</strong> Trusted third-party vendors (like hosting providers and email delivery services) who operate under strict confidentiality agreements.</li>
                <li><strong className="text-text">Legal Requirements:</strong> When mandated by applicable law, regulation, or valid legal process.</li>
              </ul>
            </section>

            <section id="user-rights" className="scroll-mt-32">
              <h2 className="text-2xl font-semibold text-text mb-4">4. Your Rights & Choices</h2>
              <p className="mb-4">
                You retain full control over your personal data at all times. You have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong className="text-text">Access:</strong> Request a complete copy of the personal data we hold about you.</li>
                <li><strong className="text-text">Correction:</strong> Ask us to update or correct inaccurate or incomplete data.</li>
                <li><strong className="text-text">Deletion (Right to be Forgotten):</strong> Request the complete removal of your data from our systems.</li>
                <li><strong className="text-text">Opt-Out:</strong> Withdraw your consent for any optional data processing at any time, easily and without penalty.</li>
              </ul>
            </section>

            <section id="contact" className="scroll-mt-32">
              <h2 className="text-2xl font-semibold text-text mb-4">5. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about this Privacy Policy, your rights, or our data practices, please reach out to our dedicated privacy team.
              </p>
              <div className="bg-surface border border-border rounded-xl p-6 mt-6">
                <h3 className="font-semibold text-text text-xl mb-4">{SITE.name}</h3>
                <div className="space-y-3">
                  <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <span className="text-muted w-20">Email:</span>
                    <a href={`mailto:${SITE.email}`} className="text-accent hover:underline font-medium">
                      {SITE.email}
                    </a>
                  </p>
                  <p className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4">
                    <span className="text-muted w-20">Phone:</span>
                    <span className="text-text">{SITE.phone}</span>
                  </p>
                  <p className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-4">
                    <span className="text-muted w-20">Address:</span>
                    <span className="text-text">
                      {SITE.address.city}, {SITE.address.country}
                    </span>
                  </p>
                </div>
              </div>
            </section>

          </main>
        </div>
      </Container>
    </div>
  );
}
