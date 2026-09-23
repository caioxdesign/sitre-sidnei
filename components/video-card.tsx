"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { PlayCircle, X } from "lucide-react";
import { RegistrationMarks } from "@/components/registration-marks";

type VideoCardProps = {
  label: string;
  photo: string;
  /** Fonte real do vídeo — quando ausente, o card mostra afordância de
      play mas sinaliza "em breve" em vez de tocar um arquivo fake. */
  videoSrc?: string;
  showRegistrationMarks?: boolean;
};

/**
 * Card de vídeo com play real — V10 (Caio, 2026-09-09 — "os vídeos
 * devem ser capazes de dar play"). Antes, os 3 cards eram só uma foto +
 * ícone decorativo, sem interação (nenhum link/arquivo de vídeo tinha
 * sido fornecido). Agora, ao clicar, o card troca a thumbnail por um
 * elemento `<video>` real com controles nativos — mas só para o card
 * com fonte confirmada (`videoSrc`); `preload="none"` garante que o
 * arquivo (~40MB) só é buscado no clique, nunca no carregamento da
 * página.
 *
 * Os outros 2 cards ainda não têm arquivo/link de vídeo real fornecido
 * — clicar neles mostra "Vídeo em breve" em vez de simular um player
 * funcional sem conteúdo real (nunca fabricar mídia/link — mesma
 * política já em vigor nesta entrega para estatísticas e depoimentos).
 *
 * V11 (Caio, 2026-09-09 — "verifique se todos os vídeos estão rodando e
 * se eles tem opção de ficar em uma janela modal grande ao centro da
 * tela"): o play deixa de trocar a própria thumbnail do card (pequena,
 * do tamanho do grid) e passa a abrir um `<dialog>` nativo — escolhido
 * porque escapa de qualquer stacking context/overflow ancestral sem
 * precisar de portal manual (regra de interação já registrada nesta
 * entrega) e já traz foco/backdrop/Esc nativos do navegador. O card em
 * si nunca teve vídeo fake: só o card com `videoSrc` real abre o modal
 * com `<video>`; os outros 2 seguem mostrando "Vídeo em breve" no
 * próprio card, sem abrir um modal vazio.
 */
export function VideoCard({ label, photo, videoSrc, showRegistrationMarks }: VideoCardProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [pending, setPending] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (modalOpen && !dialog.open) {
      dialog.showModal();
    } else if (!modalOpen && dialog.open) {
      dialog.close();
    }
  }, [modalOpen]);

  return (
    <>
      <button
        type="button"
        onClick={() => (videoSrc ? setModalOpen(true) : setPending(true))}
        aria-label={
          videoSrc ? `Assistir ao vídeo — ${label}` : `Vídeo em breve — ${label}`
        }
        className="group relative flex aspect-video items-center justify-center overflow-hidden rounded-[var(--radius-card)] border border-[var(--border-dark)] bg-gradient-to-br from-[var(--navy-800)] via-[var(--navy-900)] to-[var(--navy-950)] outline-none transition-transform duration-[var(--motion-fast)] ease-[var(--ease-standard)] hover:scale-[1.01] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
      >
        <Image
          src={photo}
          alt=""
          aria-hidden="true"
          fill
          sizes="(min-width: 640px) 33vw, 100vw"
          className="object-cover transition-transform duration-[var(--motion-slow)] ease-[var(--ease-out-soft)] group-hover:scale-[1.04]"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[var(--navy-950)]/35 transition-colors duration-[var(--motion-fast)] group-hover:bg-[var(--navy-950)]/45"
        />
        <PlayCircle
          className="relative z-[1] size-12 text-[var(--on-dark)] drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] transition-transform duration-[var(--motion-fast)] group-hover:scale-110"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        {pending ? (
          <span className="absolute bottom-3 left-1/2 z-[1] -translate-x-1/2 rounded-[var(--radius-pill)] bg-[var(--navy-950)]/85 px-3 py-1 text-xs font-medium text-[var(--on-dark)]">
            Vídeo em breve
          </span>
        ) : null}
        {showRegistrationMarks ? <RegistrationMarks /> : null}
      </button>

      {videoSrc ? (
        <dialog
          ref={dialogRef}
          onClose={() => setModalOpen(false)}
          aria-label={label}
          className="m-auto w-[min(92vw,1100px)] max-w-none rounded-[var(--radius-block)] border border-[var(--border-dark)] bg-[var(--navy-950)] p-0 backdrop:bg-[var(--navy-950)]/80 backdrop:backdrop-blur-sm"
        >
          <div className="relative">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              aria-label="Fechar vídeo"
              className="absolute -top-12 right-0 flex size-10 items-center justify-center rounded-full border border-[var(--border-dark)] bg-[var(--navy-900)] text-[var(--on-dark)] outline-none transition-colors duration-[var(--motion-fast)] hover:bg-[var(--navy-800)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
            >
              <X className="size-5" strokeWidth={1.75} aria-hidden="true" />
            </button>
            {modalOpen ? (
              <video
                src={videoSrc}
                controls
                autoPlay
                preload="none"
                className="aspect-video w-full rounded-[var(--radius-block)] bg-black outline-none"
              />
            ) : null}
          </div>
        </dialog>
      ) : null}
    </>
  );
}
