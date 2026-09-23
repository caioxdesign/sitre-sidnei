import { CalendarClock } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

/**
 * Módulo Agenda (light) — plano de UX, Seção 6/9/13: "só existe se
 * houver conteúdo atualizado + responsável de manutenção confirmado".
 * Nenhum dos dois está confirmado hoje. Componente pronto para ativação
 * futura rápida, mas NÃO renderizado em app/page.tsx — ver
 * `AGENDA_ENABLED` abaixo.
 *
 * Condição de ativação (checklist, plano de UX Seção 11 "Módulo Agenda
 * desatualizado: pior que a ausência do módulo"):
 *   1. Responsável de manutenção confirmado por Caio/Sidnei.
 *   2. Ao menos 1 evento real com data/local/link verificados.
 * Quando as duas condições acima forem verdadeiras: trocar
 * `AGENDA_ENABLED` para `true` neste arquivo, alimentar `EVENTS` com
 * dado real (nunca placeholder) e importar/renderizar `<Agenda />` em
 * app/page.tsx entre SocialProof e LeadCapture (posição já reservada,
 * ver comentário em app/page.tsx).
 */
export const AGENDA_ENABLED = false;

type AgendaEvent = {
  date: string;
  location: string;
  href: string;
};

const EVENTS: AgendaEvent[] = [];

export function Agenda() {
  return (
    <section
      id="agenda"
      className="border-t border-[var(--border-light)] bg-[var(--surface-light)] px-6 py-8 sm:px-10 sm:py-10 lg:px-12"
    >
      <div className="mx-auto flex max-w-[1760px] flex-col gap-12">
        <SectionHeading tone="light" eyebrow="Agenda" title="Próximas apresentações" />

        <div className="flex flex-col divide-y divide-[var(--border-light)]">
          {EVENTS.map((event, index) => (
            <Reveal
              key={event.href}
              index={index}
              className="flex items-center justify-between gap-4 py-5"
            >
              <div className="flex items-center gap-3">
                <CalendarClock
                  className="size-5 text-[var(--cyan-500)]"
                  strokeWidth={1.75}
                  aria-hidden="true"
                />
                <div className="flex flex-col">
                  <span className="text-body font-medium text-[var(--ink)]">
                    {event.date}
                  </span>
                  <span className="text-body text-[var(--gray-700)]">
                    {event.location}
                  </span>
                </div>
              </div>
              <a
                href={event.href}
                className="text-sm font-semibold text-[var(--cyan-500)] hover:underline"
              >
                Detalhes
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
