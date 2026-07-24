# 18. Cronograma de Criação

O cronograma geral da BabelStack Júnior abrange o período de **16 de junho a 31 de julho de 2026 (7 semanas corridas)**, estruturado em um modelo ágil híbrido: duas semanas iniciais de fundação e planejamento (`Sprint 0`) seguidas por **5 Sprints semanais de execução técnica e montagem documental (Sprints 1 a 5)**, gerenciadas no Jira (Projeto **EST** — ADR-0005) com uma capacidade planejada de [estimativa] 16 story points por sprint para a dupla (Roger Quinelato, CTO; Raquel Pereira, CPO).

## 1. Cronograma e Mapeamento de Sprints (Semanas 1 a 7)

| Semana / Período | Sprint Jira | Foco e Épicos Prioritários | Entregáveis, Pacotes e Marcos |
| --- | --- | --- | --- |
| Semana 1 (16–22/06) | Sprint 0 (Prep I) | Fundação, Identidade e Setup | Logo oficial (Conceito B), design tokens (`tokens.css`), setup das ferramentas e repositório GitHub, e revisão estrutural das seções 1 a 4. |
| Semana 2 (23–29/06) | Sprint 0 (Prep II) | Mercado, Estrutura e Portfólio | Organograma oficial da dupla em Draw.io, definição do portfólio de 5 produtos (`EP-LINGO`, `EP-VOCAB`, `EP-EDU`, `EP-BABELUX`, `EP-INTEGRA`) e redação das seções 5 a 8. |
| Semana 3 (30/06–06/07) | Sprint 1 (Execução) | Planos, Modelagem e Site Base (`EP-DOCS`, `EP-PLAT`) | ERD PostgreSQL referencial (`erd_babelstack.svg`, item `S1-1`), fluxograma de atendimento (`fluxograma_atendimento.svg`, `S1-2`), organograma (`S1-3`), publicação do esqueleto do site no ar (`S1-4`) e revisão das seções 9 a 16 (`S1-5`). |
| Semana 4 (07–13/07) | Sprint 2 (Execução) | Build Técnico I: BI e Flashcards (`EP-LINGO`, `EP-VOCAB`, `EP-PLAT`) | Publicação do site no GitHub Pages (`S2-5`), **VocabDeck MVP** funcional (`index.html`/`app.js` com motor Leitner em `localStorage`, `S2-3`, `S2-4`) e **LingoBoard MVP** funcional (`app.py` em Streamlit com 4 gráficos via Pandas, `S2-2`), lendo CSV derivado do ERD (`S2-1`) e limiares interativos na sidebar (`S2-6`). |
| Semana 5 (14–20/07) | Sprint 3 (Execução) | Build Técnico II: Landing, Automação, UX e Gantt (`EP-EDU`, `EP-INTEGRA`, `EP-BABELUX`) | **EduLanding** completo com exemplo "Feira Cultural" (`S3-1`), **IntegraSchool** em modo simulação Python para relatórios de aula (`S3-2`), **BabelUX** com diagnóstico heurístico e protótipo Antes/Depois (`S3-3`, `S3-4`), gráfico de Gantt SVG (`gantt_cronograma.svg`, `S3-5`) e setup de redes sociais (`S3-6`, [estimativa] opcional). |
| Semana 6 (21–24/07) | Sprint 4 (Execução) | Montagem Documental, Deck e 1ª Apresentação (`EP-DOCS`, `EP-ENTREGA`) | Captura de mockups para seções 8 e 9 (`S4-1`), montagem do documento final e regeneração do `.docx` com 18 seções + anexos (`S4-2`, `S4-3`), deck de apresentação (`S4-4`) e **1ª Apresentação na Banca (Marco em 24/07/2026, `S4-5`)**. |
| Semana 7 (25–31/07) | Sprint 5 (Fechamento) | Ajustes Pós-Feedback e Entrega Final (`EP-ENTREGA`) | Ajustes finos no relatório técnico e nos códigos do portfólio com base nas considerações da banca avaliadora, ensaio final e **2ª Apresentação e Entrega Definitiva do Projeto (Marco em 31/07/2026)**. |

## 2. Caminho Crítico e Dependências Interligadas

- **Caminho Crítico do Build Técnico:** o progresso arquitetural depende estritamente da sequência `ERD PostgreSQL (Sprint 1) → CSVs de Exemplo (Sprint 2) → LingoBoard e IntegraSchool (Sprints 2 e 3) → Anexos e Documento Final (Sprint 4)`. A formalização das 6 entidades em `tdd_arquitetura.md` foi pré-requisito indispensável para validar a lógica analítica em Streamlit e a geração de relatórios administrativos.
- **Independência de Frontend:** VocabDeck, EduLanding e o site institucional seguem trilha paralela baseada no design system compartilhado (`tokens.css`), permitindo à CPO (Raquel) evoluir o front e protótipos Figma simultaneamente aos desenvolvimentos de dados conduzidos pelo CTO (Roger).

> _[Anexo: gráfico de Gantt do cronograma, com as datas reais (16/06–31/07/2026) e os marcos das apresentações (24/07 e 31/07) — ver diagramas/gantt_cronograma.svg (fonte .mmd)]_

**Data final do projeto: 31/07/2026** — conclusão integral de todos os entregáveis acadêmicos, site em produção com os 5 produtos funcionais e apresentações devidamente homologadas nos dias 24/07 e 31/07/2026.
