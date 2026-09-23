import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

/**
 * Perguntas Frequentes — inspirada na estrutura de uma versão anterior
 * da landing (referência visual analisada, nunca clonada literalmente).
 * Perguntas genéricas do formato "contratar um palestrante" (duração,
 * personalização, formato online, processo de contratação) — conteúdo
 * de categoria, não claim específico sobre Sidnei.
 *
 * V10 (Caio, 2026-09-09 — "em 'Perguntas Frequentes'... também devem
 * ter os dropdowns shadcn", referência: shadcnblocks.com/block/faq3):
 * o `<details>/<summary>` nativo da rodada anterior foi substituído pelo
 * `Accordion` shadcn (mesmo componente agora usado em Temas de
 * Palestra — instalado uma vez, reaproveitado aqui), com o padrão do
 * FAQ3 (eyebrow + título centralizados, lista de perguntas abaixo,
 * uma aberta por vez).
 *
 * V11 (Caio, 2026-09-09): (1) "aumente consideravelmente os tamanhos
 * dos textos" — pergunta (trigger) sobe de `.text-body` para
 * `.text-body-lg`, resposta sobe de `text-sm` fixo para `.text-body`;
 * (2) "alinhe o título e subtítulo da sessão à esquerda, assim como
 * todas as outras" — `align="center"` removido do `SectionHeading` e o
 * wrapper troca de `max-w-3xl mx-auto` (única seção centralizada da
 * página) para `max-w-[1400px]` sem `mx-auto` implícito de conteúdo,
 * igualando o container das demais seções.
 *
 * V12 (Caio, 2026-09-09 — rodada de layout/espacialidade desktop):
 * "expanda a largura dos FAQs dropdowns... para que fique no mesmo
 * estilo do resto da página" — o `mx-auto max-w-3xl` que ainda
 * restringia só o `Accordion` (herdado da era centralizada, V11 só
 * tirou o `align="center"` do heading, não esse resquício) foi
 * removido; o accordion agora ocupa a largura cheia do mesmo container
 * de 1600px das demais seções, igual ao padrão já usado em
 * speaking-topics.tsx.
 *
 * dark, --surface-sunken — mesma família de Contato/Press Kit, logo
 * antes de Captação.
 */
const FAQ_ITEMS = [
  {
    question: "Qual a duração média de uma palestra?",
    answer:
      "As palestras têm duração flexível, geralmente entre 45 e 90 minutos, podendo ser ajustadas conforme a necessidade do evento. Também é possível formatos de workshop com carga horária maior — o escopo é definido junto com a organização.",
  },
  {
    question: "As palestras podem ser personalizadas para meu setor?",
    answer:
      "Sim. O conteúdo é adaptado ao contexto do público e do setor, mantendo o núcleo de transformação digital, inteligência de dados e governança de IA.",
  },
  {
    question: "É possível realizar palestras online?",
    answer:
      "Sim, formatos remoto e híbrido estão disponíveis, além do presencial.",
  },
  {
    question: "Como funciona o processo de contratação?",
    answer:
      "Basta preencher o formulário de Contato com a demanda — a equipe retorna para alinhar formato, data e detalhes do evento.",
  },
] as const;

export function Faq() {
  return (
    <section
      id="perguntas-frequentes"
      className="relative border-t border-[var(--border-dark)] bg-[var(--surface-sunken)] px-6 py-12 sm:px-10 sm:py-16 lg:px-12"
    >
      <div className="mx-auto flex max-w-[1760px] flex-col gap-10">
        <SectionHeading
          tone="dark"
          eyebrow="Perguntas Frequentes"
          title="Ainda com dúvidas?"
        />

        <Reveal index={1}>
          <Accordion defaultValue={["item-0"]} className="gap-2">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem
                key={item.question}
                value={`item-${index}`}
                className="rounded-[var(--radius-card)] border border-[var(--border-dark)] px-5 not-last:border-b"
              >
                <AccordionTrigger className="text-body-lg py-4 font-medium text-[var(--on-dark)] no-underline hover:no-underline focus-visible:ring-[var(--focus-ring)]">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="pb-4">
                  <p className="text-body text-[var(--on-dark-70)]">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
