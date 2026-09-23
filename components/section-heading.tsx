import { Reveal } from "@/components/reveal";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  tone: "dark" | "light";
  align?: "left" | "center";
  className?: string;
  /**
   * Espaço vertical entre eyebrow/título/descrição — `gap-4` (16px) por
   * padrão. V13 (Caio, 2026-09-09 — "porque agir agora": "o título e
   * subtítulo estão extremamente juntos"): expõe o gap como prop opcional
   * em vez de alterar o valor padrão global (que serve bem todas as
   * outras seções) — só "Por que agir agora" passa um valor maior.
   */
  gap?: string;
  /**
   * V15 (Caio, 2026-09-15 — "trajetória do palco": "não quebre o texto,
   * deixe o título todo na mesma linha"): o `<h2>` sempre carregava
   * `max-w-3xl` fixo, que quebrava linha em títulos curtos quando o
   * `text-h2` grande já cabia em uma linha na largura real da seção.
   * Prop opcional para sobrescrever esse teto por instância, sem afetar
   * o padrão das demais seções.
   */
  titleClassName?: string;
};

/**
 * Cabeçalho de seção reutilizado por todas as seções desta entrega.
 * Centraliza a decisão de cor por tom (--eyebrow-on-light no claro /
 * --cyan-300 no escuro, ver globals.css) em vez de repetir a escolha
 * em cada seção.
 *
 * Evolução de UI (Caio, 2026-09-09 — "enfeite mais os nomes das
 * sessões"): o eyebrow ganhou um marcador gráfico próprio (traço +
 * quadrado cheio na cor de accent) em vez de ser só texto uppercase
 * solto — um pequeno dispositivo de marca repetido em toda seção, não
 * decoração aleatória por seção. O título também ganhou um sublinhado
 * parcial (mesma técnica já usada em "impacto" no Hero/Sobre — traço
 * de accent sob o início do título), reforçando a hierarquia sem
 * introduzir um elemento novo ao vocabulário visual já aprovado.
 */
export function SectionHeading({
  eyebrow,
  title,
  description,
  tone,
  align = "left",
  className,
  gap = "gap-4",
  titleClassName,
}: SectionHeadingProps) {
  const eyebrowColor =
    tone === "dark" ? "text-[var(--cyan-300)]" : "text-[var(--eyebrow-on-light)]";
  const titleColor = tone === "dark" ? "text-[var(--on-dark)]" : "text-[var(--ink)]";
  const descriptionColor =
    tone === "dark" ? "text-[var(--on-dark-70)]" : "text-[var(--gray-700)]";
  const markerColor = tone === "dark" ? "bg-[var(--cyan-300)]" : "bg-[var(--cyan-500)]";
  const ruleColor = tone === "dark" ? "bg-[var(--border-dark)]" : "bg-[var(--border-light)]";

  return (
    <div
      className={cn(
        "flex flex-col",
        gap,
        align === "center" && "items-center text-center",
        className
      )}
    >
      <Reveal index={0}>
        <div
          className={cn(
            "flex items-center gap-2.5",
            align === "center" && "justify-center"
          )}
        >
          <span aria-hidden="true" className={cn("size-2 shrink-0 rotate-45", markerColor)} />
          <span aria-hidden="true" className={cn("h-px w-8 shrink-0", ruleColor)} />
          <p className={cn("text-eyebrow", eyebrowColor)}>{eyebrow}</p>
        </div>
      </Reveal>
      <Reveal index={1}>
        <h2 className={cn("text-h2 relative max-w-3xl", titleColor, titleClassName)}>{title}</h2>
      </Reveal>
      {description ? (
        <Reveal index={2}>
          <p className={cn("text-body-lg max-w-2xl", descriptionColor)}>
            {description}
          </p>
        </Reveal>
      ) : null}
    </div>
  );
}
