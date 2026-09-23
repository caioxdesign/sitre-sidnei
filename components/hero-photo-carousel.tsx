"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * Rotação automática de fotos no Hero (Caio, 2026-09-09 — "troque as
 * imagens da hero por essas em anexo... elas devem ir trocando aos
 * poucos"). 5 fotos reais de palco (F:\TD Business\Landing Page -
 * Sidnei\Fotos).
 *
 * CORREÇÃO (Caio, 2026-09-09, rodada seguinte — "não dê zoom na foto,
 * pois todas ficaram cortadas. deixe-as de tamanho normal. só é
 * necessário que Sidnei fique centralizado no espaço disponível para
 * as fotos... esse espaço é metade da hero, dividida por uma linha
 * transversal"). `object-cover` (rodada anterior) preenchia todo o
 * campo cortando os cantos da foto — errado. Trocado para
 * `object-contain` (foto inteira, sem corte), mas o container da foto
 * deixa de ser a seção INTEIRA (1440px) e passa a ser só a metade
 * direita, onde a costura diagonal já deixa o campo visível — assim
 * `object-contain` centraliza a foto dentro do espaço real disponível,
 * não da largura total da seção (esse era o bug original, já corrigido
 * uma vez para os recortes transparentes e reintroduzido sem querer ao
 * trocar para fotos reais). Sem zoom: a foto aparece no tamanho normal,
 * moldura retangular incluída (fundo real, não recorte).
 */
const PHOTOS = [
  "/images/hero-real/hero-1.jpg",
  "/images/hero-real/hero-3.jpg",
  "/images/hero-real/hero-5.jpg",
  "/images/hero-real/hero-7.jpg",
  "/images/hero-real/hero-11.jpg",
] as const;

const INTERVAL_MS = 5000;

export function HeroPhotoCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % PHOTOS.length);
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-y-0 left-[54%] right-0">
      {PHOTOS.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={i === 0}
          sizes="46vw"
          className="object-contain transition-opacity duration-1000 ease-[var(--ease-out-soft)]"
          style={{ opacity: i === index ? 1 : 0 }}
        />
      ))}
      <div className="hero-photo-duotone absolute inset-0" />
    </div>
  );
}
