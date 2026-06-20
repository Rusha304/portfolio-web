"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const BURST_COLORS = [
  "bg-lavender-bold",
  "bg-pink-bold",
  "bg-butter-bold",
  "bg-blue-bold",
];

export default function SectionBurst({ id }: { id: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });
  const reduce = useReducedMotion();
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    if (inView && !reduce) setBurst(true);
  }, [inView, reduce]);

  return (
    <div ref={ref} className="pointer-events-none absolute inset-0 overflow-hidden">
      {burst &&
        Array.from({ length: 10 }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0.8, x: 24, y: 0, scale: 1 }}
            animate={{
              opacity: 0,
              x: 24 + Math.cos((i / 10) * Math.PI * 2) * 80,
              y: Math.sin((i / 10) * Math.PI * 2) * 60,
              scale: 0.2,
            }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className={`absolute left-0 top-8 h-1.5 w-1.5 rounded-full ${BURST_COLORS[i % BURST_COLORS.length]}`}
          />
        ))}
    </div>
  );
}
