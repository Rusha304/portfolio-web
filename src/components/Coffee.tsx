import { coffeePlaces, skillPalette, accentClasses } from "@/content/site";
import Section from "./Section";
import Reveal from "./Reveal";
import { Coffee as CoffeeIcon } from "./icons";

export default function Coffee() {
  return (
    <Section id="coffee">
      <Reveal>
        <p className="flex items-center gap-2 font-mono text-sm text-pink">
          <CoffeeIcon className="h-4 w-4" />
          {"// off the clock"}
        </p>
        <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl">
          Good coffee around{" "}
          <span
            className="marker"
            style={{
              backgroundImage:
                "linear-gradient(transparent 60%, var(--butter-soft) 0)",
            }}
          >
            Los Angeles
          </span>
        </h2>
        <p className="mt-4 text-base leading-relaxed text-ink-soft">
          When I&apos;m not shipping pipelines, I&apos;m usually chasing a good
          flat white. A few of my favorite spots around the city:
        </p>
      </Reveal>

      {coffeePlaces.length > 0 ? (
        <Reveal delay={0.1}>
          <ul className="mt-8 space-y-4">
            {coffeePlaces.map((spot, i) => {
              const a = accentClasses[skillPalette[i % skillPalette.length]];
              return (
                <li
                  key={spot.name}
                  className="flex flex-wrap items-baseline gap-x-3 gap-y-1"
                >
                  <span className={`h-2.5 w-2.5 rounded-full ${a.dot}`} />
                  <span className="font-display text-lg font-semibold text-ink">
                    {spot.name}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-ink-faint">
                    {spot.area}
                  </span>
                  {spot.note && (
                    <span className="w-full text-sm text-ink-soft sm:w-auto sm:flex-1">
                      {spot.note}
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </Reveal>
      ) : (
        <Reveal delay={0.1}>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-butter-soft px-4 py-2 text-sm font-medium text-butter">
            <CoffeeIcon className="h-4 w-4" /> Recommendations brewing — adding
            my picks soon.
          </p>
        </Reveal>
      )}
    </Section>
  );
}
