"use client";

/**
 * Carrossel infinito de logos institucionais — evolução de UI (Caio,
 * 2026-09-09): substitui os pills de "Setores atendidos" por prova
 * social real, pedida explicitamente ("anexei logos de clientes para
 * você fazer um carrossel infinito... com gradiente 0-100 de opacidade
 * nas extremidades"). Conteúdo/UX de trust-bar.tsx não muda — ainda é
 * "sinal de confiança logo após o Hero" — só o tratamento visual do
 * sinal evolui de texto fictício para logos institucionais reais
 * (SVGs fornecidos nesta rodada: Governo do BR, Governo de SC, SEBRAE,
 * SESC, SESI, FEESC, Fepese, FIESC).
 *
 * Mecânica: uma única faixa (`LOGOS`) duplicada 2x lado a lado; a
 * animação translada exatamente -50% (a largura de UMA cópia), então o
 * corte é imperceptível — técnica padrão de marquee sem JS de medição.
 * `animation-play-state: paused` no hover (afordância de interação,
 * pedida explicitamente — "use todos os estados de hover"). Máscara
 * `mask-image`/`-webkit-mask-image` em gradiente cria a transparência
 * 0→100% nas duas extremidades sem precisar de overlay sólido (o que
 * quebraria sobre qualquer fundo).
 */
// Tamanhos aumentados (Caio, 2026-09-09, V10 — "aumente o tamanho das
// logos de 'Instituições e Parceiros'", pedido pela segunda vez):
// larguras ~45% maiores + max-h-8 (32px) -> max-h-12 (48px) abaixo.
//
// V21 (Caio, 2026-09-15 — "aumente a sessão 'Instituições e parceiros'
// para que as logos fiquem maiores"): mais um aumento, ~30% sobre os
// valores acima + max-h-12 (48px) -> max-h-16 (64px).
const LOGOS = [
  { src: "/logos/clients/gov-br.svg", alt: "Governo Federal do Brasil", w: 174 },
  { src: "/logos/clients/sebrae.svg", alt: "SEBRAE", w: 148 },
  { src: "/logos/clients/sesc.svg", alt: "SESC", w: 156 },
  { src: "/logos/clients/sesi.svg", alt: "SESI", w: 203 },
  { src: "/logos/clients/feesc.svg", alt: "FEESC", w: 226 },
  { src: "/logos/clients/fepese.svg", alt: "Fepese", w: 320 },
  { src: "/logos/clients/fiesc.svg", alt: "FIESC", w: 264 },
  { src: "/logos/clients/gov-sc.svg", alt: "Governo de Santa Catarina", w: 169 },
] as const;

export function ClientLogoCarousel() {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent 0%, black 12%, black 88%, transparent 100%)",
      }}
    >
      <div className="logo-marquee-track flex w-max items-center gap-16 py-1 hover:[animation-play-state:paused]">
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className="flex shrink-0 items-center gap-16"
          >
            {LOGOS.map((logo) => (
              // SVGs institucionais pequenos, cor fixa; sem necessidade
              // de otimização next/image para este uso.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                key={logo.alt + copy}
                src={logo.src}
                alt={copy === 0 ? logo.alt : ""}
                style={{ width: logo.w, height: "auto" }}
                className="max-h-16 shrink-0 opacity-60 grayscale transition-[opacity,filter] duration-[var(--motion-base)] hover:opacity-100 hover:grayscale-0"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
