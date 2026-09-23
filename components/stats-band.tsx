import { Reveal } from "@/components/reveal";

/**
 * Faixa de Números — "Horizonte de Decisão" (Gate 1, Probe C).
 * Segue imediatamente o Hero, --surface-light, com a costura diagonal
 * ecoada e invertida (`--cut: 40%` vs. 58% do Hero — direção oposta,
 * conforme o brief) na fronteira com a seção anterior.
 *
 * Evolução de UI (Caio, 2026-09-09, primeira rodada): a política
 * anterior (numeral sempre em traço vazado + rótulo "Em atualização",
 * nunca um valor) foi substituída por autorização explícita de Caio —
 * "retire as linhas retas dos grandes números... retire os 'em
 * atualização'. pode dar números fictícios por enquanto." Os valores
 * abaixo são ilustrativos/fictícios (mesma categoria de risco já
 * documentada nesta entrega para headline/bio — nunca uma alegação de
 * performance real até confirmação).
 *
 * Correção (Caio, 2026-09-09, segunda rodada, com prints anexados):
 * "retire completamente as linhas dos grandes números" referia-se às
 * bordas divisórias verticais entre colunas (`lg:border-l`) — removidas
 * abaixo. "o tamanho deles está enorme e desproporcional... note que
 * até há quebra de layout": `--type-stat-size` (compartilhado só por
 * esta seção — confirmado por busca, nenhuma outra a consome) estava
 * em clamp(64px, 8.4vw, 156px), grande demais para caber em 5 colunas
 * a 1440px sem quebrar linha — trocado por uma escala própria e menor
 * (`--type-stat-band-size`), proporcional ao rótulo abaixo. O
 * deslocamento vertical "em escada" também saiu — no tamanho corrigido
 * ele lia como desalinhamento, não como ritmo editorial.
 *
 * V12 (Caio, 2026-09-09 — rodada de layout/espacialidade desktop):
 * correção de inconsistência encontrada — esta era a única seção sem
 * wrapper de gutter lateral (`px-6 sm:px-10 lg:px-12`) igual ao resto
 * da página; o grid dependia só de `mx-auto max-w-[1400px]`, o que a
 * 1440px sobrava apenas ~20px de margem (bem menor que o gutter de
 * 56-64px de toda outra seção), desalinhando as bordas dos numerais com
 * o resto do conteúdo. Wrapper de gutter adicionado, `max-w` alinhado a
 * 1600px como as demais.
 *
 * V15 (Caio, 2026-09-15): "exclua o '4.9 avaliação média dos eventos'
 * e em '12 anos de atuação', troque o 12 por 20. alinhe tudo para que
 * fique simétrico" — de 5 para 4 estatísticas. O grid usava
 * `lg:grid-cols-5` com um hack de `col-span` para o item ímpar sobrando
 * (5 não divide igualmente em 2 colunas mobile); com 4 itens (par), o
 * hack não é mais necessário — grid simples `grid-cols-2 lg:grid-cols-4`
 * distribui os 4 igualmente em ambos os breakpoints, sem sobra.
 *
 * V21 (Caio, 2026-09-15 — "aumente os textos dos grandes números...
 * cada grande número deve ter apenas uma quebra de linha, para que seus
 * textos ocupem somente duas linhas"): (1) `--type-stat-band-size` sobe
 * de `clamp(34px,3.4vw,58px)` para `clamp(40px,4.2vw,70px)`. (2) o rótulo
 * de cada estatística deixa de ser uma única string que quebra onde o
 * `max-w-[16ch]` mandar (imprevisível — "Empresas e instituições
 * atendidas" virava 3 linhas nesse cap) e passa a ser um array `[linha1,
 * linha2]` com a quebra escolhida manualmente em um ponto natural da
 * frase, renderizado como dois blocos empilhados — garante exatamente 2
 * linhas para as 4 estatísticas, não uma torcida de largura de coluna. */
// TODO: substituir pelos números reais confirmados por Caio/Sidnei
// antes da publicação (valores atuais são ilustrativos/fictícios,
// autorizados nesta entrega para preencher o placeholder).
const STATS = [
  { value: "180+", label: ["Palestras", "realizadas"] },
  { value: "40k+", label: ["Pessoas / gestores", "impactados"] },
  { value: "60+", label: ["Empresas e instituições", "atendidas"] },
  { value: "20", label: ["Anos de", "atuação"] },
] as const;

export function StatsBand() {
  return (
    <section
      id="numeros"
      className="diagonal-stats relative overflow-hidden bg-[var(--surface-light)]"
    >
      {/* Costura decorativa, ecoando o Hero em direção invertida.
          Puramente decorativa: aria-hidden, atrás do conteúdo (z-0). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[64px] overflow-hidden"
      >
        <div className="diagonal-wedge-inverted diagonal-seam absolute inset-0" />
        <div className="diagonal-wedge-inverted absolute inset-0 translate-x-[2px] translate-y-[2px] bg-[var(--surface-light)]">
          <div className="stats-seam-hachure absolute inset-0" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1760px] px-6 sm:px-10 lg:px-12">
        <div className="grid grid-cols-2 gap-y-6 lg:grid-cols-4">
          {STATS.map((stat, index) => (
            <Reveal
              key={stat.value}
              index={index}
              className="px-6 py-4 text-center sm:px-8 lg:py-6"
            >
              <div className="flex flex-col items-center gap-1.5">
                <span className="text-stat-band leading-none text-[var(--navy-900)]">
                  {stat.value}
                </span>
                <span className="text-body flex flex-col font-medium text-[var(--gray-700)]">
                  <span>{stat.label[0]}</span>
                  <span>{stat.label[1]}</span>
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
