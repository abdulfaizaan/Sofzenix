"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, Preload, PerformanceMonitor, Lightformer } from "@react-three/drei";
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
        gl={{ antialias: false, alpha: true, powerPreference: "default" }}
      >
        <PerformanceMonitor onDecline={() => setDpr(1)} />
        <ambientLight intensity={1.5} />
        <directionalLight position={[10, 10, 10]} intensity={2} />
        
        {/* Custom studio lighting environment without external assets */}
        <Environment resolution={256}>
          <group rotation={[-Math.PI / 2, 0, 0]}>
            <Lightformer intensity={4} rotation-x={Math.PI / 2} position={[0, 5, -9]} scale={[10, 10, 1]} />
            <Lightformer intensity={2} rotation-y={Math.PI / 2} position={[-5, 1, -1]} scale={[20, 0.1, 1]} />
            <Lightformer rotation-y={Math.PI / 2} position={[-5, -1, -1]} scale={[20, 0.5, 1]} />
            <Lightformer rotation-y={-Math.PI / 2} position={[10, 1, 0]} scale={[20, 1, 1]} />
          </group>
        </Environment>

        {children}

        {/* Preload assets to prevent stuttering */}
        <Preload all />
      </Canvas>
    </div>
  );
}
