"use client";

import { useEffect, useRef } from "react";
import { usePointer } from "./PointerProvider";

const GRID = 34;

type Particle = {
  x: number;
  y: number;
  life: number;
  vx: number;
  vy: number;
};

export default function GridParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const { x, y, enabled } = usePointer();
  const lastSpawn = useRef(0);

  useEffect(() => {
    if (!enabled) return;
    const now = performance.now();
    if (now - lastSpawn.current < 80) return;
    lastSpawn.current = now;

    const gx = Math.round(x / GRID) * GRID;
    const gy = Math.round(y / GRID) * GRID;

    for (let i = 0; i < 3; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.3 + Math.random() * 0.6;
      particlesRef.current.push({
        x: gx + (Math.random() - 0.5) * 8,
        y: gy + (Math.random() - 0.5) * 8,
        life: 1,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
      });
    }
    if (particlesRef.current.length > 60) {
      particlesRef.current.splice(0, particlesRef.current.length - 60);
    }
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
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.025;
        if (p.life <= 0) return false;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5 * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(122, 106, 214, ${p.life * 0.5})`;
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
      className="pointer-events-none fixed inset-0 z-[1]"
      aria-hidden
    />
  );
}
