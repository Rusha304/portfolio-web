"use client";

import { useEffect } from "react";

const GRACE_MS = 1500;

export default function OpenAtTop() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const openedWithHash = window.location.hash.length > 1;

    const snapToTop = () => window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    if (!openedWithHash) snapToTop();

    let userInteracted = false;

    const onHashChange = () => {
      if (!userInteracted && !openedWithHash) {
        history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search,
        );
        snapToTop();
      }
    };

    const markInteract = () => {
      userInteracted = true;
      cleanup();
    };

    const cleanup = () => {
      clearTimeout(timer);
      window.removeEventListener("hashchange", onHashChange);
      window.removeEventListener("pointerdown", markInteract);
      window.removeEventListener("keydown", markInteract);
      window.removeEventListener("wheel", markInteract);
    };

    window.addEventListener("hashchange", onHashChange);
    window.addEventListener("pointerdown", markInteract);
    window.addEventListener("keydown", markInteract);
    window.addEventListener("wheel", markInteract, { passive: true });

    const timer = setTimeout(cleanup, GRACE_MS);

    return cleanup;
  }, []);

  return null;
}
