import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { LeadForm } from "@/components/lead-form";

/**
 * Captação — dark, ecoa o Hero (mesmo gradiente institucional no CTA).
 * Ponto de conversão principal (plano de UX, Seção 10).
 *
 * Restruturação de storytelling (Caio, 2026-09-09): layout dividido
 * (razões-para-escolher + canais diretos à esquerda, formulário à
 * direita), inspirado na estrutura de uma versão anterior da landing
 * (referência visual analisada, nunca clonada literalmente) — mais
 * eficaz que a sequência anterior de 2 seções cheias separadas
 * (Captação sozinha, depois Contato sozinho como bloco de ~100vh só
 * para 3 links). O wordmark monumental "CONVERSA" (mesmo floreio
 * decorativo apontado em Prova Social) foi removido.
 *
 * Canais diretos (antes em components/contact.tsx, seção própria):
 * absorvidos aqui como bloco compacto — e-mail/WhatsApp/Instagram
 * seguem `[DESCONHECIDO]` até confirmação (plano de UX, Seção 9).
 * `contact.tsx` fica sem uso nesta entrega (mantido no projeto, não
 * deletado — remoção de arquivo é escopo maior que esta correção).
 *
 * Superfície: --surface-raised (navy-800), consistente com a decisão
 * de "elevado" já registrada para esta seção.
 *
 * V10 (Caio, 2026-09-09): eyebrow "Captação" (jargão interno de
 * marketing) trocado por "Contato" — parte da revisão de nomes de
 * seção pedida nesta rodada ("revise os nomes de todas as sessões...
 * para que fiquem ideal e profissional"). Os 2 chips de intenção rápida
 * (formulário) saíram — ver lead-form.tsx.
 *
 * V12 (Caio, 2026-09-09 — rodada de layout/espacialidade desktop):
 * "aumente os blocos de texto da sessão 'contato'" — lista de razões
 * sobe de `.text-body` para `.text-body-lg`; linhas de canal direto
 * (e-mail/WhatsApp/Instagram) sobem de `text-sm` para `.text-body` com
 * ícone maior (`size-4` -> `size-5`); rótulo "Prefere falar direto?"
 * sobe de `text-xs` para `text-sm`. Container da seção também segue o
 * ajuste geral de largura/gutter desta rodada (ver globals.css).
 *
 * V13 (Caio, 2026-09-09 — "essa parte tem as fontes muito pequenas
 * comparadas com o resto da página"): mais um aumento sobre o mesmo
 * bloco. Canais diretos sobem de `.text-body` (19px) para `.text-body-lg`
 * (27px) — igualando a lista de razões acima, que já estava nesse
 * tamanho — com ícone maior (`size-5` -> `size-6`); rótulo "Prefere
 * falar direto?" sobe de `text-sm` para `.text-body`.
 *
 * V15 (Caio, 2026-09-15 — "retire os 3 tópicos abaixo do subtítulo"):
 * a lista `REASONS_TO_CHOOSE` (15+ anos de atuação / conteúdo adaptado
 * / abordagem prática) foi removida — a seção agora vai direto do
 * subtítulo para o bloco "Prefere falar direto?".
 *
 * V16 (Caio, 2026-09-15 — "retire os dados de 'prefere falar direto?'
 * (email, whatsapp e @)"): o bloco inteiro (rótulo + os 3 canais, todos
 * ainda `[DESCONHECIDO]`/"a confirmar") foi removido — a coluna
 * esquerda agora vai direto do `SectionHeading` para o formulário à
 * direita.
 */

export function LeadCapture() {
  return (
    <section
      id="captacao"
      className="relative overflow-hidden border-t border-[var(--border-dark)] bg-[var(--surface-raised)] px-6 py-12 sm:px-10 sm:py-16 lg:px-12"
    >
      <div className="relative mx-auto flex max-w-[1760px] flex-col gap-12 lg:flex-row lg:gap-16">
        <div className="flex flex-col gap-8 lg:w-[42%]">
          <SectionHeading
            tone="dark"
            eyebrow="Contato"
            title="Solicite uma palestra para o seu evento"
            description="Conte um pouco sobre a demanda — a equipe retorna para dar sequência."
          />
        </div>

        <Reveal index={0} className="lg:w-[58%]">
          <div className="rounded-[var(--radius-block)] border border-[var(--border-dark)] bg-[var(--navy-800)]/60 p-6 sm:p-8">
            <LeadForm context="captacao" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
