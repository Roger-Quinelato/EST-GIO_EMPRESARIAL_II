# BabelUX — Briefing de Redesign (UX/UI)

Consultoria de redesign de interfaces educacionais. Entregável: estudo de caso **"Antes/Depois"** em alta fidelidade, com justificativas de usabilidade. PRD: [`docs/produtos/prd_babelux.md`](../../docs/produtos/prd_babelux.md). Sprint 3 · itens **S3-3** (diagnóstico) e **S3-4** (protótipo Antes/Depois).

## Interface-alvo do estudo de caso

**"Portal Acadêmico"** — sistema web fictício, porém representativo dos portais defasados usados por escolas públicas e centros de idiomas (login + consulta de boletim). O alvo é **fictício de propósito**, para não expor nenhum sistema real; os problemas modelados espelham padrões recorrentes desses portais legados (tabelas densas, jargão, baixo contraste, ausência de feedback).

Duas telas-chave entram no escopo do redesign:

1. **Tela de Acesso (Login)** — porta de entrada de alunos e responsáveis.
2. **Boletim / Painel de Notas** — a tela mais consultada pelo aluno.

## Personas afetadas

- **Aluno(a) do Ensino Fundamental II / Médio** — nativo digital, acessa majoritariamente pelo celular.
- **Responsável** — menos familiaridade digital, precisa achar rapidamente a nota e as faltas.

## Processo BabelUX (repetível)

1. **Diagnóstico heurístico** (10 heurísticas de Nielsen + escala de severidade 0–4) → `diagnostico_heuristico.md`.
2. **Redesign** das telas-chave com os tokens BabelStack → `antes_depois.html` (mockups Antes/Depois).
3. **Comparativo exportável** (imagens) para o portfólio (Seção 8 do documento).

## Design system reutilizado

Tokens da identidade BabelStack ([`assets/identidade/tokens.css`](../../assets/identidade/tokens.css)): Índigo `#4338CA`, Teal `#0EA5A4`, Âmbar `#F59E0B`, Grafite `#1E293B`, Branco-gelo `#F8FAFC`; fontes Space Grotesk (títulos) + Inter (corpo).

## Escopo (v1)

- **2 telas** redesenhadas (login + boletim). Protótipo navegável entre telas fica como P1/futuro.
- Diagnóstico com **≥5 problemas** (entregue com 7), cada um com severidade e heurística violada.
