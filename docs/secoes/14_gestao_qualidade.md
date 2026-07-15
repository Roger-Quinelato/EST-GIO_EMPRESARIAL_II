# 14. Gestão da Qualidade

A Política da Qualidade da BabelStack Júnior estabelece diretrizes rigorosas para assegurar a excelência técnica dos 5 produtos do portfólio e a máxima satisfação das instituições de ensino contratantes, integrando metodologias ágeis, inspeção contínua de código e métricas centradas no usuário.

## 1. Monitoramento da Satisfação dos Clientes

- **Net Promoter Score (NPS):** aplicação sistemática de pesquisas de NPS aos gestores e professores 30 dias após a entrega do projeto, visando manter o índice em zona de excelência (NPS ≥ 75 [estimativa]).
- **Entrevistas Qualitativas de Aderência:** acompanhamento pós-implantação para avaliar a efetividade no dia a dia da escola, coletando feedback sobre facilidade de uso e impacto na produtividade docente.

## 2. Indicadores e Metas de Qualidade Técnica (KPIs)

- **Taxa de Defeitos (Bug Rate):** meta de zero bugs de severidade crítica ou alta na primeira semana de operação contínua [estimativa], assegurada por validação de dados de entrada nos scripts e SPAs.
- **Lead Time de Entrega:** cumprimento rigoroso das 5 Sprints do cronograma técnico (Seção 18), monitorando o tempo desde a concepção do backlog até a publicação no GitHub Pages ou entrega final.
- **Aderência de Interface e Usabilidade:** aplicação de testes de usabilidade baseados nas 10 heurísticas de Nielsen (metodologia do produto BabelUX), medindo o tempo de conclusão de tarefas-chave pelos usuários.

## 3. Ciclos de Melhoria Contínua e Engenharia

- **Sprint Retrospectives:** reuniões quinzenais (a cada 15 dias) entre a dupla executora (Roger Quinelato, CTO; Raquel Pereira, CPO) e o orientador acadêmico para identificar gargalos de processo, refinamento técnico e ajustes na alocação de esforço ([estimativa] de 16 story points por sprint).
- **Code Review e Padrões Arquiteturais:** revisão obrigatória em dupla de todos os Pull Requests no repositório GitHub antes de integração à branch `main`, garantindo conformidade com o TDD (`tdd_arquitetura.md`), modularidade de scripts Python e uso correto do design system (`tokens.css`).

## 4. Acordo de Nível de Serviço (SLA) e Garantia

- **Tratamento de Reclamações e Correções (SLA):** garantia formal de 90 dias após a entrega final do sistema [estimativa], com compromisso de atendimento e correção gratuita de falhas críticas que impeçam o funcionamento (ex.: erro na importação de CSV no LingoBoard) em até 48 horas úteis [estimativa].
- **Suporte Evolutivo:** disponibilização de documentação em markdown, guias rápidos e manuais autoexplicativos em cada produto (`README.md`), garantindo autonomia para a instituição de ensino.
