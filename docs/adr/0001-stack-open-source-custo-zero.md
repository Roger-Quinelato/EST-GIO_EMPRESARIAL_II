# ADR-0001: Adotar stack open-source e custo-zero

- **Data**: 2026-06-30
- **Status**: Accepted
- **Deciders**: Roger (CTO), Raquel (CPO)
- **Tags**: arquitetura, infraestrutura, custos

## Contexto e Problema

A BabelStack Júnior é uma Empresa Júnior acadêmica, sem orçamento, que precisa entregar 5 produtos demonstráveis e um site funcional até 31/07/2026, atendendo majoritariamente escolas públicas (projeto social). É preciso definir o conjunto de tecnologias base de forma que não haja custo de licença/infra e que a dupla consiga executar no prazo.

## Decision Drivers

- Orçamento zero (sem licenças nem hospedagem paga).
- Prazo curto e equipe de 2 pessoas.
- Tecnologias com farta documentação e baixa curva de aprendizado.
- Coerência com o discurso social/educacional do projeto.

## Opções consideradas

- **A — Stack open-source/custo-zero** (Python, PostgreSQL, HTML/CSS/JS, Streamlit, Figma free, GitHub).
- **B — Stack low-code/SaaS paga** (ex.: Bubble, Webflow, BI proprietário).
- **C — Stack enterprise** (cloud paga + frameworks pesados).

## Decision Outcome

Escolhida a opção **A (open-source/custo-zero)**, por eliminar custo, maximizar empregabilidade do conhecimento e caber no prazo da dupla.

### Consequências positivas
- Custo de licença/infra zero; deploy via GitHub Pages / Streamlit Community Cloud.
- Ferramentas amplamente documentadas; fácil de demonstrar na banca.
- Portfólio com tecnologias valorizadas no mercado.

### Consequências negativas
- Mais "montagem manual" do que uma plataforma low-code entregaria.
- Sem suporte comercial; depende da comunidade.
- Escalabilidade real exigiria infra paga no futuro `[estimativa]`.

## Links
- TDD: `docs/produto/tdd_arquitetura.md`
- Seção 16 do documento (Tecnologia e Inovação).
- Detalha-se em [[0002-streamlit-pandas-lingoboard]] e [[0003-postgresql-modelo-dados]].
