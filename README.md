# BabelStack Júnior — Soluções em EdTech

> _"Codificando fluência, estruturando conexões globais."_

Repositório do plano de negócios acadêmico da **Empresa Júnior fictícia BabelStack Júnior**,
desenvolvido para a disciplina de **Estágio Empresarial II**. Entrega final: **31/07/2026**.

**🌐 Site ao vivo:** [roger-quinelato.github.io/EST-GIO_EMPRESARIAL_II](https://roger-quinelato.github.io/EST-GIO_EMPRESARIAL_II/)

## Sobre

EdTech voltada ao ensino de idiomas (foco inicial: inglês), desenvolvida por estudantes de
Sistemas de Informação. Modelo de Associação civil sem fins lucrativos / Empresa Júnior
(Lei Federal nº 13.267/2016).

- **Missão:** Democratizar e otimizar o ensino de línguas estrangeiras por meio da tecnologia.
- **Visão:** Ser a EJ de referência em tecnologias educacionais no Centro-Oeste até 2027.

## Equipe (2 integrantes autorizados)

| Pessoa | Cargo | Frente |
|---|---|---|
| **Raquel Pereira** | Chief Product Officer (CPO) | Estratégia, requisitos, UX/UI, business intelligence |
| **Roger Quinelato** | Chief Technology Officer (CTO) | Dev web, automação, arquitetura, operações |

## Portfólio (5 produtos MVP)

| # | Produto | Categoria | Status | Stack |
|---|---|---|---|---|
| 1 | **LingoBoard** | Dashboard BI educacional | ✅ MVP P1 | Python + Streamlit |
| 2 | **VocabDeck** | App SPA de flashcards (Leitner) | ✅ MVP P0 | HTML/CSS/JS + localStorage |
| 3 | **EduLanding** | Template landing educacional | ✅ MVP P0 | HTML/CSS/JS (autocontido) |
| 4 | **BabelUX** | Consultoria UX/UI (diag. + redesign) | ✅ MVP P0 | Mermaid + Figma |
| 5 | **IntegraSchool** | Automação rotinas administrativas | ✅ MVP P0 | Python (simulação) |

## Marcos de entrega

- **Sprint 1** (16–22/06): Arquitetura, diagramas, PRDs, ADRs, esqueleto do site
- **Sprint 2** (23–29/06): LingoBoard + VocabDeck MVPs + GitHub Pages ativo
- **Sprint 3** (30/06–07/07): IntegraSchool + EduLanding + BabelUX + Gantt
- **Sprint 4** (08–24/07): Documento final (20+ págs.) + mockups + preparação de apresentação
- **Apresentação 1:** 24/07/2026 (concluída)
- **Apresentação Final + Entrega:** 31/07/2026

ver [`docs/sprints/plano_sprints.md`](docs/sprints/plano_sprints.md) e [`jira_backlog.csv`](docs/sprints/jira_backlog.csv).

## Estrutura do repositório

```
docs/
  secoes/              # 18 seções do documento final (fonte de verdade)
  produtos/            # 5 PRDs + TDD (arquitetura) + roadmap
  adr/                 # 5 architecture decision records
  sprints/             # Plano de sprints + backlog Jira
  identidade_visual.md
site/                  # Site institucional (HTML/CSS/JS com identidade)
produtos/              # 5 MVPs demonstráveis
  lingoboard/          # Dashboard Streamlit
  vocabdeck/           # App web flashcards
  edulanding/          # Landing page template
  babelux/             # Diagnóstico UX + comparativo antes/depois
  integraschool/       # Automação Python
assets/
  logo/                # Logo BabelStack (conceito B: balão + </>)
  identidade/          # tokens.css (cores, tipografia)
  mockups/             # Mockups dos produtos
diagramas/
  erd_babelstack.*     # Diagrama E-R (Mermaid + SVG)
  fluxograma_atendimento.*
  organograma.*
  gantt_cronograma.*   # Timeline 16/06–31/07
apresentacao/          # Decks (24/07 e 31/07)
_build/                # Gerador automático do documento .docx
```

## Como executar os produtos

### LingoBoard
```bash
cd produtos/lingoboard
pip install -r requirements.txt
streamlit run app.py
```

### VocabDeck
```bash
cd produtos/vocabdeck
# Abrir index.html no navegador
```

### EduLanding
```bash
cd produtos/edulanding
# Abrir index.html no navegador
```

### IntegraSchool
```bash
cd produtos/integraschool
python integraschool.py
```

## Stack (open-source, custo-zero)

- **Backend:** Python (stdlib)
- **Frontend:** HTML, CSS, JavaScript
- **BI/Visualização:** Streamlit, Pandas
- **Banco de dados:** PostgreSQL (design em ADR-0003)
- **Prototipagem:** Figma
- **Versionamento:** Git + GitHub
- **CI/CD:** GitHub Actions (GitHub Pages)

## Referências

- 📋 [Diretrizes do Projeto Final](DocumentosIniciais/DiretrizesProjetoFinal.md) — 18 seções obrigatórias
- 🗓️ [Roteiro de Execução](DocumentosIniciais/Roteiro_BabelStack_Junior.md)
- 🏗️ [Análise da Arquitetura](docs/analise_repositorio.md)
- 🎨 [Identidade Visual](docs/identidade_visual.md) + [tokens.css](assets/identidade/tokens.css)
- 👥 [CLAUDE.md](CLAUDE.md) — Guia para colaboradores

---

**Desenvolvido em 2026 para a disciplina de Estágio Empresarial II — UNDEF (Centro)**
