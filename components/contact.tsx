import { AtSign, Mail, MessageCircle } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";

/**
 * Contato — dark, funde com o footer (--surface-sunken, um tom mais
 * profundo que Captação, sem borda entre as duas — "funde", não
 * "separa", conforme brief). Canais diretos, todos [DESCONHECIDO] até
 * confirmação (plano de UX, Seção 9: "WhatsApp, e-mail e redes sociais
 * finais" listados como pendência).
 *
 * Desvio registrado: lucide-react nesta versão não expõe ícone de marca
 * do Instagram (mesma limitação já documentada em
 * components/whatsapp-button.tsx para o WhatsApp) — usa-se o ícone
 * genérico `AtSign` para redes sociais em vez de aproximar um glifo de
 * marca sem fonte confirmada.
 *
 * Addendum de enriquecimento (2026-09-08): postura mais expressiva da
 * costura, conforme a tabela do brief — o H2 (via SectionHeading) cruza
 * a costura porque só o fundo é clipado (`.diagonal-wedge`), o mesmo
 * princípio já usado no H1 do Hero, mas em escala reduzida (`--cut:
 * 64%`, opacidade do campo mais baixa que o Hero: 45% vs. 100%, porque
 * aqui é encerramento de página, não abertura). Padding vertical
 * aumentado (py-20/py-28, substituindo o py-16/py-20 anterior) para o
 * respiro generoso/top-loaded pedido — nunca "vazio morto", mesma
 * lógica do Hero corrigido.
 */
export function Contact() {
  return (
    <section
      id="contato"
      className="diagonal-contato relative overflow-hidden border-t border-[var(--border-dark)] bg-[var(--surface-sunken)] px-6 py-20 sm:px-10 sm:py-28 lg:px-16"
    >
      <div
        aria-hidden="true"
        className="diagonal-wedge diagonal-seam absolute inset-0 z-0 opacity-80"
      />
      <div
        aria-hidden="true"
        className="diagonal-wedge absolute inset-0 z-0 opacity-45"
      >
        <div className="diagonal-field" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col gap-12">
        <SectionHeading
          tone="dark"
          eyebrow="Contato"
          title="Prefere falar direto?"
          description="Canais diretos para quem não quer preencher formulário."
        />

        <div className="grid gap-6 sm:grid-cols-3">
          <Reveal index={0} className="flex items-start gap-3">
            <Mail
              className="mt-0.5 size-5 shrink-0 text-[var(--cyan-400)]"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <div className="flex flex-col gap-1">
              <span className="text-body font-medium text-[var(--on-dark)]">
                E-mail
              </span>
              <span className="text-body text-[var(--on-dark-70)]">
                [e-mail — pendente]
              </span>
            </div>
          </Reveal>

          <Reveal index={1} className="flex items-start gap-3">
            <MessageCircle
              className="mt-0.5 size-5 shrink-0 text-[var(--cyan-400)]"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <div className="flex flex-col gap-1">
              <span className="text-body font-medium text-[var(--on-dark)]">
                WhatsApp
              </span>
              <span className="text-body text-[var(--on-dark-70)]">
                [WhatsApp — pendente]
              </span>
            </div>
          </Reveal>

          <Reveal index={2} className="flex items-start gap-3">
            <AtSign
              className="mt-0.5 size-5 shrink-0 text-[var(--cyan-400)]"
              strokeWidth={1.75}
              aria-hidden="true"
            />
            <div className="flex flex-col gap-1">
              <span className="text-body font-medium text-[var(--on-dark)]">
                Instagram
              </span>
              <span className="text-body text-[var(--on-dark-70)]">
                @eusousidneirodrigues [link a confirmar]
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal index={3}>
          <a
            href="#press-kit"
            className="inline-flex w-fit items-center gap-1.5 text-sm font-semibold text-[var(--cyan-300)] hover:underline"
          >
            Acessar o Press Kit
          </a>
        </Reveal>
      </div>
    </section>
  );
}
