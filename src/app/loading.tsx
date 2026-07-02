import { RouteProgress } from "@/shared/components/layout/RouteProgress";

/**
 * App Router loading UI.
 * Mounts at every segment; Next.js renders it during route transitions.
 */
export default function Loading(): JSX.Element {
  return <RouteProgress />;
}