import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/shared/components/ui/Container";
import { Heading } from "@/shared/components/ui/Heading";
import { Button } from "@/shared/components/ui/Button";
import { Magnetic } from "@/shared/components/effects/Magnetic";
import { SITE } from "@/shared/constants/site";

export const metadata: Metadata = {
  title: "Page not found",
  description: `The page you were looking for does not exist on ${SITE.name}.`,
  robots: { index: false, follow: false },
};

export default function NotFound(): JSX.Element {
  return (
    <main className="relative flex min-h-[100svh] items-center overflow-hidden">
      {/* Atmospheric background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, color-mix(in oklab, var(--color-accent) 10%, transparent) 0%, transparent 60%), var(--color-bg)",
        }}
      />

      <Container className="relative">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="mb-8 inline-flex items-center gap-3 font-mono text-small uppercase tracking-[0.4em] text-muted">
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
            Error 404
            <span className="h-px w-8 bg-accent" aria-hidden="true" />
          </span>

          <Heading level="hero" as="h1" className="text-text">
            Off the <span className="text-accent">map</span>.
          </Heading>

          <p className="mt-8 max-w-md text-body text-muted">
            The page you were looking for has moved, been retired, or never
            existed. Let&apos;s get you back somewhere useful.
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <Button href="/" size="lg" variant="primary">
                Take me home
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href="/work" size="lg" variant="outline">
                See our work
              </Button>
            </Magnetic>
            <Magnetic>
              <Button href="/contact" size="lg" variant="ghost">
                Contact us
              </Button>
            </Magnetic>
          </div>

          <p className="mt-16 font-mono text-small text-muted">
            Reference · {SITE.shortName} · 404
          </p>
        </div>
      </Container>
    </main>
  );
}