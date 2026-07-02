# Plano de Sprints — BabelStack Júnior

> Modelo **híbrido**: sprints semanais do cronograma real (Seção 18) **+** épicos de produto que atravessam as sprints.
> Período: **30/06 → 31/07/2026** (Sprints 1–5). Equipe: **2 pessoas** — Roger (técnico/dados) e Raquel (produto/design).
> Story points em escala Fibonacci, todos `[estimativa]`. Espelhado no Jira (projeto **EST**) e no CSV/PDF.

> **Numeração:** as 5 sprints de execução são numeradas **1–5** (iguais ao board do Jira). No cronograma da Seção 18 elas correspondem às **Semanas 3–7** (as Semanas 1–2 foram a preparação — ver "Sprint 0" abaixo).

## Meta geral

Entregar, até 31/07, **5 produtos demonstráveis + site publicado + documento 20+ páginas com anexos**, cobrindo as lacunas do `docs/analise_repositorio.md`.

## Capacidade (por sprint)

Cada sprint ≈ 1 semana. Dupla acadêmica (tempo parcial). Planejamento a **~75%** da capacidade para absorver imprevistos.

| Pessoa | Trilha | Capacidade/sprint `[estimativa]` |
| --- | --- | --- |
| Roger (CTO) | Técnico, dados, deploy | ~8 pts |
| Raquel (CPO) | Produto, design, conteúdo | ~8 pts |
| **Total** | | **~16 pts** (planejar ~12) |

## Épicos (mapeiam para Epics no Jira)

| Épico | Código | Descrição |
| --- | --- | --- |
| LingoBoard | EP-LINGO | Dashboard BI (Streamlit/Pandas) |
| VocabDeck | EP-VOCAB | Flashcards web (Leitner) |
| EduLanding | EP-EDU | Template de landing educacional |
| BabelUX | EP-BABELUX | Consultoria de redesign (Figma) |
| IntegraSchool | EP-INTEGRA | Automação administrativa (Python) |
| Plataforma & Site | EP-PLAT | Site institucional, identidade, deploy |
| Documento & Anexos | EP-DOCS | 18 seções, ERD, fluxograma, organograma, Gantt, mockups |
| Entrega & Apresentações | EP-ENTREGA | Decks e apresentações 24/07 e 31/07 |

> **Sprint 0 — Preparação (Semanas 1–2, 16–29/06): CONCLUÍDA** — identidade visual, 18 seções em rascunho, 5 produtos definidos, 1º draft do `.docx`. Não entra no board ativo.

---

## Sprint 1 — 30/06 a 06/07
**Goal:** destravar dados e presença web — fechar ERD, fluxograma e organograma, e colocar o esqueleto do site no ar.

| Ref | Épico | Item | Tipo | Prio | Pts | Dono | Critério de aceite |
| --- | --- | --- | --- | --- | --- | --- | --- |
| S1-1 | EP-DOCS | Criar ERD PostgreSQL (Seção 16) | História | P0 | 3 | Roger | ERD com 6 entidades exportado e referenciado na Seção 16 |
| S1-2 | EP-DOCS | Criar fluxograma de atendimento (Bizagi, Seção 10) | História | P0 | 3 | Raquel | Fluxo do atendimento ponta-a-ponta exportado e inserido na Seção 10 |
| S1-3 | EP-DOCS | Criar organograma (Draw.io, Seção 5) | História | P0 | 2 | Raquel | Organograma da dupla exportado e inserido na Seção 5 |
| S1-4 | EP-PLAT | Esqueleto do site no ar (estrutura + navegação) | História | P0 | 3 | Roger | Páginas (home, portfólio, contato) navegáveis localmente com tokens |
| S1-5 | EP-DOCS | Revisar seções 9–16 | Tarefa | P1 | 3 | Raquel | Texto coerente com produtos e ADRs |

**Carga:** 14 pts (P0=11).

---

## Sprint 2 — 07/07 a 13/07
**Goal:** dois produtos funcionais (LingoBoard + VocabDeck) e site publicado.

| Ref | Épico | Item | Tipo | Prio | Pts | Dono | Critério de aceite |
| --- | --- | --- | --- | --- | --- | --- | --- |
| S2-1 | EP-LINGO | Preparar CSV de exemplo derivado do ERD | Tarefa | P0 | 2 | Roger | CSV (alunos, turmas, notas, presenças) consistente com o ERD |
| S2-2 | EP-LINGO | LingoBoard MVP: upload CSV + 4 gráficos + tabela de risco | História | P0 | 5 | Roger | Sobe CSV e renderiza ≥4 gráficos + ranking de risco sem erro |
| S2-3 | EP-VOCAB | VocabDeck MVP: CRUD de cards + motor Leitner + localStorage | História | P0 | 5 | Roger | Cria baralho, estuda, "acertei/errei" reagenda; progresso persiste |
| S2-4 | EP-VOCAB | Layout responsivo + tokens de identidade | Tarefa | P1 | 2 | Raquel | Funciona em desktop e mobile com a identidade BabelStack |
| S2-5 | EP-PLAT | Publicar site (GitHub Pages) com portfólio | História | P0 | 3 | Roger | Site acessível por URL pública com os 5 produtos listados |
| S2-6 | EP-LINGO | LingoBoard: limiares de risco ajustáveis (sidebar) | Tarefa | P1 | 2 | Roger | Limiares de risco configuráveis via sliders na sidebar (default média < 6.0 / faltas > 8), com filtros por turma e avaliação |

**Carga:** 19 pts (P0=15).

---

## Sprint 3 — 14/07 a 20/07
**Goal:** completar os 5 produtos, gerar o Gantt e iniciar marketing.

| Ref | Épico | Item | Tipo | Prio | Pts | Dono | Critério de aceite |
| --- | --- | --- | --- | --- | --- | --- | --- |
| S3-1 | EP-EDU | EduLanding: template + exemplo "Feira Cultural de Idiomas" | História | P0 | 3 | Raquel | Template responsivo com pontos editáveis + exemplo preenchido |
| S3-2 | EP-INTEGRA | IntegraSchool: automação em modo simulação (CSV) | História | P0 | 5 | Roger | Lê CSV, gera resumos/lembretes em arquivo + organiza pastas + log |
| S3-3 | EP-BABELUX | Diagnóstico heurístico da interface-alvo | História | P0 | 2 | Raquel | ≥5 problemas com severidade e princípio violado |
| S3-4 | EP-BABELUX | Protótipo "Antes/Depois" no Figma (2 telas) | História | P0 | 3 | Raquel | 2 telas redesenhadas com tokens + comparativo exportado |
| S3-5 | EP-DOCS | Gerar Gantt do cronograma (Seção 18) | Tarefa | P0 | 2 | Roger | Gantt com datas reais exportado e inserido na Seção 18 |
| S3-6 | EP-PLAT | Criar redes sociais (opcional) | Tarefa | P2 | 1 | Raquel | Perfil criado com identidade (se houver tempo) |

**Carga:** 16 pts (P0=15).

---

## Sprint 4 — 21/07 a 24/07
**Goal:** documento final montado e 1ª apresentação realizada.

| Ref | Épico | Item | Tipo | Prio | Pts | Dono | Critério de aceite |
| --- | --- | --- | --- | --- | --- | --- | --- |
| S4-1 | EP-DOCS | Capturar mockups/prints dos produtos e site (Seção 8/9) | Tarefa | P0 | 2 | Raquel | Imagens inseridas nas seções 8 e 9 |
| S4-2 | EP-DOCS | Montar documento 20+ páginas com anexos (regenerar .docx) | História | P0 | 3 | Roger | `.docx` final com 18 seções + anexos, ≥20 páginas |
| S4-3 | EP-DOCS | Inserir logo na capa do .docx | Tarefa | P1 | 1 | Roger | Capa com logo oficial |
| S4-4 | EP-ENTREGA | Montar deck de apresentação | História | P0 | 3 | Raquel | Deck cobrindo os 18 itens + demo dos produtos |
| S4-5 | EP-ENTREGA | Ensaio + 1ª apresentação (24/07) | História | P0 | 2 | Dupla | Apresentação realizada na data |

**Carga:** 11 pts (P0=10).

---

## Sprint 5 — 25/07 a 31/07
**Goal:** aplicar feedback da banca e fazer a entrega final.

| Ref | Épico | Item | Tipo | Prio | Pts | Dono | Critério de aceite |
| --- | --- | --- | --- | --- | --- | --- | --- |
| S5-1 | EP-ENTREGA | Aplicar correções pós-feedback da banca | História | P0 | 3 | Dupla | Itens apontados na 1ª apresentação corrigidos |
| S5-2 | EP-DOCS | Revisão final do documento + regenerar .docx | Tarefa | P0 | 2 | Roger | Versão final validada (skill docx, `PYTHONUTF8=1`) |
| S5-3 | EP-ENTREGA | Apresentação final (31/07) | História | P0 | 2 | Dupla | Apresentação final realizada |

**Carga:** 7 pts.

---

## Riscos

| Risco | Impacto | Mitigação |
| --- | --- | --- |
| 5 produtos em 2 sprints técnicas | Alto | Priorizar P0; cortar P1/P2 sem dó; demonstrável > completo |
| Dupla sobrecarregada | Alto | Trilhas paralelas (Roger técnico / Raquel produto-design) |
| Anexos visuais atrasam seções | Médio | Concentrados na Sprint 1 |
| Feedback da banca exige retrabalho grande | Médio | Sprint 5 reservada para ajustes |

## Definition of Done (por item)

- [ ] Atende ao critério de aceite e ao(s) requisito(s) P0 do PRD correspondente.
- [ ] Roda do zero com os dados de exemplo, sem erro.
- [ ] (Produtos web) responsivo e com identidade aplicada.
- [ ] Referenciado/anexado na seção correspondente do documento, quando aplicável.
- [ ] Card movido para "Concluído" no Jira (projeto EST).

## Datas-chave

| Data | Evento |
| --- | --- |
| 06/07 | Fim Sprint 1 |
| 13/07 | Fim Sprint 2 |
| 20/07 | Fim Sprint 3 |
| 24/07 | **1ª apresentação** (fim Sprint 4) |
| 31/07 | **Apresentação final / entrega** (fim Sprint 5) |
