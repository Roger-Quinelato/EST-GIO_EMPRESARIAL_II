# 16. Tecnologia e Inovação

A arquitetura tecnológica da BabelStack Júnior é fundamentada em uma stack **100% open-source e custo-zero** (ADR-0001), projetada para permitir a execução ágil por uma equipe compacta de duas pessoas no prazo acadêmico, assegurando alta qualidade, facilidade de demonstração e viabilidade de manutenção por escolas de idiomas públicas e privadas sem ônus com licenças ou servidores pagos [estimativa].

## 1. Stack Tecnológica Aberta e Modular

- **Linguagens de Programação:** Python (biblioteca padrão para automação de scripts e processamento de dados) e JavaScript puro (ES6+, para interatividade frontend e lógica client-side sem dependências pesadas).
- **Business Intelligence & Dashboards (LingoBoard):** Python com **Streamlit** e **Pandas** (ADR-0002). O Streamlit viabiliza interfaces analíticas interativas com sliders de limiares de risco configuráveis e filtros dinâmicos, enquanto o Pandas realiza o cálculo de médias, frequências e desvios nas planilhas de notas e chamadas.
- **Automação e Scripts (IntegraSchool):** Python nativo para processamento de arquivos CSV e geração de relatórios administrativos (resumos de aula e lembretes de pendências) em modo simulação com saída em arquivo (`saida/AAAA-MM-DD_Turma/`) e rastreabilidade via log de execução.
- **Frontend & Single Page Applications (VocabDeck, EduLanding e Site):** HTML5 semântico, Vanilla CSS3 estruturado com design tokens (`assets/identidade/tokens.css`) e JavaScript client-side com persistência em `localStorage` (motor Leitner de 5 caixas do VocabDeck), garantindo portabilidade máxima e tempo de carregamento instantâneo.
- **UX/UI Design & Prototipação (BabelUX):** **Figma** (ADR-0004, plano gratuito) utilizado para a criação da identidade visual, diagnóstico heurístico baseado nas 10 heurísticas de Nielsen e prototipação de alta fidelidade do comparativo "Antes/Depois".
- **Hospedagem e CI/CD:** deploy estático automatizado via **GitHub Pages** (com pipeline em GitHub Actions) para o site institucional e aplicações web, e execução local ou em **Streamlit Community Cloud** para os dashboards analíticos.

## 2. Modelo de Dados de Referência (ERD PostgreSQL)

Para garantir consistência semântica e integridade no processamento das informações escolares, a BabelStack Júnior adota o **PostgreSQL** como paradigma e banco de dados relacional de referência (ADR-0003). Embora os MVPs demonstráveis na fase acadêmica consumam arquivos CSV organizados em memória e `localStorage` — eliminando custos operacionais e complexidade de setup durante as apresentações —, todas as estruturas e planilhas derivam estritamente do Diagrama Entidade-Relacionamento (ERD) canônico do domínio de escolas de idiomas.

- **ALUNO (`id`, `nome`, `email`, `responsavel_contato`, `data_nascimento`):** entidade que armazena os dados cadastrais do estudante. Por privacidade (LGPD), os contatos de responsáveis e e-mails nos ambientes demonstrativos utilizam dados sintéticos fictícios.
- **PROFESSOR (`id`, `nome`, `idioma`):** docente responsável pela condução pedagógica das turmas de inglês, espanhol ou francês.
- **TURMA (`id`, `professor_id FK`, `idioma`, `nivel`, `periodo`):** agrupamento de ensino categorizado por idioma, nível (Ex.: Básico A1, Intermediário B1) e turno letivo, vinculada à chave estrangeira do professor.
- **MATRICULA (`id`, `aluno_id FK`, `turma_id FK`, `data_matricula`, `status`):** entidade associativa central que resolve o relacionamento N:N entre Aluno e Turma, registrando o status de vínculo (`ativo`, `concluido`, `evadido`) e servindo de âncora para avaliações e chamadas.
- **NOTA (`id`, `matricula_id FK`, `avaliacao`, `valor`, `data`):** registro quantitativo de desempenho (Ex.: Prova Oral, Redação, Midterm) vinculado à matrícula, base para os gráficos de evolução por avaliação no LingoBoard.
- **PRESENCA (`id`, `matricula_id FK`, `data`, `presente`):** registro longitudinal de chamadas diárias por matrícula. A agregação de faltas consecutivas e porcentagem de presença alimenta diretamente o algoritmo de alerta precoce de evasão do LingoBoard.

> _[Anexo: diagrama ERD do banco PostgreSQL (aluno, professor, turma, matrícula, nota, presença) — ver diagramas/erd_babelstack.svg (fonte .mmd)]_

## 3. Metodologia de Gestão de Engenharia (Kanban + Jira)

A condução técnica e gerencial do projeto segue o modelo ágil documentado no ADR-0005, combinando as melhores práticas do desenvolvimento de software profissional à rotina acadêmica:

- **Jira (Projeto EST):** plataforma oficial de rastreamento de issues do time, estruturada em 8 Épicos (`EP-LINGO`, `EP-VOCAB`, `EP-EDU`, `EP-BABELUX`, `EP-INTEGRA`, `EP-PLAT`, `EP-DOCS`, `EP-ENTREGA`) e organizada em 5 Sprints formais de execução (Sprints 1 a 5, cobrindo o período de 30/06 a 31/07/2026). O backlog completo e o status de entrega são mantidos sincronizados com o repositório em `docs/sprints/jira_backlog.csv`.
- **Quadros Kanban Auxiliares (Trello/Notion/Jira):** utilização de fluxos visuais `A Fazer`, `Em Progresso`, `Em Revisão` e `Concluído` para garantir transparência nas reuniões de alinhamento entre a dupla executora (Roger Quinelato, CTO; Raquel Pereira, CPO) e a orientação acadêmica.

## 4. Inovações Propostas e Diferencial Técnico

- **Democratização do Business Intelligence Educacional:** adaptação de práticas corporativas de análise de dados (BI) e estatística descritiva para a realidade cotidiana de professores e coordenadores de Centros Interescolares de Línguas (CILs) da rede pública, substituindo o preenchimento manual de tabelas dispersas por diagnósticos visuais imediatos.
- **Alerta Preditivo de Risco de Evasão:** lógica analítica no LingoBoard que cruza notas médias (limiar configurável, default `< 6.0`) e acúmulo de faltas (limiar configurável, default `> 8 faltas`) para classificar alunos em faixas de risco (`Crítico`, `Atenção`, `Normal`), possibilitando ações pedagógicas preventivas antes do abandono do curso.
- **Arquitetura Autônoma e Modular (`Portfólio Desacoplado`):** ao contrário de sistemas de gestão monolíticos e complexos que exigem longos períodos de treinamento e migração de dados, os 5 produtos da BabelStack Júnior operam de maneira autônoma e sob demanda. Uma escola pode adotar apenas o VocabDeck para revisão ou o EduLanding para um evento específico, mantendo coesão de dados via modelo PostgreSQL e coesão visual através do design system comum (`tokens.css`).

Documentação técnica de apoio: arquitetura detalhada dos 5 produtos e modelo de dados em `docs/produtos/tdd_arquitetura.md`; especificações funcionais em `docs/produtos/prd_*.md`; e os registros de decisões arquiteturais em `docs/adr/` (ADRs 0001 a 0005).
