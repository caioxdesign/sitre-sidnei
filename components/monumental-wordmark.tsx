import { cn } from "@/lib/utils";

type MonumentalWordmarkProps = {
  word: string;
  tone: "dark" | "light";
  className?: string;
};

/**
 * Wordmark monumental de transição — addendum de enriquecimento,
 * teto de 2 ocorrências no total (Prova Social + Captação, nenhum
 * outro lugar). Palavra única curta em maiúsculas, família de display,
 * peso mais forte do sistema, cor subordinada (--on-dark/--ink a
 * 10-15% de opacidade, nunca --action/--accent-key) — nunca compete com
 * o título real da seção (h2, ver SectionHeading), que fica sempre em
 * z-index/ordem de leitura acima e em opacidade total.
 */
export function MonumentalWordmark({ word, tone, className }: MonumentalWordmarkProps) {
  const color = tone === "dark" ? "text-[var(--on-dark)]" : "text-[var(--ink)]";

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-x-0 overflow-hidden", className)}
    >
      <p className={cn("wordmark-monumental w-full text-center", color)}>{word}</p>
    </div>
  );
}
