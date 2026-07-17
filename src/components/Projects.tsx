"use client";

import { motion } from "framer-motion";
import { projects, accentClasses } from "@/content/site";
import { projectIcons, Github, Arrow } from "./icons";
import Section from "./Section";
import TiltCard from "./interactive/TiltCard";

export default function Projects() {
  return (
    <Section id="projects">
      <div>
        {projects.map((project, i) => {
          const a = accentClasses[project.accent];
          const Icon = projectIcons[project.icon];
          return (
            <TiltCard
              key={project.title}
              className={`group pt-8 transition-transform duration-300 hover:-translate-y-1 ${i > 0 ? "mt-8 border-t border-line" : ""}`}
            >
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98] as [
                    number,
                    number,
                    number,
                    number,
                  ],
                }}
                data-cursor
              >
                <div className="mb-4 flex items-center justify-between">
                  <span
                    className={`flex h-11 w-11 items-center justify-center rounded-2xl ${a.soft} ${a.text} transition-transform duration-300 group-hover:-rotate-6`}
                  >
                    <Icon className="h-6 w-6" />
                  </span>
                  <span
                    className={`font-mono text-[11px] font-semibold uppercase tracking-wider ${a.text}`}
                  >
                    {project.tag}
                  </span>
                </div>

                <h3 className="font-display text-3xl font-semibold text-ink">
                  {project.title}
                </h3>
                <p className={`mt-1 text-sm font-medium ${a.text}`}>
                  {project.tagline}
                </p>
                <p className="mt-4 text-base leading-relaxed text-ink-soft">
                  {[project.description, ...project.highlights].join(" ")}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className={`rounded-full ${a.soft} px-2.5 py-1 font-mono text-xs ${a.text}`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor
                    className={`group/link mt-5 inline-flex items-center gap-2 text-sm font-medium ${a.text}`}
                  >
                    <Github className="h-4 w-4" />
                    <span className="underline decoration-line underline-offset-4 transition-colors group-hover/link:decoration-current">
                      View on GitHub
                    </span>
                    <Arrow className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
                  </a>
                )}
              </motion.div>
            </TiltCard>
          );
        })}
      </div>
    </Section>
  );
}
