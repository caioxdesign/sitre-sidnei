import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/hero";
import { TrustBar } from "@/components/trust-bar";
import { StatsBand } from "@/components/stats-band";
import { PainPoints } from "@/components/pain-points";
import { About } from "@/components/about";
import { SpeakingTopics } from "@/components/speaking-topics";
import { ServiceAreas } from "@/components/service-areas";
import { ANTES_DEPOIS_VALIDATED, BeforeAfter } from "@/components/before-after";
import { SocialProof } from "@/components/social-proof";
import { WhyNow } from "@/components/why-now";
import { AGENDA_ENABLED, Agenda } from "@/components/agenda";
import { Faq } from "@/components/faq";
import { LeadCapture } from "@/components/lead-capture";
import { SiteFooter } from "@/components/site-footer";
import { WhatsAppButton } from "@/components/whatsapp-button";

/**
 * V2 — storytelling restruturado (Caio, 2026-09-09): a versão anterior
 * (V1, plano de UX Seção 7) ia direto de Hero/Stats para Sobre, sem
 * nomear a dor do público antes da autoridade, e fechava com 2 seções
 * cheias separadas (Captação, depois Contato) só para 3 links de
 * contato. Caio comparou com uma versão anterior da landing (referência
 * visual analisada, nunca clonada literalmente) e pediu um storytelling
 * mais enxuto e profissional — problema antes da solução, urgência
 * antes do formulário, FAQ para objeção, wordmarks decorativos fora.
 *
 * Ordem V2: Hero -> Faixa de números -> Barreiras de performance (nova)
 * -> Sobre/Autoridade -> Temas de Palestra -> Áreas de Atuação ->
 * [Antes×Depois, condicional, oculta] -> Prova Social -> Por que agir
 * agora (nova) -> [Agenda, modular, desativada] -> Perguntas Frequentes
 * (nova) -> Captação (agora com razões-para-escolher + canais diretos
 * absorvidos, ver lead-capture.tsx).
 *
 * V15 (Caio, 2026-09-15 — "retire completamente a sessão de Presskit"):
 * `<PressKit />` removido da rolagem; import também removido. O
 * componente/arquivo (`components/press-kit.tsx`) foi mantido no
 * projeto sem uso, mesma convenção já aplicada a `contact.tsx` nesta
 * entrega (arquivo não deletado — reintrodução futura, se pedida, não
 * precisa reescrever do zero). Os links de navegação `#press-kit` no
 * header e no rodapé também foram removidos (ver site-header.tsx e
 * site-footer.tsx) — uma âncora para uma seção que não existe mais na
 * página seria um link quebrado.
 *
 * `contact.tsx` (seção "Contato" isolada da V1) fica sem uso — seu
 * conteúdo foi absorvido pelo rodapé de components/lead-capture.tsx;
 * arquivo mantido no projeto, não deletado (remoção de arquivo é
 * escopo maior que esta correção de storytelling).
 *
 * V3 — análise de referências externas (Caio, 2026-09-09): leitura real
 * via Playwright MCP de gavinoattes.com, codiesanchez.com,
 * tonyrobbins.com e marieforleo.com (a mais alinhada, na avaliação de
 * Caio). Mudança estrutural: `TrustBar` (nova) move o sinal de setores
 * atendidos para logo após o Hero — inspirado estruturalmente na barra
 * "You Might Have Seen Me On" da Marie Forleo, e reforçado pela
 * referência PNG anterior, que também trazia prova social cedo. Antes,
 * esse sinal ficava enterrado dentro de Sobre/Autoridade, tarde demais
 * na jornada. `about.tsx` e `service-areas.tsx` também mudaram nesta
 * rodada — ver comentários locais em cada arquivo.
 *
 * V4 — evolução de Art Direction desktop 1440px (Caio, 2026-09-09):
 * UX/arquitetura/conteúdo/ordem/conversão explicitamente aprovados e
 * NÃO alterados nesta rodada — mudança é só de execução visual.
 * Problema apontado: a composição anterior (gradiente institucional
 * plano + recortes flutuantes + grids de card muito regulares)
 * funcionava, mas lia como genérica/"AI-generated". Princípios
 * absorvidos por leitura real (nunca clonagem) de stevenbartlett.com,
 * jayshetty.me e coryrichards.com: direção editorial, fotografia como
 * parte da composição (não um recorte pairando sobre um bloco de
 * cor), assimetria controlada, menos cardização, mais variação de
 * ritmo entre seções. Mudanças concretas: (1) Hero e Sobre passam a
 * usar fotografia real de ambiente (Empreende Brazil 2026, extraída
 * nesta rodada de material bruto fornecido por Caio) em vez dos
 * recortes de fundo transparente sobre gradiente — ver hero.tsx/
 * about.tsx; (2) Áreas de Atuação vira um bento assimétrico com texto
 * sobreposto à foto (scrim), não mais 3 cards uniformes com painel de
 * texto separado — ver service-areas.tsx; (3) TrustBar troca os pills
 * de setor (texto fictício) por um carrossel infinito de logos
 * institucionais reais (SEBRAE, SESC, SESI, FEESC, Fepese, FIESC,
 * Governo do BR, Governo de SC — fornecidos nesta rodada) — ver
 * client-logo-carousel.tsx; (4) Prova Social troca as thumbnails de
 * vídeo (recorte) por fotografia real de ambiente. A costura diagonal
 * ("Horizonte de Decisão") é preservada como elemento proprietário de
 * marca — evolui o que ela recorta, não a própria identidade. Escopo
 * desta rodada é desktop 1440px; nenhuma alteração deliberada de
 * mobile/tablet foi feita (o CSS responsivo pré-existente continua no
 * lugar, mas não foi objeto de verificação nesta entrega).
 *
 * V10 (Caio, 2026-09-09): rodada de polimento e interação — Accordion
 * shadcn em Temas de Palestra e FAQ (antes lista estática/`<details>`);
 * conteúdo real de Temas de Palestra preenchido; "Prova Social" renomeada
 * para "Trajetória em Palco" (nome anterior sinalizado como amador);
 * vídeos ganham play real quando há arquivo disponível; Contato perde os
 * 2 chips de intenção rápida e ganha um campo de texto livre; rodapé
 * novo (`SiteFooter`) fecha a página. Ver comentários locais em cada
 * arquivo para o racional completo de cada mudança.
 */
export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <main id="conteudo" className="flex-1">
        <Hero />
        <TrustBar />
        <StatsBand />
        <PainPoints />
        <About />
        <SpeakingTopics />
        <ServiceAreas />
        {ANTES_DEPOIS_VALIDATED ? <BeforeAfter /> : null}
        <SocialProof />
        <WhyNow />
        {AGENDA_ENABLED ? <Agenda /> : null}
        <Faq />
        <LeadCapture />
      </main>
      <SiteFooter />
      <WhatsAppButton />
    </div>
  );
}
