# CLAUDE.md

Guia para agentes que trabalham neste repositório. Leia antes de editar qualquer coisa.

## O que é este projeto

**BabelStack Júnior** — trabalho acadêmico de **plano de negócios** para a disciplina **Estágio Empresarial II**. Modela uma **Empresa Júnior fictícia de EdTech** (educação + tecnologia). Não é um produto de software comercial: o entregável principal é **documentação** (18 seções, 20+ páginas) acompanhada de um **site funcional** e **5 produtos demonstráveis**.

- **Dupla:** Roger Quinelato (CTO) + Raquel Pereira (CPO) — dupla **autorizada** pela coordenação.
- **Entrega final:** 31/07/2026. Apresentações: 24/07 e 31/07/2026.
- **Documento regente:** `DocumentosIniciais/DiretrizesProjetoFinal.pdf` (18 seções obrigatórias).
- **Roteiro de execução:** `DocumentosIniciais/Roteiro_BabelStack_Junior.md` (é um PDF apesar da extensão `.md`).

## Estado atual (06/07/2026)

- **Sprints 1, 2 e 3 CONCLUÍDAS (adiantadas)** — todos os P0 da Sprint 3 fechados; resta só S3-6 (redes sociais, P2 opcional). Próximo foco: Sprint 4 (documento 20+ págs., mockups nas Seções 8/9, deck). Board Jira EST. Ver `docs/sprints/plano_sprints.md`.
- **Entregue na Sprint 1:** anexos em `diagramas/` (ERD, fluxograma, organograma — `.mmd` + `.svg`), referenciados nas Seções 5/10/16; **esqueleto do site** em `site/` (index/portfólio/contato com tokens); revisão das seções 9–16. Também: `analise_repositorio.md`, 5 PRDs + TDD, 5 ADRs, roadmap.
- **Entregue na Sprint 2:**
  - **LingoBoard MVP** (`produtos/lingoboard/app.py`): upload de CSV (com validação e fallback para `dados_exemplo.csv`, populado com 25 alunos fictícios em 3 turmas), 4 visualizações (média por turma, evolução por avaliação, ranking de risco, distribuição de faltas) com as cores da marca (`PALETA`/`.streamlit/config.toml`), indicador de risco com **limiares ajustáveis pela sidebar** (sliders, default média < 6.0 / faltas > 8) e filtros por turma/avaliação. P1 do PRD (tema visual + limiar configurável) fechados.
  - **VocabDeck MVP** (`produtos/vocabdeck/index.html` + `app.js` + `style.css`): CRUD de cards, motor Leitner de 5 caixas (intervalos 0/1/3/7/14 dias), persistência em `localStorage`, layout responsivo com os tokens de identidade.
  - **GitHub Pages ativado** (build via GitHub Actions, workflow em `.github/workflows/pages.yml`, dispara em push a `main` tocando `site/`) — publica em `https://roger-quinelato.github.io/EST-GIO_EMPRESARIAL_II/`. Só entra no ar após o próximo push.
- **Entregue na Sprint 3 (P0 completos — só falta S3-6, redes sociais, P2 opcional):**
  - **IntegraSchool MVP P0** (`produtos/integraschool/integraschool.py`): script Python stdlib-only, modo simulação (sem envio real); lê `alunos_exemplo.csv` (~20 alunos fictícios em 4 turmas + 2 linhas inválidas de teste), gera resumo + lembrete por aluno, organiza saída em `saida/AAAA-MM-DD_Turma/` (gitignorado) e grava log de execução. Ver `produtos/integraschool/README.md`. **(S3-2)**
  - **EduLanding** (`produtos/edulanding/index.html` + `README.md`): template de landing educacional **autocontido** (CSS/JS embutidos, custo-zero), responsivo, com pontos `EDITÁVEL:` marcados e o exemplo preenchido **"Feira Cultural de Idiomas"** (hero/sobre/programação/galeria/FAQ/CTA). Tokens da marca no `:root`. Verificado (desktop + mobile). Mockup em `assets/mockups/edulanding_feira_cultural.png`. **(S3-1)**
  - **BabelUX** (`produtos/babelux/`): (a) **diagnóstico heurístico** (`diagnostico_heuristico.md`) do "Portal Acadêmico" fictício — **7 problemas** com severidade (escala Nielsen 0–4) e heurística violada; (b) **comparativo Antes/Depois** (`antes_depois.html`) de **2 telas** (Login + Boletim), o lado "Antes" reproduzindo os problemas e o "Depois" aplicando os tokens BabelStack. Comparativo exportado em `assets/mockups/babelux_antes_depois.png`. Briefing e README atualizados. **(S3-3, S3-4)**
  - **Gantt do cronograma** (`diagramas/gantt_cronograma.mmd` + `.svg`): datas reais 16/06–31/07/2026, pacotes por sprint, marcador "hoje" e marcos das apresentações (24/07 e 31/07); referenciado na **Seção 18** (via `_build/build.js`). **(S3-5)**
  - Notas de anexo defasadas ("a produzir") das Seções 5/10/16/18 atualizadas em `build.js` para apontar os SVGs reais; `.docx` e `jira_backlog.csv/.pdf` regenerados (S3-1/3/4/5 → `status-concluido`).
- **Pendências resolvidas em 02/07:** (1) `jira_backlog.csv`/`.pdf` atualizados com os itens das Sprints 2/3 (status via labels `status-concluido`/`status-a-fazer`; novo item S2-6 espelhado também em `plano_sprints.md`); PDF agora regenerável via `_build/build_jira_pdf.py`; (2) fluxograma e organograma ganharam versões nativas Draw.io (`diagramas/*.drawio`, XML não-comprimido, paleta da marca); (3) commits sincronizados com origin/main. Soluções revisadas e aprovadas em code review interno.

## Regras fixas (NUNCA violar)

- **Idioma:** todo conteúdo em **português do Brasil (pt-BR)**.
- **2 integrantes** — nunca inventar um terceiro membro.
- **5 produtos fixos:** LingoBoard, VocabDeck, EduLanding, BabelUX, IntegraSchool. Não criar/renomear produtos.
- **Números:** nunca inventar valores (financeiros, métricas, prazos) sem marcar com **`[estimativa]`**.
- **Stack open-source / custo-zero:** Python, PostgreSQL, HTML/CSS/JS, Streamlit, Figma, GitHub.
- **Autonomia:** seguir os prompts do roteiro em ordem, trabalhar **sem pedir confirmação a cada passo**.

## Estrutura do repositório

> **Repo organizado na RAIZ.** A antiga pasta `babelstack-junior/` (usada antes da reorg) foi removida do filesystem.

```
docs/
  secoes/            # FONTE DE VERDADE do texto — as 18 seções (01_….md … 18_….md). Editar AQUI (raiz).
  identidade_visual.md
  analise_repositorio.md   # gap analysis vs. diretrizes
  produtos/          # 5 PRDs (prd_*.md) + TDD (tdd_arquitetura.md, com ERD) + roadmap.md
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

**Regenerar o `jira_backlog.pdf`:** `py -3 _build/build_jira_pdf.py` (lê `docs/sprints/jira_backlog.csv` e escreve o PDF ao lado; requer `fpdf2`, instalado via `py -3 -m pip install fpdf2` — o `python` puro não o tem).

**Validar o `.docx`** (skill `docx`) — no Windows, sempre com `PYTHONUTF8=1` (o validador quebra em cp1252 sem isso).

## Convenções ao editar

- A fonte de verdade do texto é o array `sections` em `_build/build.js` (dados estruturados). Editar ali e rodar `cd _build && node build.js` regenera tanto os `.md` em `docs/secoes/` quanto o `.docx`. Não editar os `.md` da raiz diretamente — o próximo build sobrescreve.
- Anexos visuais entram em `diagramas/` (`.mmd` fonte + `.svg` exportado com a paleta da marca) e `assets/mockups/`, e são referenciados nas seções correspondentes.
- **Gestão/Jira:** projeto **EST** em `projetooaplicado6.atlassian.net` (board 100), login/API `roger.quinelato@undf.edu.br`. Sprints numeradas **1–5** (= Semanas 3–7 da Seção 18). Backlog espelhado em `docs/sprints/`.
- Push direto na `main` autorizado. Repo: https://github.com/Roger-Quinelato/EST-GIO_EMPRESARIAL_II
