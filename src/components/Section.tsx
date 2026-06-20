import type { ReactNode } from "react";

type SectionProps = {
  id: string;
  children: ReactNode;
  className?: string;
};

export default function Section({ id, children, className }: SectionProps) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-2xl scroll-mt-28 px-6 py-16 sm:py-20 ${className ?? ""}`}
    >
      {children}
    </section>
  );
}
