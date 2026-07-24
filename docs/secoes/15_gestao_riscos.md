# 15. Gestão de Riscos

A gestão de riscos da BabelStack Júnior abrange a identificação precoce, monitoramento contínuo e planos de mitigação para as ameaças de negócios, financeiras, operacionais e arquiteturais do projeto. A matriz abaixo consolida os riscos institucionais da Empresa Júnior e os riscos técnicos mapeados no TDD (`tdd_arquitetura.md`).

| Risco | Categoria | Impacto / Probab. | Mitigação |
| --- | --- | --- | --- |
| Inadimplência de clientes privados | Financeiro | Alto / Média | Cobrança antecipada de 50% do valor na assinatura do contrato e 50% na homologação da entrega. |
| Conflito com o calendário acadêmico (provas, TCC) | Operacional | Alto / Alta | Pausa programada nos contratos no fechamento do semestre letivo e planejamento de capacidade conservador ([estimativa] ~75% de ocupação por sprint). |
| Sobrecarga da dupla executora (2 pessoas) | Operacional / Equipe | Médio / Alta | Divisão rigorosa por trilhas de especialidade (Roger = técnico/dados/deploy; Raquel = produto/design/conteúdo) e escopo de MVP explícito. |
| Tempo curto para entrega (5 semanas para 5 produtos + site) | Tecnológico / Prazo | Alto / Alta | Priorização estrita dos itens P0 nas Sprints 1 a 5 (ADR-0005); adoção de stack open-source/custo-zero ágil (ADR-0001); critério "demonstrável > completo". |
| Produtos ficarem apenas como stub incompletos | Tecnológico / Produto | Alto / Média | Definição clara de "Pronto" (Definition of Done) para cada MVP, garantindo execução real de fluxos e validação com dados de exemplo. |
| Perda de código ou indisponibilidade de infraestrutura | Tecnológico / Infra | Médio / Baixa | Versionamento contínuo no nuvem (GitHub), deploy automatizado via GitHub Actions e backup do modelo de referência PostgreSQL (ADR-0003). |
| Falta de dados educacionais realistas para demonstração | Tecnológico / Dados | Médio / Média | Geração e validação de massas de dados CSV de exemplo (`dados_exemplo.csv` e `alunos_exemplo.csv`) rigorosamente derivadas do diagrama ERD PostgreSQL. |
| Privacidade e segurança de dados de alunos (LGPD) | Jurídico / Conformidade | Alto / Baixa | Uso exclusivo de dados fictícios em ambiente de demonstração; execução do IntegraSchool em modo simulação local, sem tráfego de dados sensíveis em redes públicas. |
| Resistência tecnológica de professores e gestores | Mercado / Adoção | Médio / Alta | Desenvolvimento de interfaces intuitivas e acessíveis (tokens de cores de alto contraste, WCAG 2.1 AA), acompanhadas de manuais em vídeo e relatórios simplificados. |
