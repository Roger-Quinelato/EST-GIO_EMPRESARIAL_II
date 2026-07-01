# CLAUDE.md

Guia para agentes que trabalham neste repositório. Leia antes de editar qualquer coisa.

## O que é este projeto

**BabelStack Júnior** — trabalho acadêmico de **plano de negócios** para a disciplina **Estágio Empresarial II**. Modela uma **Empresa Júnior fictícia de EdTech** (educação + tecnologia). Não é um produto de software comercial: o entregável principal é **documentação** (18 seções, 20+ páginas) acompanhada de um **site funcional** e **5 produtos demonstráveis**.

- **Dupla:** Roger Quinelato (CTO) + Raquel Pereira (CPO) — dupla **autorizada** pela coordenação.
- **Entrega final:** 31/07/2026. Apresentações: 24/07 e 31/07/2026.
- **Documento regente:** `DocumentosIniciais/DiretrizesProjetoFinal.pdf` (18 seções obrigatórias).
- **Roteiro de execução:** `DocumentosIniciais/Roteiro_BabelStack_Junior.md` (é um PDF apesar da extensão `.md`).

## Estado atual (30/06/2026)

- **Sprint 1 CONCLUÍDA / Sprint 2 ATIVA** (board Jira EST). Ver `docs/sprints/plano_sprints.md`.
- **Entregue na Sprint 1:** anexos em `diagramas/` (ERD, fluxograma, organograma — `.mmd` + `.svg`), referenciados nas Seções 5/10/16; **esqueleto do site** em `site/` (index/portfólio/contato com tokens); revisão das seções 9–16. Também: `analise_repositorio.md`, 5 PRDs + TDD, 5 ADRs, roadmap.
- **Sprint 2 (07–13/07):** LingoBoard MVP (Streamlit), VocabDeck MVP (Leitner/localStorage), publicar site no GitHub Pages.
- **Pendências conhecidas:** (1) `jira_backlog.pdf` desatualizado (só o `.csv` está em 1–5); (2) fluxograma/organograma entregues em Mermaid/SVG, não nos nativos Bizagi/Draw.io; (3) reorg da raiz (saída de `babelstack-junior/`) ainda não commitada — ver `git status`.

## Regras fixas (NUNCA violar)

- **Idioma:** todo conteúdo em **português do Brasil (pt-BR)**.
- **2 integrantes** — nunca inventar um terceiro membro.
- **5 produtos fixos:** LingoBoard, VocabDeck, EduLanding, BabelUX, IntegraSchool. Não criar/renomear produtos.
- **Números:** nunca inventar valores (financeiros, métricas, prazos) sem marcar com **`[estimativa]`**.
- **Stack open-source / custo-zero:** Python, PostgreSQL, HTML/CSS/JS, Streamlit, Figma, GitHub.
- **Autonomia:** seguir os prompts do roteiro em ordem, trabalhar **sem pedir confirmação a cada passo**.

## Estrutura do repositório

> **Repo reorganizado para a RAIZ.** A antiga pasta `babelstack-junior/` está sendo removida (aparece como `D` no git) — **não usar**.

```
docs/
  secoes/            # FONTE DE VERDADE do texto — as 18 seções (01_….md … 18_….md). Editar AQUI (raiz).
  identidade_visual.md
  analise_repositorio.md   # gap analysis vs. diretrizes
  produto/           # 5 PRDs (prd_*.md) + TDD (tdd_arquitetura.md, com ERD) + roadmap.md
  adr/               # 5 ADRs (0001–0005) + README
  sprints/           # plano_sprints.md + jira_backlog.csv/.pdf
assets/
  logo/              # logo oficial (conceito B: balão + </>) + alternativas
  identidade/        # tokens.css (cores/tipografia)
  mockups/           # mockups dos produtos (a produzir)
produtos/            # código dos 5 produtos (stubs até a Sprint 2)
site/                # PRONTO (esqueleto): index/portfolio/contato + style.css/script.js, com tokens
diagramas/           # PRONTOS: erd_babelstack / fluxograma_atendimento / organograma (.mmd + .svg). Gantt a produzir.
apresentacao/        # decks (a produzir)
_build/              # gerador do .docx (Node + lib `docx`) — ⚠️ desalinhado, ver Comandos
```

## Identidade visual

- **Cores:** Índigo `#4338CA`, Teal `#0EA5A4`, Âmbar `#F59E0B`, Grafite `#1E293B`, Branco-gelo `#F8FAFC`.
- **Fontes:** Space Grotesk (títulos) + Inter (corpo).
- **Logo oficial:** conceito B (balão de fala + `</>`) em `assets/logo/`. Tokens em `assets/identidade/tokens.css`. Figma: `BwHP5UWR51JXmtGOW9cfS1`.

## Comandos

**Regenerar o `.docx`:** `_build/build.js` já aponta `REPO` para a raiz (`path.resolve(__dirname, '..')` — confirmado 30/06, escreve corretamente em `docs/`, não em `babelstack-junior/`). Pode rodar livremente:
```bash
cd _build && node build.js   # regenera os 18 .md + o .docx
```

**Validar o `.docx`** (skill `docx`) — no Windows, sempre com `PYTHONUTF8=1` (o validador quebra em cp1252 sem isso).

## Convenções ao editar

- A fonte de verdade do texto é o array `sections` em `_build/build.js` (dados estruturados). Editar ali e rodar `cd _build && node build.js` regenera tanto os `.md` em `docs/secoes/` quanto o `.docx`. Não editar os `.md` da raiz diretamente — o próximo build sobrescreve.
- Anexos visuais entram em `diagramas/` (`.mmd` fonte + `.svg` exportado com a paleta da marca) e `assets/mockups/`, e são referenciados nas seções correspondentes.
- **Gestão/Jira:** projeto **EST** em `projetooaplicado6.atlassian.net` (board 100), login/API `roger.quinelato@undf.edu.br`. Sprints numeradas **1–5** (= Semanas 3–7 da Seção 18). Backlog espelhado em `docs/sprints/`.
- Push direto na `main` autorizado. Repo: https://github.com/Roger-Quinelato/EST-GIO_EMPRESARIAL_II
