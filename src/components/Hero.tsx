"use client";

import { motion, type Variants } from "framer-motion";
import { profile } from "@/content/site";
import { Star } from "./icons";
import TypeName from "./TypeName";
import Magnetic from "./Magnetic";

const ease = [0.21, 0.47, 0.32, 0.98] as [number, number, number, number];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.08 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center px-6 pt-28"
    >
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto w-full max-w-2xl"
      >
        <motion.div
          variants={item}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-line bg-background/50 px-3.5 py-1.5 backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-pink-bold opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-pink-bold" />
          </span>
          <span className="text-xs text-ink-soft">{profile.status}</span>
        </motion.div>

        <motion.p
          variants={item}
          className="mb-3 flex items-center gap-2 font-mono text-sm text-pink"
        >
          <Star className="h-4 w-4 text-butter" />
          {"// hi, I'm"}
        </motion.p>

        <motion.div variants={item}>
          <TypeName />
        </motion.div>

        <motion.p
          variants={item}
          className="mt-9 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl"
        >
          Software engineer based in{" "}
          <span className="font-medium text-ink">Long Beach</span>, building{" "}
          <span className="font-medium text-ink">Python backends</span>, REST
          APIs, and AI-powered applications with a focus on LLM systems, RAG,
          and reliable, well-tested software.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <Magnetic>
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-background"
            >
              See my work
              <span className="transition-transform group-hover:translate-x-1">
                {"->"}
              </span>
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-lavender hover:text-lavender"
            >
              Let&apos;s talk
            </a>
          </Magnetic>
        </motion.div>
      </motion.div>
    </section>
  );
}
