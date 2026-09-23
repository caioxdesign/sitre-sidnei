"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import { BarChart3, ShieldCheck, Workflow, Target, type LucideIcon } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

/**
 * Por que agir agora — nova seção (restruturação de storytelling, Caio,
 * 2026-09-09), inspirada na estrutura de uma versão anterior da landing
 * (referência visual analisada, nunca clonada literalmente): checklist
 * de urgência/objeção antes do formulário, em vez de ir direto de Prova
 * Social para Captação. Conteúdo ilustrativo/fictício, mesma
 * autorização já em uso nesta entrega — sem estatística inventada, só
 * argumentação de urgência ancorada nos temas reais do briefing.
 *
 * light, --surface-light — entre Prova Social e Captação.
 *
 * V13 (Caio, 2026-09-09 — "o título e subtítulo estão extremamente
 * juntos, enquanto os 4 cards estão ocupando muito espaço. distribua-os
 * de uma maneira mais harmônica"): três mudanças que endereçam a causa
 * raiz, não só o sintoma isolado. (1) `lg:items-center` centralizava o
 * bloco de heading (compacto) verticalmente contra uma lista de 4 cards
 * bem mais alta — o heading "encolhia" visualmente no meio dessa altura
 * emprestada; trocado por `lg:items-start`, os dois topos alinham como
 * uma composição editorial normal. (2) O gap interno do próprio
 * `SectionHeading` (eyebrow/título/descrição, 16px) ficava
 * desproporcional ao tamanho de fonte já grande desta rodada — usa o
 * novo prop opcional `gap` (ver section-heading.tsx) só aqui, sem mexer
 * no padrão das outras seções. (3) A lista de 4 razões, antes uma
 * coluna única e alta ocupando `flex-1` (toda a largura restante),
 * virou grid 2×2 em desktop — reduz a altura total (menos dominante),
 * distribui mais na horizontal (rodada de layout) e o heading ganha
 * largura própria fixa (`lg:w-[38%]`) em vez de só um teto de
 * `max-w-md` dentro de um `justify-between` que sobrava espaço vazio.
 *
 * V14 (Caio, 2026-09-09 — "de mais espaço horizontal para o título e
 * subtítulo... organize melhor os cards para que não haja espaço vazio
 * na sessão"): a V13 corrigiu o alinhamento mas criou um desequilíbrio
 * novo — a coluna de heading em `lg:w-[38%]` ainda era estreita demais
 * para o título longo, forçando 4-5 linhas de quebra (coluna alta), e a
 * grid 2×2 de cards ao lado, mais curta, ficava ancorada no topo
 * (`items-start`) deixando um vão vazio visível abaixo dela. Duas
 * mudanças: (1) heading sobe de `lg:w-[38%]` para `lg:w-[44%]` (título
 * quebra em menos linhas, mais largura de leitura) com `gap-20` ->
 * `gap-14` entre as colunas (espaço redistribuído para o conteúdo em
 * vez do respiro entre colunas); (2) a linha vira `lg:items-stretch`
 * (a lista de cards estica para a mesma altura do heading) e o grid
 * ganha `content-center`, centralizando o bloco 2×2 dentro dessa altura
 * — preenche o espaço disponível de forma proporcional em vez de deixar
 * um vazio no rodapé da coluna mais curta.
 *
 * V15 (Caio, 2026-09-15 — "o título está muito quebrado. melhore de
 * uma maneira que ele não seja quebrado em tantas linhas. se for
 * melhor, coloque os 4 cards embaixo do título e subtítulo, deixando-os
 * maiores e com texto/ícones maiores"): a V14 ainda espremia o heading
 * numa coluna de 44% ao lado dos cards — título longo continuava
 * quebrando em várias linhas. Adotada a sugestão explícita de Caio:
 * layout deixa de ser 2 colunas lado a lado e vira empilhado —
 * heading em largura cheia (capado em `max-w-4xl` só para leitura
 * confortável, não mais espremido por uma coluna de cards ao lado,
 * quebra em bem menos linhas) e os 4 cards abaixo, em uma única fileira
 * de 4 colunas no desktop — maiores (padding `px-6 py-6` -> `px-8 py-8`,
 * ícone `size-5` -> `size-8`, texto `.text-body` -> `.text-body-lg`),
 * preenchendo a largura toda sem sobrar vazio (4 células iguais, sem
 * necessidade de `content-center`/`items-stretch` para compensar
 * alturas diferentes entre coluna de heading e coluna de cards — esse
 * problema não existe mais nesta estrutura).
 *
 * V21 (Caio, 2026-09-15 — "os 4 cards devem estar à direita do texto
 * da sessão. deixe-os mais artísticos, aplique um ícone lucide que
 * condiz com o texto de cada um. faça um uso artístico e interessante
 * de gradiente"): volta à composição de duas colunas (heading à
 * esquerda, cards à direita em grid 2x2) — desta vez cada card carrega
 * seu próprio ícone (em vez do `CheckCircle2` genérico repetido 4x) e
 * um gradiente de marca próprio (navy/cyan/âmbar, nunca fora da
 * paleta), cada um com ângulo/stops/glow diferentes para não ler como
 * o mesmo card 4 vezes. Texto sempre `--on-dark` (branco) sobre fundo
 * escuro o bastante para manter contraste alto — verificado que nenhum
 * dos 4 gradientes clareia o suficiente para comprometer isso.
 *
 * Atualização de conteúdo (Caio, 2026-09-23): título/subtítulo e os 4
 * textos dos cards passam a ser conteúdo real fornecido por Caio
 * (substituem o texto ilustrativo/fictício anterior). Ícones
 * realinhados ao novo texto de cada card — `Unlock` sai (não
 * correspondia a nenhum dos 4 novos textos), `Target` entra para
 * "Cenários que viram prioridades de alto impacto"; gradientes/cores
 * mantidos inalterados, só a associação texto->ícone muda.
 *
 * V24 (Caio, 2026-09-23 — 1ª tentativa de encaixar a foto "Por que agir
 * agora.png" foi um pequeno retângulo `max-w-sm`/`aspect-[4/5]` boiando
 * sozinho abaixo do subtítulo, fora do grid de cards, com o tom quente
 * da foto de palco (pele, luz âmbar) batendo de frente com a paleta
 * fria navy/cyan dos 4 cards ao lado — resultado: "do jeito que está eu
 * ODIEI"). 1ª correção: a foto virou uma 5ª célula do próprio grid de
 * `REASONS` (`row-span-2`), com overlay em gradiente navy/cyan por cima
 * — resolvia o choque de cor, mas a foto ainda só igualava a altura dos
 * cards, não da seção inteira.
 *
 * V25 (Caio, 2026-09-23 — Caio propôs 2 opções para dar mais foco à
 * foto; escolhida a opção onde ela "preenche verticalmente todo o
 * espaço da sessão, alinhada com o nome da sessão e os cards"):
 * reestruturado de novo. Duas colunas lado a lado: a esquerda empilha
 * `SectionHeading` + os 4 cards `REASONS` (2×2, sem a foto dentro do
 * grid); a direita é só a foto, um painel único que estica
 * (`lg:items-stretch` na linha externa) para cobrir a MESMA altura
 * total dessa coluna — do topo do eyebrow até a base da última linha de
 * cards. O gradiente navy/cyan sobre a foto (mesmo vocabulário de
 * `REASONS.gradient`) é mantido, agora ainda mais necessário por a foto
 * ocupar bem mais área da composição.
 */
type Reason = {
  text: string;
  icon: LucideIcon;
  gradient: string;
  iconColor: string;
};

const REASONS: Reason[] = [
  {
    text: "Liderança que decide com dados e método",
    icon: BarChart3,
    gradient:
      "radial-gradient(120% 140% at 100% 0%, var(--cyan-950) 0%, transparent 55%), linear-gradient(135deg, var(--navy-800) 0%, var(--navy-950) 100%)",
    iconColor: "var(--cyan-300)",
  },
  {
    text: "IA que gera valor com governança e segurança",
    icon: ShieldCheck,
    gradient:
      "radial-gradient(120% 140% at 0% 100%, var(--cyan-950) 0%, transparent 55%), linear-gradient(150deg, var(--navy-950) 0%, var(--navy-800) 100%)",
    iconColor: "var(--cyan-300)",
  },
  {
    text: "Cenários que viram prioridades de alto impacto",
    icon: Target,
    gradient:
      "radial-gradient(110% 130% at 100% 100%, rgba(246,211,9,0.16) 0%, transparent 55%), linear-gradient(160deg, var(--navy-900) 0%, var(--navy-700) 100%)",
    iconColor: "var(--cyan-300)",
  },
  {
    text: "Estratégia e execução falando a mesma língua",
    icon: Workflow,
    gradient:
      "radial-gradient(120% 140% at 0% 0%, var(--cyan-950) 0%, transparent 55%), linear-gradient(200deg, var(--navy-800) 0%, var(--navy-950) 60%, var(--navy-900) 100%)",
    iconColor: "var(--cyan-300)",
  },
];

/**
 * V22 (Caio, 2026-09-15 — "os cards devem ter a mesma altura. a quebra
 * de texto deve ser ao fim do texto, não no começo"): causa raiz medida
 * ao vivo no browser em várias larguras desktop — o grid 2x2 estica cada
 * `li` só até a altura da SUA PRÓPRIA linha (stretch é por linha, não
 * entre as duas), então a linha com o texto mais longo ("Autonomia
 * real...") ficava mais alta que a outra. Isso também empurrava
 * `justify-between` a abrir espaço vazio ENTRE o ícone e o texto (não
 * depois do texto) nos cards mais curtos da linha mais alta.
 *
 * V23 (Caio, 2026-09-15 — "você os deixou imensos agora... devem ter a
 * mesma altura do card que diz 'Autonomia real...'. faça deixe a mesma
 * distância atual do padding superior para o padding inferior"): a V22
 * usava `min-h-[380px]` fixo, calculado para o pior caso (coluna mais
 * estreita, 1024px) — correto ali, mas exagerado em larguras maiores
 * (1440px+), onde o próprio card "Autonomia" precisa de bem menos altura
 * (menos linhas de texto numa coluna mais larga). Um valor fixo nunca
 * acompanha isso. Corrigido com medição real no browser: mede a altura
 * NATURAL de cada card (sem nenhum mínimo aplicado), usa a maior delas —
 * sempre a do card "Autonomia", o texto mais longo — como altura comum
 * dos 4, e remede a cada resize. Como a altura aplicada é exatamente a
 * altura natural do card mais alto (nunca um valor arbitrário maior),
 * `justify-start` já garante que a distância padding-superior ->
 * padding-inferior daquele card de referência não muda em nada — só os
 * outros 3 (mais curtos) ganham uma sobra visível abaixo do texto, o que
 * é inerente a "mesma altura para todos".
 */
function ReasonsGrid() {
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Aplicação puramente imperativa (sem estado React controlando
  // min-height): a primeira tentativa usava `useState` + reset
  // manual do DOM para "" antes de remedir, e isso tinha um bug real
  // — quando a altura medida repetia o mesmo valor de antes (comum,
  // já que fonte/resize disparam a medição várias vezes), o
  // `setCardHeight` via `Object.is` não desencadeava novo render, e o
  // reset manual para "" (feito só pra medir a altura natural) ficava
  // como valor final, nunca sendo reaplicado — os cards voltavam a
  // esticar cada um só até a altura da própria linha do grid.
  // Corrigido aplicando a altura calculada diretamente no DOM (mesmo
  // `el.style.minHeight`), sem depender de um re-render do React para
  // persistir o valor.
  useLayoutEffect(() => {
    function measure() {
      const items = itemRefs.current;
      items.forEach((el) => {
        if (el) el.style.minHeight = "0px";
      });
      const tallest = Math.max(
        ...items.map((el) => el?.getBoundingClientRect().height ?? 0)
      );
      items.forEach((el) => {
        if (el) el.style.minHeight = `${tallest}px`;
      });
    }

    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure).catch(() => {});
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <ul className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {REASONS.map((reason, index) => (
        <Reveal key={reason.text} index={index + 1}>
          <li
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            className="relative flex h-full flex-col justify-start gap-6 self-start overflow-hidden rounded-[var(--radius-card)] p-7"
            style={{ background: reason.gradient }}
          >
            <reason.icon
              className="size-9 shrink-0"
              style={{ color: reason.iconColor }}
              strokeWidth={1.85}
              aria-hidden="true"
            />
            <span className="text-body-lg font-medium text-[var(--on-dark)]">
              {reason.text}
            </span>
          </li>
        </Reveal>
      ))}
    </ul>
  );
}

/**
 * Painel de foto único (ver V25 acima) — ocupa a coluna direita inteira,
 * esticando (`h-full`, herdado do `lg:items-stretch` da linha externa em
 * `WhyNow`) para cobrir a mesma altura da coluna esquerda (heading + os
 * 4 cards), não mais só a altura dos cards.
 */
function PhotoPanel({ className }: { className?: string }) {
  return (
    <Reveal index={0} className={className}>
      <div className="relative h-72 w-full overflow-hidden rounded-[var(--radius-card)] sm:h-[26rem] lg:h-full lg:min-h-[520px]">
        <Image
          src="/images/why-now/por-que-agir-agora.png"
          alt="Sidnei Rodrigues palestrando, gesticulando para a plateia"
          fill
          sizes="(min-width: 1024px) 40vw, 100vw"
          className="object-cover object-top"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(165deg, rgba(0,172,212,0.14) 0%, rgba(0,48,59,0.35) 45%, rgba(10,19,31,0.82) 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-[var(--on-dark)]/10"
        />
      </div>
    </Reveal>
  );
}

export function WhyNow() {
  return (
    <section
      id="por-que-agora"
      className="relative border-t border-[var(--border-light)] bg-[var(--surface-light)] px-6 py-8 sm:px-10 sm:py-10 lg:px-12"
    >
      <div className="mx-auto flex max-w-[1760px] flex-col gap-14 lg:flex-row lg:items-stretch lg:gap-12">
        <div className="flex flex-col gap-10 lg:w-[54%] lg:shrink-0">
          <SectionHeading
            tone="light"
            eyebrow="Por que agir agora"
            title="Estratégia, dados e decisão caminham juntos."
            description="A tecnologia avançou, a forma de decidir precisa acompanhar. IA, dados e estratégia mudaram a forma de liderar e entender isso é o primeiro passo"
            gap="gap-6"
          />
          <ReasonsGrid />
        </div>

        <PhotoPanel className="lg:flex-1" />
      </div>
    </section>
  );
}
