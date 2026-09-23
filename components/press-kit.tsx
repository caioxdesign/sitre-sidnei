import Image from "next/image";
import { FileText, Mic } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { LeadForm } from "@/components/lead-form";
import { SPEAKING_TOPICS, SHORT_BIO, RIDER_SUMMARY } from "@/lib/content";

/**
 * Press Kit — recurso utilitário, fora da rolagem narrativa das 10
 * seções (plano de UX, Seção 6: "recurso acessível pela navegação,
 * rodapé ou entrada contextual... não uma seção de rolagem no meio da
 * página"). Decisão técnica desta entrega: em vez de rota/modal
 * separado, implementado como bloco ancorável (`#press-kit`) dentro da
 * própria zona de rodapé (após Contato, mesma família --surface-sunken),
 * mas contido em um cartão com borda própria e largura reduzida — para
 * ler visualmente como "à parte" da narrativa em vez de mais uma seção
 * numerada. Evita a complexidade de uma rota/modal nova sem framework de
 * modal já adotado no projeto, e mantém o link do header/Contato como
 * simples âncora de página.
 *
 * Bio em 3 versões, fotos em alta resolução e rider técnico seguem
 * pendentes (plano de UX, Seção 9). Temas e formatos reaproveitam o
 * conteúdo já confirmado em Temas de Palestra (não duplica dado, só
 * exibição). Formulário reaproveita o mesmo componente de Captação,
 * composto com contexto diferente (ver components/lead-form.tsx).
 *
 * Superfície (limpeza de composição, Caio, 2026-09-08): mesmo token
 * --surface-sunken de Contato (mantém a leitura de "apêndice" que junto
 * — sem border-t, "funde" — já comunica), mas com `.surface-hachure`
 * (grafismo de hachura diagonal do Art Direction Brief, ver globals.css)
 * na zona vazia ao redor do cartão para diferenciar visualmente as duas
 * superfícies sem introduzir uma 4ª cor fora da paleta aprovada. Já era
 * a seção mais compacta da sequência (py-16, sem o sm:py-24 das demais)
 * — reforça o "apêndice", mantido como estava.
 *
 * Addendum de enriquecimento (2026-09-08): linha de identidade mínima
 * no topo (`.seam-line`, reta, 2px) — a única marca do sistema de
 * costura nesta seção (funcional primeiro, conforme a tabela do brief:
 * "100vh não forçado se conteúdo utilitário for naturalmente mais
 * curto"). Nenhuma outra técnica do addendum (marca de registro, lista
 * numerada, wordmark monumental) se aplica aqui.
 */
export function PressKit() {
  return (
    <section
      id="press-kit"
      className="surface-hachure relative bg-[var(--surface-sunken)] px-6 py-8 sm:px-10 lg:px-12"
    >
      <div aria-hidden="true" className="seam-line absolute inset-x-0 top-0" />
      <Reveal index={0}>
        <div className="mx-auto flex max-w-3xl flex-col gap-10 rounded-[var(--radius-block)] border border-[var(--border-dark)] bg-[var(--navy-900)]/60 p-8 sm:p-12">
          <div className="flex flex-col gap-3">
            <p className="text-eyebrow text-[var(--cyan-300)]">
              Recurso para organizadores e curadores
            </p>
            <h2 className="text-h2 text-[var(--on-dark)]">Press Kit</h2>
            <p className="text-body-lg text-[var(--on-dark-70)]">
              Material de apoio para embasar convite, proposta ou indicação —
              fora da rolagem principal, acessado sob demanda.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {/* Bio: texto ilustrativo/fictício (autorização de Caio
                nesta entrega) — versão curta apenas; médias/longa e
                aprovação final seguem pendentes. */}
            <div className="flex flex-col gap-2 rounded-[var(--radius-card)] border border-dashed border-[var(--border-dark)] px-5 py-4">
              <div className="flex items-center gap-2 text-[var(--on-dark-muted)]">
                <FileText className="size-4" strokeWidth={1.5} aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-wide">Bio (curta)</span>
              </div>
              <p className="text-sm text-[var(--on-dark-70)]">{SHORT_BIO}</p>
              <p className="text-[11px] text-[var(--on-dark-muted)]">
                [Versões média/longa e revisão final — pendente]
              </p>
            </div>

            {/* Fotos: thumbnail real (recorte fornecido nesta entrega)
                — arquivo em alta resolução para download segue
                pendente. */}
            <div className="relative flex aspect-[4/5] items-end justify-center overflow-hidden rounded-[var(--radius-card)] border border-dashed border-[var(--border-dark)]">
              <Image
                src="/images/sidnei/sidnei-cutout-6.png"
                alt="Sidnei Rodrigues"
                fill
                sizes="(min-width: 640px) 33vw, 100vw"
                className="figure-cutout"
              />
              <span className="relative z-[1] mb-2 rounded-[var(--radius-pill)] bg-[var(--navy-950)]/80 px-3 py-1 text-[11px] text-[var(--on-dark-muted)]">
                Alta resolução — pendente
              </span>
            </div>

            <div className="flex flex-col gap-2 rounded-[var(--radius-card)] border border-dashed border-[var(--border-dark)] px-5 py-4">
              <div className="flex items-center gap-2 text-[var(--on-dark-muted)]">
                <FileText className="size-4" strokeWidth={1.5} aria-hidden="true" />
                <span className="text-xs font-semibold uppercase tracking-wide">Rider técnico</span>
              </div>
              <p className="text-sm text-[var(--on-dark-70)]">{RIDER_SUMMARY}</p>
              <p className="text-[11px] text-[var(--on-dark-muted)]">
                [Documento completo — pendente]
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-[var(--on-dark-muted)]">
              Temas e formatos
            </p>
            <ul className="flex flex-col gap-2">
              {SPEAKING_TOPICS.map((topic) => (
                <li key={topic} className="flex items-start gap-2.5">
                  <Mic
                    className="mt-1 size-4 shrink-0 text-[var(--cyan-400)]"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                  <span className="text-body text-[var(--on-dark-70)]">{topic}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4 border-t border-[var(--border-dark)] pt-8">
            <p className="text-body font-medium text-[var(--on-dark)]">
              Formulário para organizadores
            </p>
            <LeadForm context="press-kit" />
          </div>
        </div>
      </Reveal>
    </section>
  );
}
