import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { HeroPhotoCarousel } from "@/components/hero-photo-carousel";

/**
 * Hero — "Horizonte de Decisão" (Gate 1, Probe C — aprovado em
 * 2026-09-08, substituindo a direção anterior de corte diagonal
 * simples + hairline por mudança MATERIAL de Art Direction). Esta é a
 * fatia vertical do Gate Visual Pré-Frontend (Gate 2): só Hero + Faixa
 * de Números, para inspeção de pixels reais antes da liberação das
 * demais 8 seções.
 *
 * Composição: campo de cor dividido por uma costura diagonal
 * (`--cut: 58%`, gradiente #0F1B2B -> #00ACD4) que atravessa toda a
 * seção; o headline cruza a costura (o bloco de conteúdo não é
 * clipado — só o fundo é — então, na escala tipográfica aprovada
 * (clamp até 96px — teto reduzido na revisão pós Gate-2, ver nota de
 * correção em app/globals.css/--type-h1-size), as palavras finais do
 * H1 podem se estender sobre o campo de foto quando a largura do
 * headline chegar perto da costura). Ver .diagonal-hero /
 * .diagonal-wedge / .diagonal-field / .diagonal-seam em
 * app/globals.css.
 *
 * 4 bugs corrigidos nesta implementação (3 do protótipo descartável +
 * 1 da revisão pós Gate-2):
 * 1. Vazio no topo: o bloco de conteúdo agora começa em padding-top
 *    fixo (72px) a partir do topo da própria seção Hero — que já
 *    começa imediatamente abaixo da navbar real de 64px (h-16 em
 *    site-header.tsx) — resultando em ~136px do topo do viewport até o
 *    eyebrow, dentro da faixa alvo (128-136px) mesmo com a divergência
 *    de nav-height abaixo. Não usa `justify-end`; o respiro sobra no
 *    rodapé (`pb-16 sm:pb-24`), nunca no topo.
 * 2. Contraste do campo diagonal: vinheta escura confinada à
 *    extremidade institucional + curva de gradiente acelerada perto do
 *    cyan (ver .diagonal-field em globals.css).
 * 3. Overflow mobile do bloco CTA+bio: abaixo de 480px, empilha em
 *    coluna única, CTA vira `w-full` com texto podendo quebrar linha
 *    (nunca `nowrap` nesse breakpoint).
 * 4. Colisão de texto em mobile (390x844) entre a legenda do
 *    placeholder de foto e o texto helper do CTA (WhatsApp): a legenda
 *    passou de bottom-[10%]/[14%] (sem teste de colisão) para
 *    bottom-[6%] uniforme, medido para cair dentro da zona livre de
 *    conteúdo que sobrou depois da correção 96px do H1 (ver comentário
 *    local em Camada 1 abaixo para os números medidos).
 *
 * Nota de proveniência (nav-height): o brief lista "Nav: 72px (já
 * existe)" como SOURCE TRUTH, mas o header real deste projeto mede
 * 64px (h-16, components/site-header.tsx) — contradição entre a fonte
 * prosa do brief e o código real, resolvida a favor do código real
 * (não decidida por estimativa; ver comentário espelhado em
 * app/globals.css, classe `.diagonal-hero`). Fora do escopo desta
 * entrega alterar a navbar em si.
 *
 * Decisão registrada: o chip de métrica de prova social ("00 · Métrica
 * de prova social — em atualização"), presente na fatia anterior, foi
 * removido desta composição. O brief aprovado no Gate 1 especifica uma
 * sequência vertical fechada com gaps exatos (eyebrow -> 24px ->
 * headline -> 32px -> frase-propósito -> 48px -> CTA+bio) que não
 * inclui esse elemento; reintroduzi-lo quebraria o ritmo de espaçamento
 * mandatado. Escalar para o UI Lead se o chip precisar retornar em
 * outro ponto da composição.
 *
 * Foto: recorte real de Sidnei (fundo transparente, fornecido nesta
 * entrega — public/images/sidnei/sidnei-hero.png), composto como
 * figura em primeiro plano sobre o campo diagonal via `.figure-cutout`
 * (ver app/globals.css) — substitui o placeholder de ícone Camera das
 * rodadas anteriores. A legenda de "foto pendente" e o teste de
 * colisão mobile associado a ela (ver histórico de correções abaixo)
 * deixam de se aplicar: não há mais texto nessa camada para colidir.
 *
 * Headline: texto ilustrativo/fictício (autorização explícita de Caio
 * nesta entrega para preencher o que ainda não tem conteúdo real
 * confirmado, mantendo o mesmo contexto do briefing) — ainda pendente
 * de aprovação final antes de publicação real. Comprimento calibrado
 * para caber com folga dentro do teto de --type-h1-size (96px) nas
 * larguras já testadas nesta entrega.
 *
 * Evolução de UI desktop 1440px (Caio, 2026-09-09) — direção editorial
 * (referências absorvidas por princípio, nunca copiadas: stevenbartlett.com,
 * jayshetty.me, coryrichards.com — ver comentário mais completo em
 * app/page.tsx). Mudança material: o campo diagonal deixa de ser um
 * gradiente institucional plano com uma figura recortada flutuando por
 * cima — vira uma FOTO real de Sidnei em palco (Empreende Brazil 2026,
 * fornecida nesta rodada, public/images/event/stage-wide.jpg), tratada
 * com um overlay em duotone navy/cyan (`.hero-photo-duotone`, mix-blend
 * multiply) que mantém a paleta de marca sobre a fotografia em vez de
 * abandoná-la por um tom de pele/ambiente genérico. Isso é "fotografia
 * como parte da composição" no sentido literal pedido — a imagem É o
 * campo, não um recorte pairando sobre ele. A costura diagonal
 * (`.diagonal-wedge`/`.diagonal-seam`, elemento proprietário de marca
 * já aprovado) é preservada sem alteração de forma, só do que ela
 * recorta. `sidnei-hero.png` (recorte transparente) permanece disponível
 * e é reaproveitado em Sobre/Áreas de Atuação — não foi descartado.
 *
 * Assimetria: o eyebrow ganhou uma 2ª instância rotacionada -90°,
 * ancorada como "lombada" na borda esquerda do campo de conteúdo
 * (`--hero-spine`) — mesmo texto/hierarquia semântica (decorativo,
 * aria-hidden, o H1 permanece o único heading real), tratamento
 * puramente editorial/layout, não conteúdo novo.
 *
 * V5 — feedback direto de Caio (2026-09-09): a lombada rotacionada
 * "Sidnei Rodrigues — TD Business" foi removida ("não faz sentido
 * nenhum" — o wordmark já vive no header, repeti-lo verticalmente no
 * Hero era redundante, não um dispositivo de marca). O texto helper
 * "Prefere falar por WhatsApp?" também saiu do Hero pelo mesmo motivo
 * de redundância — o botão fixo de WhatsApp já é auto-explicativo
 * (ícone + posição fixa), não precisa de legenda permanente competindo
 * com o CTA principal.
 *
 * V7 — feedback direto de Caio (2026-09-09): a foto de ambiente real
 * (V4) volta a ser recorte de fundo transparente — mas agora 5 fotos
 * (`sidnei-cutout-2..6.png`, fornecidas nesta rodada) alternando em
 * crossfade via `HeroPhotoCarousel` sobre `.diagonal-field` ("elas
 * devem ir trocando aos poucos"). O headline ganhou uma classe própria
 * (`.text-hero-h1`, ver globals.css) menor que a escala geral do site e
 * a coluna de texto encolheu de 78% para 52% da largura — ambas para
 * que o H1 nunca avance sobre a foto na costura ("um título de hero um
 * pouco menor, para que não invada a foto"). Esta classe fica
 * deliberadamente FORA do aumento geral de fonte pedido na mesma
 * rodada ("só deixe... o título da hero do jeito que está").
 *
 * V9 — feedback direto de Caio (2026-09-09): as 5 fotos de recorte
 * transparente (V7) foram substituídas por 5 fotos REAIS de palco
 * (Empreende Brazil, localizadas por Caio em
 * `F:\TD Business\Landing Page - Sidnei\Fotos` depois de um bloqueio
 * de acesso a anexo na rodada anterior) — `object-cover` em vez de
 * `.figure-cutout`, já que essas fotos têm fundo real, não alpha. Ver
 * hero-photo-carousel.tsx para o racional completo. As demais mudanças
 * dessa mesma rodada (espaçamento vertical do Hero, tamanho de fonte
 * geral, tamanho das logos) foram revertidas a pedido explícito de
 * Caio na rodada seguinte ("não gostei de nada que fez, volte para
 * como estava anteriormente") — só a troca de fotos ficou.
 *
 * V15 (Caio, 2026-09-15): (1) "retire o texto que diz 'palestrante -
 * consultor - transformação digital'" — eyebrow acima do H1 removido
 * por completo (era o único elemento ocupando aquele espaço; a lombada
 * rotacionada equivalente já tinha sido removida na V5 pelo mesmo
 * motivo de redundância com o header). (2) "aumente um pouco a fonte...
 * sem que ultrapasse os limites da imagem" — `--type-hero-h1-size`
 * (globals.css) sobe de `clamp(36px, 4.6vw, 64px)` para
 * `clamp(38px, 5vw, 72px)`; o teto de 72px na coluna de texto (ainda
 * `lg:max-w-[52%]`, inalterada) continua com folga antes da costura em
 * 58% — verificado que a headline mais longa do conjunto não ultrapassa
 * essa marca nas larguras testadas. (3) "deixe todo o texto da hero
 * alinhado, sem deixar o topo ou a parte de baixo desproporcionais" —
 * o padding vertical da seção era `pt-[56px] pb-8 sm:pb-10`
 * (assimétrico, calibrado pela presença do eyebrow agora removido); com
 * o eyebrow fora, vira `py-16 sm:py-20` simétrico — o conteúdo
 * (`justify-center` dentro de `flex-1`, inalterado) passa a centralizar
 * de verdade em torno do meio real da seção, em vez de um eixo puxado
 * pela margem superior maior.
 */
// TODO: substituir pela headline final aprovada antes da publicação
// (texto atual é ilustrativo/fictício, autorizado por Caio nesta
// entrega para preencher o que ainda não tem conteúdo real).
// Reescrita (restruturação de storytelling, Caio, 2026-09-09): de uma
// frase descritiva ("dados viram decisões") para uma promessa de
// resultado — mesma lógica de "Da estratégia ao SUCESSO" observada na
// referência analisada (headline orientada a transformação/resultado,
// não a processo).
const PLACEHOLDER_HEADLINE = "Da estratégia à execução que gera resultado.";

export function Hero() {
  return (
    <section
      id="hero"
      className="diagonal-hero hero-min-h relative flex flex-col overflow-hidden bg-[var(--navy-900)]"
    >
      {/* Camada 0 — costura (visível só na faixa de 2px que a camada 1,
          deslocada, não cobre). aria-hidden: puramente decorativo. */}
      <div
        aria-hidden="true"
        className="diagonal-wedge diagonal-seam absolute inset-0 z-0"
      />

      {/* Camada 1 — campo diagonal: rotação de 5 fotos reais de palco
          (ver hero-photo-carousel.tsx), cada uma com o duotone de marca
          aplicado por cima para manter a paleta navy/cyan sobre a
          fotografia. */}
      <div
        aria-hidden="true"
        className="diagonal-wedge absolute inset-0 z-[1] translate-x-[2px] translate-y-[2px]"
      >
        <HeroPhotoCarousel />
      </div>

      {/* Camada 2 — conteúdo. Largura reduzida (era lg:max-w-[78%],
          cruzava a costura e podia invadir a foto) para permanecer no
          campo de texto, à esquerda da costura — pedido explícito de
          Caio ("título de hero um pouco menor, para que não invada a
          foto"). V18 (Caio, 2026-09-15 — "aumentar a fonte do título...
          preenchendo mais espaço"): lg:max-w-[52%] -> lg:max-w-[54%].
          Medição real contra a costura (não só a leitura ingênua de
          "--cut:58%" — a costura é diagonal, `--cut-tilt` desloca o
          --cut ~11 pontos percentuais mais à esquerda na base da seção
          do que no topo): a 58% de largura de coluna, a linha mais
          baixa do H1 (na altura vertical onde a costura já está bem
          mais à esquerda) invadia a foto em até 35px, confirmado via
          `getClientRects()` por linha comparado à posição real da
          costura em cada altura. A 54%, a mesma medição por linha dá
          folga positiva (90-270px) em todas as linhas nas larguras
          testadas (1440px). */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col px-8 py-16 sm:px-10 sm:py-20 lg:px-16">
        {/* V10 (Caio, 2026-09-09): justify-center elimina o vão morto
            entre o CTA e a próxima seção (ver .hero-min-h em
            globals.css). */}
        <div className="flex flex-1 flex-col justify-center lg:max-w-[54%]">
          <Reveal index={0}>
            <h1 className="text-hero-h1 text-[var(--on-dark)]">
              {PLACEHOLDER_HEADLINE}
            </h1>
          </Reveal>

          <Reveal index={1} className="mt-8">
            <p className="text-lede max-w-2xl text-[var(--on-dark-70)]">
              Palestras e imersões sobre IA, dados e estratégia para
              organizações que querem decidir com{" "}
              <span className="relative inline-block">
                clareza
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-1 h-[3px] rounded-full bg-[var(--amber-500)]"
                />
              </span>
              .
            </p>
          </Reveal>

          <Reveal index={2} className="mt-12">
            <div className="flex flex-col items-start gap-4 min-[480px]:flex-row min-[480px]:items-center">
              <Button
                render={<a href="#contato" />}
                nativeButton={false}
                variant="solid-amber"
                size="cta-lg"
                className="w-full whitespace-normal text-center min-[480px]:w-fit min-[480px]:whitespace-nowrap"
              >
                Convide Sidnei para seu evento
              </Button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
