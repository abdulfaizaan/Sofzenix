import type * as React from "react";
import { ServicesStage } from "./ServicesStage";

/**
 * Public Services widget. Importable from any page.
 * Server wrapper around the client orchestrator.
 */
export function Services(): React.JSX.Element {
  return <ServicesStage />;
}