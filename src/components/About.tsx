import { about, skillPalette, accentClasses } from "@/content/site";
import Section from "./Section";
import Reveal from "./Reveal";

export default function About() {
  return (
    <Section id="about">
      <div className="space-y-5">
        {about.paragraphs.map((p, i) => (
          <Reveal key={i} delay={i * 0.08}>
            <p className="text-lg leading-relaxed text-ink-soft sm:text-xl">
              {p}
            </p>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.12}>
        <ul className="mt-9 flex flex-wrap gap-x-8 gap-y-3">
          {about.facts.map((fact, i) => {
            const a = accentClasses[skillPalette[i % skillPalette.length]];
            return (
              <li key={fact.label} className="flex items-center gap-2.5">
                <span className={`h-2.5 w-2.5 rounded-full ${a.dot}`} />
                <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">
                  {fact.label}
                </span>
                <span className="text-sm font-medium text-ink">
                  {fact.value}
                </span>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </Section>
  );
}
