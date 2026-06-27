import { gsap } from "gsap";
import { EASE } from "@/shared/lib/gsap/easings";

interface TextRevealOptions {
  readonly splitBy?: "chars" | "words" | "lines";
  readonly stagger?: number;
  readonly duration?: number;
  readonly y?: number;
}

/**
 * Split-text reveal using GSAP's core splitter.
 * For premium work, swap in the SplitText Club GreenSock plugin when licensed.
 */
export function textReveal(
  target: gsap.TweenTarget,
  options: TextRevealOptions = {},
): gsap.core.Timeline {
  const { splitBy = "words", stagger = 0.04, duration = 0.7, y = 24 } = options;

  const tl = gsap.timeline();

  tl.from(target, {
    opacity: 0,
    y,
    duration: 0,
    ease: EASE.outExpo,
  });

  if (splitBy === "chars" || splitBy === "words") {
    const inner = splitBy === "chars" ? " > span > span" : " > span";
    tl.from(
      `${target} ${inner}`,
      {
        opacity: 0,
        y,
        duration,
        stagger,
        ease: EASE.outExpo,
      },
      "<",
    );
  }

  return tl;
}

/**
 * Splits text nodes into spans for animation.
 * Public so widgets can pre-split if they need to coordinate multiple timelines.
 */
export function splitTextNodes(element: HTMLElement, mode: "chars" | "words" = "words"): void {
  const text = element.textContent ?? "";
  const tokens = mode === "chars" ? Array.from(text) : text.split(" ");
  element.innerHTML = tokens
    .map(
      (t) =>
        `<span style="display:inline-block;overflow:hidden;"><span style="display:inline-block;">${t}${mode === "words" ? "&nbsp;" : ""}</span></span>`,
    )
    .join("");
}