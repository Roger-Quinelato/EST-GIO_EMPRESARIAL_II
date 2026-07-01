# ADR-0003: Adotar PostgreSQL como modelo de dados de referência

- **Data**: 2026-06-30
- **Status**: Accepted
- **Deciders**: Roger (CTO), Raquel (CPO)
- **Tags**: database, dados, modelagem

## Contexto e Problema

O domínio escolar (alunos, turmas, notas, presenças) precisa de um modelo de dados coerente que origine os CSVs de exemplo do LingoBoard/IntegraSchool e sustente a narrativa de "BI/dados" da Seção 16 (incluindo o ERD bônus). Não há, nesta entrega acadêmica, necessidade de um banco em produção — mas é preciso definir o paradigma e a tecnologia de referência.

## Decision Drivers

- Domínio fortemente relacional (vínculos aluno↔turma, notas, presenças).
- Necessidade de um ERD claro para o documento (Seção 16).
- Open-source / custo-zero ([[0001-stack-open-source-custo-zero]]).
- Familiaridade e padrão de mercado.

## Opções consideradas

- **A — PostgreSQL (relacional)** como referência; MVPs usam CSV/localStorage.
- **B — NoSQL (MongoDB)** documento.
- **C — Apenas planilhas/CSV, sem modelo formal.**

## Decision Outcome

Escolhida a opção **A (PostgreSQL como referência)**: o paradigma relacional modela melhor o domínio e gera um ERD didático; os MVPs consomem CSVs derivados desse modelo, sem custo de operar um banco agora.

### Consequências positivas
- ERD claro e defensável na banca; fecha o bônus da Seção 16.
- CSVs de exemplo têm origem conceitual consistente.
- Caminho natural para persistência real pós-curso.

### Consequências negativas
- Há um descompasso entre "modelo de referência" e "implementação real" (MVPs não usam o banco de fato) — precisa ficar explícito no TDD.
- Operar PostgreSQL em produção exigiria infra/processo adicionais `[estimativa]`.

## Links
- ERD e entidades: `docs/produtos/tdd_arquitetura.md`
- Usado por `prd_lingoboard.md` e `prd_integraschool.md`.
