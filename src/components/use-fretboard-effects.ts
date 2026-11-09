"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { RefObject } from "react";
import type {
  FretboardEffects,
  FretStrike,
} from "@/lib/chord-finder/fretboard-effects";

const PREFERENCE_KEY = "chord-finder-motion";
let effectsModule: Promise<
  typeof import("@/lib/chord-finder/fretboard-effects")
> | null = null;
function loadEffects() {
  if (!effectsModule) {
    effectsModule = import("@/lib/chord-finder/fretboard-effects").catch(
      (error) => {
        effectsModule = null;
        throw error;
      },
    );
  }
  return effectsModule;
}

export function useFretboardEffects(
  host: RefObject<HTMLDivElement>,
  sceneKey: string,
) {
  const [enabled, setEnabled] = useState(true);
  // Conservative on first render: do not load animation code until the OS preference is known.
  const [reducedMotion, setReducedMotion] = useState(true);
  const controller = useRef<FretboardEffects | null>(null);
  const pending = useRef<Promise<FretboardEffects | null> | null>(null);
  const generation = useRef(0);
  const unavailable = useRef(false);
  const visible = useRef(true);
  const allowed = enabled && !reducedMotion;
  const allowedRef = useRef(false);
  const invalidatePending = useCallback(() => {
    generation.current++;
    pending.current = null;
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener("change", update);
    try {
      setEnabled(localStorage.getItem(PREFERENCE_KEY) !== "off");
    } catch {
      /* Storage is optional. */
    }
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    allowedRef.current = allowed;
    if (!allowed) {
      invalidatePending();
      controller.current?.dispose();
      controller.current = null;
      unavailable.current = false;
    }
  }, [allowed, invalidatePending]);

  useEffect(() => {
    invalidatePending();
    controller.current?.stop();
  }, [sceneKey, invalidatePending]);

  useEffect(() => {
    const element = host.current;
    if (!element) return;
    const onVisibility = () => {
      if (document.hidden) {
        invalidatePending();
        controller.current?.stop();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible.current = entry.isIntersecting;
      if (!entry.isIntersecting) {
        invalidatePending();
        controller.current?.stop();
      }
    });
    observer.observe(element);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      allowedRef.current = false;
      invalidatePending();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      controller.current?.dispose();
      controller.current = null;
    };
  }, [host, invalidatePending]);

  const warm = useCallback(() => {
    if (allowedRef.current) void loadEffects().catch(() => {});
  }, []);

  const strike = useCallback(
    (target: HTMLButtonElement, color: FretStrike["color"]) => {
      const element = host.current;
      if (
        !element ||
        unavailable.current ||
        !allowedRef.current ||
        !visible.current ||
        document.hidden
      )
        return;
      const board = element.getBoundingClientRect();
      const fret = target.getBoundingClientRect();
      const label = target.parentElement
        ?.querySelector(".cf-string-label")
        ?.getBoundingClientRect();
      const sample: FretStrike = {
        x: fret.left - board.left - element.clientLeft + fret.width / 2,
        y: fret.top - board.top - element.clientTop + fret.height / 2,
        left: (label?.right ?? board.left) - board.left - element.clientLeft,
        right: element.clientWidth,
        time: performance.now(),
        color,
      };
      if (controller.current) {
        controller.current.strike(sample);
        return;
      }
      const version = generation.current;
      const eligible = () =>
        version === generation.current &&
        allowedRef.current &&
        visible.current &&
        !document.hidden &&
        host.current === element;
      if (!pending.current) {
        const initialization = loadEffects()
          .then((module) => {
            if (!eligible()) return null;
            try {
              controller.current = module.createFretboardEffects(element);
              unavailable.current = !controller.current;
            } catch {
              unavailable.current = true;
              return null;
            }
            return controller.current;
          })
          .catch(() => null);
        pending.current = initialization;
        void initialization.then(() => {
          if (pending.current === initialization) pending.current = null;
        });
      }
      void pending.current.then((effects) => {
        if (eligible()) effects?.strike(sample);
      });
    },
    [host],
  );

  const toggle = useCallback(() => {
    if (reducedMotion) return;
    const next = !enabled;
    // Stop immediately, before React commits the preference update.
    if (!next) {
      allowedRef.current = false;
      invalidatePending();
      controller.current?.dispose();
      controller.current = null;
    }
    setEnabled(next);
    try {
      localStorage.setItem(PREFERENCE_KEY, next ? "on" : "off");
    } catch {
      /* Storage is optional. */
    }
  }, [enabled, reducedMotion, invalidatePending]);

  return { enabled: allowed, reducedMotion, warm, strike, toggle };
}
