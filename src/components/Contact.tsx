"use client";

import { motion } from "framer-motion";
import { profile } from "@/content/site";
import { Sparkle } from "./icons";
import Magnetic from "./Magnetic";

const links = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    color: "text-pink",
  },
  {
    label: "LinkedIn",
    value: "in/rusha-mistry-b3b422229",
    href: profile.linkedin,
    color: "text-blue",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative mx-auto w-full max-w-2xl scroll-mt-28 px-6 py-16 text-center sm:py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{
          duration: 0.7,
          ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number],
        }}
        className="relative z-10"
      >
        <p className="mb-4 flex items-center justify-center gap-2 font-mono text-sm text-pink">
          <Sparkle className="h-4 w-4 text-lavender" />
          {"// let's talk"}
        </p>
        <h2 className="mx-auto max-w-3xl font-display text-4xl font-semibold leading-[1.05] tracking-tight text-balance text-ink sm:text-6xl">
          Got a role, a project, or a great{" "}
          <span
            className="marker"
            style={{
              backgroundImage:
                "linear-gradient(transparent 60%, var(--butter-soft) 0)",
            }}
          >
            coffee spot
          </span>{" "}
          in mind?
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg">
          I&apos;m open to software engineering opportunities and always happy
          to chat. The fastest way to reach me is email.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-7">
          <Magnetic strength={0.4}>
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-background"
            >
              {profile.email}
              <span className="transition-transform group-hover:translate-x-1">
                {"->"}
              </span>
            </a>
          </Magnetic>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  link.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group flex items-center gap-2 text-sm text-ink-soft transition-colors hover:text-ink"
              >
                <span
                  className={`font-mono text-xs font-semibold uppercase tracking-wider ${link.color}`}
                >
                  {link.label}
                </span>
                <span className="underline decoration-line underline-offset-4 transition-colors group-hover:decoration-ink">
                  {link.value}
                </span>
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
