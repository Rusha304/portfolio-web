"use client";

import { useEffect } from "react";
import { useReducedMotion, useScroll } from "framer-motion";

const TINTS = [
  "rgba(155, 138, 230, 0.06)",
  "rgba(239, 107, 174, 0.06)",
  "rgba(239, 201, 78, 0.06)",
  "rgba(111, 147, 207, 0.06)",
];

export default function ScrollColorShift() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(TINTS.length - 1, Math.floor(v * TINTS.length));
      document.documentElement.style.setProperty("--scroll-tint", TINTS[idx]);
    });
  }, [scrollYProgress, reduce]);

  if (reduce) return null;

  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 transition-[background-color] duration-700"
      style={{ backgroundColor: "var(--scroll-tint, transparent)" }}
      aria-hidden
    />
  );
}
