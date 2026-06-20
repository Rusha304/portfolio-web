"use client";

import { useRef, useState } from "react";
import { skills, accentClasses } from "@/content/site";
import Section from "./Section";
import Reveal from "./Reveal";

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const related = (item: string, groupLabel: string): string[] => {
    const group = skills.find((g) => g.label === groupLabel);
    if (!group) return [];
    return group.items.filter((i) => i !== item);
  };

  const getTagCenter = (item: string): { x: number; y: number } | null => {
    const el = containerRef.current?.querySelector(
      `[data-skill="${CSS.escape(item)}"]`,
    );
    if (!el || !containerRef.current) return null;
    const cr = containerRef.current.getBoundingClientRect();
    const er = el.getBoundingClientRect();
    return {
      x: er.left + er.width / 2 - cr.left,
      y: er.top + er.height / 2 - cr.top,
    };
  };

  const hoveredCenter = hovered ? getTagCenter(hovered) : null;
  const hoveredGroup = skills.find((g) => g.items.includes(hovered ?? ""));
  const relatedItems = hovered && hoveredGroup ? related(hovered, hoveredGroup.label) : [];

  return (
    <Section id="skills">
      <div ref={containerRef} className="relative">
        {hovered && hoveredCenter && (
          <svg
            className="pointer-events-none absolute inset-0 z-10 h-full w-full"
            aria-hidden
          >
            {relatedItems.map((item) => {
              const center = getTagCenter(item);
              if (!center) return null;
              return (
                <line
                  key={item}
                  x1={hoveredCenter.x}
                  y1={hoveredCenter.y}
                  x2={center.x}
                  y2={center.y}
                  stroke="var(--lavender-bold)"
                  strokeWidth="1"
                  strokeOpacity="0.45"
                  strokeDasharray="4 4"
                />
              );
            })}
          </svg>
        )}

        {skills.map((group, i) => {
          const a = accentClasses[group.accent];
          return (
            <Reveal
              key={group.label}
              delay={i * 0.06}
              className="border-t border-line pt-6 first:border-t-0 first:pt-0 [&:not(:first-child)]:mt-6"
            >
              <div>
                <h3 className="mb-3 flex items-center gap-2.5 font-display text-lg font-semibold text-ink">
                  <span className={`h-3 w-3 rounded-full ${a.bg}`} />
                  {group.label}
                </h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      data-skill={item}
                      onPointerEnter={() => setHovered(item)}
                      onPointerLeave={() => setHovered(null)}
                      className={`rounded-full ${a.soft} px-3.5 py-1.5 text-sm font-medium ${a.text} transition-transform hover:-translate-y-0.5 ${hovered === item ? "ring-1 ring-lavender-bold/50" : ""}`}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
