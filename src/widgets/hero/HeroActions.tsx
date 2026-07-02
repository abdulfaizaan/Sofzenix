import { Button } from "@/shared/components/ui/Button";
import { Magnetic } from "@/shared/components/effects/Magnetic";
import type { HeroCta } from "./hero.types";

interface HeroActionsProps {
  readonly description?: string;
  readonly primary?: HeroCta;
  readonly secondary?: HeroCta;
}

/**
 * Server-rendered supporting copy + CTAs.
 * Magnetic wrappers are the only client island here.
 */
export function HeroActions({ description, primary, secondary }: HeroActionsProps): JSX.Element {
  return (
    <div className="mt-12 flex max-w-2xl flex-col gap-8 md:mt-16">
      {description && <p className="text-body text-muted md:text-xl">{description}</p>}

      {(primary || secondary) && (
        <div className="flex flex-wrap items-center gap-4">
          {primary && (
            <Magnetic>
              <Button
                href={primary.href}
                size="lg"
                variant="primary"
                external={primary.external}
              >
                {primary.label}
                <span aria-hidden="true">→</span>
              </Button>
            </Magnetic>
          )}
          {secondary && (
            <Magnetic>
              <Button
                href={secondary.href}
                size="lg"
                variant="outline"
                external={secondary.external}
              >
                {secondary.label}
              </Button>
            </Magnetic>
          )}
        </div>
      )}
    </div>
  );
}