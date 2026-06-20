"use client";

import { motion, useReducedMotion } from "framer-motion";

const STEAM = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  left: `${12 + i * 10}%`,
  delay: i * 0.35,
  duration: 2.8 + (i % 3) * 0.4,
}));

export default function CoffeeSteam() {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 h-32 overflow-hidden"
      aria-hidden
    >
      {STEAM.map((s) => (
        <motion.span
          key={s.id}
          className="absolute bottom-0 h-8 w-8 rounded-full bg-ink/5 blur-md"
          style={{ left: s.left }}
          animate={{
            y: [0, -90, -120],
            x: [0, (s.id % 2 ? 12 : -12), 0],
            opacity: [0, 0.35, 0],
            scale: [0.6, 1.2, 0.8],
          }}
          transition={{
            duration: s.duration,
            delay: s.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}
