"use client";

import { createElement, useRef, type ReactNode, type Ref, type RefCallback } from "react";
import type * as React from "react";
import { useIsomorphicLayoutEffect } from "@/shared/hooks/useIsomorphicLayoutEffect";
import { useReducedMotion } from "@/shared/hooks/useReducedMotion";
import { gsap } from "@/shared/lib/gsap/registerPlugins";
import { EASE } from "@/shared/lib/gsap/easings";
import { cn } from "@/shared/utils/cn";

type RevealTag = "div" | "span" | "section" | "article" | "li" | "p" | "h2" | "h3";

interface RevealProps {
  readonly children: ReactNode;
  readonly className?: string;
  readonly delay?: number;
  readonly y?: number;
  readonly duration?: number;
  readonly as?: RevealTag;
  readonly once?: boolean;
}

/**
 * Wraps children in a clip-path + y reveal driven by ScrollTrigger.
 * Server-rendered children remain untouched; only the wrapper mounts animation.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 32,
  duration = 0.8,
  as: Tag = "div",
  once = true,
}: RevealProps): React.JSX.Element {
  const ref = useRef<HTMLElement | null>(null);
  const reduced = useReducedMotion();

  useIsomorphicLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      gsap.set(el, { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(el, {
        opacity: 0,
        y,
        clipPath: "inset(100% 0% 0% 0%)",
        duration,
        delay,
        ease: EASE.outExpo,
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: once ? "play none none none" : "play reverse play reverse",
        },
      });
    }, el);

    return () => ctx.revert();
  }, [delay, y, duration, reduced, once]);

  // Stable ref callback so polymorphic element accepts our HTMLElement ref
  // without losing the `.current` API at call sites.
  const setRef: RefCallback<HTMLElement> = (node) => {
    ref.current = node;
  };

  return createElement(
    Tag,
    { ref: setRef as Ref<unknown>, className: cn("will-change-transform", className) },
    children,
  );
}
