"use client";

import { useEffect, useRef } from "react";
import { usePointer } from "./PointerProvider";

type Dot = { x: number; y: number; life: number; color: string };

const COLORS = [
  "rgba(155, 138, 230, 0.45)",
  "rgba(239, 107, 174, 0.4)",
  "rgba(239, 201, 78, 0.35)",
];

export default function InkTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Dot[]>([]);
  const { x, y, enabled } = usePointer();
  const lastRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!enabled) return;
    const dx = x - lastRef.current.x;
    const dy = y - lastRef.current.y;
    if (dx * dx + dy * dy < 9) return;

    lastRef.current = { x, y };
    dotsRef.current.push({
      x,
      y,
      life: 1,
      color: COLORS[dotsRef.current.length % COLORS.length],
    });
    if (dotsRef.current.length > 48) dotsRef.current.shift();
  }, [x, y, enabled]);

  useEffect(() => {
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce || !enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dotsRef.current = dotsRef.current.filter((d) => {
        d.life -= 0.035;
        if (d.life <= 0) return false;
        ctx.beginPath();
        ctx.arc(d.x, d.y, 3 * d.life, 0, Math.PI * 2);
        ctx.fillStyle = d.color.replace(/[\d.]+\)$/, `${d.life * 0.45})`);
        ctx.fill();
        return true;
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[99]"
      aria-hidden
    />
  );
}
