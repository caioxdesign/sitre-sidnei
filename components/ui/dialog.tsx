"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { XIcon } from "lucide-react"
import { cn } from "@/lib/utils"

const Dialog = DialogPrimitive.Root
const DialogTrigger = DialogPrimitive.Trigger
const DialogClose = DialogPrimitive.Close

function DialogPortal({ ...props }: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}

function DialogBackdrop({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-backdrop"
      // `bg-[rgba(0,0,0,0.8)]` em vez de `bg-black/80` — bug descoberto
      // ao testar: cores nomeadas padrão do Tailwind (`white`/`black`)
      // não geram CSS neste projeto (confirmado vasculhando o bundle
      // compilado). Sem classes `animate-in`/`data-open:`/`data-closed:`
      // (v. nota no DialogContent abaixo) — essas também não têm efeito
      // aqui (nenhum plugin de animação instalado).
      className={cn(
        "fixed inset-0 z-50 bg-[rgba(0,0,0,0.8)] data-closed:hidden",
        className
      )}
      {...props}
    />
  )
}

function DialogContent({
  className,
  children,
  showClose = true,
  ...props
}: DialogPrimitive.Popup.Props & { showClose?: boolean }) {
  return (
    <DialogPortal>
      <DialogBackdrop />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        // V21 — bug real descoberto ao testar "fecha clicando fora": as
        // classes `data-open:animate-in`/`data-closed:animate-out` etc.
        // (mesmo padrão de select.tsx/accordion.tsx) não têm nenhum CSS
        // gerado neste projeto (nenhum plugin de animação instalado) —
        // classes mortas. Isso travava o unmount consciente-de-animação
        // do base-ui esperando por uma transição que nunca disparava: o
        // atributo `data-closed` chegava a ser aplicado (o estado
        // fechava de verdade), mas o popup continuava 100% opaco e
        // clicável na tela — o base-ui só marca o atributo, não
        // esconde/desmonta sozinho sem uma transição CSS real para
        // "escutar". `data-closed:hidden` explícito resolve —
        // fechamento agora é imediato e funcional.
        className={cn(
          "fixed top-1/2 left-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-[var(--radius-card)] border border-[var(--border-dark)] bg-[var(--surface-raised)] p-6 shadow-lg outline-none data-closed:hidden",
          className
        )}
        {...props}
      >
        {children}
        {showClose ? (
          <DialogPrimitive.Close
            data-slot="dialog-close"
            className="absolute top-4 right-4 z-10 flex size-9 items-center justify-center rounded-full bg-[var(--navy-950)]/70 text-[var(--on-dark)] outline-none transition-colors duration-[var(--motion-fast)] hover:bg-[var(--navy-950)]/90 focus-visible:ring-2 focus-visible:ring-[var(--focus-ring)]"
          >
            <XIcon className="size-4.5" strokeWidth={2} />
            <span className="sr-only">Fechar</span>
          </DialogPrimitive.Close>
        ) : null}
      </DialogPrimitive.Popup>
    </DialogPortal>
  )
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-h3 text-[var(--on-dark)]", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-body text-[var(--on-dark-70)]", className)}
      {...props}
    />
  )
}

export {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogPortal,
  DialogBackdrop,
  DialogContent,
  DialogTitle,
  DialogDescription,
}
