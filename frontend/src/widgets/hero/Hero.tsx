import type * as React from "react";
import { HeroStage } from "./HeroStage";
import type { HeroProps } from "./hero.types";

/**
 * Public Hero widget.
 * Wraps the client `HeroStage` so callers can import a single,
 * type-safe symbol without touching animation internals.
 */
export function Hero(props: HeroProps): React.JSX.Element {
  return <HeroStage {...props} />;
}