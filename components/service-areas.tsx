import Image from "next/image";
import { GraduationCap, Mic, Presentation, UserCheck } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { PhotoGallery, type GalleryPhoto } from "@/components/photo-gallery";

type AreaItem = {
  title: string;
  description: string;
  icon: typeof Mic;
  photo: string;
};

const AREAS: AreaItem[] = [
  {
    title: "Palestras e keynotes",
    description: "Palestras e keynotes para eventos.",
    icon: Mic,
    photo: "/images/event/stage-alt.jpg",
  },
  {
    title: "Consultoria",
    description:
      "Consultoria em transformação digital, inteligência de dados e governança de IA.",
    icon: Presentation,
    photo: "/images/event/duo.jpg",
  },
  {
    title: "Workshops e imersões",
    description: "Workshops e imersões para times de liderança.",
    icon: GraduationCap,
    photo: "/images/event/keynote.jpg",
  },
];

/**
 * Áreas de Atuação — light, contínuo com Temas de Palestra (sem
 * border-t: as duas seções formam um único bloco visual "Relevância",
 * conforme plano de UX Seção 6/8 — a separação começa só em
 * Antes×Depois/Prova Social).
 *
 * Mentoria: `[DESCONHECIDO]` deliberado (plano de UX, Seção 3 e 9 —
 * "Confirmação de Mentoria" listada como pendência, não confirmada nem
 * descartada). Decisão de limpeza de estados (Caio, 2026-09-08): enquanto
 * pendente, o card não é renderizado para o visitante — o dado permanece
 * no código (abaixo), só a renderização é condicionada por
 * `MENTORIA_CONFIRMED`.
 *
 * Restruturação de storytelling (Caio, 2026-09-09): a lista numerada
 * editorial (só ícone) foi substituída por um grid de 3 cards com foto
 * real de Sidnei — inspirado em codiesanchez.com (leitura real via
 * Playwright MCP: os 3 cards de programa daquele site usam foto real
 * em vez de ícone genérico, técnica adaptada, nunca clonada). Mentoria
 * (quando confirmada) precisaria de uma 4ª foto — fora do escopo desta
 * correção; o card condicional volta a usar o mesmo layout com um
 * placeholder até lá.
 *
 * Evolução de UI desktop 1440px (Caio, 2026-09-09): o grid de 3 cards
 * uniformes (foto 4:3 + painel de texto abaixo, todos do mesmo
 * tamanho) é substituído por um bento assimétrico — 1ª área ocupa 2
 * colunas/altura maior, as outras 2 empilham menores — com fotos reais
 * de ambiente (Empreende Brazil 2026) em `object-cover` e o
 * título/descrição sobrepostos à própria foto (scrim gradiente), não
 * mais um painel de card separado abaixo. Menos "cardização", mais
 * fotografia como composição — direção pedida explicitamente
 * (referências absorvidas por princípio: stevenbartlett.com,
 * coryrichards.com), sem alterar conteúdo/ordem/UX aprovados.
 *
 * V12 (Caio, 2026-09-09 — rodada de layout/espacialidade desktop):
 * "aumente o tamanho dos textos dos cards" — descrição sobe de
 * `text-sm` fixo para `.text-body`, ícone/chip sobem de `size-9`/
 * `size-4` para `size-11`/`size-5`, `max-w-sm` -> `max-w-md` para
 * acomodar o texto maior sem quebrar mais linhas do que o necessário.
 * Título (`.text-h3`) e layout/ordem/fotos inalterados.
 *
 * V21 (Caio, 2026-09-15 — "faça o que discutimos anteriormente, deixe
 * os 3 cards com os formatos disponíveis, um ao lado do outro, com as
 * mesmas medidas de proporção. abaixo, as 5 colunas de 4 fotos cada"):
 * o bento assimétrico (V12, 1ª área ocupando 2 colunas/altura maior)
 * sai — os 3 cards voltam a ter o mesmo tamanho/proporção entre si,
 * lado a lado (`grid-cols-3`, mesma `aspect-[3/4]` para todos). Abaixo,
 * uma galeria nova (`PhotoGallery`, componente cliente dedicado — ver
 * components/photo-gallery.tsx) com grid fixo de 5 colunas x 4 fotos
 * (20 no total, sempre todas visíveis, sem paginação) e modal de
 * detalhe com navegação anterior/próxima, conforme decidido na
 * orientação de estrutura anterior (UX Architecture Lead) + a
 * especificação final de Caio ("sem botão de carrossel... modal
 * alinhado ao centro... botão de passar para a foto seguinte/
 * anterior... fecha no X ou clicando fora").
 */
// TODO: trocar para `true` quando a oferta de Mentoria for confirmada
// por Caio/Sidnei. Nesse ponto o card volta a aparecer automaticamente.
const MENTORIA_CONFIRMED = false;

// TODO: substituir pelas 20 fotos reais fornecidas por Caio — até lá,
// autorizado explicitamente a usar as 5 fotos de evento já disponíveis
// no projeto, repetidas para preencher o grid ("pode utilizar as fotos
// que você tem acesso. depois trocaremos elas").
const GALLERY_SOURCE_PHOTOS = [
  "/images/event/stage-wide.jpg",
  "/images/event/keynote.jpg",
  "/images/event/duo.jpg",
  "/images/event/stage-alt.jpg",
  "/images/event/portrait-warm.jpg",
] as const;

const GALLERY_PHOTOS: GalleryPhoto[] = Array.from({ length: 20 }, (_, index) => ({
  src: GALLERY_SOURCE_PHOTOS[index % GALLERY_SOURCE_PHOTOS.length],
  alt: `Sidnei Rodrigues em evento — foto ${index + 1}`,
}));

export function ServiceAreas() {
  return (
    <section
      id="atuacao"
      className="diagonal-atuacao relative bg-[var(--surface-light)]"
    >
      {/* Régua estrutural fina no topo — puramente decorativa, direção
          oposta à de Temas de Palestra (alternância de lado). */}
      <div
        aria-hidden="true"
        className="seam-ruler pointer-events-none relative overflow-hidden"
      >
        <div className="diagonal-wedge-inverted diagonal-seam absolute inset-0" />
        <div className="diagonal-wedge-inverted absolute inset-0 translate-x-[2px] translate-y-[2px] bg-[var(--surface-light)]">
          <div className="stats-seam-hachure absolute inset-0" />
        </div>
      </div>

      <div className="px-6 pb-8 pt-4 sm:px-10 sm:pb-10 lg:px-12">
        <div className="mx-auto flex max-w-[1760px] flex-col gap-12">
          <SectionHeading
            tone="light"
            eyebrow="Áreas de Atuação"
            title="Formatos disponíveis para contratação"
          />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AREAS.map((area, index) => (
              <Reveal key={area.title} index={index}>
                <div className="group relative aspect-[3/4] w-full overflow-hidden rounded-[var(--radius-block)]">
                  <Image
                    src={area.photo}
                    alt=""
                    aria-hidden="true"
                    fill
                    sizes="(min-width: 1024px) 33vw, 50vw"
                    className="object-cover grayscale-[0.25] transition-transform duration-[var(--motion-slow)] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(0deg, rgba(10,19,31,0.92) 0%, rgba(10,19,31,0.45) 42%, rgba(10,19,31,0.05) 70%)",
                    }}
                  />
                  <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 p-6 sm:p-8">
                    <span className="flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-field)] border border-[var(--border-dark)] bg-[var(--surface-page)]/40 backdrop-blur-sm">
                      <area.icon
                        className="size-5 text-[var(--cyan-300)]"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </span>
                    <h3 className="text-h3 text-[var(--on-dark)]">{area.title}</h3>
                    <p className="max-w-md text-body text-[var(--on-dark-70)]">
                      {area.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
            {MENTORIA_CONFIRMED ? (
              <Reveal index={3}>
                <div className="flex aspect-[3/4] w-full flex-col justify-end gap-2 overflow-hidden rounded-[var(--radius-block)] bg-gradient-to-br from-[var(--navy-800)] via-[var(--navy-900)] to-[var(--navy-950)] p-6 sm:p-7">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-[var(--radius-field)] border border-[var(--border-dark)]">
                    <UserCheck
                      className="size-5 text-[var(--cyan-300)]"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </span>
                  <h3 className="text-h3 text-[var(--on-dark)]">Mentorias executivas</h3>
                  <p className="max-w-md text-body text-[var(--on-dark-70)]">
                    Oferta em avaliação — ainda não confirmada.
                  </p>
                </div>
              </Reveal>
            ) : null}
          </div>

          <Reveal index={3}>
            <PhotoGallery photos={GALLERY_PHOTOS} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
