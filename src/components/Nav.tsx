"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { navLinks, profile } from "@/content/site";
import Magnetic from "./Magnetic";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className={`mx-auto flex items-center justify-between px-5 transition-all duration-300 md:px-6 ${
          scrolled
            ? "my-3 max-w-3xl rounded-full border border-line bg-background/80 py-2.5 shadow-[0_8px_30px_rgba(34,31,26,0.08)] backdrop-blur-xl"
            : "max-w-6xl py-5"
        }`}
      >
        <a
          href="#top"
          className="group flex items-center gap-2.5"
          aria-label="Back to top"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink font-display text-sm font-semibold text-background transition-transform group-hover:-rotate-6 group-hover:bg-lavender-bold">
            {profile.initials}
          </span>
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-full px-3.5 py-1.5 text-sm text-ink-soft transition-colors hover:bg-ink/[0.05] hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Magnetic className="hidden sm:inline-block">
            <a
              href="#contact"
              className="block rounded-full border border-line-strong bg-ink/[0.06] px-4 py-2 text-sm font-medium text-ink transition-colors hover:border-lavender hover:bg-lavender-soft/60 hover:text-lavender"
            >
              Say hello
            </a>
          </Magnetic>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line-strong text-ink md:hidden"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`h-px w-4 bg-current transition-transform ${open ? "translate-y-[3px] rotate-45" : ""}`}
              />
              <span
                className={`h-px w-4 bg-current transition-transform ${open ? "-translate-y-[3px] -rotate-45" : ""}`}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mt-2 overflow-hidden rounded-3xl border border-line bg-background/95 p-2 shadow-[0_12px_40px_rgba(34,31,26,0.12)] backdrop-blur-xl md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-2xl px-4 py-3 text-sm text-ink-soft transition-colors hover:bg-ink/[0.05] hover:text-ink"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-1 block rounded-2xl border border-line-strong bg-ink/[0.06] px-4 py-3 text-center text-sm font-medium text-ink transition-colors hover:border-lavender hover:bg-lavender-soft/60 hover:text-lavender"
            >
              Say hello
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
