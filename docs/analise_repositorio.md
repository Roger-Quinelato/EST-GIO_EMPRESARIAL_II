# Análise do Repositório — BabelStack Júnior

> Documento de diagnóstico (gap analysis) do estado atual do repositório frente aos objetivos das **Diretrizes do Projeto Final** (`DocumentosIniciais/DiretrizesProjetoFinal.pdf`).
> Gerado em **30/06/2026** (início da Semana 3 de 7 do cronograma = Sprint 1 do board). Fonte de verdade das seções: `docs/secoes/*.md`.

## 1. Resumo executivo

O projeto está com **toda a documentação textual redigida** (18 seções em rascunho v0.1) e a **identidade visual concluída** (Fase 1). O que ainda **não foi construído** é a camada técnica e os anexos visuais: os 5 produtos e o site existem apenas como **stubs** (arquivos de 1 linha apontando para as Fases 4–5), e a maioria dos diagramas obrigatórios (organograma, fluxograma, ERD, Gantt) ainda não foi produzida. Isso está **alinhado ao cronograma** (Seção 18): produtos e site são entregáveis das Semanas 4–5; documento final e apresentações, das Semanas 6–7.

**Conformidade global estimada:** documentação textual ~90% · identidade visual 100% · anexos visuais ~15% · produtos/site funcionais ~5%.

## 2. Matriz de conformidade — 18 seções das diretrizes

| # | Seção | Texto | Anexo exigido | Status do anexo | Pendência |
| --- | --- | :---: | --- | :---: | --- |
| 1 | Identificação da Empresa | ✅ | Logotipo | ✅ | Plugar logo na capa do `.docx` |
| 2 | Problema da Comunidade | ✅ | — | — | — |
| 3 | Solução Proposta | ✅ | — | — | — |
| 4 | Planejamento Estratégico | ✅ | — | — | — |
| 5 | Estrutura Organizacional | ✅ | Organograma (Draw.io) | ❌ | Produzir organograma da dupla |
| 6 | Recursos Humanos | ✅ | — | — | — |
| 7 | Análise de Mercado | ✅ | — | — | — |
| 8 | Portfólio de Produtos | ✅ | Imagens dos produtos | ⚠️ | Mockups/prints (pasta `assets/mockups/` vazia) |
| 9 | Plano de Marketing | ✅ | Identidade/redes/site | ⚠️ | Site e redes ainda não no ar |
| 10 | Plano Operacional | ✅ | Fluxograma (Bizagi) | ❌ | Produzir fluxograma de atendimento |
| 11 | Plano Financeiro | ✅ | — | — | Números marcados `[estimativa]` |
| 12 | Aspectos Legais | ✅ | — | — | — |
| 13 | Sustentabilidade e Resp. Social | ✅ | — | — | — |
| 14 | Gestão da Qualidade | ✅ | — | — | — |
| 15 | Gestão de Riscos | ✅ | — | — | — |
| 16 | Tecnologia e Inovação | ✅ | ERD PostgreSQL (bônus) | ❌ | ERD a produzir (ver `tdd_arquitetura.md`) |
| 17 | Resultados Esperados | ✅ | — | — | Números `[estimativa]` |
| 18 | Cronograma de Criação | ✅ | Gantt | ❌ | Gantt a produzir na Semana 5 |

Legenda: ✅ feito · ⚠️ parcial · ❌ pendente · — não se aplica.

## 3. Requisitos macro de entrega

| Requisito (diretrizes) | Exigência | Estado atual | Lacuna |
| --- | --- | --- | --- |
| Documento | Mínimo 20 páginas, 18 itens | `docs/BabelStack_Junior_Documento_v0.1.docx` (draft) | Inserir anexos visuais; revisar contagem de páginas |
| Site da empresa | Funcionando | `site/` = esqueleto de 15 linhas | Construir e publicar (Semana 4) |
| Portfólio | Mínimo 5 produtos | 5 definidos; código = stubs | Implementar MVPs (Semanas 4–5) |
| Redes sociais | Opcional | Não iniciado | Opcional — Semana 5 |
| Apresentações | 24/07 e 31/07 | `apresentacao/` vazio | Montar deck (Semanas 6–7) |
| Equipe | "Grupos de 3" no enunciado | **Dupla autorizada** (2) | Exceção formalizada — manter 2 integrantes |

> ⚠️ **Divergência de equipe:** o enunciado pede grupos de 3, mas a dupla Roger + Raquel foi **autorizada** pela coordenação. Registrar essa autorização explicitamente na Seção 1/5 do documento para evitar perda de pontos.

## 4. Inventário técnico (estado real do código)

| Produto | Pasta | Arquivos | Estado |
| --- | --- | --- | --- |
| LingoBoard | `produtos/lingoboard/` | `app.py`, `requirements.txt`, `dados_exemplo.csv` | **Stub** — `app.py` é placeholder (Fase 4) |
| VocabDeck | `produtos/vocabdeck/` | `index.html` | **Stub** — 7 linhas |
| EduLanding | `produtos/edulanding/` | `index.html` | **Stub** — 7 linhas |
| BabelUX | `produtos/babelux/` | `briefing.md` | **Briefing** — entregável é Figma (Fase 5) |
| IntegraSchool | `produtos/integraschool/` | `integraschool.py`, `README.md`, `alunos_exemplo.csv` | **Stub** — placeholder (Fase 5) |
| Site institucional | `site/` | `index.html`, `script.js`, `style.css` | **Esqueleto** — ~17 linhas no total |

Identidade visual (✅ pronta): `assets/logo/` (mark-balao-codigo, lockup, favicon + alternativas camadas/monograma) e `assets/identidade/tokens.css`. Pasta `assets/mockups/` e `diagramas/` ainda vazias (só `.gitkeep`).

Build do documento: `_build/build.js` (Node + lib `docx`) regenera os 18 `.md` e o `.docx`. Validar com a skill docx usando `PYTHONUTF8=1` no Windows.

## 5. Lacunas priorizadas (o que falta para cumprir as diretrizes)

**Bloqueadores de nota (obrigatórios):**
1. **Site funcional** publicado — Semana 4.
2. **5 produtos demonstráveis** (MVPs) — Semanas 4–5.
3. **Organograma** (Draw.io, Seção 5) — Semana 3.
4. **Fluxograma** de atendimento (Bizagi, Seção 10) — Semana 3.
5. **Gantt** (Seção 18) — Semana 5.
6. **Documento 20+ páginas** com anexos embutidos — Semana 6.

**Reforços de qualidade (recomendados):**
7. **ERD PostgreSQL** (bônus Seção 16) — fecha a narrativa de "BI/dados".
8. **Mockups/prints** dos produtos e do site (Seção 8/9).
9. **Deck de apresentação** — Semanas 6–7.
10. Formalizar a **autorização da dupla** no texto.

## 6. Conexão com os entregáveis deste pacote

Esta análise embasa os artefatos de produto/engenharia gerados na sequência:
- **PRDs** (`docs/produto/prd_*.md`) — especificam o que cada um dos 5 produtos stub deve se tornar.
- **TDD + ERD** (`docs/produto/tdd_arquitetura.md`) — fecha a lacuna #7 e fundamenta a Seção 16.
- **ADRs** (`docs/adr/`) — registram as decisões de stack já tomadas.
- **Plano de sprints** (`docs/sprints/plano_sprints.md`) e **Jira (projeto EST)** — organizam as lacunas #1–#10 em execução até 31/07.
