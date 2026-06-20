import { skills, accentClasses } from "@/content/site";
import Section from "./Section";
import Reveal from "./Reveal";

export default function Skills() {
  return (
    <Section id="skills">
      <div>
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
                      className={`rounded-full ${a.soft} px-3.5 py-1.5 text-sm font-medium ${a.text} transition-transform hover:-translate-y-0.5`}
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
