# PRD — LingoBoard

**Produto:** LingoBoard — Dashboards educacionais (Business Intelligence)
**Categoria:** BI / Analytics educacional · **Valor (privado):** R$ 800–2.000 [estimativa] · gratuito p/ escolas públicas
**Autores:** Roger (CTO), Raquel (CPO) · **Status:** rascunho v1 · **Fase de build:** Semana 4

## Problema

Gestores de escolas de idiomas tomam decisões sobre evasão e desempenho a partir de planilhas brutas de notas e chamadas, sem visão consolidada. Identificar uma turma em risco ou um aluno prestes a evadir é lento e reativo, e o problema é recorrente a cada bimestre. O custo de não resolver é evasão não detectada a tempo (perda de receita e de impacto social) e gestão baseada em intuição em vez de dados.

## Objetivos

1. Reduzir o tempo para identificar alunos/turmas em risco de horas para **< 5 minutos** [estimativa] a partir de uma planilha padrão.
2. Entregar, no MVP, **pelo menos 4 visualizações** decisórias (desempenho por turma, evolução temporal, ranking de risco, frequência).
3. Permitir que um gestor **sem conhecimento técnico** gere o painel apenas subindo um CSV.
4. Servir de peça-âncora da narrativa de "BI aplicado à educação pública" do portfólio.

## Não-objetivos

- **Não** será um SIS/ERP escolar completo (cadastro, matrícula, financeiro) — fora de escopo, é outro produto.
- **Não** fará integração em tempo real com sistemas de terceiros no v1 — entrada é por CSV.
- **Não** incluirá autenticação multiusuário/perfis no MVP — uso local/demonstração.
- **Não** fará machine learning preditivo no v1 — apenas regras simples de risco (a análise preditiva fica como inovação futura `[estimativa]`).

## Personas e user stories

**Gestor(a) escolar (decisor):**
- Como gestor, quero subir a planilha de notas e presenças e ver gráficos prontos, para enxergar o desempenho das turmas sem montar tabela dinâmica.
- Como gestor, quero uma lista dos alunos em maior risco de evasão, para agir preventivamente.
- Como gestor, quero filtrar por turma e período, para comparar grupos.

**Coordenador(a) pedagógico:**
- Como coordenador, quero ver a evolução das médias ao longo do tempo, para avaliar se uma intervenção funcionou.

## Requisitos

### Must-Have (P0)
- **Importação de CSV** no formato de exemplo (`dados_exemplo.csv`: aluno, turma, nota, frequência, período).
  - *Aceite:* Dado um CSV válido, quando o usuário faz upload, então os gráficos são renderizados sem erro; CSV inválido mostra mensagem clara.
- **Painel com ≥4 gráficos** (Streamlit/Pandas): média por turma, evolução temporal, ranking de risco, distribuição de frequência.
- **Indicador de risco** por aluno (regra: nota e/ou frequência abaixo de limiar configurável).
  - *Aceite:* alunos abaixo do limiar aparecem destacados em uma tabela ordenada por risco.
- **Filtros** por turma e período.

### Nice-to-Have (P1)
- Exportar o painel/relatório em PDF.
- Limiares de risco ajustáveis pela interface.
- Tema visual com a identidade BabelStack (cores/tokens).

### Future Considerations (P2)
- Análise **preditiva** de evasão (modelo simples) — inovação anunciada na Seção 16.
- Conexão direta a planilhas Google/banco PostgreSQL.
- Multiusuário com perfis (gestor, coordenador).

## Métricas de sucesso

- **Líderes:** tempo para gerar o 1º painel < 5 min [estimativa]; taxa de upload bem-sucedido > 90% [estimativa] nas demonstrações.
- **Defasados:** uso em ≥1 escola-piloto [estimativa]; redução percebida de evasão (depoimento qualitativo).
- **Acadêmico:** demonstração funcional na apresentação de 24/07 com dados de exemplo.

## Questões em aberto

- [dados] Qual o esquema final do CSV padrão? (alinhar com o ERD do TDD)
- [produto] Limiar de risco fixo no MVP ou configurável? (decisão impacta P0 vs P1)
- [eng] Deploy: rodar local na apresentação ou publicar (Streamlit Community Cloud)?

## Cronograma

- **Semana 4 (07–13/07):** implementar `app.py` (P0) com `dados_exemplo.csv`.
- Dependência: esquema de dados definido no `tdd_arquitetura.md` (ERD).
- Marco: demonstrável na 1ª apresentação (24/07).
