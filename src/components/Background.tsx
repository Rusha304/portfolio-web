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
import { usePointer } from "./interactive/PointerProvider";

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
  pullX,
  pullY,
}: {
  d: Doodle;
  mx: MotionValue<number>;
  my: MotionValue<number>;
  pullX: MotionValue<number>;
  pullY: MotionValue<number>;
}) {
  const x = useTransform([mx, pullX], ([parallax, pull]) => {
    const p = parallax as number;
    const pu = pull as number;
    return p * d.depth + pu;
  });
  const y = useTransform([my, pullY], ([parallax, pull]) => {
    const p = parallax as number;
    const pu = pull as number;
    return p * d.depth + pu;
  });

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
  const pullX = useMotionValue(0);
  const pullY = useMotionValue(0);
  const layerMx = useMotionValue(0);
  const layerMy = useMotionValue(0);

  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.4 });
  const spx = useSpring(pullX, { stiffness: 80, damping: 20, mass: 0.5 });
  const spy = useSpring(pullY, { stiffness: 80, damping: 20, mass: 0.5 });
  const layerX = useSpring(layerMx, { stiffness: 50, damping: 20 });
  const layerY = useSpring(layerMy, { stiffness: 50, damping: 20 });
  const layerX2 = useTransform(layerX, (v) => -v * 0.6);
  const layerY2 = useTransform(layerY, (v) => -v * 0.5);

  const { nx, ny, enabled } = usePointer();

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [mx, my]);

  useEffect(() => {
    if (!enabled) {
      pullX.set(0);
      pullY.set(0);
      layerMx.set(0);
      layerMy.set(0);
      return;
    }
    pullX.set(nx * 28);
    pullY.set(ny * 22);
    layerMx.set(nx * 40);
    layerMy.set(ny * 30);
  }, [nx, ny, enabled, pullX, pullY, layerMx, layerMy]);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        style={{ x: layerX, y: layerY }}
        className="absolute -inset-20 rounded-full bg-lavender-soft/20 blur-3xl"
        aria-hidden
      />
      <motion.div
        style={{ x: layerX2, y: layerY2 }}
        className="absolute right-[10%] top-[30%] h-64 w-64 rounded-full bg-pink-soft/25 blur-3xl"
        aria-hidden
      />

      {doodles.map((d, i) => (
        <DoodleItem
          key={i}
          d={d}
          mx={sx}
          my={sy}
          pullX={spx}
          pullY={spy}
        />
      ))}
    </div>
  );
}
