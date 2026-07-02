"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Container } from "@/shared/components/ui/Container";
import { NAV_LINKS } from "@/shared/constants/nav";
import { SITE } from "@/shared/constants/site";
import { Magnetic } from "@/shared/components/effects/Magnetic";
import { cn } from "@/shared/utils/cn";
import styles from "./Navbar.module.css";

/**
 * The interactive Navbar.
 * Single client island — everything else in the layout stays server-rendered.
 */
export function NavbarMenu(): React.JSX.Element {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = (): void => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <header className={styles.root} data-scrolled={scrolled}>
      <Container>
        <div className={styles.inner}>
          <Magnetic strength={0.2} range={80}>
            <Link href="/" className={styles.logo} aria-label={`${SITE.name} home`}>
              <span className={styles.logoMark} aria-hidden="true">
                S
              </span>
              <span>{SITE.shortName}</span>
            </Link>
          </Magnetic>

          <nav className={styles.links} aria-label="Primary">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={styles.link}
                  data-active={active}
                  aria-current={active ? "page" : undefined}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className={styles.actions}>
            <Magnetic strength={0.25} range={70}>
              <Link
                href="/contact"
                className={cn(
                  "hidden h-10 items-center justify-center rounded-md border border-border px-4 text-small text-text transition-colors hover:border-text md:inline-flex",
                )}
              >
                Start a project
              </Link>
            </Magnetic>

            <button
              type="button"
              className={cn(styles.toggle, "md:hidden")}
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen((v) => !v)}
            >
              <span aria-hidden="true">{drawerOpen ? "✕" : "☰"}</span>
            </button>
          </div>
        </div>
      </Container>

      {drawerOpen && (
        <div className={styles.drawer} role="dialog" aria-modal="true">
          <nav aria-label="Mobile primary">
            <ul className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-h3 font-display text-text"
                    onClick={() => setDrawerOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/contact"
                  className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-6 text-text"
                  onClick={() => setDrawerOpen(false)}
                >
                  Start a project
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}