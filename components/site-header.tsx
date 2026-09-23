import { Button } from "@/components/ui/button";

/**
 * Header mínimo/sticky — não faz parte das 10 seções do brief, mas é
 * necessário para o Hero funcionar visualmente como topo de página real
 * (evita o Hero parecer "flutuando" sem contexto de navegação).
 * Mantido deliberadamente enxuto: wordmark + nav + CTA secundário.
 *
 * V15 (Caio, 2026-09-15 — "retire completamente a sessão de Presskit"):
 * o link "Press Kit" (apontava para `#press-kit`, seção agora removida
 * da página — ver app/page.tsx) foi retirado do header.
 * Microfix registrado: o CTA "Convidar para palestrar" apontava para
 * `#hero` (a própria seção onde o header vive) na fatia anterior, porque
 * a seção de Captação ainda não existia. Agora que existe, o link foi
 * corrigido para `#captacao` — correção determinística, não uma mudança
 * de design.
 *
 * V11 (Caio, 2026-09-09 — CTAs revisados por agente de escrita a pedido
 * explícito): o texto virou "Convidar Sidnei" — o rótulo antigo
 * ("Convidar para palestrar") ficou dessincronizado depois que os
 * outros 3 CTAs da página migraram para "Convide Sidnei para seu
 * evento", criando a impressão de duas ofertas diferentes para o mesmo
 * destino (#captacao). Curto o suficiente para o slot compacto ao lado
 * de "Press Kit", mantendo o mesmo verbo de convite dos outros CTAs.
 *
 * Evolução de UI (Caio, 2026-09-09 — "precisa de uma nav bar com as
 * sessões"): navegação inline por âncora para as seções principais da
 * página, entre o wordmark e o CTA — mesmo padrão de referência
 * (link de texto + CTA em pill) já usado nesta entrega. Oculta abaixo
 * de `lg` (não há espaço horizontal para o menu completo nesse
 * breakpoint; escopo desta rodada é desktop 1440px).
 *
 * V21 (Caio, 2026-09-15): (1) wordmark completo trocado pelo ícone de
 * marca (`sr-icon.svg`, mesma marca "SR" estilizada, já existente no
 * projeto) — "utilize a logo icon_SR_logo... com um tamanho ideal para
 * que fique bem visível" — ícone sozinho lê melhor em tamanho maior que
 * o wordmark completo dentro do mesmo espaço horizontal. `py-2` (8px
 * acima/abaixo) aplicado diretamente na tag, como pedido. (2) altura da
 * navbar sobe de 64px (`h-16`) para 80px (`h-20`, +16px) — `--nav-h`
 * (globals.css, usado por `.hero-min-h`) atualizado junto para o Hero
 * continuar medindo a partir da altura real do header. (3) fonte dos
 * links de navegação sobe de `text-sm` (14px) para `text-base` (16px).
 * (4) CTA "Convidar Sidnei" sai de `variant="outline"` (contorno simples,
 * pouco chamativo) para `variant="gradient"` (mesmo gradiente
 * institucional navy->cyan já usado nos CTAs principais do site) —
 * "deixe o CTA mais chamativo".
 */
const NAV_LINKS = [
  { href: "#sobre", label: "Sobre" },
  { href: "#temas", label: "Temas" },
  { href: "#atuacao", label: "Atuação" },
  { href: "#prova-social", label: "Trajetória" },
  { href: "#perguntas-frequentes", label: "FAQ" },
] as const;
export function SiteHeader() {
  return (
    // CORREÇÃO (revisão pós Gate-2): mesmo depois de reduzir o teto do H1
    // do Hero para 96px (ver app/globals.css/--type-h1-size), o
    // headline ainda é mais alto que o valor de scroll testado (~200px)
    // e continuava aparecendo borrado atrás do header (efeito de "dupla
    // exposição") com a opacidade de fundo anterior (85%/70% com blur).
    // Uma primeira tentativa em 95%/88% não foi suficiente — texto
    // branco de alto contraste ainda vazava visivelmente através do
    // blur mesmo a 88% de opacidade. Opacidade elevada para praticamente
    // opaca (99%/97%), mantendo o `backdrop-blur` (padrão de marca já
    // aprovado, não removido — ele preserva a textura/profundidade nas
    // bordas mesmo com o fundo quase sólido). Confirmado por captura de
    // tela que o ghosting deixou de ser perceptível nesta versão.
    <header className="sticky top-0 z-40 border-b border-[var(--border-dark)] bg-[var(--surface-page)]/99 backdrop-blur supports-[backdrop-filter]:bg-[var(--surface-page)]/97">
      <div className="mx-auto flex h-20 max-w-[1760px] items-center justify-between px-6 sm:px-10 lg:px-12">
        {/* Ícone de marca (SVG fornecido — "SR" estilizado, já existente
            no projeto como sr-icon.svg). Substitui o wordmark completo
            nesta rodada. */}
        {/* eslint-disable-next-line @next/next/no-img-element -- SVG
            vetorial pequeno; next/image não otimiza SVG e adiciona
            complexidade sem ganho real de LCP/banda aqui. */}
        <img
          src="/logos/sr-icon.svg"
          alt="Sidnei Rodrigues"
          className="h-12 w-auto py-2"
        />

        <nav aria-label="Seções da página" className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base font-medium text-[var(--on-dark-70)] transition-colors duration-[var(--motion-fast)] hover:text-[var(--on-dark)]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <Button
            render={<a href="#captacao" />}
            variant="gradient"
            nativeButton={false}
            className="hidden rounded-[var(--radius-block)] text-sm sm:inline-flex"
          >
            Convidar Sidnei
          </Button>
        </div>
      </div>
    </header>
  );
}
