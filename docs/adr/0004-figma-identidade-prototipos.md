# ADR-0004: Usar Figma para identidade visual e protótipos

- **Data**: 2026-06-30
- **Status**: Accepted
- **Deciders**: Roger (CTO), Raquel (CPO)
- **Tags**: design, ux, identidade

## Contexto e Problema

O projeto precisa de identidade visual consistente (logo, cores, tipografia) aplicada ao site e produtos, e o BabelUX entrega protótipos "Antes/Depois" em alta fidelidade. É necessária uma ferramenta de design colaborativa, gratuita e padrão de mercado para a CPO conduzir esse trabalho.

## Decision Drivers

- Plano gratuito suficiente para o escopo.
- Colaboração e versão única da verdade do design.
- Exportação de assets (SVG/PNG) e tokens.
- Entregável do BabelUX é nativamente um protótipo de design.

## Opções consideradas

- **A — Figma** (free).
- **B — Penpot** (open-source, self-host).
- **C — Canva** (limitado para UX/protótipo).

## Decision Outcome

Escolhida a opção **A (Figma)**: padrão de mercado para UX/UI, plano gratuito atende, e já concentra a identidade (arquivo `BwHP5UWR51JXmtGOW9cfS1`) e os protótipos do BabelUX.

### Consequências positivas
- Identidade centralizada; tokens exportados para `assets/identidade/tokens.css`.
- Protótipos navegáveis e comparativos "Antes/Depois" prontos para o portfólio.
- Curva de aprendizado conhecida; fácil de demonstrar.

### Consequências negativas
- Ferramenta proprietária (não open-source) — exceção consciente ao [[0001-stack-open-source-custo-zero]], justificada pelo plano gratuito.
- Dependência de conta/serviço externo para abrir os arquivos-fonte.

## Links
- PRD: `docs/produtos/prd_babelux.md`
- Identidade: `docs/identidade_visual.md`, `assets/identidade/tokens.css`.
