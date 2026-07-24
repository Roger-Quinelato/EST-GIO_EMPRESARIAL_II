# 🎤 Roteiro de Ensaio & Sabatina da Banca (`the-fool` Red Team)
**BabelStack Júnior — Soluções em EdTech**
*Estágio Empresarial II — 1ª Apresentação na Banca Avaliadora (24/07/2026)*

---

## 📋 Parte 1: Roteiro de Ensaio e Divisão de Falas (S4-4 / S4-5)

> **Tempo Total Recomendado:** **15 a 18 minutos** de apresentação + **10 minutos** de sabatina/perguntas da banca.
> **Dinâmica da Dupla:** **Raquel Pereira (CPO)** conduz os aspectos estratégicos, pedagógicos, UX/UI e de negócio. **Roger Quinelato (CTO)** conduz a arquitetura técnica, dados (BI), engenharia open-source e automação.

### ⏱️ Cronograma Minuto a Minuto (`deck.html`)

| Slide # | Título do Slide | Dono da Fala | Tempo | Pontos-Chave da Fala |
| :---: | :--- | :---: | :---: | :--- |
| **1** | **Capa & Identidade** | **Raquel** | `0,5 min` | Abertura institucional, apresentação da dupla e do lema: *"Codificando fluência, estruturando conexões globais."* |
| **2** | **Agenda** | **Roger** | `0,5 min` | Apresentação rápida da jornada do deck (do problema sociotécnico até a demonstração real dos 5 produtos). |
| **3** | **Seção 1: Identificação** | **Raquel** | `1 min` | Natureza jurídica (Associação Civil sem fins lucrativos - Lei 13.267/2016) e Missão de democratizar o ensino de idiomas com dados. |
| **4** | **Seção 2: Problema da Comunidade** | **Raquel** | `1,5 min` | O déficit de inglês na rede pública/CILs do DF, a barreira no mercado de trabalho e a carência de observabilidade pedagógica. |
| **5** | **Seção 3: Solução Proposta** | **Dupla** | `1,5 min` | **Raquel:** Apresenta a visão geral de portfólio e o programa de impacto *"Código Fluente"* (3:1). **Roger:** Destaca a hiper-especialização em EdTech e a stack open-source custo-zero. |
| **6** | **Seção 4: Planejamento Estratégico** | **Raquel** | `1 min` | Os 3 horizontes: Curto (pilotos públicos), Médio (espanhol/francês e fullstack) e Longo prazo (Machine Learning preditivo). |
| **7** | **Seção 5: Estrutura Organizacional** | **Roger** | `1 min` | Organograma enxuto: Conselho Docente, CPO (Raquel - Produto/UX) e CTO (Roger - Engenharia/Automação). |
| **8** | **Seção 6: Recursos Humanos** | **Raquel** | `1 min` | Programa Trainee (EdTech Hack gamificado), avaliação ágil 360º e capacitação contínua (*BabelTech Talks*). |
| **9** | **Seção 7: Análise de Mercado** | **Raquel** | `1 min` | Dupla estratégia (validação social em escolas públicas vs. monetização sustentável com escolas privadas e professores particulares). |
| **10** | **Seção 8: Portfólio (Tabela Sintética)** | **Roger** | `1 min` | Visão geral dos 5 produtos, categorias, stacks independentes e faixas de precificação estimadas. |
| **11-15**| **Demonstração dos 5 Produtos (Vitrine)**| **Dupla** | `5 min` | *(Ver Roteiro de Demo Interativa abaixo).* |
| **16** | **Seção 9: Plano de Marketing** | **Raquel** | `1 min` | Identidade visual (*tokens.css*, regra 60-30-10), redes sociais jovens e o site institucional no ar no GitHub Pages. |
| **17-18**| **Seção 10 e 11: Operacional e Financeiro**| **Roger** | `1,5 min` | **Operacional:** Ciclo de atendimento em 5 fases no Jira. **Financeiro:** O milagre contábil do Bootstrapping R$ 0,00 e subsidiação 3:1. |
| **19-20**| **Seção 12, 13 e 14: Legais, ESG e QA**| **Raquel** | `1,5 min` | Enquadramento na Lei 13.267, conformidade LGPD (*Privacy by Design*), política zero-papel, WCAG 2.1 AA e garantia de 90 dias com bug rate zero. |
| **21-22**| **Seção 15 e 16: Riscos e Tecnologia** | **Roger** | `1,5 min` | Matriz com 9 riscos mitigados e mergulho na **Arquitetura (ERD PostgreSQL 6 entidades + stack desacoplada zero custo)**. |
| **23-24**| **Seção 17, 18 e Encerramento** | **Dupla** | `1 min` | **Raquel:** Impacto de 300+ alunos e crescimento da equipe. **Roger:** Cronograma ágil real de 7 semanas (Sprints 0 a 5). Abertura para perguntas. |

---

### 💻 Roteiro para a Demonstração Interativa dos 5 Produtos (Slides 11 a 15)

Durante os slides 11 a 15, a dupla não deve apenas ler os textos da tela. Vocês devem usar os **mockups de alta fidelidade** e/ou abrir as abas do navegador já preparadas:

1. **LingoBoard (Fala do Roger — 1 min):**
   * *O que mostrar:* O print `lingoboard_dashboard.png` (ou a janela do Streamlit rodando `python -m streamlit run app.py`).
   * *O que falar:* "Banca, este é o LingoBoard. Em vez de planilhas dispersas, o gestor faz upload do CSV e instantaneamente tem 4 gráficos analíticos. Notem aqui na sidebar: podemos ajustar os limiares de risco interativamente. Se mudarmos a nota de corte para 6.0 e faltas para 8, a tabela inferior destaca em tempo real quais alunos estão em risco de evasão, permitindo intervenção pedagógica preventiva."

2. **VocabDeck (Fala do Roger — 1 min):**
   * *O que mostrar:* O print `vocabdeck_estudo.png` (ou `vocabdeck/index.html` no navegador).
   * *O que falar:* "Para o aluno, criamos o VocabDeck. É um Web App leve que roda em qualquer celular sem precisar instalar nada na App Store. Ele utiliza o algoritmo de Leitner: quando o aluno clica em 'Acertei', o card avança para caixas com repetições mais espaçadas; se clica em 'Errei', volta para a caixa 1. Todo o progresso é salvo no `localStorage` do navegador com zero custo de servidor."

3. **EduLanding (Fala da Raquel — 1 min):**
   * *O que mostrar:* O print `edulanding_feira_cultural.png` (ou `edulanding/index.html`).
   * *O que falar:* "Muitas escolas públicas realizam eventos incríveis que quase ninguém fica sabendo. O EduLanding é o nosso template responsivo pré-estruturado. No nosso caso de estudo, simulamos a 'Feira Cultural de Idiomas'. Ele possui seções editáveis para programação, galeria, FAQ e inscrição, dando presença digital instantânea e acessível para qualquer evento escolar."

4. **BabelUX (Fala da Raquel — 1 min):**
   * *O que mostrar:* O print `babelux_antes_depois.png` (ou o comparativo interativo em `babelux/antes_depois.html`).
   * *O que falar:* "O BabelUX é nossa consultoria especializada. Avaliamos portais educacionais defasados usando as 10 heurísticas de Nielsen. Vejam este comparativo: à esquerda, o portal acadêmico antigo, cinza, confuso e com sobrecarga cognitiva. À direita, nossa intervenção aplicando os tokens de identidade da BabelStack: hierarquia clara, contraste WCAG 2.1 AA e micro-interações que reduzem o estresse do aluno."

5. **IntegraSchool (Fala do Roger — 1 min):**
   * *O que mostrar:* O print `integraschool_simulacao.png` (ou o terminal rodando `python integraschool.py`).
   * *O que falar:* "Por fim, para libertar o professor da burocracia, desenvolvemos o IntegraSchool em Python puro. Com um único comando, o script processa as turmas, gera um resumo estatístico da aula, cria arquivos de lembrete personalizados e organiza automaticamente as pastas do semestre por data. É automação cirúrgica que devolve 4 a 6 horas semanais para o professor focar no ensino."

---
---

## 🔥 Parte 2: A Sabatina Implacável da Banca (`the-fool` Red Team & Pre-Mortem)

Abaixo estão os **10 desafios mais severos** que uma banca cética de professores universitários pode lançar contra o projeto BabelStack Júnior em 24/07. Cada pergunta foi formulada por um modo da skill `the-fool`, acompanhada do **Steelmanned Defense (Resposta Blindada)** que vocês devem dar.

---

### ⚔️ Desafio 1 (`the-fool` Mode: Expose My Assumptions / Socratic Questioning)
> **❓ Pergunta da Banca:** *"Vocês afirmam que a capitalização inicial da empresa é R$ 0,00 graças a ferramentas open-source e laboratórios da faculdade. Mas isso não é uma ilusão contábil? Vocês não estão ocultando o custo do tempo de vocês de desenvolvimento, o desgaste do hardware pessoal e os limites das camadas gratuitas (como Streamlit Cloud e GitHub Pages) se o tráfego crescer?"*

* **🛡️ Resposta Blindada (Quem responde: Roger - CTO):**
  > "Professores, a observação é excelente e nos permite esclarecer o modelo de *Bootstrapping Acadêmico*. O valor de R$ 0,00 refere-se estritamente ao **desembolso de capital financeiro prévio** para licenças, servidores ou aluguel, o que está plenamente amparado no Art. 6º da Lei Federal nº 13.267/2016, que garante o uso da infraestrutura física e de rede da Instituição de Ensino Superior pelas Empresas Juniores.
  > Quanto ao nosso tempo, por sermos estudantes em estágio curricular e gerirmos uma associação sem fins lucrativos, nosso esforço é remunerado pelo aprendizado prático e pela validação de créditos curriculares, e não por folha de pagamento corporativa. E sobre a escalabilidade da nuvem: arquitetamos os 5 produtos para serem intencionalmente desacoplados e leves (*client-side* no VocabDeck e estáticos no EduLanding/Site). Caso um contrato privado exceda a cota gratuita do Streamlit Cloud, o próprio valor cobrado pelo contrato de implantação (R$ 800 a R$ 2.000) cobrirá com folga o upgrade para uma VPS dedicada em Linux."

---

### ⚔️ Desafio 2 (`the-fool` Mode: Find the Failure Modes / Pre-Mortem Analysis)
> **❓ Pergunta da Banca:** *"Imaginem que estamos em novembro de 2026. Vocês conseguiram 4 contratos pagos e 2 projetos públicos no CIL. De repente, chega a semana de provas finais na faculdade, a Raquel fica doente e o Roger precisa entregar o TCC. Os sistemas caem ou um cliente pede suporte urgente. Como o negócio não quebra por ser dependente de apenas duas pessoas?"*

* **🛡️ Resposta Blindada (Quem responde: Raquel - CPO):**
  > "Esse é exatamente o risco operacional #3 da nossa Matriz de Riscos na Seção 15! Nós mitigamos esse cenário de três formas estruturais:
  > 1. **Sazonalidade Programada no Calendário:** Nosso Planejamento Operacional (Seção 10) opera a 75% da nossa capacidade e **bloqueia novas implantações** durante as semanas oficiais de provas intermediárias e finais da faculdade.
  > 2. **Produtos de Baixo Desgaste de Suporte:** Como entregamos soluções que rodam isoladas (como scripts do IntegraSchool ou SPAs do VocabDeck), não temos um monólito central em servidor que 'cai' de madrugada exigindo plantão 24/7.
  > 3. **Pipeline de Sucessão e Onboarding:** O Programa Trainee BabelStack (Seção 6) ocorre no final do 1º semestre justamente para injetar de 4 a 6 novos estudantes na operação antes da expansão de fim de ano, garantindo que o conhecimento documentado no nosso TDD e no nosso `.notebook/` seja transferido sem gargalos na diretoria."

---

### ⚔️ Desafio 3 (`the-fool` Mode: Attack This / Red Team Adversarial)
> **❓ Pergunta da Banca:** *"O LingoBoard e o IntegraSchool processam notas, presenças, e-mails e contatos de alunos de escolas públicas e privadas — muitos deles menores de idade! Se eu for o Ministério Público ou a ANPD, como vocês me garantem que não estão violando frontalmente a LGPD com esses CSVs rodando em scripts e nuvens comunitárias?"*

* **🛡️ Resposta Blindada (Quem responde: Roger - CTO):**
  > "A conformidade com a LGPD (Lei nº 13.709/2018) é o pilar central da nossa Seção 12 (Aspectos Legais) e Seção 16. Nossa defesa baseia-se no princípio de **Privacy by Design e Minimização**:
  > 1. **Nas implantações públicas ou demonstrações:** Nunca solicitamos ou trafegamos dados de identificação civil direta dos alunos (como CPF, RG ou endereço). Trabalhamos com IDs matriciais pseudo-anonimizados (`aluno_id`).
  > 2. **No LingoBoard em nuvem (Streamlit Community Cloud):** O sistema processa apenas agregações e estatísticas de turmas para gerar os gráficos de BI. Se a escola desejar subir nomes reais para a tabela de risco, o processamento ocorre em memória efêmera da sessão ou em instância privada local contida na própria rede da escola, sem retenção de banco de dados público pela BabelStack.
  > 3. **No IntegraSchool:** O script Python roda **100% localmente no computador do próprio professor ou secretaria**, processando os arquivos na pasta da instituição. Nenhum byte de dados de aluno é transmitido pela internet ou para servidores da nossa Empresa Júnior."

---

### ⚔️ Desafio 4 (`the-fool` Mode: Argue the Other Side / Dialectic Synthesis)
> **❓ Pergunta da Banca:** *"O mercado de EdTech está inundado de gigantes com inteligência artificial, como Duolingo, Moodle, Google Classroom e plataformas bilionárias com módulos integrados. Por que uma escola de idiomas pagaria de R$ 800 a R$ 3.000 para uma Empresa Júnior de 2 alunos em vez de assinar um software comercial de prateleira?"*

* **🛡️ Resposta Blindada (Quem responde: Raquel - CPO):**
  > "Banca, as grandes plataformas de prateleira sofrem do problema do **'LMS Engessado'**: elas custam caro em assinaturas recorrentes por aluno, exigem meses de treinamento, têm interfaces genéricas e não resolvem a rotina micro-burocrática daquele professor específico.
  > Nossa proposta de valor (Seção 7 e 8) não é competir com o Google Classroom, mas sim **preencher as lacunas cirúrgicas que ele deixa**:
  > 1. Uma escola privada não precisa de mais um LMS complexo; ela precisa de um **Dashboard customizado como o LingoBoard** que extraia o CSV do sistema legado dela e mostre exatamente qual aluno vai cancelar a matrícula na próxima sexta-feira.
  > 2. Um professor não quer pagar licenças em dólar por aplicativos de flashcard fechados; ele quer o **VocabDeck customizado com as cores da escola dele** para passar aos alunos de graça via link.
  > 3. Entregamos agilidade, atendimento humanizado e customização sob medida com custo até 70% menor, aliando a flexibilidade da nossa stack open-source ao DNA inovador universitário."

---

### ⚔️ Desafio 5 (`the-fool` Mode: Test the Evidence / Evidence Audit)
> **❓ Pergunta da Banca:** *"Na Seção 16 e no TDD, vocês apresentam um Modelo de Dados Relacional em PostgreSQL com 6 entidades (Aluno, Professor, Turma, Matrícula, Nota e Presença). Mas nos MVPs que vocês estão demonstrando hoje, o VocabDeck usa `localStorage`, o EduLanding é estático e o LingoBoard lê um arquivo CSV. Onde está o banco relacional de verdade ou isso é apenas um diagrama no papel?"*

* **🛡️ Resposta Blindada (Quem responde: Roger - CTO):**
  > "Professor, agradecemos pela pergunta técnica porque ela toca no coração do nosso design arquitetural (ADR-0003). O ERD PostgreSQL de 6 entidades **é a nossa Fonte Canônica de Domínio e o nosso contrato arquitetural de longo prazo**, não um mero desenho.
  > Para a entrega acadêmica da Sprint 4 e para o nosso MVP demonstrável, adotamos o desacoplamento estratégico: os CSVs que alimentam o LingoBoard (`dados_exemplo.csv`) e o IntegraSchool (`alunos_exemplo.csv`) são **projeções exatas (views exportadas) desse modelo relacional**.
  > Optamos por não subir um servidor PostgreSQL instanciado 24/7 agora por dois motivos objetivos: **zero custo na fase de validação** e **redução de complexidade de deploy para a banca**. No entanto, como o nosso código Python e os schemas de dados seguem estritamente as chaves e relacionamentos do ERD, a migração para a conexão via `SQLAlchemy` ou `psycopg2` com o banco relacional real no Horizonte 2 (Médio Prazo) será um drop-in limpo sem reescrever a lógica de negócio dos produtos."

---

### ⚔️ Desafio 6 (`the-fool` Mode: Expose My Assumptions / Socratic Questioning)
> **❓ Pergunta da Banca:** *"Vocês criaram um modelo de 'Subsidiação Cruzada' (Programa Código Fluente) onde a cada 3 contratos privados, vocês implementam 1 sistema gratuito em escola pública. Como vocês garantem que a escola pública vai realmente usar o sistema, e não apenas arquivá-lo por falta de tempo ou letramento digital dos professores?"*

* **🛡️ Resposta Blindada (Quem responde: Raquel - CPO):**
  > "A entrega do software é apenas 50% do nosso trabalho pedagógico. Nós sabíamos desde a Análise de Mercado (Seção 7) que a 'resistência docente' e o 'baixo letramento digital' são as maiores causas de morte de projetos tecnológicos em escolas públicas.
  > Por isso, nosso Programa 'Código Fluente' (Seção 13) **não entrega código solto**:
  > 1. Cada implementação social é acompanhada da nossa **Consultoria BabelUX**, onde aplicamos diagnósticos heurísticos para simplificar a interface para a realidade exata daquela coordenação pedagógica.
  > 2. Realizamos um **Onboarding e Treinamento Presencial/Híbrido de 4 horas** com os professores da escola ou CIL, ensinando na prática a emitir os relatórios no LingoBoard e a rodar a automação no IntegraSchool.
  > 3. Medimos o nosso sucesso através da métrica de qualidade da Seção 14: aplicamos a pesquisa NPS 30 dias após a entrega e acompanhamos o uso real por trimestre, garantindo suporte gratuito por 90 dias."

---

### ⚔️ Desafio 7 (`the-fool` Mode: Attack This / Red Team Adversarial)
> **❓ Pergunta da Banca:** *"Se vocês são uma Empresa Júnior gerida por alunos de Sistemas de Informação, por que escolheram 'EdTech de Idiomas' em vez de desenvolvimento web geral ou consultoria de TI para o comércio local? Vocês têm autoridade pedagógica para falar de ensino de inglês?"*

* **🛡️ Resposta Blindada (Quem responde: Raquel - CPO):**
  > "A escolha pelo nicho de EdTech e Ensino de Idiomas foi uma decisão estratégica de posicionamento de mercado e responsabilidade social (Seção 1 e 7):
  > 1. **Fuga do Oceano Vermelho:** O mercado de 'criar sites para o comércio local' está saturado de freelancers e agências genéricas. Ao nos posicionarmos como a primeira Empresa Júnior especializada em **EdTech no Centro-Oeste**, conquistamos autoridade instantânea e um nicho altamente mal atendido.
  > 2. **Validação Pedagógica Institucional:** Nós não criamos metodologias de ensino de inglês da nossa cabeça. Nossa estrutura organizacional (Seção 5 e 12) conta com o **Conselho de Orientação Docente e Parcerias Interinstitucionais com o Departamento de Línguas da faculdade e com os CILs públicos**. Nós entramos com a excelência em Engenharia de Software, BI e UX/UI; os docentes parceiros e gestores escolares entram com a validação pedagógica e o domínio linguístico."

---

### ⚔️ Desafio 8 (`the-fool` Mode: Find the Failure Modes / Pre-Mortem Analysis)
> **❓ Pergunta da Banca:** *"Vocês mostraram um cronograma lindo de 7 semanas divididas em Sprints de 1 a 5 no Jira. Mas sabemos que em projetos de software universitários, o tempo sempre estoura. Se na Sprint 5 a banca exigir grandes correções no código dos 5 produtos e no documento, como vocês entregam no prazo final em 31/07 sem comprometer a qualidade?"*

* **🛡️ Resposta Blindada (Quem responde: Roger - CTO):**
  > "Nós construímos o nosso Planejamento de Sprints (`plano_sprints.md` e Seção 18) aplicando o princípio ágil da **Margem de Segurança e Separação de Escopo**:
  > 1. **Capacidade Planejada a 75% (~12 de 16 Story Points):** Nós nunca alocamos 100% das nossas horas teóricas nas Sprints 1 a 4. Sempre deixamos uma gordura de ~25% em cada semana para absorver impedimentos técnicos sem travar o caminho crítico.
  > 2. **Separação P0 vs. P1/P2:** Nossos PRDs e nosso board no Jira têm cortes severos de prioridade. Todos os requisitos **P0 (Essenciais e Demonstráveis)** foram entregues e congelados até o fim da Sprint 3.
  > 3. **Sprint 5 Dedicada Exclusivamente a Refinamento:** A nossa Sprint 5 (25/07 a 31/07) tem uma carga planejada de apenas **7 story points** (menos da metade da nossa capacidade!). Ela não possui nenhum desenvolvimento de produto novo; foi desenhada milimetricamente para absorver o feedback da 1ª apresentação da banca e compilar a versão final do relatório via automação em Node.js (`_build/build.js`)."

---

### ⚔️ Desafio 9 (`the-fool` Mode: Test the Evidence / Evidence Audit)
> **❓ Pergunta da Banca:** *"Vocês alegam que o LingoBoard consegue 'mitigar a evasão escolar precoce' demonstrando uma tabela de alunos com limiares interativos (< 6.0 de nota e > 8 faltas). Mas correlação não é causalidade! Como um simples filtro estatístico vai impedir que um aluno desista do curso de inglês?"*

* **🛡️ Resposta Blindada (Quem responde: Roger - CTO):**
  > "Professor, concordamos plenamente: o software por si só não ensina nem segura o aluno na sala de aula. O LingoBoard é uma ferramenta de **Observabilidade e Alerta Precoce (BI)**, e não uma varinha mágica.
  > Hoje, em uma escola tradicional, o coordenador só descobre que o aluno evadiu no final do semestre, quando ele não renova a matrícula ou é reprovado por faltas — momento em que é tarde demais para intervir.
  > O que o LingoBoard faz é reduzir o **Tempo de Descoberta do Risco de meses para segundos**. Ao destacar em vermelho na sidebar o aluno que faltou 3 aulas seguidas no mês e tirou 5.5 na primeira avaliação, o sistema gera uma lista de intervenção acionável para a secretaria ou coordenação pedagógica ligar para os pais, oferecer uma aula de reforço ou entender o problema socioemocional **antes** que o vínculo com a escola se rompa. É a tecnologia habilitando a gestão pedagógica humana."

---

### ⚔️ Desafio 10 (`the-fool` Mode: Attack This / Red Team Adversarial)
> **❓ Pergunta da Banca:** *"Se amanhã o Roger e a Raquel se formarem ou decidirem sair da faculdade para aceitar um emprego CLT em uma grande multinacional, o que acontece com a BabelStack Júnior? Ela morre na semana seguinte e vira apenas um trabalho de faculdade esquecido no GitHub?"*

* **🛡️ Resposta Blindada (Quem responde: Raquel - CPO):**
  > "Esse é o teste definitivo de maturidade institucional e governança de qualquer Empresa Júnior (Seção 1, 5 e 6). Nós projetamos a BabelStack Júnior desde o Dia 1 para ser **autônoma e perpétua**, dissociada dos seus fundadores:
  > 1. **Estatuto Social e Vínculo Institucional (Lei nº 13.267/2016):** A BabelStack é vinculada ao curso de Sistemas de Informação sob a tutela permanente do Conselho de Orientação Docente. A titularidade institucional pertence à faculdade e aos alunos regulares, não ao Roger ou à Raquel como pessoas físicas.
  > 2. **Cultura de Documentação Exaustiva (CodeNavi & TDD):** Todo o nosso conhecimento não está na nossa cabeça. Nossas decisões de arquitetura estão registradas em 5 ADRs formalizados, nosso modelo de dados tem TDD canônico, e cada linha de código ou fluxo de trabalho está explicada no nosso repositório e no nosso `.notebook/`.
  > 3. **Recrutamento Semestral de Trainees (Seção 6):** Nosso ciclo de RH prevê a entrada semestral de novos estudantes que passam pelo nosso *EdTech Hack* e assumem progressivamente as squads técnicas sob mentoria dos membros sêniores e dos orientadores. Quando nos formarmos, estaremos passando o bastão para uma diretoria treinada, com caixa financeiro positivo e portfólio validado no mercado."

---
*Fim do Roteiro de Ensaio e Sabatina. Boa sorte à dupla Roger e Raquel na apresentação do dia 24/07!*
