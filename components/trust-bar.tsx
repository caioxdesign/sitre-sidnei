import { ClientLogoCarousel } from "@/components/client-logo-carousel";

/**
 * Barra de prova social imediata — dark, --navy-950. Nova na
 * restruturação de storytelling (Caio, 2026-09-09), inspirada
 * estruturalmente em marieforleo.com ("You Might Have Seen Me On",
 * barra sólida logo abaixo do Hero — leitura real via Playwright MCP,
 * nunca clonagem literal). Função e posição na jornada não mudam nesta
 * rodada — só o conteúdo evolui de placeholder para prova real.
 *
 * Evolução de UI (Caio, 2026-09-09): os pills de "Setores atendidos"
 * (texto ilustrativo/fictício) foram substituídos pelo carrossel
 * infinito de logos institucionais reais fornecidos nesta rodada
 * (Governo do BR, Governo de SC, SEBRAE, SESC, SESI, FEESC, Fepese,
 * FIESC — ver components/client-logo-carousel.tsx). Isso não é uma
 * mudança de UX/conteúdo aprovado: a função da seção continua "prova
 * social imediata após o Hero"; só passa a cumprir essa função com
 * prova real em vez de texto de preenchimento, do mesmo modo que fotos
 * reais já substituíram os placeholders de ícone Camera em rodadas
 * anteriores.
 */
export function TrustBar() {
  return (
    <div className="border-y border-[var(--border-dark)] bg-[var(--navy-950)] py-10">
      <div className="mx-auto flex max-w-[1760px] flex-col gap-5 px-6 sm:px-10 lg:flex-row lg:items-center lg:gap-10 lg:px-12">
        <p className="shrink-0 text-xs font-semibold uppercase tracking-wide text-[var(--on-dark-muted)] lg:whitespace-nowrap">
          Instituições e parceiros
        </p>
        <ClientLogoCarousel />
      </div>
    </div>
  );
}
