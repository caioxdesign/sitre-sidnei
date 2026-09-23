import { Images, Newspaper, Quote } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { PlaceholderBlock } from "@/components/placeholder-block";
import { InviteCta } from "@/components/invite-cta";
import { VideoCard } from "@/components/video-card";

const VIDEOS: readonly {
  label: string;
  photo: string;
  videoSrc?: string;
}[] = [
  {
    label: "Urban Tech Forum / ACATE (2025)",
    photo: "/images/event/thumb-urban-tech-forum-acate-2025.png",
    videoSrc: "/videos/urban-tech-forum-acate-2025.mp4",
  },
  {
    label: "CONVENSI (Foz do Iguaçu, 2026)",
    photo: "/images/event/thumb-convensi-foz-2026.png",
  },
  {
    label: "Empreende Brazil (2025)",
    photo: "/images/event/thumb-empreende-brazil-2025.png",
  },
];

/**
 * Trajetória em palco — dark, --surface-page. Vídeos são reais e
 * nomeados (plano de UX, Seção 9).
 *
 * V10 (Caio, 2026-09-09): (1) seção renomeada — "troque o nome da
 * sessão 'prova social'. é muito amador" — eyebrow/título trocados por
 * algo que descreve a função sem o jargão de marketing (ver
 * SectionHeading abaixo); id da seção (`#prova-social`, usado por
 * âncoras) mantido por compatibilidade, só o texto visível mudou. (2)
 * "os vídeos devem ser capazes de dar play" — cada card virou
 * `VideoCard` (client component, ver video-card.tsx): o primeiro tem
 * arquivo real (`Urban Tech Forum / ACATE`, extraído nesta rodada do
 * material bruto de Caio) e toca de verdade ao clicar; os outros 2
 * ainda não têm arquivo/link fornecido — clicar mostra "Vídeo em breve"
 * em vez de simular playback sem conteúdo real.
 *
 * Depoimentos, galeria e imprensa seguem 100% pendentes (Seção 9/11 do
 * plano) — ocultos enquanto `SOCIAL_PROOF_EXTRAS_CONFIRMED` for `false`.
 *
 * V16 (Caio, 2026-09-23 — thumbnails reais dos 3 vídeos, de
 * F:\TD Business\Landing Page Sidnei\Fotos\Thumbnails): cada `photo`
 * trocado do placeholder genérico (`keynote.jpg`/`stage-wide.jpg`/
 * `stage-alt.jpg`, ainda usados por hero.tsx e service-areas.tsx) para
 * um arquivo dedicado em `public/images/event/thumb-*.png`, casado pelo
 * nome do evento com o vídeo correspondente.
 *
 * V15 (Caio, 2026-09-15 — "não quebre o texto, deixe o título todo na
 * mesma linha"): o `<h2>` do `SectionHeading` carregava `max-w-3xl`
 * fixo (768px) — na escala grande de título desta rodada, "Onde Sidnei
 * já esteve" quebrava em 2 linhas mesmo cabendo facilmente em uma linha
 * na largura real da seção (até 1760px de container). Usa o novo prop
 * `titleClassName` (ver section-heading.tsx) para soltar o teto só
 * aqui, sem afetar as demais seções.
 */
const SOCIAL_PROOF_EXTRAS_CONFIRMED = false;

export function SocialProof() {
  return (
    <section
      id="prova-social"
      className="relative overflow-hidden bg-[var(--surface-page)] px-6 py-8 sm:px-10 sm:py-10 lg:px-12"
    >
      <div aria-hidden="true" className="seam-line absolute inset-x-0 top-0" />
      <div aria-hidden="true" className="seam-line absolute inset-x-0 bottom-0" />

      <div className="relative mx-auto flex max-w-[1760px] flex-col gap-14">
        <SectionHeading
          tone="dark"
          eyebrow="Trajetória em Palco"
          title="Onde Sidnei já esteve"
          titleClassName="max-w-none lg:whitespace-nowrap"
        />

        <div className="grid gap-6 sm:grid-cols-3">
          {VIDEOS.map((video, index) => (
            <Reveal key={video.label} index={index} className="flex flex-col gap-3">
              <VideoCard
                label={video.label}
                photo={video.photo}
                videoSrc={video.videoSrc}
                showRegistrationMarks={index === 0}
              />
              <p className="text-body-lg font-semibold text-[var(--on-dark)]">
                {video.label}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Depoimentos, galeria e imprensa — pendentes, ocultos até
            confirmação real (ver SOCIAL_PROOF_EXTRAS_CONFIRMED acima) */}
        {SOCIAL_PROOF_EXTRAS_CONFIRMED ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <PlaceholderBlock
              tone="dark"
              icon={Quote}
              label="[Depoimentos autorizados — pendente]"
              className="sm:col-span-1"
            />
            <PlaceholderBlock
              tone="dark"
              icon={Quote}
              label="[Depoimentos autorizados — pendente]"
              className="sm:col-span-1"
            />
            <PlaceholderBlock
              tone="dark"
              icon={Images}
              label="[Galeria de fotos reais — pendente]"
              className="sm:col-span-1"
            />
            <PlaceholderBlock
              tone="dark"
              icon={Newspaper}
              label="[Cobertura de imprensa — pendente]"
              className="sm:col-span-1"
            />
          </div>
        ) : null}

        <Reveal index={0}>
          <InviteCta tone="dark" />
        </Reveal>
      </div>
    </section>
  );
}
