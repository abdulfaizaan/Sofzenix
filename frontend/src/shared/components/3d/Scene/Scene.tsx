"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Preload, PerformanceMonitor } from "@react-three/drei";
import { useState } from "react";
import type { ReactNode } from "react";
import type * as React from "react";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";

interface SceneProps {
  readonly children: ReactNode;
}

/**
 * A reusable Canvas wrapper that sets up the camera, lighting, and environment.
 */
export function Scene({ children }: SceneProps): React.JSX.Element | null {
  const reduced = useReducedMotion();
  const [dpr, setDpr] = useState(1.5); // Cap at 1.5 for performance

  // If the user prefers reduced motion, we disable the 3D scene entirely to save resources. 
  // We will fall back to the CSS background in HeroBackground.
  if (reduced) return null;

  return (
    <div className="absolute inset-0 h-full w-full pointer-events-none z-[0]">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={dpr}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
        
        {/* Soft studio lighting environment for materials */}
        <Environment preset="city" />

        {children}

        {/* Preload assets to prevent stuttering */}
        <Preload all />
      </Canvas>
    </div>
  );
}
