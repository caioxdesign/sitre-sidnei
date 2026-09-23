import Image from "next/image";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

/**
 * Sobre/Autoridade — dark, --surface-page (mesmo tom do Hero).
 * Explicitamente NÃO cronológica (plano de UX, Seção 9 / brief): sem
 * linha do tempo, sem lista de datas — só bio executiva + frase-
 * propósito.
 *
 * Restruturação de storytelling (Caio, 2026-09-09): (1) "Setores
 * atendidos" mudou de lugar — agora vive em components/trust-bar.tsx,
 * logo após o Hero (prova social movida para o início da jornada,
 * inspirada estruturalmente em marieforleo.com, ver comentário
 * naquele componente), então não é mais repetido aqui; (2) a bio
 * ganhou um parágrafo de propósito em tom mais pessoal — "história
 * comovente" foi pedido explicitamente, mas nenhum fato biográfico
 * específico e não confirmado sobre Sidnei (uma virada de vida
 * concreta, uma data, um evento pessoal) é inventado aqui — isso seria
 * fabricar um dado factual sobre uma pessoa real, categoria de risco
 * diferente de copy narrativa ilustrativa. O parágrafo de propósito
 * abaixo é voz/posicionamento (por que o trabalho importa), nunca uma
 * citação literal atribuída a ele nem um evento de vida específico.
 *
 * Evolução de UI desktop 1440px (Caio, 2026-09-09, primeira rodada): o
 * painel de foto trocou o placeholder de gradiente + recorte por uma
 * fotografia real de ambiente em `object-cover`. Proporção do painel
 * também cresce de 40% para 44% (assimetria controlada).
 *
 * V7 (Caio, 2026-09-09, rodada seguinte — "utilize a foto 'Hero' em
 * anexo para a sessão 'Autoridade'"): o retrato real de ambiente foi
 * substituído pelo recorte `sidnei-hero.png` (a mesma foto "Hero.svg"
 * fornecida para o Hero originalmente) sobre gradiente de marca —
 * reverte para `.figure-cutout`, coerente com a mesma mudança no
 * próprio Hero nesta rodada.
 *
 * Extensão da costura (addendum de enriquecimento, 2026-09-08 —
 * substitui a decisão anterior desta seção de usar só cantos
 * arredondados): a tabela de densidade do brief agora inclui
 * Sobre/Autoridade explicitamente ("Fundo estrutural atrás do retrato +
 * lista de credenciais; texto não atravessa a linha", --cut ~50%,
 * gradiente suavizado). `.diagonal-about` (--cut: 50%) + variante
 * espelhada `.diagonal-wedge-left`/`-inverted` (o retrato desta seção
 * fica à ESQUERDA, diferente do Hero/Faixa de Números — ver comentário
 * em app/globals.css sobre a correção) cria uma camada de fundo
 * full-bleed atrás de toda a seção.
 *
 * V8 (Caio, 2026-09-09): uma composição com card em gradiente
 * âmbar→cyan, foto "saindo do quadro" e citação sobreposta foi tentada
 * nesta rodada e revertida a pedido explícito de Caio na rodada
 * seguinte ("não gostei de nada que fez, volte para como estava
 * anteriormente") — de volta à versão V7 abaixo, sem alterações.
 *
 * V15 (Caio, 2026-09-15 — "o nome da sessão deve ser 'quem é' e o
 * título deve ser somente 'Sidnei Rodrigues'"): eyebrow "Autoridade" ->
 * "Quem é"; título "Sobre Sidnei Rodrigues" -> "Sidnei Rodrigues". `id`
 * da seção (`#sobre`, usado por âncoras no header/footer) mantido por
 * compatibilidade — só o texto visível mudou.
 *
 * V19 (Caio, 2026-09-15 — duas referências visuais enviadas: uma foto
 * real de evento para o fundo, e um comp mostrando a composição-alvo)
 * — 1ª tentativa rejeitada ("ficou horrível", não parecia
 * minimamente com a referência): tinha colocado a foto real dentro do
 * mesmo cartão arredondado/contido que já existia (Camada única, 44%
 * de largura, `rounded-[...]`, `overflow-hidden`), então ficou
 * confinada a um retângulo pequeno em vez do campo full-bleed que a
 * referência mostra — sangrando até a borda esquerda real da tela,
 * sem cantos arredondados, sem moldura.
 *
 * V19b — reconstrução: o painel de foto deixa de ser um cartão contido
 * dentro da coluna de 44% e vira uma CAMADA full-bleed atrás de toda a
 * seção (mesmo mecanismo já usado pela Camada 0/1 anteriores —
 * `.diagonal-wedge-left-inverted`, `--cut: 36%` de `.diagonal-about` —
 * só que agora carregando a foto real do evento em vez do gradiente
 * abstrato `.diagonal-field`). O recorte `sidnei-hero.png` do Sidnei
 * sai do cartão arredondado e passa a "ficar de pé" diretamente sobre
 * esse campo (mesma técnica do Hero: `.figure-cutout` direto sobre o
 * campo diagonal, sem moldura própria) — preservado sem nenhuma
 * alteração de arquivo/tratamento, só a camada atrás dele muda.
 * Acima do campo, uma faceta poligonal cyan (fill translúcido +
 * contorno, gradiente do canto superior esquerdo) cruza
 * diagonalmente — eco explícito do vidro facetado do comp de
 * referência, não apenas linhas finas soltas (tentativa V19 anterior,
 * ilegível demais para ler como elemento de design). O rótulo vertical
 * "IDEIAS/DADOS/PESSOAS/IMPACTO" migra para o canto real da seção
 * (fora do cartão que não existe mais).
 *
 * V20 (Caio, 2026-09-15 — "retire a linha transversal que separa a
 * composição de imagens do texto. utilize a imagem [...] no lugar da
 * composição que criamos [...] aplique um gradiente de opacidade
 * 0-100"): mudança de abordagem — em vez de recriar a composição
 * (foto de fundo + duotone + faceta SVG + rótulo vertical) com várias
 * camadas CSS independentes, Caio forneceu a composição pronta como
 * um único arquivo de imagem. Isso substitui inteiramente as Camadas
 * 0-2 anteriores (costura, campo+duotone, faceta SVG) — a foto do
 * Sidnei já vem embutida na imagem fornecida, então `sidnei-hero.png`
 * (recorte separado) não é mais usado nesta seção. A linha de costura
 * reta (`.diagonal-seam`) que cortava a composição ao meio sai por
 * completo — a transição agora é só o `mask-image`/gradiente de
 * opacidade abaixo, sem nenhuma borda dura. Layout: coluna de imagem
 * cresce (era 44%, mecanismo de clip-path diagonal; agora full-bleed
 * até a borda esquerda real da tela, sem clip nenhum — só a máscara de
 * opacidade decide onde ela desaparece) e a coluna de texto encolhe/
 * desloca para a direita (`lg:w-[38%]`, gap reduzido de 16 para 8) —
 * "alinhe o texto mais à direita, para que não haja tanto respiro... e
 * a imagem tenha bastante foco".
 *
 * V20b (Caio, 2026-09-15 — 2ª imagem de referência enviada na mesma
 * rodada, substitui a 1ª): a imagem V20 original (`quem-e-flat.png`)
 * era um recorte do comp de layout (continha o rótulo vertical
 * "IDEIAS/DADOS/PESSOAS/IMPACTO" já embutido nos pixels). A nova
 * imagem fornecida (`referencia-v2.png`) é uma fotografia limpa —
 * só Sidnei + plateia desfocada + um portal/moldura de vidro cyan
 * atrás dele, sem nenhum texto embutido. Para não perder o rótulo de
 * palavras-chave que estava na composição anterior, ele volta como
 * elemento HTML real (mesmo texto/estilo de antes), sobreposto no
 * canto superior esquerdo por cima da nova foto, em vez de fazer parte
 * dos pixels da imagem.
 *
 * V20c (Caio, 2026-09-15 — "diminua o tamanho da imagem, ficou muito
 * grande"): a largura de 64% (mais o espaçador correspondente em
 * `aspect-[4/5]`, proporção alta/vertical) fazia a imagem dominar a
 * seção inteira, inclusive empurrando a altura da seção para cima já
 * que a coluna de texto usa `items-center` contra ela. Reduzida para
 * 46% de largura + espaçador em `aspect-[4/3]` (menos vertical) — a
 * coluna de texto volta a crescer (`lg:w-[48%]`, era 38%) para ocupar
 * o espaço liberado em vez de deixar vão vazio.
 *
 * V20d (Caio, 2026-09-15 — "agora você diminuiu demais. aumente um
 * pouco só" + "a imagem perdeu muita qualidade"): largura sobe de 46%
 * para 52% (espaçador 42% -> 47%, texto 48% -> 43% para compensar) —
 * ajuste fino, não a reversão completa do V20c. Qualidade: o
 * `next/image` estava usando o `quality` padrão do Next (75), visível
 * demais numa foto com gradientes suaves de azul escuro (banding);
 * `quality={95}` explícito no componente — o arquivo de origem
 * (`referencia-v2.png`, 1536x1024) sempre teve resolução de sobra, o
 * problema era só a reamostragem do otimizador do Next, não a fonte.
 *
 * V20e (Caio, 2026-09-15 — "aumente ainda mais, em torno de 25%...
 * retire o texto no canto superior esquerdo"): 52% -> 65% de largura
 * (espaçador 47% -> 59%, texto 43% -> 36% para compensar), mesmo
 * incremento relativo (~25%) em todas as três medidas para manter a
 * proporção da composição. `quality={95}` mantido (mesma correção do
 * V20d, não regride). O rótulo vertical "Ideias/Dados/Pessoas/
 * Impacto" que tinha voltado como overlay HTML no V20b sai por
 * completo — Caio anexou um print mostrando exatamente esse texto no
 * canto superior esquerdo pedindo a remoção.
 *
 * Atualização de conteúdo (Caio, 2026-09-23): bio consolidada num único
 * parágrafo-subtítulo com conteúdo real fornecido por Caio (substitui
 * os dois parágrafos genéricos/ilustrativos anteriores). A frase de
 * efeito final muda de "Transformar conhecimento em decisões que geram
 * impacto." para "Não basta planejar. É preciso implementar." — o
 * destaque âmbar (antes em "impacto") migra para "implementar", palavra
 * que Caio pediu para ficar em foco.
 *
 * Troca de foto (Caio, 2026-09-23 — "aplique... a foto de nome 'Quem
 * Sou'"): `referencia-v2.png` sai, `quem-sou.png` entra no mesmo lugar
 * — mesmas dimensões (`fill` + `object-cover`, coluna full-bleed até
 * 65% em desktop) e o mesmo `maskImage` de opacidade 100%->0% que gera
 * o degradê ao se aproximar do texto, sem nenhuma outra alteração de
 * layout.
 */
export function About() {
  return (
    <section
      id="sobre"
      className="relative overflow-hidden border-t border-[var(--border-dark)] bg-[var(--surface-page)] px-6 py-8 sm:px-10 sm:py-10 lg:px-12"
    >
      {/* Composição única fornecida por Caio (V20) — substitui as 4
          camadas CSS anteriores (costura + campo/duotone + faceta SVG +
          rótulo vertical), todas já embutidas nesta imagem. Full-bleed
          até a borda esquerda real da tela (fora do wrapper
          `max-w-[1760px]` do conteúdo) — "a imagem deve chegar até o
          limite da tela, sem corte de borda". A transição para o fundo
          escuro da seção é só o `maskImage` abaixo (gradiente de
          opacidade 100% -> 0%), sem nenhuma linha reta cortando a
          composição. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 z-0 w-full lg:w-[65%]"
      >
        <Image
          src="/images/quem-e/quem-sou.png"
          alt=""
          fill
          quality={95}
          sizes="(min-width: 1024px) 65vw, 100vw"
          className="object-cover object-[center_25%]"
          style={{
            maskImage:
              "linear-gradient(90deg, black 0%, black 55%, transparent 92%)",
            WebkitMaskImage:
              "linear-gradient(90deg, black 0%, black 55%, transparent 92%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1760px] flex-col gap-14 lg:flex-row lg:items-center lg:gap-8">
        {/* Espaçador — mantém a coluna de texto fora da área "cheia" da
            imagem em telas grandes; a própria imagem já se estende por
            baixo dele e esmaece via máscara antes de chegar ao texto.
            `div` simples (não `Reveal`) porque não há conteúdo/filho
            para animar aqui — é só reserva de espaço no layout. */}
        <div aria-hidden="true" className="aspect-[4/3] w-full lg:w-[59%]" />

        {/* Bio + frase-propósito + logos — desloca para a direita e
            encolhe (era 56%) para reduzir o respiro e dar mais foco à
            imagem, como pedido ("alinhe o texto mais à direita"). */}
        <div className="flex flex-col gap-8 lg:w-[36%] lg:shrink-0">
          <SectionHeading
            tone="dark"
            eyebrow="Quem é"
            title="Sidnei Rodrigues"
          />

          <Reveal index={2}>
            <p className="text-body-lg max-w-2xl text-[var(--on-dark-70)]">
              Referência em transformação digital e inteligência de dados,
              conduz projetos de abrangência nacional. Liderou a construção
              do Planejamento Estratégico do Estado de Santa Catarina e atua
              em iniciativas para o Ministério da Saúde, a Agência Espacial
              Brasileira e o Sistema S. Doutor em Engenharia e Gestão do
              Conhecimento e Mestre em Administração pela UFSC, une base
              acadêmica e experiência de campo para elevar a maturidade de
              gestão das organizações brasileiras.
            </p>
          </Reveal>

          <Reveal index={4}>
            <p className="text-h3 max-w-xl text-[var(--on-dark)]">
              Não basta planejar. É preciso{" "}
              <span className="relative inline-block">
                implementar
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-0.5 h-[3px] rounded-full bg-[var(--amber-500)]"
                />
              </span>
              .
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
