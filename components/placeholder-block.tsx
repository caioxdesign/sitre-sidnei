import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type PlaceholderBlockProps = {
  label: string;
  icon: LucideIcon;
  tone: "dark" | "light";
  className?: string;
  compact?: boolean;
};

/**
 * Bloco de placeholder tracejado, reutilizado por toda entrega para
 * qualquer conteúdo pendente (logos, depoimentos, galeria, imprensa,
 * fotos/bios/rider do Press Kit). Um único componente evita 6+
 * implementações divergentes do mesmo "está pendente" — e garante que
 * todo placeholder desta entrega comunique a mesma coisa da mesma forma
 * (nunca como dado real, sempre com rótulo explícito + ícone neutro).
 */
export function PlaceholderBlock({
  label,
  icon: Icon,
  tone,
  className,
  compact = false,
}: PlaceholderBlockProps) {
  const border = tone === "dark" ? "border-[var(--border-dark)]" : "border-[var(--border-light)]";
  const text = tone === "dark" ? "text-[var(--on-dark-muted)]" : "text-[var(--gray-700)]";

  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-[var(--radius-card)] border border-dashed text-center",
        border,
        text,
        compact ? "px-4 py-6" : "px-6 py-10",
        className
      )}
    >
      <Icon className={compact ? "size-5" : "size-6"} strokeWidth={1.5} aria-hidden="true" />
      <p className="text-xs font-medium">{label}</p>
    </div>
  );
}
