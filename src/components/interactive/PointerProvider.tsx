"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type PointerState = {
  x: number;
  y: number;
  nx: number;
  ny: number;
  activeZone: string | null;
  enabled: boolean;
};

const defaultState: PointerState = {
  x: 0,
  y: 0,
  nx: 0,
  ny: 0,
  activeZone: null,
  enabled: false,
};

const PointerContext = createContext<PointerState>(defaultState);

export function usePointer() {
  return useContext(PointerContext);
}

export function PointerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<PointerState>(defaultState);

  useEffect(() => {
    const fine =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!fine || reduce) return;

    const onMove = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null;
      const zone =
        target
          ?.closest("[data-cursor-zone]")
          ?.getAttribute("data-cursor-zone") ?? null;

      setState({
        x: e.clientX,
        y: e.clientY,
        nx: e.clientX / window.innerWidth - 0.5,
        ny: e.clientY / window.innerHeight - 0.5,
        activeZone: zone,
        enabled: true,
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <PointerContext.Provider value={state}>{children}</PointerContext.Provider>
  );
}
