import { experience, accentClasses } from "@/content/site";
import Section from "./Section";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <Section id="work">
      <div>
        {experience.map((job, i) => {
          const a = accentClasses[job.accent];
          const paragraph = [job.summary, ...job.highlights].join(" ");
          return (
            <Reveal
              key={job.company}
              delay={i * 0.08}
              className="border-t border-line pt-8 first:border-t-0 first:pt-0 [&:not(:first-child)]:mt-8"
            >
              <article>
                <span
                  className={`mb-3 inline-flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider ${a.text}`}
                >
                  <span className={`h-2 w-2 rounded-full ${a.dot}`} />
                  {job.role.includes("Intern") ? "Internship" : "Full-time"}
                </span>

                <h3 className="font-display text-3xl font-semibold leading-tight text-ink sm:text-4xl">
                  {job.role.replace(" · Promoted from Intern", "")}
                </h3>
                <p className="mt-1.5 text-sm text-ink-faint">
                  {job.company}
                  {job.role.includes("Promoted")
                    ? " · promoted from intern"
                    : ""}
                </p>

                <p className="mt-5 text-base leading-relaxed text-ink-soft">
                  {paragraph}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {job.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-line-strong px-2.5 py-1 font-mono text-xs text-ink-soft"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
