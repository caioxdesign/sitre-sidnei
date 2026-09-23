import { ArrowRight, Circle, CircleCheck } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

const PAIRS = [
  {
    before: "Decisões por intuição, sem inteligência de dados",
    after: "Decisões orientadas por dados e evidências",
  },
  {
    before: "IA usada de forma casual, sem governança",
    after: "Governança de IA estruturada e segura",
  },
  {
    before: "Transformação digital travada em projetos isolados",
    after: "Transformação conectada à estratégia do negócio",
  },
  {
    before: "Planejamento que não sai do papel",
    after: "Planejamento implementado, com impacto real",
  },
] as const;

/**
 * Antes×Depois — light, contínuo com Áreas de Atuação. Condicional
 * (plano de UX, Seção 6/13): conteúdo ainda não validado com Sidnei.
 * Decisão de limpeza de estados (Caio, 2026-09-08): enquanto não
 * validada, a SEÇÃO INTEIRA fica oculta (não é renderizada em
 * app/page.tsx) — nada de aviso paliativo na interface. "Antes"
 * dessaturado (--gray-400 + ícone neutro), "Depois" com acento cyan
 * (--cyan-500 + ícone de confirmação), conforme brief, preservados no
 * código para quando a seção for reativada.
 */
// TODO: trocar para `true` quando o conteúdo desta seção for validado
// com Sidnei. Nesse ponto, importar/renderizar <BeforeAfter /> de volta
// em app/page.tsx (posição já reservada entre ServiceAreas e SocialProof).
export const ANTES_DEPOIS_VALIDATED = false;

export function BeforeAfter() {
  return (
    <section
      id="antes-depois"
      className="bg-[var(--surface-light)] px-6 py-12 sm:px-10 sm:py-16 lg:px-12"
    >
      <div className="mx-auto flex max-w-[1760px] flex-col gap-12">
        <SectionHeading
          tone="light"
          eyebrow="Antes × Depois"
          title="O tipo de transformação que essa combinação gera"
        />

        <div className="flex flex-col divide-y divide-[var(--border-light)] rounded-[var(--radius-card)] border border-[var(--border-light)] bg-[var(--surface-light-raised)]">
          {PAIRS.map((pair, index) => (
            <Reveal
              key={pair.before}
              index={index}
              className="grid grid-cols-1 items-center gap-4 p-6 sm:grid-cols-[1fr_auto_1fr] sm:gap-6 sm:p-8"
            >
              <div className="flex items-start gap-3">
                <Circle
                  className="mt-1 size-4 shrink-0 text-[var(--gray-400)]"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <p className="text-body text-[var(--gray-400)]">{pair.before}</p>
              </div>

              <ArrowRight
                className="hidden size-5 shrink-0 rotate-90 text-[var(--gray-200)] sm:block sm:rotate-0"
                strokeWidth={2}
                aria-hidden="true"
              />

              <div className="flex items-start gap-3">
                <CircleCheck
                  className="mt-1 size-4 shrink-0 text-[var(--cyan-500)]"
                  strokeWidth={2}
                  aria-hidden="true"
                />
                <p className="text-body font-medium text-[var(--ink)]">{pair.after}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
