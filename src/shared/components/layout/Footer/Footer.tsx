import Link from "next/link";
import { Container } from "@/shared/components/ui/Container";
import { NAV_LINKS } from "@/shared/constants/nav";
import { SITE } from "@/shared/constants/site";

export function Footer(): JSX.Element {
  const year = new Date().getFullYear();

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
            <h3 className="text-small font-medium uppercase tracking-widest text-muted">
              Navigation
            </h3>
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
            <h3 className="text-small font-medium uppercase tracking-widest text-muted">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-body">
              <li>
                <a className="hover:text-accent" href={`mailto:${SITE.email}`}>
                  {SITE.email}
                </a>
              </li>
              <li className="text-muted">
                {SITE.address.city}, {SITE.address.country}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-4 border-t border-border py-6 text-small text-muted md:flex-row md:items-center">
          <span>
            © {year} {SITE.name}. All rights reserved.
          </span>
          <span>Engineered with intent.</span>
        </div>
      </Container>
    </footer>
  );
}