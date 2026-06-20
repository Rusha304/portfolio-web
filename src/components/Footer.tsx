import { profile } from "@/content/site";
import { Coffee } from "./icons";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-xs text-ink-faint sm:flex-row md:px-10">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p className="flex items-center gap-1.5 font-mono">
          Built with Next.js & Tailwind, and a flat white
          <Coffee className="h-3.5 w-3.5" />
        </p>
        <a href="#top" className="transition-colors hover:text-ink">
          Back to top {"^"}
        </a>
      </div>
    </footer>
  );
}
