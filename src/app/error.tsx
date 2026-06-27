"use client";

import { useEffect } from "react";
import { Container } from "@/shared/components/ui/Container";
import { Heading } from "@/shared/components/ui/Heading";
import { Button } from "@/shared/components/ui/Button";

interface ErrorProps {
  readonly error: Error & { digest?: string };
  readonly reset: () => void;
}

/**
 * Client error boundary for runtime errors.
 * Logs to console for diagnostics; offers a retry affordance.
 */
export default function GlobalError({ error, reset }: ErrorProps): JSX.Element {
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.error("[SOFZENIX] Runtime error:", error);
  }, [error]);

  return (
    <main className="flex min-h-[100svh] items-center">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <span className="mb-6 inline-flex items-center gap-3 font-mono text-small uppercase tracking-[0.4em] text-muted">
            Error
          </span>
          <Heading level="h1" as="h1">
            Something went sideways.
          </Heading>
          <p className="mt-6 max-w-md text-body text-muted">
            A runtime error interrupted this page. The team has been notified.
            You can retry, or head back home.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Button onClick={reset} variant="primary" size="lg">
              Try again
            </Button>
            <Button href="/" variant="outline" size="lg">
              Back to home
            </Button>
          </div>
        </div>
      </Container>
    </main>
  );
}