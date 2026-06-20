"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { Sparkle } from "./icons";

const LINES = ["Rusha", "Mistry"];
const CHAR_MS = 120;
const LINE_GAP_MS = 320;

const lineClass =
  "block text-[3.6rem] sm:text-[6rem] lg:text-[8.5rem]";

function Caret() {
  return (
    <span className="animate-blink ml-1 inline-block h-[0.72em] w-[0.05em] translate-y-[0.08em] bg-pink-bold align-baseline" />
  );
}

export default function TypeName({ startDelay = 650 }: { startDelay?: number }) {
  const reduce = useReducedMotion();
  const [typed, setTyped] = useState<string[]>(["", ""]);
  const [active, setActive] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reduce) {
      setTyped([...LINES]);
      setActive(LINES.length - 1);
      setDone(true);
      return;
    }

    let line = 0;
    let char = 0;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (line >= LINES.length) {
        setDone(true);
        return;
      }
      char += 1;
      const current = line;
      const slice = LINES[line].slice(0, char);
      setTyped((prev) => {
        const next = [...prev];
        next[current] = slice;
        return next;
      });

      if (char >= LINES[line].length) {
        line += 1;
        char = 0;
        setActive(line);
        timer = setTimeout(tick, LINE_GAP_MS);
      } else {
        timer = setTimeout(tick, CHAR_MS);
      }
    };

    const starter = setTimeout(tick, startDelay);
    return () => {
      clearTimeout(starter);
      clearTimeout(timer);
    };
  }, [reduce, startDelay]);

  const caretOn = (i: number) =>
    (i === active && !done) || (done && i === LINES.length - 1);

  return (
    <h1 className="relative font-display font-semibold leading-[0.95] tracking-tight text-ink">
      <span className={lineClass}>
        {typed[0] || "\u200b"}
        {caretOn(0) && <Caret />}
      </span>
      <span className={`${lineClass} w-fit`}>
        <span
          className="marker"
          style={{
            backgroundImage:
              "linear-gradient(transparent 58%, var(--lavender-soft) 0)",
          }}
        >
          {typed[1] || "\u200b"}
        </span>
        {caretOn(1) && <Caret />}
        {done && (
          <Sparkle className="ml-1 inline-block h-7 w-7 -translate-y-6 rotate-12 text-pink sm:h-10 sm:w-10" />
        )}
      </span>
    </h1>
  );
}
