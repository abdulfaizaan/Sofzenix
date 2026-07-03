"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Container } from "@/shared/components/ui/Container";
import { NAV_LINKS } from "@/shared/constants/nav";
import { SITE } from "@/shared/constants/site";
import { Magnetic } from "@/shared/components/effects/Magnetic";
import { cn } from "@/shared/utils/cn";
import { gsap } from "@/shared/lib/gsap/registerPlugins";
import { EASE } from "@/shared/lib/gsap/easings";
import styles from "./Navbar.module.css";

export function NavbarMenu(): React.JSX.Element {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  
  const rootRef = useRef<HTMLElement>(null);
  const drawerRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const onScroll = (): void => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Set up the GSAP timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap.timeline({ paused: true })
        .to(drawerRef.current, {
          autoAlpha: 1, // Handles visibility and opacity automatically
          duration: 0.6,
          ease: EASE.outExpo,
        })
        .from(
          "[data-drawer-link]",
          {
            yPercent: 120,
            duration: 0.8,
            stagger: 0.08,
            ease: EASE.outExpo,
          },
          "-=0.4"
        )
        .from(
          "[data-drawer-footer]",
          {
            opacity: 0,
            y: 20,
            duration: 0.6,
            ease: EASE.outExpo,
          },
          "-=0.6"
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  // Play/Reverse timeline on drawerOpen change
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
      tl.current?.play();
    } else {
      document.body.style.overflow = "";
      tl.current?.reverse();
    }
  }, [drawerOpen]);

  // Close drawer on path change
  useEffect(() => {
    if (drawerOpen) {
      setDrawerOpen(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <header ref={rootRef} className={styles.root} data-scrolled={scrolled}>
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

          <div className={styles.actions}>
            <Magnetic strength={0.25} range={70}>
              <Link
                href="/contact"
                className={cn(
                  "hidden h-12 items-center justify-center rounded-md border border-border px-6 text-small font-medium text-text transition-colors hover:border-text md:inline-flex",
                )}
              >
                Start a project
              </Link>
            </Magnetic>

            <button
              type="button"
              className={styles.toggle}
              aria-label={drawerOpen ? "Close menu" : "Open menu"}
              aria-expanded={drawerOpen}
              onClick={() => setDrawerOpen((v) => !v)}
            >
              <span aria-hidden="true">{drawerOpen ? "Close" : "Menu"}</span>
            </button>
          </div>
        </div>
      </Container>

      <div ref={drawerRef} className={styles.drawer} role="dialog" aria-modal="true">
        <Container className="h-full flex flex-col justify-center relative">
          <nav aria-label="Mobile primary" className={styles.drawerNav}>
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href;
              return (
                <div key={link.href} className={styles.drawerLinkWrapper}>
                  <Link
                    href={link.href}
                    className={cn(styles.drawerLink, active && "text-accent")}
                    data-drawer-link
                    onClick={() => setDrawerOpen(false)}
                  >
                    {link.label}
                  </Link>
                </div>
              );
            })}
          </nav>

          <div className={styles.drawerFooter} data-drawer-footer>
            <div className="flex gap-6 text-muted text-lg">
              <span className="hover:text-text transition-colors cursor-pointer">
                {SITE.email}
              </span>
            </div>
            <div>
              <Link
                href="/contact"
                className="inline-flex h-14 items-center justify-center rounded-md bg-accent px-8 text-lg font-medium text-text transition-transform hover:scale-105"
                onClick={() => setDrawerOpen(false)}
              >
                Start a project
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </header>
  );
}