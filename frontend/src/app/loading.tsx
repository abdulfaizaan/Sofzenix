import type * as React from "react";
import { Suspense } from "react";
import { RouteProgress } from "@/shared/components/layout/RouteProgress";

/**
 * App Router loading UI.
 * Mounts at every segment; Next.js renders it during route transitions.
 * Suspense is required because RouteProgress reads `useSearchParams()`.
 */
export default function Loading(): React.JSX.Element {
  return (
    <Suspense fallback={null}>
      <RouteProgress />
    </Suspense>
  );
}
