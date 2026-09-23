import { BarChart3, Compass, ShieldCheck, Workflow } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

/**
 * Barreiras de performance — nova seção (restruturação de storytelling,
 * Caio, 2026-09-09), inspirada na estrutura de uma versão anterior da
 * landing (referência visual fornecida como PNG, analisada — nunca
 * clonada literalmente): nomear a dor do público antes de apresentar a
 * autoridade de Sidnei, em vez de ir direto para a bio. Padrão clássico
 * de copywriting B2B (problema -> agitação -> solução), ausente da
 * versão anterior desta implementação, que pulava direto de Hero/Stats
 * para Sobre.
 *
 * Conteúdo: texto ilustrativo/fictício (mesma autorização já usada
 * nesta entrega para preencher o que não tem dado real confirmado),
 * mas ancorado nos temas reais do briefing (transformação digital,
 * inteligência de dados, governança de IA, execução) — nunca uma
 * métrica ou claim factual inventado, só framing de problema genérico
 * do domínio.
 *
 * V11 (Caio, 2026-09-09 — "aumente os cards e tamanho dos textos dos
 * cards na sessão 'o ponto de partida'"): padding do card sobe de
 * `p-6` para `p-7`, ícone de `size-10`/`size-5` para `size-12`/`size-6`,
 * título de `.text-body` para `.text-body-lg`, descrição de `text-sm`
 * fixo para `.text-body`.
 *
 * Atualização de conteúdo (Caio, 2026-09-23): a seção deixa de nomear
 * barreiras/dores e passa a nomear os 4 pilares reais do trabalho —
 * eyebrow inalterado, título "Barreiras que travam a performance" ->
 * "O que separa intenção de resultado", descrição vira "Quatro pilares
 * que sustentam o trabalho dentro das organizações." Os 4 cards (antes
 * dores fictícias/ilustrativas) são substituídos por conteúdo real
 * fornecido por Caio: Estratégia Sincronizada, Transformação Digital,
 * Governança de IA, Dados em Decisão — cada um com ícone Lucide próprio
 * e coerente com o tema.
 *
 * dark, --surface-page (mesmo tom do Hero/Sobre) — logo após a Faixa de
 * Números, antes de Sobre/Autoridade.
 */
const PAIN_POINTS = [
  {
    icon: Compass,
    title: "Estratégia Sincronizada",
    description:
      "Quando a liderança passa a puxar na mesma direção, as iniciativas se somam e a organização avança.",
  },
  {
    icon: Workflow,
    title: "Transformação digital",
    description: "É sistêmica. Começa sempre pelas pessoas, nunca pela tecnologia.",
  },
  {
    icon: ShieldCheck,
    title: "Governança de IA",
    description:
      "Com critério no uso da ferramenta, a adoção de IA gera valor real com segurança.",
  },
  {
    icon: BarChart3,
    title: "Dados em decisão",
    description:
      "Com organização, informação dispersa se transforma em leitura clara para tomada de decisão.",
  },
] as const;

export function PainPoints() {
  return (
    <section
      id="barreiras"
      className="relative border-t border-[var(--border-dark)] bg-[var(--surface-page)] px-6 py-12 sm:px-10 sm:py-16 lg:px-12"
    >
      <div className="mx-auto flex max-w-[1760px] flex-col gap-12">
        <SectionHeading
          tone="dark"
          eyebrow="O ponto de partida"
          title={"O que separa intenção de resultado"}
          titleClassName="max-w-4xl"
          description="Quatro pilares que sustentam o trabalho dentro das organizações."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PAIN_POINTS.map((point, index) => (
            <Reveal key={point.title} index={index}>
              <div className="flex h-full flex-col gap-5 rounded-[var(--radius-card)] border border-[var(--border-dark)] bg-[var(--surface-raised)] p-7">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-[var(--radius-field)] border border-[var(--border-dark)]">
                  <point.icon
                    className="size-6 text-[var(--cyan-400)]"
                    strokeWidth={1.75}
                    aria-hidden="true"
                  />
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-body-lg font-semibold text-[var(--on-dark)]">
                    {point.title}
                  </h3>
                  <p className="text-body text-[var(--on-dark-70)]">{point.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
