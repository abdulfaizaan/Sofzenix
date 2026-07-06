import type * as React from "react";
import Link from "next/link";
import { Container } from "@/shared/components/ui/Container";
import { NAV_LINKS } from "@/shared/constants/nav";
import { SITE } from "@/shared/constants/site";

export function Footer(): React.JSX.Element {
  const year = 2026; // Hardcoded to avoid SSR mismatch with client

  return (
    <footer className="border-t border-border bg-bg">
      <Container>
        <div className="grid gap-12 py-20 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="font-display text-2xl font-semibold tracking-tight">
              {SITE.shortName}
            </Link>
            <p className="mt-4 max-w-sm text-muted">{SITE.description}</p>
          </div>

          <div className="md:col-span-3">
            <div role="heading" aria-level={2} className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
              Navigation
            </div>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body text-text transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div role="heading" aria-level={2} className="text-sm font-medium uppercase tracking-[0.2em] text-muted">
              Contact
            </div>
            <ul className="mt-4 space-y-3 text-body">
              <li>
                <span className="hover:text-accent transition-colors cursor-pointer text-text">
                  {SITE.email}
                </span>
              </li>
              <li className="text-muted">
                {SITE.address.city}, {SITE.address.country}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-border py-6 text-small text-muted md:flex-row md:items-center">
          <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
            <span>
              © {year} {SITE.name}. All rights reserved.
            </span>
            <Link href="/privacy-policy" className="hover:text-accent transition-colors">
              Privacy Policy & Terms
            </Link>
          </div>
          <span>Engineered with intent.</span>
        </div>
      </Container>
    </footer>
  );
}