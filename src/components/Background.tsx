"use client";

import { useEffect } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Sparkle, Star, Plus, Ring, Squiggle, Triangle } from "./icons";

type IconCmp = typeof Sparkle;

type Doodle = {
  Icon: IconCmp;
  top: string;
  left: string;
  size: number;
  color: string;
  depth: number;
  rot: number;
};

// Scattered "sticker" doodles instead of the common pastel-halo glow.
const doodles: Doodle[] = [
  { Icon: Sparkle, top: "12%", left: "8%", size: 30, color: "text-lavender", depth: 26, rot: -8 },
  { Icon: Star, top: "22%", left: "84%", size: 26, color: "text-pink", depth: 40, rot: 10 },
  { Icon: Plus, top: "38%", left: "16%", size: 22, color: "text-blue", depth: 18, rot: 0 },
  { Icon: Ring, top: "48%", left: "90%", size: 34, color: "text-butter", depth: 34, rot: 0 },
  { Icon: Squiggle, top: "60%", left: "10%", size: 36, color: "text-pink", depth: 22, rot: -6 },
  { Icon: Triangle, top: "70%", left: "82%", size: 24, color: "text-lavender", depth: 30, rot: 14 },
  { Icon: Plus, top: "82%", left: "20%", size: 20, color: "text-butter", depth: 16, rot: 0 },
  { Icon: Sparkle, top: "90%", left: "88%", size: 30, color: "text-blue", depth: 38, rot: 8 },
  { Icon: Star, top: "6%", left: "52%", size: 20, color: "text-butter", depth: 24, rot: -12 },
  { Icon: Ring, top: "33%", left: "60%", size: 18, color: "text-lavender", depth: 14, rot: 0 },
];

function DoodleItem({
  d,
  mx,
  my,
}: {
  d: Doodle;
  mx: MotionValue<number>;
  my: MotionValue<number>;
}) {
  const x = useTransform(mx, (v) => v * d.depth);
  const y = useTransform(my, (v) => v * d.depth);
  return (
    <motion.span
      style={{
        top: d.top,
        left: d.left,
        x,
        y,
        ["--rot" as string]: `${d.rot}deg`,
      }}
      className={`animate-drift absolute ${d.color}`}
    >
      <d.Icon
        style={{ width: d.size, height: d.size }}
        className="opacity-[0.45]"
      />
    </motion.span>
  );
}

export default function Background() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.4 });

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {doodles.map((d, i) => (
        <DoodleItem key={i} d={d} mx={sx} my={sy} />
      ))}
    </div>
  );
}
