import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { InviteCta } from "@/components/invite-cta";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

/**
 * Temas de Palestra — light, contínuo com Áreas de Atuação (sem borda
 * entre as duas, ver comentário em service-areas.tsx).
 *
 * V10 (Caio, 2026-09-09): conteúdo real fornecido por Caio substitui o
 * placeholder "[Descrição e público ideal — pendente]" — título e
 * descrição de cada tema abaixo não são mais ilustrativos/fictícios. A
 * lista numerada estática (`NumberedList`) foi substituída pelo
 * `Accordion` shadcn (`components/ui/accordion.tsx`, instalado nesta
 * rodada — base-ui, já usado pelo `Select`) para que cada tema abra sob
 * demanda em vez de mostrar a descrição inteira sempre aberta ("dropdown
 * shadcn com animações e todos os estados de hover e click"). Tema 01
 * aberto por padrão (`defaultValue`), Tema 02 fechado — pedido explícito.
 * Título de cada tema em destaque maior e semibold (antes `.text-h3`
 * regular; agora `.text-h3` + `font-semibold` explícito, mesmo em itens
 * fechados, para que a hierarquia funcione mesmo sem abrir).
 *
 * V15 (Caio, 2026-09-15 — "o texto de explicação dos temas está com uma
 * certa limitação horizontal, sobrando muito espaço em branco à
 * direita. distribua igualmente o texto para ambos os lados"): a
 * descrição de cada tema tinha `max-w-2xl` (672px) fixo, bem menor que
 * a largura real do accordion (até 1760px de container) — o texto ficava
 * numa coluna estreita hugging a esquerda, com um vão vazio grande à
 * direita. Cap removido; o parágrafo agora ocupa a largura real
 * disponível dentro do accordion.
 *
 * V21 (Caio, 2026-09-15 — "não iremos mais usar os dropdowns. iremos
 * fazer 3 cards um ao lado do outro... os cards terão apenas os
 * títulos, que já estão nas imagens"): o `Accordion` sai por completo.
 * Cada tema agora é um card mostrando só a imagem fornecida (título já
 * embutido nos pixels da própria imagem — `tema-1/2/3.png`, sem título
 * duplicado como texto HTML sobre o card). Ao clicar, abre um
 * `Dialog` (ver components/ui/dialog.tsx, novo nesta rodada) com a
 * imagem expandida + o subtítulo (mesma `description` de antes para
 * os temas 1 e 2; "Tema 03" é um terceiro card novo, pedido
 * explicitamente com texto placeholder/lorem ipsum até ter conteúdo
 * real). Fecha pelo X (padrão do Dialog) ou clicando fora (backdrop).
 */
// Atualização de conteúdo (Caio, 2026-09-23): os 3 temas passam a ter
// título e descrição reais fornecidos por Caio, substituindo o
// conteúdo anterior (incluindo o placeholder lorem ipsum do Tema 3).
const TOPICS = [
  {
    value: "governanca-ia",
    title:
      "Governança de IA, Transformação Digital e Inteligência de Dados: A Combinação que sua organização precisa",
    description:
      "Quando IA, dados e transformação digital trabalham juntos, com critério e segurança, deixam de ser tendências isoladas e passam a sustentar a decisão de quem lidera. É essa combinação que gera valor real na organização.",
    image: "/images/temas/tema-1.png",
    imageModal: "/images/temas/tema-1-sem-texto.png",
  },
  {
    value: "tendencias-futuro",
    title: "Quais as tendências que transformam o futuro das nossas empresas",
    description:
      "As tendências dão sinais para quem sabe lê-los. Uma leitura clara do que está mudando na gestão, na tecnologia e nos dados permite que a liderança se antecipe e decida na frente.",
    image: "/images/temas/tema-2.png",
    imageModal: "/images/temas/tema-2-sem-texto.png",
  },
  {
    value: "planejamento-orientado-dados",
    title: "Planejamento orientado por dados para transformar cenários em resultado",
    description:
      "Planejar com dados é dar direção às decisões que definem o futuro da organização. Cenários viram prioridades de alto impacto, e a estratégia ganha o caminho para se transformar em resultado.",
    image: "/images/temas/tema-3.png",
    imageModal: "/images/temas/tema-3-sem-texto.png",
  },
] as const;

export function SpeakingTopics() {
  return (
    <section
      id="temas"
      className="diagonal-temas relative border-t border-[var(--border-light)] bg-[var(--surface-light)]"
    >
      {/* Régua estrutural fina no topo — puramente decorativa. */}
      <div
        aria-hidden="true"
        className="seam-ruler pointer-events-none relative overflow-hidden"
      >
        <div className="diagonal-wedge diagonal-seam absolute inset-0" />
        <div className="diagonal-wedge absolute inset-0 translate-x-[2px] translate-y-[2px] bg-[var(--surface-light)]">
          <div className="stats-seam-hachure absolute inset-0" />
        </div>
      </div>

      <div className="px-6 pb-8 pt-4 sm:px-10 sm:pb-10 lg:px-12">
        <div className="mx-auto flex max-w-[1760px] flex-col gap-12">
          <SectionHeading
            tone="light"
            eyebrow="Temas de Palestra"
            title="O que Sidnei leva ao palco"
          />

          <div className="grid gap-6 sm:grid-cols-3">
            {TOPICS.map((topic, index) => (
              <Reveal key={topic.value} index={index}>
                <Dialog>
                  <DialogTrigger
                    aria-label={`Ver detalhes: ${topic.title}`}
                    className="group relative block aspect-[2/3] w-full overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-light)] text-left outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
                  >
                    <Image
                      src={topic.image}
                      alt={topic.title}
                      fill
                      sizes="(min-width: 640px) 33vw, 100vw"
                      className="object-cover transition-transform duration-[var(--motion-slow)] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                    />
                    {/* CTA "Ver mais" (Caio, 2026-09-15 — "adicione um cta
                        branco com 25% de opacidade... abaixo do título,
                        para que o usuário entenda que é algo clicável").
                        Título já vem embutido na própria imagem, perto da
                        base — o badge fica logo abaixo dele, mesma margem
                        lateral. Puramente decorativo (aria-hidden): o
                        card inteiro já é o trigger, com seu próprio
                        aria-label descrevendo a ação.
                        `bg-[var(--on-dark)]/25` em vez de `bg-white/25`
                        (bug descoberto ao testar: as cores nomeadas
                        padrão do Tailwind, `white`/`black`, não geram
                        nenhuma classe CSS neste projeto — confirmado
                        vasculhando o CSS compilado, zero ocorrências de
                        `bg-white`/`text-white`/`bg-black` em qualquer
                        lugar. Só tokens customizados via `var(--...)`
                        funcionam, mesmo padrão já usado em todo o resto
                        do projeto — nunca cor nomeada solta).
                        V22 (Caio, 2026-09-15 — "deixe esses CTAs maiores,
                        do mesmo tamanho do CTA 'convide o sidnei'... 12
                        de arredondamento de borda"): padding/fonte/gap
                        sobem para o mesmo tamanho de `size="cta"` (ver
                        ui/button.tsx: px-7 py-3.5 text-sm font-semibold
                        gap-2) — só o raio diverge do padrão `cta`
                        (--radius-block, 25px): aqui fica fixo em 12px,
                        pedido explicitamente só para este botão. */}
                    <span
                      aria-hidden="true"
                      className="absolute bottom-5 left-5 z-[1] inline-flex items-center gap-2 rounded-[12px] bg-[var(--on-dark)]/25 px-7 py-3.5 text-sm font-semibold text-[var(--on-dark)] backdrop-blur-sm transition-colors duration-[var(--motion-fast)] ease-[var(--ease-out-soft)] group-hover:bg-[var(--on-dark)]/35"
                    >
                      Ver mais
                      <ArrowUpRight
                        className="size-4 transition-transform duration-[var(--motion-fast)] ease-[var(--ease-out-soft)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        strokeWidth={2}
                      />
                    </span>
                  </DialogTrigger>
                  {/* V25 (Caio, 2026-09-15 — "o modal não deve ter
                      scroll. a imagem deve caber inteiramente no modal...
                      aumente a área do texto, sem haver a necessidade de
                      usar um scroll... imagine que de 100% do modal, 40%
                      é da imagem e 60% é do texto. caso encaixe melhor,
                      deixe 35% para a imagem e 65% para o texto"): a V24
                      ainda dependia de `overflow-y-auto` na coluna de
                      texto como rede de segurança. Investigando ao vivo
                      (medindo `scrollHeight`/`clientHeight` no browser),
                      a causa raiz real não era a proporção 48/52 nem o
                      padding — era o próprio `DialogTitle` usando
                      `text-h2` (token de heading de seção inteira,
                      calculado em ~75px de fonte neste breakpoint), que
                      sozinho ocupava ~390px de altura para um título
                      longo como o do Tema 1. Nenhum ajuste de proporção
                      ou padding resolveria isso. Corrigido trocando para
                      `text-h3` (mesmo tamanho já usado como default em
                      `ui/dialog.tsx`, max ~34px) — proporcional a um
                      título de modal, não de seção de página. Com o
                      título no tamanho certo, a proporção 35% imagem /
                      65% texto (`sm:w-[35%]`/`sm:w-[65%]`) cabe os 3
                      temas confortavelmente sem scroll dentro do modal
                      de `h-[min(88vh,800px)]` — confirmado medindo
                      `scrollHeight === clientHeight` no Tema 1 (o mais
                      longo). `overflow-y-auto` sai da coluna de texto: o
                      objetivo agora é o conteúdo caber de verdade, não
                      rolar quando não cabe. */}
                  <DialogContent className="h-[min(88vh,800px)] w-[min(1360px,94vw)] max-w-none overflow-hidden p-0">
                    <div className="flex h-full flex-col sm:flex-row">
                      {/* V26 (Caio, 2026-09-15 — "o espaço destinado à
                          imagem deve ser TOTALMENTE preenchido pela
                          mesma!!!"): `object-contain` + padding
                          deixavam fundo navy visível ao redor da
                          imagem (ela encolhia para caber inteira, com
                          respiro). Trocado para `object-cover` sem
                          padding — a imagem preenche 100% da coluna,
                          cortando o excedente em vez de encolher (as
                          artes "sem texto" têm composição central,
                          então o corte por `object-position` padrão
                          — center — não perde o elemento principal).
                          `bg-[var(--navy-950)]` do wrapper permanece
                          como fallback visual durante o carregamento
                          da imagem, agora invisível depois que ela
                          carrega. */}
                      <div className="relative h-[38%] w-full shrink-0 overflow-hidden bg-[var(--navy-950)] sm:h-full sm:w-[35%]">
                        <Image
                          src={topic.imageModal}
                          alt={topic.title}
                          fill
                          sizes="(min-width: 640px) 40vw, 100vw"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex h-full flex-col justify-center gap-8 p-10 sm:w-[65%] sm:p-12 lg:px-16 lg:py-10">
                        {/* V26 (Caio, 2026-09-15 — "aumente um pouco a
                            fonte do título"): `text-h3` (34px máx) para
                            `text-h3-modal`, um degrau novo criado
                            especificamente para este caso pela UI &
                            Design Systems Lead — bem abaixo do salto
                            para `text-h2` (46-76px) que já causou
                            overflow real do modal numa rodada anterior
                            (ver V25 acima). */}
                        <DialogTitle className="text-h3-modal">{topic.title}</DialogTitle>
                        <DialogDescription className="text-body-modal leading-relaxed">
                          {topic.description}
                        </DialogDescription>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </Reveal>
            ))}
          </div>

          <Reveal index={2}>
            <InviteCta tone="light" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
