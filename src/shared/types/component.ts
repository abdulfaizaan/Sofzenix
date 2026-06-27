import type { ReactNode, CSSProperties, ElementType, ComponentPropsWithoutRef } from "react";

/**
 * Base props accepted by every layout primitive.
 * Provides className merging and a stable style escape hatch.
 */
export interface PrimitiveProps {
  readonly children?: ReactNode;
  readonly className?: string;
  readonly style?: CSSProperties;
  readonly id?: string;
}

/**
 * Polymorphic component API.
 * Lets `as` override the rendered element while preserving typings.
 */
export type PolymorphicRef<T extends ElementType> = ComponentPropsWithoutRef<T>["ref"];

export type PolymorphicProps<T extends ElementType, P = object> = P & {
  readonly as?: T;
} & Omit<ComponentPropsWithoutRef<T>, keyof P | "as">;
