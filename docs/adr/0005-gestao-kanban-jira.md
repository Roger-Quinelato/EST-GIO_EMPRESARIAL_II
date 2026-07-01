# ADR-0005: Usar Kanban (Trello/Notion) + Jira para gestão do trabalho

- **Data**: 2026-06-30
- **Status**: Accepted
- **Deciders**: Roger (CTO), Raquel (CPO)
- **Tags**: gestao, processo, agile

## Contexto e Problema

A dupla precisa organizar o trabalho restante (Sprints 1–5) com visibilidade para si e para os orientadores, e o pacote de produto/engenharia deste projeto gera um backlog (épicos, histórias, tarefas) que deve virar cards executáveis. É preciso definir as ferramentas de gestão.

## Decision Drivers

- Visibilidade das tarefas entre a dupla e os orientadores (Seção 16).
- Backlog estruturado em sprints com tipos de issue (Epic/História/Tarefa).
- Custo zero; planos gratuitos.
- Integração possível via MCP/automação para popular o board.

## Opções consideradas

- **A — Kanban leve (Trello/Notion) + Jira** para o backlog formal de sprints.
- **B — Só Trello/Notion** (sem hierarquia de épicos/sprints robusta).
- **C — Só planilha** (sem fluxo de board).

## Decision Outcome

Escolhida a opção **A**: Trello/Notion para a visão Kanban do dia a dia e **Jira (projeto EST — EstagioEmpresarialII)** para o backlog formal em épicos/histórias/tarefas e sprints, populável via automação.

### Consequências positivas
- Backlog rastreável com hierarquia (épico → história/tarefa) e sprints.
- Demonstra prática ágil real na Seção 16 e no cronograma (Seção 18).
- Board do Jira populável automaticamente a partir do plano de sprints.

### Consequências negativas
- Duas ferramentas para manter em sincronia (Kanban informal + Jira).
- Jira tem curva maior que um Trello puro; risco de overhead para uma dupla.

## Links
- Plano de sprints: `docs/sprints/plano_sprints.md`
- Backlog Jira: `docs/sprints/jira_backlog.csv`
- Decorre de [[0001-stack-open-source-custo-zero]].
