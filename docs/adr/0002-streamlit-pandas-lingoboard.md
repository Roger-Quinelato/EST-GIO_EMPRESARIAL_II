# ADR-0002: Usar Streamlit + Pandas no LingoBoard

- **Data**: 2026-06-30
- **Status**: Accepted
- **Deciders**: Roger (CTO), Raquel (CPO)
- **Tags**: bi, dados, frontend

## Contexto e Problema

O LingoBoard precisa transformar planilhas de notas/presenças em um painel interativo de BI que um gestor sem conhecimento técnico consiga usar. A dupla precisa construir isso rápido, com poucas linhas e sem montar um frontend web completo nem um servidor.

## Decision Drivers

- Rapidez de desenvolvimento (1 semana de build).
- Time-to-dashboard mínimo, sem stack web full.
- Aderência a Python (já escolhido no [[0001-stack-open-source-custo-zero]]).
- Interatividade (filtros, gráficos) com baixo esforço.

## Opções consideradas

- **A — Streamlit + Pandas** (app Python data-first).
- **B — Dash/Plotly** (mais flexível, mais verboso).
- **C — Frontend JS (React) + API** (controle total, muito mais trabalho).
- **D — Power BI / Looker Studio** (proprietário/SaaS).

## Decision Outcome

Escolhida a opção **A (Streamlit + Pandas)**: entrega um dashboard interativo com pouquíssimo código, ideal para o prazo e para demonstração.

### Consequências positivas
- Do CSV ao gráfico em poucas linhas; ótimo para MVP e demo.
- Pandas cobre o cálculo de métricas/risco sem banco.
- Deploy simples (local ou Streamlit Community Cloud).

### Consequências negativas
- Customização visual/UX limitada frente a um frontend próprio.
- Modelo de execução server-side; multiusuário/escala exigem mais no futuro.
- Menos controle fino de layout que Dash/React.

## Links
- PRD: `docs/produto/prd_lingoboard.md`
- Decorre de [[0001-stack-open-source-custo-zero]].
