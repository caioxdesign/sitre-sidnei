import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";

// Evolução de UI (Caio, 2026-09-09): "use a fonte DM Sans no site
// todo" — substitui o par Sora (display) + Inter (body) por uma única
// família variável cobrindo os dois papéis. Pesos 400-800 (variável,
// então qualquer peso intermediário também fica disponível) cobrem
// tanto o corpo de texto quanto os headings maximalistas do brief.
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sidnei Rodrigues — Palestrante e Consultor em Transformação Digital",
  description:
    "Palestrante e consultor especializado em transformação digital, ajudando líderes e organizações a transformar conhecimento em decisões que geram impacto.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${dmSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[var(--surface-page)] text-[var(--on-dark)]">
        <a href="#conteudo" className="skip-link">
          Pular para o conteúdo
        </a>
        {children}
      </body>
    </html>
  );
}
