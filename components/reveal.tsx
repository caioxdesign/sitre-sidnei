"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Reveal-on-scroll nativo (IntersectionObserver), conforme brief:
 * fade + translateY(12px) -> 0, --motion-base, --ease-out-soft,
 * stagger 60-80ms entre irmãos, teto de 4-5 itens.
 * prefers-reduced-motion tratado via CSS em globals.css.
 */

const STAGGER_STEP_MS = 70;
const STAGGER_CAP = 5;

type RevealProps = {
  index?: number;
  className?: string;
  children: React.ReactNode;
};

export function Reveal({ index = 0, className, children }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      el.setAttribute("data-reveal", "in");
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-reveal", "in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(el);

    // Failsafe (padrão importado do benchmark 3 Lírios): se o observer
    // nunca disparar por qualquer motivo (elemento fora do fluxo normal,
    // falha silenciosa do browser, etc.), força o estado revelado após um
    // curto intervalo em vez de deixar o conteúdo preso em opacity:0.
    const failsafe = window.setTimeout(() => {
      el.setAttribute("data-reveal", "in");
    }, 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(failsafe);
    };
  }, []);

  const delayMs = Math.min(index, STAGGER_CAP - 1) * STAGGER_STEP_MS;

  return (
    <div
      ref={ref}
      data-reveal=""
      style={{ transitionDelay: `${delayMs}ms` }}
      className={cn(className)}
    >
      {children}
    </div>
  );
}
