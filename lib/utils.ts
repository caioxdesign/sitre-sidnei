import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * BUGFIX (Caio, 2026-09-09, V11 — investigação de "aumente o tamanho da
 * fonte" repetido em múltiplas rodadas sem efeito visível consistente):
 * `twMerge` sem configuração trata QUALQUER classe não reconhecida no
 * formato `text-{palavra}` como candidata ao grupo de cor de texto (o
 * mesmo grupo de `text-red-500` / `text-[var(--x)]` / `text-current`) —
 * confirmado isoladamente via `twMerge('text-h2 text-[var(--x)]')` =>
 * `'text-[var(--x)]'`, ou seja, a classe de escala tipográfica do
 * projeto (`.text-h2`, `.text-body-lg`, etc., definidas em
 * app/globals.css) era descartada silenciosamente sempre que aparecia
 * na mesma chamada de `cn()` que uma cor de texto — exatamente o padrão
 * usado em `SectionHeading` e em praticamente todo texto do site
 * (`cn("text-h2 ...", titleColor)`). O elemento renderizava com o
 * tamanho padrão do navegador para `<h2>`/`<p>` (ex.: 16px) em vez do
 * `clamp()` real do design system, apesar do token em globals.css estar
 * correto — nenhum aumento de fonte pedido em rodadas anteriores
 * chegava a ser visível para esses elementos.
 *
 * Correção: registra as classes de escala tipográfica do projeto como
 * seu próprio grupo de conflito (`extendTailwindMerge`), separado do
 * grupo de cor — elas passam a conviver com `text-[var(--cor)]` na
 * mesma chamada de `cn()`, e continuam se sobrepondo corretamente entre
 * si (ex.: `text-h2 text-h3` ainda resolve para `text-h3`, only-last-
 * wins dentro do próprio grupo).
 */
const twMerge = extendTailwindMerge<"text-scale">({
  extend: {
    classGroups: {
      "text-scale": [
        "text-eyebrow",
        "text-h1",
        "text-hero-h1",
        "text-lede",
        "text-h2",
        "text-h3",
        "text-h3-modal",
        "text-stat",
        "text-stat-band",
        "text-body-lg",
        "text-body-modal",
        "text-body",
        "text-numeral",
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
