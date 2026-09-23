import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * CTA principal ("Convide Sidnei para seu evento") — Opção B do plano
 * de UX (Seção 4): aparece só em pontos de alta intenção, não a cada
 * seção. Reaproveitado (não duplicado) nos 2 pontos que faltavam nesta
 * entrega: fim de Temas de Palestra e fim de Prova Social Aprofundada.
 * O 3º/4º ponto (Hero, Captação) já usam o próprio botão/anchor local —
 * Captação vira `type="submit"` do formulário, então não usa este
 * componente (ver components/lead-form.tsx).
 *
 * Implementação: `<Button variant="gradient" size="cta">` (ver
 * components/ui/button.tsx) — elimina a 3ª cópia manual da mesma string
 * Tailwind longa que também aparecia em hero.tsx e lead-form.tsx. `tone`
 * é mantido como atributo `data-tone` (sem efeito visual próprio hoje —
 * o botão shadcn já herda o token --focus-ring em ambos os fundos via
 * --ring), preservado para eventual necessidade futura de diferenciar
 * claro/escuro sem reintroduzir string manual.
 */
export function InviteCta({
  className,
  tone = "dark",
}: {
  className?: string;
  tone?: "dark" | "light";
}) {
  return (
    <Button
      render={<a href="#captacao" />}
      nativeButton={false}
      variant="gradient"
      size="cta"
      data-tone={tone}
      className={cn("w-fit", className)}
    >
      Convide Sidnei para seu evento
    </Button>
  );
}
