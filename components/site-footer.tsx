/**
 * V21 (Caio, 2026-09-15 — "o botão 'Baixar material em PDF'... deve
 * estar ao lado do CTA 'enviar solicitação'"): o botão de download saiu
 * daqui e passou a viver junto do submit do formulário de Contato (ver
 * components/lead-form.tsx, contexto "captacao") — `Download`/`Button`
 * não são mais usados neste arquivo.
 */

/**
 * Rodapé — novo (Caio, 2026-09-09 — "faça um rodapé que tenha nexo com
 * o restante da página"). Reaproveita o mesmo vocabulário já
 * estabelecido: `--surface-sunken` (mesma família de FAQ, "apêndice"),
 * `.seam-line` no topo (mesma linha de transição fina já usada em
 * Prova Social), wordmark real.
 *
 * V15 (Caio, 2026-09-15 — "retire completamente a sessão de Presskit"):
 * o link "Press Kit" (apontava para `#press-kit`, seção agora removida
 * — ver app/page.tsx) foi retirado da lista.
 *
 * V17 (Caio, 2026-09-15): três mudanças.
 * (1) "arrume o rodapé. os temas precisam atualizar de acordo com as
 * sessões" — `FOOTER_LINKS` estava desatualizada: "Sobre" (o eyebrow da
 * seção virou "Quem é" na rodada anterior) e faltava "Contato", a única
 * seção da rolagem sem nenhum link de navegação em qualquer lugar da
 * página. Rótulos corrigidos para bater com o nome real de cada seção
 * hoje, "Contato" adicionado.
 * (2) "a logo está minúscula, precisa aumentá-la consideravelmente" —
 * `h-7` (28px) -> `h-12 sm:h-14` (48-56px).
 * (3) O bloco de canais diretos (e-mail/WhatsApp/@, todos ainda
 * `[DESCONHECIDO]`/"a confirmar") foi removido — o mesmo conteúdo
 * pendente acabou de sair da seção Contato nesta rodada (ver
 * lead-capture.tsx); mantê-lo duplicado só aqui seria inconsistente.
 * Rodapé vai de 3 para 2 colunas (marca | navegação), o que também
 * resolve o pedido de "alinhar melhor tudo" — duas colunas de peso
 * comparável distribuem melhor o espaço do que três, uma delas quase
 * vazia de conteúdo real.
 *
 * "Baixar material em PDF" (mesma rodada — "ao fim da página, precisa
 * adicionar um botão... para baixar um material em PDF"): agora que a
 * seção Press Kit em página saiu, o material de apoio (bio, temas,
 * áreas de atuação, rider técnico — mesmo conteúdo já aprovado que
 * vivia em press-kit.tsx, nenhum dado novo inventado) foi compilado em
 * um PDF real (`public/downloads/sidnei-rodrigues-material.pdf`,
 * gerado nesta entrega) e linkado aqui, no fim da página, como pedido.
 */
const FOOTER_LINKS = [
  { href: "#sobre", label: "Quem é" },
  { href: "#temas", label: "Temas de Palestra" },
  { href: "#atuacao", label: "Áreas de Atuação" },
  { href: "#prova-social", label: "Trajetória" },
  { href: "#perguntas-frequentes", label: "Perguntas Frequentes" },
  { href: "#captacao", label: "Contato" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[var(--border-dark)] bg-[var(--surface-sunken)] px-6 py-12 sm:px-10 lg:px-12">
      <div aria-hidden="true" className="seam-line absolute inset-x-0 top-0" />

      <div className="mx-auto flex max-w-[1760px] flex-col gap-10">
        <div className="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element -- SVG
                vetorial pequeno, mesmo racional já registrado no header.
                V21 — logo aumentada de h-12/h-14 para h-16/h-20 ("aumente
                ainda mais a logo do rodapé"); já alinhada à esquerda,
                simétrica ao parágrafo abaixo (mesma coluna, sem indent
                extra). */}
            <img
              src="/logos/sr-wordmark-negativo.svg"
              alt="Sidnei Rodrigues"
              className="h-16 w-auto sm:h-20"
            />
            <p className="max-w-xs text-sm text-[var(--on-dark-70)]">
              Palestrante, professor e consultor em transformação digital,
              inteligência de dados e governança de IA.
            </p>
          </div>

          {/* V21 — fonte sobe para text-base (16px, mesmo tamanho da
              navbar depois do aumento em site-header.tsx); bloco passa
              de alinhado à direita para centralizado — "alinhe ao
              centro o texto das sessões no rodapé". */}
          <nav
            aria-label="Seções da página"
            className="flex flex-wrap justify-center gap-x-8 gap-y-2 sm:justify-center"
          >
            {FOOTER_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-base font-medium text-[var(--on-dark-70)] transition-colors duration-[var(--motion-fast)] hover:text-[var(--on-dark)]"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* V21 — o botão "Baixar material em PDF" saiu daqui (agora ao
            lado do CTA "Enviar solicitação" em lead-form.tsx, contexto
            "captacao"); a linha de copyright fica sozinha. */}
        <div className="border-t border-[var(--border-dark)] pt-8">
          <p className="text-xs text-[var(--on-dark-muted)]">
            © {year} Sidnei Rodrigues · TD Business. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
