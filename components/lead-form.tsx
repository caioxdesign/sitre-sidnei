"use client";

import { useId, useState, type FormEvent } from "react";
import { CalendarIcon, CheckCircle2, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DemandType = "" | "palestra" | "consultoria" | "workshop";

const DEMAND_LABELS: Record<Exclude<DemandType, "">, string> = {
  palestra: "Palestra",
  consultoria: "Consultoria",
  workshop: "Workshop",
};

type LeadFormProps = {
  /**
   * "captacao": mostra o campo livre "Defina sua necessidade" (plano de
   * UX, Seção 10). "press-kit": omite — o Press Kit é acessado sob
   * demanda por quem já sabe o que quer (organizador avançado).
   */
  context: "captacao" | "press-kit";
  /**
   * "lg" (Caio, 2026-09-23 — sessão "Contato": "os textos do formulário
   * devem ter o mesmo tamanho do texto do subtítulo"): rótulos e campos
   * sobem de `text-xs`/`text-sm` para `.text-body-lg` (27px), igualando
   * a descrição do `SectionHeading` ao lado. Opt-in por instância (não
   * padrão) para não inflar o formulário do Press Kit, que vive dentro
   * de um card bem menor e mais denso — só `lead-capture.tsx` pede "lg".
   */
  size?: "default" | "lg";
  className?: string;
};

/**
 * Aparência dos campos — CORREÇÃO (Caio, 2026-09-09, V10 — "arrume os
 * dropdowns de texto, estão fora de layout shadcn"): a rodada anterior
 * sobrescrevia `border`/`rounded`/`bg` do `Input`/`SelectTrigger` do
 * shadcn com `h-auto`, mas o `SelectTrigger` base define altura via
 * `data-[size=default]:h-8` (variante de atributo, não classe simples)
 * — `h-auto` sozinho não vence essa variante no merge do Tailwind,
 * então o campo ficava com padding grande brigando com uma altura
 * mínima presa em 32px ("fora de layout"). Corrigido explicitando
 * `data-[size=default]:h-auto` também. Fora isso, a receita de cor
 * (borda --border-dark, fundo navy-800/60, foco cyan-500) é preservada
 * — só a mecânica de override ficou correta.
 */
const fieldClassBase =
  "h-auto w-full rounded-[var(--radius-field)] border border-[var(--border-dark)] bg-[var(--navy-800)]/60 text-[var(--on-dark)] placeholder:text-[var(--on-dark-muted)] outline-none transition-colors duration-[var(--motion-fast)] ease-[var(--ease-standard)] focus-visible:border-[var(--cyan-500)] focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]";

/**
 * Formulário curto de captação — usado tanto pela seção Contato quanto
 * pelo Press Kit ("formulário para organizadores"), composto (não
 * duplicado) conforme decisão registrada no plano de UX (Seção 9, risco
 * "dois formulários possivelmente divergentes"): mesma instância de
 * componente, contexto/copy diferente por fora.
 *
 * V10 (Caio, 2026-09-09 — "remova os botões de 'quero convidar para uma
 * palestra' e 'quero falar sobre consultoria'. adicione um bloco de
 * texto para o usuário escrever o que quiser, com título 'Defina sua
 * necessidade'"): os 2 chips de intenção rápida saíram; um campo
 * `Textarea` livre entra no lugar, sob o rótulo pedido. O campo
 * "Tipo de demanda" (Select) permanece — ele preenche uma necessidade
 * de qualificação estruturada que o texto livre não substitui — mas
 * `tipo` não é mais setado pelos chips removidos, só pelo próprio
 * Select.
 *
 * Destino técnico: [DESCONHECIDO] — não há backend/CRM definido no plano
 * de UX (Seção 9). Submit não envia dado real; loga localmente e mostra
 * confirmação local.
 *
 * V15 (Caio, 2026-09-15 — "o ícone em Data pretendida está escuro, nada
 * legível. precisa ser um ícone lucide com o mesmo tom de branco do
 * restante do texto"): o `<input type="date">` nativo desenha seu
 * próprio ícone de calendário renderizado pelo navegador (Chromium), que
 * ignora os tokens de cor do projeto e aparece escuro sobre o fundo
 * navy do campo — ilegível. Correção: o indicador nativo é ocultado via
 * `[&::-webkit-calendar-picker-indicator]:opacity-0` (mantém a área
 * clicável real, só fica invisível) e um `CalendarIcon` do lucide é
 * sobreposto por cima, decorativo (`pointer-events-none`), na mesma cor
 * `--on-dark-muted` do resto do texto do formulário.
 */
export function LeadForm({ context, size = "default", className }: LeadFormProps) {
  const uid = useId();
  const [tipo, setTipo] = useState<DemandType>("");
  const [submitted, setSubmitted] = useState(false);

  const isLg = size === "lg";
  const fieldClass = cn(
    fieldClassBase,
    isLg ? "text-body-lg px-5 py-3.5" : "text-sm px-4 py-3"
  );
  const selectTriggerClass = cn(
    fieldClass,
    "justify-between data-[size=default]:h-auto"
  );
  const labelClass = cn(
    "font-semibold text-[var(--on-dark-muted)]",
    isLg ? "text-body-lg" : "text-xs"
  );
  const calendarIconClass = isLg ? "size-6 right-4" : "size-4 right-3.5";
  /**
   * V18 (Caio, 2026-09-23 — "arrume o tamanho dos dropdowns em 'Tipo de
   * Demanda'... precisam ter o mesmo tamanho de fonte"): a caixa do
   * `SelectTrigger` já herdava `fieldClass` corretamente (mesmo padding/
   * altura/fonte 27px dos outros campos — confirmado no DOM), mas as
   * opções da lista aberta (`SelectItem`) tinham sua própria classe fixa
   * `text-sm` (14px) no componente base (`ui/select.tsx`), nunca
   * recebendo `size` — o menu abria com um tamanho de fonte visivelmente
   * menor que o campo que o abriu. `itemClass` aplica o mesmo `.text-
   * body-lg` + padding maior só quando `size="lg"`.
   */
  const itemClass = isLg ? "text-body-lg py-2.5 pr-10 pl-3" : undefined;

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(event.currentTarget));

    // TODO: destino técnico do formulário ainda não definido (pendência
    // do plano de UX, Seção 9). Até que backend/CRM seja confirmado, o
    // envio apenas registra localmente no console e mostra o estado de
    // sucesso.
    console.log(`[lead-form:${context}]`, data);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div
        role="status"
        className="flex flex-col items-start gap-2 rounded-[var(--radius-card)] border border-[var(--cyan-500)]/35 bg-[var(--navy-800)]/60 px-6 py-8"
      >
        <CheckCircle2
          className="size-6 text-[var(--cyan-400)]"
          strokeWidth={1.75}
          aria-hidden="true"
        />
        <p className="text-body font-semibold text-[var(--on-dark)]">
          Recebemos sua solicitação.
        </p>
        <p className="text-body text-[var(--on-dark-70)]">
          {context === "captacao"
            ? "A equipe entra em contato para dar sequência — enquanto isso, fale pelo WhatsApp fixo se preferir uma resposta mais rápida."
            : "A equipe entra em contato com o material solicitado."}
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("flex flex-col gap-5", className)}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`${uid}-nome`} className={labelClass}>
            Nome *
          </Label>
          <Input
            id={`${uid}-nome`}
            name="nome"
            type="text"
            required
            autoComplete="name"
            className={fieldClass}
            placeholder="Seu nome"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`${uid}-empresa`} className={labelClass}>
            Empresa ou evento *
          </Label>
          <Input
            id={`${uid}-empresa`}
            name="empresaOuEvento"
            type="text"
            required
            autoComplete="organization"
            className={fieldClass}
            placeholder="Nome da empresa ou do evento"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`${uid}-tipo`} className={labelClass}>
            Tipo de demanda *
          </Label>
          <Select
            name="tipoDemanda"
            required
            value={tipo || null}
            onValueChange={(value) => setTipo((value as DemandType) ?? "")}
          >
            <SelectTrigger id={`${uid}-tipo`} className={selectTriggerClass}>
              <SelectValue placeholder="Selecione">
                {(value: DemandType | null) => (value ? DEMAND_LABELS[value] : "Selecione")}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="palestra" className={itemClass}>
                Palestra
              </SelectItem>
              <SelectItem value="consultoria" className={itemClass}>
                Consultoria
              </SelectItem>
              <SelectItem value="workshop" className={itemClass}>
                Workshop
              </SelectItem>
            </SelectContent>
          </Select>
          {/*
            Mentoria (plano de UX, P-*: "Confirmação de Mentoria") segue
            [DESCONHECIDO] como oferta ativa — omitida do select em vez
            de listada como opção não disponível.
          */}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`${uid}-data`} className={labelClass}>
            Data pretendida
          </Label>
          <div className="relative">
            <Input
              id={`${uid}-data`}
              name="dataPretendida"
              type="date"
              className={cn(
                fieldClass,
                isLg ? "pr-12" : "pr-10",
                "[&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:opacity-0"
              )}
            />
            <CalendarIcon
              className={cn(
                "pointer-events-none absolute top-1/2 -translate-y-1/2 text-[var(--on-dark-muted)]",
                calendarIconClass
              )}
              strokeWidth={1.75}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>

      {context === "captacao" ? (
        <div className="flex flex-col gap-1.5">
          <Label htmlFor={`${uid}-necessidade`} className={labelClass}>
            Defina sua necessidade
          </Label>
          <Textarea
            id={`${uid}-necessidade`}
            name="necessidade"
            rows={4}
            className={cn(fieldClass, "min-h-28 resize-y")}
            placeholder="Conte um pouco sobre o evento, o público e o que você espera da palestra ou consultoria."
          />
        </div>
      ) : null}

      {/* V21 (Caio, 2026-09-15 — "o botão 'Baixar material em PDF'...
          deve estar ao lado do CTA 'enviar solicitação'"): movido do
          rodapé (site-footer.tsx) para cá, lado a lado com o submit —
          só no contexto "captacao" (o Press Kit já é o próprio contexto
          de quem quer material de apoio, não precisa do botão duplicado). */}
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" variant="gradient" size="cta" className="w-fit">
          {tipo === "palestra" ? "Convide Sidnei para seu evento" : "Enviar solicitação"}
        </Button>
        {context === "captacao" ? (
          <Button
            render={<a href="/downloads/sidnei-rodrigues-material.pdf" download />}
            nativeButton={false}
            variant="outline"
            size="cta"
            className="w-fit border-[var(--border-dark)] bg-transparent text-[var(--on-dark)] hover:bg-[var(--navy-800)]"
          >
            <Download className="size-4" strokeWidth={1.75} aria-hidden="true" />
            Baixar material em PDF
          </Button>
        ) : null}
      </div>
    </form>
  );
}
