import { cn } from "@/lib/utils";

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const CORNER_POSITION: Record<Corner, string> = {
  "top-left": "-left-[10px] -top-[10px]",
  "top-right": "-right-[10px] -top-[10px]",
  "bottom-left": "-left-[10px] -bottom-[10px]",
  "bottom-right": "-right-[10px] -bottom-[10px]",
};

const CORNERS: Corner[] = ["top-left", "top-right", "bottom-left", "bottom-right"];

/**
 * Marca de registro técnico ("+" nos 4 cantos) — addendum de
 * enriquecimento (Sobre/Autoridade: 4 cantos do placeholder de foto;
 * Prova Social: só o 1º/maior card de vídeo). Cruz fina 1px, ~14px por
 * braço, --cyan-500 a 35% opacidade (uso exclusivo sobre fundo escuro
 * nesta entrega), posicionada 10px fora de cada canto do bloco pai —
 * que precisa ser `position: relative` (todos os 2 usos desta entrega
 * já são).
 *
 * Puramente decorativo (aria-hidden). Oculta abaixo de 640px: o
 * respiro de 8-12px fora da borda não é seguro em blocos pequenos
 * demais nesse breakpoint (regra explícita do brief — nunca forçar
 * sobreposição).
 */
export function RegistrationMarks({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none absolute inset-0 hidden sm:block", className)}
    >
      {CORNERS.map((corner) => (
        <span
          key={corner}
          className={cn("absolute size-[14px]", CORNER_POSITION[corner])}
        >
          <span className="registration-arm left-1/2 top-0 h-full w-px -translate-x-1/2" />
          <span className="registration-arm left-0 top-1/2 h-px w-full -translate-y-1/2" />
        </span>
      ))}
    </div>
  );
}
