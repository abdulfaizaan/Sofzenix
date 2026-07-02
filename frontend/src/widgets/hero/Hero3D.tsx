"use client";

import dynamic from "next/dynamic";
import type * as React from "react";

// Dynamically import the Scene and AbstractShape to avoid SSR issues and reduce initial bundle size.
const Scene = dynamic(
  () => import("@/shared/components/3d/Scene/Scene").then((mod) => mod.Scene),
  { ssr: false }
);

const AbstractShape = dynamic(
  () => import("@/shared/components/3d/AbstractShape/AbstractShape").then((mod) => mod.AbstractShape),
  { ssr: false }
);

export function Hero3D(): React.JSX.Element {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none mix-blend-screen opacity-80">
      <Scene>
        <AbstractShape />
      </Scene>
    </div>
  );
}
