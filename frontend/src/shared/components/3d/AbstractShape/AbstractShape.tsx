"use client";

import { useRef } from "react";
import type * as React from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Float } from "@react-three/drei";
import type * as THREE from "three";
import { useScrollDirection } from "@/shared/hooks/useScrollDirection";

/**
 * A premium abstract 3D shape (TorusKnot) with a glass-like transmission material.
 * Gently floats and rotates, and reacts slightly to scroll direction.
 */
export function AbstractShape(): React.JSX.Element {
  const meshRef = useRef<THREE.Mesh>(null);
  const { direction } = useScrollDirection();

  useFrame((_state, delta) => {
    if (meshRef.current) {
      // Gentle continuous rotation
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.1;
      
      // Slight tilt based on scroll direction
      const targetZ = direction === "down" ? -0.2 : direction === "up" ? 0.2 : 0;
      meshRef.current.rotation.z += (targetZ - meshRef.current.rotation.z) * 0.05;
    }
  });

  return (
    <Float
      speed={2} // Animation speed
      rotationIntensity={0.5} // XYZ rotation intensity
      floatIntensity={1} // Up/down float intensity
      floatingRange={[-0.5, 0.5]} // Range of y-axis values
    >
      <mesh ref={meshRef} position={[0, 0, 0]} scale={1.5}>
        <torusKnotGeometry args={[1.2, 0.4, 256, 64]} />
        <MeshTransmissionMaterial
          backside={false}
          samples={0}
          resolution={256}
          thickness={0.2}
          chromaticAberration={0.2}
          anisotropy={0.1}
          distortion={0.5}
          distortionScale={0.5}
          temporalDistortion={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          iridescence={1}
          iridescenceIOR={1.5}
          iridescenceThicknessRange={[100, 400]}
          color="#ffffff"
          attenuationDistance={1}
          attenuationColor="#ffffff"
        />
      </mesh>
    </Float>
  );
}
