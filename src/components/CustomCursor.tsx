"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Coffee as CoffeeIcon, Sparkle } from "./icons";
import { usePointer } from "./interactive/PointerProvider";

type CursorMode = "default" | "projects" | "skills" | "coffee";

function modeFromZone(zone: string | null): CursorMode {
  if (zone === "projects") return "projects";
  if (zone === "skills") return "skills";
  if (zone === "coffee") return "coffee";
  return "default";
}

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [down, setDown] = useState(false);
  const [visible, setVisible] = useState(false);
  const { activeZone } = usePointer();
  const mode = modeFromZone(activeZone);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 320, damping: 28, mass: 0.4 });
  const ringY = useSpring(y, { stiffness: 320, damping: 28, mass: 0.4 });

  useEffect(() => {
    const fine =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine || reduce) return;

    setEnabled(true);
    document.documentElement.classList.add("has-custom-cursor");

    const onMove = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as HTMLElement | null;
      setHovering(Boolean(target?.closest("a, button, [data-cursor]")));
    };
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    document.addEventListener("pointerleave", onLeave);

    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const ringSize =
    mode === "projects" ? 64 : mode === "skills" ? 48 : hovering ? 56 : 34;

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{ opacity: visible ? 1 : 0 }}
    >
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
      >
        <motion.div
          animate={{
            width: ringSize,
            height: ringSize,
            opacity: hovering || mode !== "default" ? 1 : 0.7,
            scale: down ? 0.8 : 1,
            backgroundColor:
              mode === "skills"
                ? "rgba(122, 106, 214, 0.14)"
                : mode === "coffee"
                  ? "rgba(184, 132, 18, 0.14)"
                  : hovering
                    ? "rgba(216, 65, 140, 0.12)"
                    : "rgba(216, 65, 140, 0)",
            borderColor:
              mode === "skills"
                ? "var(--lavender-bold)"
                : mode === "coffee"
                  ? "var(--butter-bold)"
                  : "var(--pink-bold)",
          }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="rounded-full border"
        />
      </motion.div>

      <motion.div
        style={{ x, y }}
        className="absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2"
      >
        {mode === "skills" ? (
          <Sparkle className="h-3.5 w-3.5 text-lavender" />
        ) : mode === "coffee" ? (
          <CoffeeIcon className="h-3.5 w-3.5 text-butter" />
        ) : (
          <div
            className={`rounded-full bg-ink ${mode === "projects" ? "h-2.5 w-2.5" : "h-2 w-2"}`}
          />
        )}
      </motion.div>
    </div>
  );
}
