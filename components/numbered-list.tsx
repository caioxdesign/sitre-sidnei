import type { LucideIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

export type NumberedListItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type NumberedListProps = {
  items: readonly NumberedListItem[];
  tone: "dark" | "light";
  /**
   * Classes Tailwind de altura mínima por item (ex.:
   * "min-h-[284px] sm:min-h-[140px]") — calculadas medindo o item de
   * maior conteúdo real no navegador em cada breakpoint (mobile
   * empilha o ícone abaixo do texto via `flex-col`, então precisa de um
   * piso bem maior que sm+, onde o layout vira `flex-row`) e aplicadas
   * a todos os itens, para que títulos de tamanhos diferentes nunca
   * desalinhem itens vizinhos (pedido explícito de Caio). Responsivo
   * por breakpoint porque um único valor px não cobre os dois layouts —
   * ver relatório de handoff para a medição real por seção.
   */
  minHeightClassName: string;
  className?: string;
};

/**
 * Lista numerada com ícone, estilo editorial — addendum de
 * enriquecimento (Temas de Palestra: tratamento primário, substitui os
 * cards brancos; Áreas de Atuação: mesma lógica, lista sequencial
 * finita). Numeral grande em cinza claro (nunca --cyan-500/accent),
 * título em peso forte, descrição 1-2 linhas em cinza médio, ícone
 * Lucide em chip quadrado com borda fina alinhado à direita do título.
 * Empilhado verticalmente com divisor fino entre itens (não grade).
 */
export function NumberedList({
  items,
  tone,
  minHeightClassName,
  className,
}: NumberedListProps) {
  const titleColor = tone === "dark" ? "text-[var(--on-dark)]" : "text-[var(--ink)]";
  const descColor = tone === "dark" ? "text-[var(--on-dark-70)]" : "text-[var(--gray-700)]";
  const dividerColor = tone === "dark" ? "border-[var(--border-dark)]" : "border-[var(--border-light)]";
  const chipBorder = tone === "dark" ? "border-[var(--border-dark)]" : "border-[var(--border-light)]";
  const iconColor = tone === "dark" ? "text-[var(--cyan-400)]" : "text-[var(--cyan-500)]";

  return (
    <div className={cn("flex flex-col", className)}>
      {items.map((item, index) => (
        <Reveal key={item.title} index={index}>
          <div
            data-slot="numbered-item"
            className={cn(
              "flex items-center gap-5 border-b py-7 last:border-b-0 sm:gap-8",
              dividerColor,
              minHeightClassName
            )}
          >
            <span className="text-numeral w-[1.4em] shrink-0" aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
              <div className="flex flex-col gap-1.5">
                <h3 className={cn("text-h3", titleColor)}>{item.title}</h3>
                <p className={cn("text-body max-w-lg", descColor)}>{item.description}</p>
              </div>
              <span
                className={cn(
                  "flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-field)] border",
                  chipBorder
                )}
              >
                <item.icon
                  className={cn("size-5", iconColor)}
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
              </span>
            </div>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
