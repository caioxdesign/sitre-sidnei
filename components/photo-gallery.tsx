"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

export type GalleryPhoto = { src: string; alt: string };

/**
 * Galeria de fotos — Áreas de Atuação (V21, Caio, 2026-09-15 — "as 5
 * colunas de 4 fotos cada... não deve haver botão de carrossel, nada
 * nesse estilo. ele quer realmente preencher a sessão... quando o
 * usuário clica numa foto, abre um modal alinhado ao centro com a foto
 * selecionada, onde, aí sim, temos um botão de passar para a foto
 * seguinte/anterior. clicando no X ou fora do modal, ele fecha").
 *
 * Grid estático: as 20 fotos ficam sempre todas visíveis (sem
 * paginação/carrossel/"ver mais") — só o modal de detalhe tem
 * navegação prev/next. Componente cliente próprio (não o `Dialog`
 * genérico de ui/dialog.tsx) porque precisa de estado compartilhado de
 * "qual foto está aberta" entre 20 triggers e os botões de navegação
 * dentro do próprio modal — não é um dialog independente por card.
 *
 * Placeholder de conteúdo (autorizado explicitamente por Caio nesta
 * rodada — "pode utilizar as fotos que você tem acesso. depois
 * trocaremos elas"): as 20 posições usam as 5 fotos reais de evento já
 * disponíveis no projeto (public/images/event/), repetidas para
 * preencher o grid até as 20 fotos definitivas serem fornecidas.
 */
export function PhotoGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const prev = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i - 1 + photos.length) % photos.length));
  }, [photos.length]);
  const next = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % photos.length));
  }, [photos.length]);

  useEffect(() => {
    if (openIndex === null) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") prev();
      if (event.key === "ArrowRight") next();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [openIndex, close, prev, next]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {photos.map((photo, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setOpenIndex(index)}
            aria-label={`Ampliar foto: ${photo.alt}`}
            className="group relative aspect-[3/4] overflow-hidden rounded-[var(--radius-field)] outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
              loading={index < 5 ? "eager" : "lazy"}
              className="object-cover transition-transform duration-[var(--motion-slow)] ease-[var(--ease-out-soft)] group-hover:scale-[1.05]"
            />
          </button>
        ))}
      </div>

      {openIndex !== null ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={photos[openIndex].alt}
          onClick={close}
          // `bg-[rgba(0,0,0,0.85)]` em vez de `bg-black/85` — mesmo bug
          // do ui/dialog.tsx: cores nomeadas padrão do Tailwind não
          // geram CSS neste projeto.
          className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.85)] p-4 sm:p-10"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Fechar"
            className="absolute top-4 right-4 z-10 flex size-10 items-center justify-center rounded-full bg-[var(--navy-950)]/70 text-[var(--on-dark)] outline-none transition-colors duration-[var(--motion-fast)] hover:bg-[var(--navy-950)]/90 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] sm:top-6 sm:right-6"
          >
            <X className="size-5" strokeWidth={2} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              prev();
            }}
            aria-label="Foto anterior"
            className="absolute top-1/2 left-3 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--navy-950)]/70 text-[var(--on-dark)] outline-none transition-colors duration-[var(--motion-fast)] hover:bg-[var(--navy-950)]/90 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] sm:left-6"
          >
            <ChevronLeft className="size-6" strokeWidth={2} />
          </button>

          <div
            className="relative aspect-[3/4] w-full max-w-[560px]"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              src={photos[openIndex].src}
              alt={photos[openIndex].alt}
              fill
              sizes="90vw"
              className="rounded-[var(--radius-card)] object-cover"
            />
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              next();
            }}
            aria-label="Próxima foto"
            className="absolute top-1/2 right-3 z-10 flex size-11 -translate-y-1/2 items-center justify-center rounded-full bg-[var(--navy-950)]/70 text-[var(--on-dark)] outline-none transition-colors duration-[var(--motion-fast)] hover:bg-[var(--navy-950)]/90 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)] sm:right-6"
          >
            <ChevronRight className="size-6" strokeWidth={2} />
          </button>
        </div>
      ) : null}
    </>
  );
}
