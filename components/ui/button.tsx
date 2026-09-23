import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
        ghost:
          "hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20 focus-visible:border-destructive/40 focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40",
        link: "text-primary underline-offset-4 hover:underline",
        /**
         * CTA institucional (Art Direction Brief): pill + gradiente +
         * hover de escala/brilho. Substitui a string Tailwind longa que
         * estava duplicada manualmente em hero.tsx, invite-cta.tsx e no
         * submit de lead-form.tsx — usar com `size="cta"`.
         */
        gradient:
          "border-transparent bg-gradient-institutional text-[var(--on-dark)] shadow-[0_10px_30px_rgba(0,172,212,0.25)] transition-transform duration-[var(--motion-fast)] ease-[var(--ease-in-out-soft)] hover:scale-[1.02] hover:brightness-110",
        /**
         * Chip de atalho de intenção (lead-form.tsx). O estado visual é
         * derivado inteiramente de `aria-pressed` (nunca de className
         * condicional em duplicata) — mesma marcação sustenta acessibilidade
         * e aparência. Usar com `size="chip"`.
         */
        chip: "border-[var(--border-dark)] bg-transparent text-[var(--on-dark-muted)] transition-colors duration-[var(--motion-fast)] ease-[var(--ease-standard)] hover:border-[var(--cyan-500)]/50 aria-pressed:border-[var(--cyan-500)] aria-pressed:bg-[var(--cyan-500)]/15 aria-pressed:text-[var(--cyan-300)]",
        /**
         * CTA da direção "Horizonte de Decisão" (Gate 1, Probe C —
         * aprovado). Pill amarelo sólido — distinto do variant
         * `gradient` (navy->cyan) já em uso em invite-cta.tsx e
         * lead-form.tsx, que permanecem inalterados fora do escopo
         * desta fatia. Usar com `size="cta-lg"`.
         */
        "solid-amber":
          "border-transparent bg-[var(--amber-500)] text-[var(--navy-900)] shadow-[0_10px_30px_rgba(246,211,9,0.3)] transition-transform duration-[var(--motion-fast)] ease-[var(--ease-in-out-soft)] hover:scale-[1.02] hover:brightness-105",
      },
      size: {
        default:
          "h-8 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        xs: "h-6 gap-1 rounded-[min(var(--radius-md),10px)] px-2 text-xs in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3",
        sm: "h-7 gap-1 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: "h-9 gap-1.5 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        icon: "size-8",
        "icon-xs":
          "size-6 rounded-[min(var(--radius-md),10px)] in-data-[slot=button-group]:rounded-lg [&_svg:not([class*='size-'])]:size-3",
        "icon-sm":
          "size-7 rounded-[min(var(--radius-md),12px)] in-data-[slot=button-group]:rounded-lg",
        "icon-lg": "size-9",
        /**
         * V21 (Caio, 2026-09-15 — "os botões e CTAs devem estar com
         * menos arredondamento de borda... seguindo o mesmo padrão do
         * CTA principal da hero"): `--radius-pill` (999px, totalmente
         * arredondado) trocado por `--radius-block` (25px) — o mesmo
         * raio que o CTA `cta-lg` do Hero já usa, agora replicado aqui
         * em vez de dois raios de botão coexistindo no site.
         */
        cta: "h-auto gap-2 rounded-[var(--radius-block)] px-7 py-3.5 text-sm font-semibold has-data-[icon=inline-end]:pr-6 has-data-[icon=inline-start]:pl-6",
        chip: "h-auto rounded-[var(--radius-pill)] px-4 py-2 text-xs font-semibold",
        /**
         * CTA principal do Hero na direção "Horizonte de Decisão"
         * (72px altura, padding 0 34px, radius 25px = --radius-block já
         * existente, font-size 19px — valores medidos do Gate 1).
         * Abaixo de 480px o próprio componente que a consome
         * (hero.tsx) sobrescreve para largura total + quebra de linha,
         * porque essa correção é de layout do CTA dentro do Hero, não
         * do componente Button em si (reaproveitado em outros lugares
         * sem essa exigência).
         */
        "cta-lg":
          "h-[72px] gap-2.5 rounded-[var(--radius-block)] px-[34px] text-[19px] font-semibold has-data-[icon=inline-end]:pr-7 has-data-[icon=inline-start]:pl-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
