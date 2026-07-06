// Build do documento BabelStack Júnior: gera os 18 .md (fonte do repo) + o .docx montado.
// Conteúdo definido UMA vez como dados estruturados e renderizado para os dois formatos.
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType,
  HeadingLevel, LevelFormat, BorderStyle, WidthType, ShadingType, TableOfContents,
  PageBreak, PageNumber, Header, Footer
} = require('docx');

const REPO = path.resolve(__dirname, '..');
const SECDIR = path.join(REPO, 'docs', 'secoes');
const OUTDOCX = path.join(REPO, 'docs', 'BabelStack_Junior_Documento_v0.1.docx');

const INDIGO = '4338CA', TEAL = '0EA5A4', GRAFITE = '1E293B', SLATE = '64748B';
const CONTENT_W = 9360;

// ---------- bloco helpers ----------
const h2 = (x) => ({ t: 'h2', x });
const p  = (x) => ({ t: 'p',  x });
const ul = (...x) => ({ t: 'ul', x });
const note = (x) => ({ t: 'note', x });
const tbl = (head, rows) => ({ t: 'tbl', head, rows });

// ======================================================================
// CONTEÚDO DAS 18 SEÇÕES
// ======================================================================
const sections = [
{ n:1, slug:'01_identificacao', title:'Identificação da Empresa', body:[
  ul(
    '**Nome:** BabelStack Júnior – Soluções em EdTech',
    '**Slogan:** "Codificando fluência, estruturando conexões globais."',
    '**Área de atuação:** soluções tecnológicas para a educação de idiomas (EdTech), com foco em Engenharia de Software, Business Intelligence e Design de Experiência do Usuário (UX/UI).',
  ),
  h2('Descrição da empresa'),
  p('A BabelStack Júnior é uma associação civil sem fins lucrativos, gerida exclusivamente por estudantes de Sistemas de Informação e regida pela Lei Federal nº 13.267/2016. Especializada no desenvolvimento de tecnologias para o ensino e o aprendizado de línguas estrangeiras, atua como uma ponte entre a pedagogia e a engenharia de software. Seu portfólio vai de plataformas web interativas voltadas à imersão no idioma — com ênfase inicial no inglês e arquitetura escalável para outras línguas — até painéis de análise de dados (dashboards) que ajudam escolas e professores a monitorar o engajamento e a retenção dos alunos. O que distingue a empresa é a hiper-especialização no nicho de idiomas: em vez de software genérico, cada solução nasce de uma dor concreta da sala de aula.'),
  h2('História da criação'),
  p('A BabelStack Júnior nasceu no Distrito Federal, da intersecção entre o desenvolvimento de software e a proficiência avançada em línguas estrangeiras de seus fundadores. Ao longo da graduação, a dupla percebeu um descompasso: embora o inglês seja hoje um pré-requisito para a carreira em tecnologia, as plataformas tradicionais de ensino costumam falhar justamente onde mais importa — interfaces pouco intuitivas, ausência de metodologias ativas e nenhuma visão de dados sobre o progresso do aluno. A ideia ganhou corpo durante o desenvolvimento de protótipos experimentais, de sistemas de anotação visual a bancos de dados para gestão de turmas. Compreendendo o potencial social e comercial dessas ferramentas, os fundadores decidiram formalizar o projeto como Empresa Júnior, transformando conhecimento técnico avançado em soluções acessíveis para educadores e instituições.'),
  h2('Missão'),
  p('Democratizar e otimizar o ensino de línguas estrangeiras por meio da tecnologia, desenvolvendo softwares inteligentes, interativos e orientados a dados que potencializem a fluência e conectem educadores e estudantes em todo o mundo.'),
  h2('Visão'),
  p('Consolidar-se, até o final de 2027, como a Empresa Júnior de referência no desenvolvimento de tecnologias educacionais no Centro-Oeste, reconhecida nacionalmente pela excelência na entrega de sistemas multidiomas e pelo impacto direto na inovação do ensino de línguas.'),
  h2('Valores'),
  ul(
    '**Design centrado no aluno (UX/UI):** a tecnologia deve facilitar o aprendizado, reduzindo a carga cognitiva por meio de interfaces intuitivas e limpas.',
    '**Excelência orientada a dados:** uso de métricas e Business Intelligence para gerar resultados educacionais concretos, em vez de decisões baseadas em "achismo".',
    '**Escalabilidade e visão global:** arquiteturas preparadas não apenas para o inglês, mas estruturadas para abraçar qualquer outro idioma.',
    '**Compromisso acadêmico e inovação:** transformar a pesquisa de sala de aula e as linguagens de programação atuais em soluções práticas para a sociedade.',
    '**Colaboração integrada:** trabalho em equipe unindo diferentes competências de TI para arquitetar soluções completas e robustas.',
  ),
  note('[Anexo: logotipo e identidade visual — ver assets/logo e docs/identidade_visual.md]'),
]},

{ n:2, slug:'02_problema_comunidade', title:'Problema da Comunidade', body:[
  h2('Qual problema ou necessidade da comunidade foi identificado?'),
  p('O Brasil enfrenta um déficit histórico e estrutural no domínio de línguas estrangeiras. Estima-se que apenas cerca de 5% da população brasileira fale inglês e que menos de 1% tenha fluência avançada [estimativa; fonte a confirmar — pesquisa "Demandas de Aprendizagem de Inglês no Brasil" (British Council, 2014) e o índice EF EPI]. Na rede pública, esse abismo é aprofundado por três gargalos: a falta de ferramentas tecnológicas que sustentem metodologias ativas; a ausência de interfaces de estudo engajadoras, que reduzam a carga cognitiva do aluno; e a carência de sistemas de análise de dados (Business Intelligence) que permitam aos gestores acompanhar, em tempo real, a evasão e a progressão dos estudantes. A necessidade primária, portanto, é democratizar tecnologias educacionais de alto nível metodológico, capazes de transformar o ensino passivo em uma experiência interativa, visual e mensurável.'),
  h2('Como foi feita essa identificação?'),
  p('A identificação resultou do cruzamento entre a análise de indicadores educacionais nacionais e a vivência direta da dinâmica administrativa e governamental no Distrito Federal. Observou-se que a infraestrutura tecnológica das escolas raramente é acompanhada por softwares customizados para a realidade do aluno da rede pública. A validação ocorreu também durante o desenvolvimento experimental de plataformas de anotação visual e de protótipos de estudo de idiomas: esses testes evidenciaram que, com excelência em UX/UI e recursos de imersão visual, a retenção de vocabulário e a motivação do aluno aumentam de forma expressiva.'),
  h2('Quem é o público-alvo?'),
  p('O público-alvo principal são as escolas públicas da rede de ensino do Distrito Federal (vinculadas à Secretaria de Estado de Educação do DF), incluindo as gestões escolares, o corpo docente de inglês e línguas estrangeiras modernas e, em especial, os Centros Interescolares de Línguas (CILs). Secundariamente, a solução alcança os próprios alunos do Ensino Fundamental II e do Ensino Médio dessas instituições, usuários finais das plataformas desenvolvidas.'),
  h2('Qual o impacto desse problema na comunidade?'),
  p('A limitação no domínio do inglês atua como severa barreira de mobilidade social e econômica: perpetua a desigualdade no acesso ao mercado de trabalho qualificado — onde o idioma deixou de ser diferencial para se tornar pré-requisito eliminatório — e restringe o acesso de jovens de baixa renda à literatura científica, a intercâmbios e a oportunidades globais. No Distrito Federal, onde convivem escolas de excelência e unidades com forte vulnerabilidade social, esse hiato aprofunda a distância entre as redes pública e privada. Ao intervir nesse cenário, a BabelStack Júnior projeta um impacto transformador: levar à rede pública distrital infraestrutura de software de padrão internacional, equipando professores com dashboards pedagógicos e alunos com aplicativos intuitivos, e promovendo, ao mesmo tempo, inclusão digital e fluência linguística.'),
]},

{ n:3, slug:'03_solucao_proposta', title:'Solução Proposta', body:[
  h2('Quais serviços serão oferecidos?'),
  p('Por ser formada por estudantes de Sistemas de Informação, a BabelStack Júnior estruturou um portfólio enxuto e inteligente, com tecnologias consolidadas (desenvolvimento web, análise de dados e design de interfaces) que garantem viabilidade técnica de execução pela dupla e alto valor para as escolas. São cinco produtos distintos, cada um endereçando uma dor específica do público-alvo:'),
  ul(
    '**LingoBoard — dashboards educacionais (BI).** Resolve a dificuldade dos gestores em enxergar evasão e baixo rendimento a tempo: consolida planilhas de notas e chamadas em painéis visuais interativos (Python/Streamlit), destacando alunos e turmas em risco.',
    '**VocabDeck — plataforma web de flashcards.** Resolve a passividade do estudo fora da sala: aplicação de revisão espaçada em que o professor cadastra o vocabulário das aulas e os alunos praticam de forma gamificada.',
    '**EduLanding — páginas web educacionais.** Resolve a ausência de presença digital das escolas: template responsivo (HTML/CSS/JS) para feiras culturais, simulados de proficiência e portais de materiais, fácil de editar pela própria instituição.',
    '**BabelUX — redesign de interfaces (UX/UI).** Resolve as interfaces confusas que afastam o aluno: consultoria que aplica heurísticas de usabilidade para tornar portais educacionais mais acessíveis e com menor carga cognitiva.',
    '**IntegraSchool — automação administrativa.** Resolve o tempo perdido com burocracia: scripts em Python (modo simulação) que automatizam resumos de aula, lembretes e organização de arquivos, devolvendo horas ao professor.',
  ),
  h2('Como a empresa ajudará a comunidade?'),
  p('A BabelStack Júnior atuará como a ponte tecnológica que falta na rede pública do DF. Ao automatizar a burocracia e modernizar o acompanhamento pedagógico, devolve ao professor o tempo para o que realmente importa: ensinar. Para os estudantes, transforma o aprendizado passivo de idiomas — baseado em lousa e caderno — em uma experiência digital, gamificada e fluida, que engaja jovens já nativos digitais. Esse compromisso social é formalizado no programa "Código Fluente": a cada três projetos pagos no setor privado, a empresa implanta gratuitamente um sistema (LingoBoard ou IntegraSchool) em uma escola pública.'),
  h2('Diferenciais da empresa'),
  ul(
    '**DNA tecnológico e jovem:** formada por estudantes inseridos no ecossistema atual de tecnologia, a empresa entende o comportamento do usuário jovem e cria interfaces que conversam com esse público.',
    '**Foco no ecossistema de idiomas:** diferentemente de fábricas de software genéricas, todo o desenvolvimento, banco de dados e design são voltados estritamente à dor do ensino de línguas.',
    '**Custo-benefício e open-source:** o uso de tecnologias de código aberto e ferramentas gratuitas torna as soluções acessíveis a instituições públicas e a professores independentes.',
  ),
  h2('Benefícios para os clientes'),
  ul(
    '**Decisões baseadas em dados:** gestores e professores passam a ter métricas exatas sobre o progresso das turmas, no lugar do "achismo".',
    '**Modernização e retenção:** plataformas amigáveis e automações aumentam o interesse do aluno e reduzem a evasão.',
    '**Customização pedagógica:** cada solução é estruturada conforme o plano de ensino específico do professor cliente, respeitando a realidade da comunidade.',
  ),
]},

{ n:4, slug:'04_planejamento_estrategico', title:'Planejamento Estratégico', body:[
  p('O planejamento segue uma progressão clara e realista para uma Empresa Júnior de dois fundadores: primeiro validar com projetos-piloto, depois alcançar sustentabilidade financeira e, por fim, agregar inovação analítica. Cada horizonte se apoia nas conquistas do anterior.'),
  h2('Objetivos de curto prazo (0 a 6 meses) — pesquisa, capacitação e validação'),
  ul(
    '**Pesquisa de mercado e engenharia de requisitos:** entrevistar professores de inglês da rede pública do DF para mapear dores reais e definir a stack open-source (Python, PostgreSQL, HTML/CSS/JS, Streamlit, Figma, GitHub) de rápida adoção.',
    '**Capacitação da dupla:** dividir o estudo conforme os papéis — Raquel aprofunda UX/UI e Business Intelligence; Roger, desenvolvimento web e automação — usando cursos gratuitos e a documentação das ferramentas.',
    '**Projetos-piloto na rede pública:** firmar parcerias gratuitas de validação com 2 a 3 professores [estimativa], implantando os primeiros protótipos (LingoBoard e uma automação do IntegraSchool) e coletando métricas de usabilidade para formar o portfólio de casos reais.',
  ),
  h2('Objetivos de médio prazo (6 a 18 meses) — sustentabilidade e expansão'),
  ul(
    '**Sustentabilidade financeira:** começar a comercializar os serviços para escolas de idiomas particulares e professores independentes, usando a receita para custear o domínio, eventuais servidores e a participação em eventos de tecnologia.',
    '**Expansão para novos idiomas:** evoluir a arquitetura multidiomas para atender também espanhol e francês, replicando as soluções de inglês com baixo custo de adaptação.',
    '**Evolução da arquitetura de software:** migrar gradualmente protótipos low-code para desenvolvimento fullstack (por exemplo, com frameworks como React e Node.js), elevando o nível técnico das entregas.',
  ),
  h2('Objetivos de longo prazo (18 a 36 meses) — parcerias e inovação analítica'),
  ul(
    '**Análise preditiva básica:** introduzir modelos estatísticos simples que analisem o histórico de notas e emitam alertas automáticos sobre alunos com tendência a evadir, entregando valor técnico de ponta aos clientes.',
    '**Parcerias com centros de línguas universitários:** implantar os sistemas de forma oficial em centros de ensino de idiomas de universidades ou faculdades parceiras.',
    '**Referência em EdTech universitária:** consolidar a marca BabelStack Júnior como celeiro de talentos locais no nicho de tecnologia educacional.',
  ),
]},

{ n:5, slug:'05_estrutura_organizacional', title:'Estrutura Organizacional', body:[
  p('A BabelStack Júnior opera com duas diretorias, ocupadas pelos dois fundadores, sob a orientação de um conselho de professores. A divisão segue as competências de cada integrante e cobre todas as frentes do portfólio.'),
  tbl(['Camada / Cargo','Responsável','Atribuições'],[
    ['Conselho de Orientação','Professores orientadores','Conselho técnico e pedagógico; revisão de código e mentoria.'],
    ['Diretoria Executiva e de Produto (CPO)','Raquel Pereira','Gestão estratégica e comercial, engenharia de requisitos, design UX/UI (BabelUX) e Business Intelligence (LingoBoard).'],
    ['Diretoria de Engenharia de Software e Operações (CTO)','Roger Quinelato','Desenvolvimento web (EduLanding e VocabDeck), automação e integrações (IntegraSchool), arquitetura multidiomas e operações de TI/hospedagem.'],
  ]),
  h2('Como as diretorias se conectam'),
  p('No fluxo de um projeto, a Diretoria Executiva e de Produto levanta os requisitos com o cliente e desenha os protótipos; após aprovação, a Diretoria de Engenharia codifica, testa e hospeda a solução. O conselho de orientação realiza o code review pedagógico antes da entrega. Esse encadeamento garante que necessidade pedagógica e execução técnica permaneçam alinhadas.'),
  note('[Anexo: organograma da estrutura organizacional — ver diagramas/organograma.svg (fontes .mmd e .drawio)]'),
]},

{ n:6, slug:'06_recursos_humanos', title:'Recursos Humanos', body:[
  h2('Quantidade de colaboradores estimados'),
  ul(
    '**Quadro atual (fundação):** 2 estudantes (Diretora Executiva e Diretor de Engenharia) e 1 a 2 professores orientadores.',
    '**Estimativa de crescimento (fim do 1º ano):** expansão para 6 a 8 colaboradores efetivos [estimativa], formando squads ágeis para Dados/BI, Web/App e UX/UI.',
  ),
  h2('Processo de seleção'),
  p('O recrutamento ocorrerá semestralmente pelo Programa Trainee BabelStack, que busca alunos com forte base lógica e paixão por educação — não desenvolvedores seniores. Etapas:'),
  ul(
    '**Alinhamento cultural e inscrição:** formulário avaliando o interesse por EdTech e impacto social (fluência em idiomas não é exigida).',
    '**Desafio prático gamificado (EdTech Hack):** problema real de baixa complexidade (ex.: desenhar a tela de um app de flashcards), avaliando pesquisa, resolução de problemas e criatividade.',
    '**Banca com fundadores e orientadores:** entrevista final focada em soft skills e na conciliação com a graduação.',
  ),
  h2('Avaliação de desempenho'),
  p('De caráter formativo e não punitivo, baseada na metodologia ágil (Scrum) e em feedback contínuo:'),
  ul(
    '**Avaliação 360 graus semestral:** os cofundadores avaliam-se mutuamente; os orientadores avaliam a maturidade técnica e as entregas.',
    '**KPIs individuais:** cumprimento de prazos (sprints), qualidade da documentação de código e evolução na comunicação com clientes.',
    '**Code review pedagógico:** reuniões quinzenais de revisão de códigos e dashboards antes da entrega.',
  ),
  h2('Plano de desenvolvimento dos integrantes'),
  ul(
    '**BabelTech Talks:** encontros mensais em que um membro ensina uma nova ferramenta ao grupo.',
    '**Fundo de capacitação:** parte do faturamento privado financia cursos e certificações (ex.: Udemy, Alura).',
    '**Imersão linguística cruzada:** busca de bolsas de idiomas para os membros, gerando empatia com o usuário final.',
  ),
]},

{ n:7, slug:'07_analise_mercado', title:'Análise de Mercado', body:[
  h2('Público-alvo'),
  ul(
    '**Setor público e validação:** professores e gestores de escolas públicas do DF e Centros Interescolares de Línguas (CILs) — foco em validação, testes de usabilidade e impacto social.',
    '**Setor privado e monetização:** escolas de idiomas de pequeno porte e professores particulares que buscam automação e plataformas próprias, sem orçamento para fábricas de software tradicionais.',
  ),
  h2('Concorrentes'),
  ul(
    '**Diretos:** empresas juniores como a CJR (Empresa Júnior de Computação da UnB) e consultorias de TI acessíveis. Diferencial da BabelStack: hiper-especialização no nicho de EdTech para idiomas.',
    '**Indiretos:** plataformas de gestão de aprendizagem (LMS) e EdTechs consolidadas (Geekie, Moodle, Agenda Edu); soluções de prateleira que muitas vezes engessam a metodologia do professor.',
  ),
  h2('Parceiros potenciais'),
  ul(
    '**Institucionais e governamentais:** universidades e escolas de governo do DF, como apoiadoras e facilitadoras do diálogo com a gestão pública.',
    '**Fomento à inovação:** programas de incubadora digital do DF (espaço, networking e capacitação).',
    '**Aplicação (rede de ensino):** os CILs, distribuídos por várias regiões administrativas, como laboratório ideal de validação.',
  ),
  h2('Fornecedores'),
  ul(
    '**Sistemas operacionais:** distribuições Linux para padronizar as estações de desenvolvimento.',
    '**Banco de dados:** PostgreSQL (relacional, open-source, robusto e sem custo de licença).',
    '**Lógica e BI:** bibliotecas Python (Pandas para tratamento de dados, Streamlit para dashboards).',
    '**Design (UX/UI):** Figma (versão gratuita), padrão da indústria para protótipos de alta fidelidade.',
  ),
  h2('Oportunidades de mercado'),
  ul(
    'Excelente aderência de soluções open-source no setor público, sem orçamento para licenças caras.',
    'Alta demanda por análise de retenção (BI) em cursos de idiomas, que sofrem com evasão.',
    'Escalabilidade da arquitetura multidiomas, replicável para espanhol e francês a baixo custo.',
  ),
  h2('Ameaças'),
  ul(
    '**Limitações operacionais:** apenas dois estudantes dividindo a jornada com a grade curricular.',
    '**Curva de aprendizado e setup de servidores:** infraestrutura pura (PostgreSQL, deploys Linux) exige esforço técnico inicial.',
    '**Resistência docente à digitalização:** letramento digital baixo de parte dos professores exige investimento em capacitação e usabilidade.',
  ),
]},

{ n:8, slug:'08_portfolio_produtos', title:'Portfólio de Produtos e Serviços', body:[
  p('O portfólio reúne cinco produtos distintos, cobrindo Business Intelligence, desenvolvimento web, UX/UI e automação. Os valores referem-se ao setor privado; para escolas públicas, os serviços são gratuitos (projeto social).'),
  tbl(['#','Produto','Categoria','Valor estimado (privado)'],[
    ['1','LingoBoard','Dashboards educacionais (BI)','R$ 800–2.000 [estimativa]'],
    ['2','VocabDeck','Plataforma web de flashcards','R$ 1.500–3.000 [estimativa]'],
    ['3','EduLanding','Criação de páginas/sites educacionais','R$ 600–1.800 [estimativa]'],
    ['4','BabelUX','Consultoria de redesign UX/UI','R$ 500–1.500 [estimativa]'],
    ['5','IntegraSchool','Automação de rotinas administrativas','R$ 700–2.000 [estimativa]'],
  ]),
  h2('1. LingoBoard — Dashboards educacionais (BI)'),
  ul(
    '**Descrição:** painel interativo em Python (Streamlit/Pandas) que transforma planilhas de notas e chamadas em gráficos dinâmicos.',
    '**Público-alvo:** escolas de idiomas privadas e públicas (CILs).',
    '**Problema que resolve:** dificuldade dos gestores em identificar padrões de evasão e baixo desempenho de forma ágil.',
    '**Benefícios:** decisão baseada em dados, identificação rápida de alunos em risco e modernização da gestão.',
  ),
  note('[Imagem ilustrativa: mockups dos gráficos e painéis]'),
  h2('2. VocabDeck — Plataforma web de flashcards'),
  ul(
    '**Descrição:** aplicação web responsiva para revisão espaçada de vocabulário (caixas de Leitner), com arquitetura preparada para múltiplos idiomas.',
    '**Público-alvo:** professores particulares de idiomas e infoprodutores.',
    '**Problema que resolve:** passividade do aluno no estudo fora da sala e falta de ferramentas gamificadas de baixo custo.',
    '**Benefícios:** aumento da retenção de vocabulário por metodologias ativas e gamificação.',
  ),
  note('[Imagem ilustrativa: telas de interface mobile e web]'),
  h2('3. EduLanding — Criação de páginas/sites educacionais'),
  ul(
    '**Descrição:** template de landing page educacional reutilizável em HTML/CSS/JS, responsivo (ex.: "Feira Cultural de Idiomas").',
    '**Público-alvo:** escolas públicas e projetos de línguas que precisam de presença web.',
    '**Problema que resolve:** ausência de páginas próprias para eventos, simulados e materiais didáticos.',
    '**Benefícios:** presença digital de baixo custo, responsiva e fácil de editar pela própria escola.',
  ),
  note('[Imagem ilustrativa: página do evento em desktop e celular]'),
  h2('4. BabelUX — Consultoria de redesign UX/UI'),
  ul(
    '**Descrição:** redesenho da usabilidade de portais educacionais existentes, com entregáveis "antes/depois" em alta fidelidade no Figma.',
    '**Público-alvo:** escolas e professores com sistemas defasados.',
    '**Problema que resolve:** interfaces confusas que frustram os alunos e elevam a carga cognitiva.',
    '**Benefícios:** ambiente de estudo mais acessível, intuitivo e agradável.',
  ),
  note('[Imagem ilustrativa: comparações de telas "Antes e Depois"]'),
  h2('5. IntegraSchool — Automação de rotinas administrativas'),
  ul(
    '**Descrição:** scripts em Python (modo simulação) que automatizam envio de resumos de aula e lembretes, e organizam arquivos.',
    '**Público-alvo:** professores de idiomas com processos manuais.',
    '**Problema que resolve:** tempo perdido com tarefas administrativas repetitivas.',
    '**Benefícios:** ganho de horas semanais e padronização da comunicação com alunos/responsáveis.',
  ),
  note('[Imagem ilustrativa: exemplo de e-mail gerado em modo simulação]'),
]},

{ n:9, slug:'09_plano_marketing', title:'Plano de Marketing', body:[
  h2('Identidade visual'),
  p('A marca une "tecnologia/confiança" e "educação/crescimento". A paleta tem cinco cores: Índigo (#4338CA, primária), Teal (#0EA5A4, secundária), Âmbar (#F59E0B, ação/CTAs) e os neutros Grafite (#1E293B) e Branco-gelo (#F8FAFC). A tipografia usa Space Grotesk nos títulos e logo e Inter no texto corrido e interface. O estilo é moderno, limpo e acessível, com cantos arredondados, ícones em linha e contraste adequado (WCAG AA). O guia completo está em docs/identidade_visual.md.'),
  h2('Redes sociais'),
  ul(
    '**Instagram:** vitrine jovem da marca — bastidores de código, dicas de idiomas, cards dos produtos e cases das escolas. Frequência alvo de 2 a 3 posts por semana [estimativa].',
    '**LinkedIn:** posicionamento institucional — parcerias, impacto social, conquistas técnicas e oportunidades do Programa Trainee. Frequência alvo de 1 post por semana [estimativa].',
    '**Tom de voz:** profissional, jovem e didático, alinhado ao DNA tecnológico da empresa.',
  ),
  h2('Site'),
  p('O site institucional é a vitrine do portfólio e o principal canal de contato. Página única e responsiva, com seções de apresentação, problema e solução, portfólio dos 5 produtos (com links para os demos), impacto social ("Código Fluente") e contato. Serve de "prova viva" das soluções, permitindo que escolas testem os produtos antes de contratar.'),
  note('[Anexo: prints do site publicado e calendário de posts — Fases 4 e 5]'),
]},

{ n:10, slug:'10_plano_operacional', title:'Plano Operacional', body:[
  h2('Como o serviço será executado?'),
  p('O serviço segue a metodologia ágil Scrum. A Diretoria Executiva e de Produto levanta os requisitos com o professor/escola e desenha os protótipos. Após aprovação visual, a Diretoria de Engenharia codifica a solução, realiza os testes técnicos e, junto ao professor orientador, faz o code review antes de hospedar a solução em nuvem.'),
  h2('Demais aspectos operacionais'),
  ul(
    '**Horário de funcionamento:** regime flexível e assíncrono, ~20 horas semanais por estudante, com reuniões agendadas para não conflitar com a graduação.',
    '**Local de atendimento:** modelo híbrido — desenvolvimento 100% remoto; alinhamentos via Google Meet ou nos laboratórios da instituição.',
    '**Equipamentos necessários:** notebooks pessoais dos estudantes e conexão à internet.',
    '**Tecnologia utilizada:** ambientes Linux, Git/GitHub, VS Code, Figma e Discord/Notion para comunicação e documentação.',
  ),
  note('[Anexo: fluxograma de atendimento ponta-a-ponta — ver diagramas/fluxograma_atendimento.svg (fontes .mmd e .drawio)]'),
]},

{ n:11, slug:'11_plano_financeiro', title:'Plano Financeiro', body:[
  p('A operação utiliza a metodologia Bootstrapping, alavancando laboratórios da universidade, softwares open-source e instâncias de nuvem gratuitas.'),
  tbl(['Item','Valor'],[
    ['Capital inicial','R$ 0,00'],
    ['Empréstimos','Não se aplica'],
    ['Custos fixos','R$ 40,00/ano (domínio babelstack.com.br no Registro.br; hospedagem em planos gratuitos como GitHub Pages e Vercel)'],
    ['Custos variáveis','R$ 50,00 a R$ 150,00/mês [estimativa] (transporte para visitas a escolas e eventuais manutenções)'],
    ['Receita estimada','R$ 3.000,00 a R$ 6.000,00 no 1º semestre [estimativa] (3 a 5 contratos privados que subsidiam os projetos sociais)'],
  ]),
]},

{ n:12, slug:'12_aspectos_legais', title:'Aspectos Legais', body:[
  ul(
    '**Tipo jurídico:** associação civil sem fins lucrativos, classificada como Empresa Júnior (Lei Federal nº 13.267/2016).',
    '**Documentos para abertura:** Estatuto Social, Ata de Fundação, Regimento Interno, Edital de Convocação, RG/CPF dos fundadores e Comprovante de Inscrição e Situação Cadastral (CNPJ).',
    '**Licenças e autorizações:** alvará de funcionamento (frequentemente isento para EJs sediadas em universidades) e Carta de Reconhecimento da Instituição de Ensino Superior.',
  ),
]},

{ n:13, slug:'13_sustentabilidade', title:'Sustentabilidade e Responsabilidade Social', body:[
  ul(
    '**Ações ambientais:** política Paperless (Zero Papel) — contratos, requisitos e relatórios 100% digitais.',
    '**Projetos sociais — programa "Código Fluente":** a cada 3 projetos pagos vendidos ao setor privado, a BabelStack implementa 1 sistema gratuito (LingoBoard ou IntegraSchool) em uma escola pública do DF.',
    '**Inclusão e acessibilidade:** interfaces seguindo as diretrizes WCAG, com contraste e legibilidade adequados.',
    '**Impacto social esperado:** redução do hiato tecnológico entre escolas públicas e privadas, democratizando ferramentas educacionais de alto nível.',
  ),
]},

{ n:14, slug:'14_gestao_qualidade', title:'Gestão da Qualidade', body:[
  ul(
    '**Satisfação dos clientes:** formulários NPS (Net Promoter Score) e avaliações qualitativas 30 dias após a entrega.',
    '**Indicadores de qualidade:** taxa de bugs na primeira semana de uso, cumprimento do cronograma (Lead Time) e aderência da interface (uso real pelos alunos).',
    '**Melhoria contínua:** Sprint Retrospective a cada 15 dias entre os alunos e o orientador.',
    '**Tratamento de reclamações:** SLA que garante correção de falhas críticas em até 48 horas úteis, sem custo durante a garantia.',
  ),
]},

{ n:15, slug:'15_gestao_riscos', title:'Gestão de Riscos', body:[
  tbl(['Risco','Categoria','Mitigação'],[
    ['Inadimplência de clientes privados','Financeiro','Cobrança de 50% do valor na assinatura do contrato.'],
    ['Conflito com o calendário acadêmico (provas, TCC)','Operacional','Pausa programada nos contratos no fechamento de semestre.'],
    ['Resistência tecnológica de professores','Mercado','Manuais em vídeo e foco massivo na simplicidade (UX) das telas.'],
    ['Perda de código / indisponibilidade de servidores','Tecnológico','Versionamento obrigatório na nuvem (GitHub) e backup semanal do banco (PostgreSQL).'],
  ]),
]},

{ n:16, slug:'16_tecnologia_inovacao', title:'Tecnologia e Inovação', body:[
  ul(
    '**Ferramentas utilizadas:** Python, PostgreSQL, HTML/CSS/JS, Figma e ferramentas open-source de deploy.',
    '**Sistema de gestão:** Trello ou Notion com quadros Kanban para visibilidade das tarefas entre alunos e orientadores.',
    '**Inovações propostas:** aplicação de Business Intelligence e análise preditiva de dados — práticas do mercado corporativo — adaptadas à rotina de professores da rede pública.',
  ),
  note('[Anexo: diagrama ERD do banco PostgreSQL (aluno, professor, turma, matrícula, nota, presença) — ver diagramas/erd_babelstack.svg (fonte .mmd)]'),
  p('Documentação técnica de apoio: arquitetura dos 5 produtos e modelo de dados (ERD) em docs/produtos/tdd_arquitetura.md; especificações em docs/produtos/prd_*.md; e as decisões de stack registradas como ADRs em docs/adr/ (0001–0005).'),
]},

{ n:17, slug:'17_resultados_esperados', title:'Resultados Esperados', body:[
  ul(
    '**Pessoas atendidas:** 5 a 10 professores/gestores nos primeiros 6 meses [estimativa], impactando indiretamente mais de 300 alunos [estimativa].',
    '**Impacto na comunidade:** melhoria no engajamento em aulas de idiomas e redução das taxas de abandono nas escolas parceiras.',
    '**Crescimento previsto:** escalar o quadro de 2 para até 8 estudantes ao final do primeiro ano [estimativa].',
    '**Benefícios econômicos e sociais:** fundo de caixa para certificação técnica dos alunos e redução dos custos tecnológicos para a educação local.',
  ),
]},

{ n:18, slug:'18_cronograma_criacao', title:'Cronograma de Criação', body:[
  h2('Cronograma semanal'),
  tbl(['Semana','Foco','Entregáveis'],[
    ['1 (16–22/06)','Fundação e identidade','Logo, identidade visual, setup das ferramentas, revisão das seções 1–4.'],
    ['2 (23–29/06)','Mercado, estrutura e portfólio','Organograma, 5 produtos definidos, seções 5–8.'],
    ['3 (30/06–06/07)','Planos e esqueleto do site','Fluxograma (Bizagi), seções 9–16, estrutura do site no ar.'],
    ['4 (07–13/07)','Build técnico I','Site publicado, VocabDeck e LingoBoard funcionais.'],
    ['5 (14–20/07)','Build técnico II e marketing','EduLanding, IntegraSchool, BabelUX, redes sociais, Gantt.'],
    ['6 (21–24/07)','Montagem e 1ª apresentação','Documento 20+ páginas, ensaio, apresentação 24/07.'],
    ['7 (25–31/07)','Ajustes e entrega final','Correções pós-feedback, apresentação final 31/07.'],
  ]),
  p('Data final: 31/07/2026 — conclusão de todos os entregáveis, site online com no mínimo 5 soluções e apresentações nos dias 24/07 e 31/07.'),
  note('[Anexo: gráfico de Gantt do cronograma, com as datas reais (16/06–31/07/2026) e os marcos das apresentações (24/07 e 31/07) — ver diagramas/gantt_cronograma.svg (fonte .mmd)]'),
]},
];

// ======================================================================
// RENDER → MARKDOWN
// ======================================================================
function mdInline(s){ return s; } // markdown mantém **negrito** nativo
function blockToMd(b){
  if (b.t==='h2') return `## ${b.x}\n`;
  if (b.t==='p') return `${b.x}\n`;
  if (b.t==='note') return `> _${b.x}_\n`;
  if (b.t==='ul') return b.x.map(i=>`- ${i}`).join('\n')+'\n';
  if (b.t==='tbl'){
    const head = `| ${b.head.join(' | ')} |`;
    const sep = `| ${b.head.map(()=>'---').join(' | ')} |`;
    const rows = b.rows.map(r=>`| ${r.join(' | ')} |`).join('\n');
    return `${head}\n${sep}\n${rows}\n`;
  }
  return '';
}
function sectionToMd(s){
  const parts = [`# ${s.n}. ${s.title}`,''];
  for (const b of s.body){ parts.push(blockToMd(b)); }
  return parts.join('\n').replace(/\n{3,}/g,'\n\n').trim()+'\n';
}

let wroteMd = 0;
for (const s of sections){
  fs.writeFileSync(path.join(SECDIR, s.slug+'.md'), sectionToMd(s), 'utf8');
  wroteMd++;
}

// ======================================================================
// RENDER → DOCX
// ======================================================================
function runs(text){
  // divide em **negrito**
  const out = [];
  const parts = String(text).split('**');
  for (let i=0;i<parts.length;i++){
    if (parts[i]==='') continue;
    out.push(new TextRun({ text: parts[i], bold: i%2===1 }));
  }
  return out.length?out:[new TextRun({text:String(text)})];
}
function paraNode(text){ return new Paragraph({ spacing:{after:120}, children: runs(text) }); }
function bulletNode(text){ return new Paragraph({ numbering:{reference:'bullets',level:0}, spacing:{after:60}, children: runs(text) }); }
function noteNode(text){ return new Paragraph({ spacing:{before:60,after:160}, children:[ new TextRun({ text, italics:true, color:SLATE }) ] }); }
function h2Node(text){ return new Paragraph({ heading:HeadingLevel.HEADING_2, children:[ new TextRun(text) ] }); }

const border = { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' };
const borders = { top:border, bottom:border, left:border, right:border };
function tableNode(head, rows){
  const cols = head.length;
  const base = Math.floor(CONTENT_W/cols);
  const widths = Array(cols).fill(base);
  widths[cols-1] = CONTENT_W - base*(cols-1);
  const mkCell = (txt, w, isHead) => new TableCell({
    borders, width:{size:w,type:WidthType.DXA},
    shading: isHead ? {fill:'E6F1FB',type:ShadingType.CLEAR} : undefined,
    margins:{top:60,bottom:60,left:120,right:120},
    children:[ new Paragraph({ children:[ new TextRun({ text:String(txt), bold:isHead }) ] }) ]
  });
  const headRow = new TableRow({ tableHeader:true, children: head.map((h,i)=>mkCell(h,widths[i],true)) });
  const bodyRows = rows.map(r=> new TableRow({ children: r.map((c,i)=>mkCell(c,widths[i],false)) }));
  return new Table({ width:{size:CONTENT_W,type:WidthType.DXA}, columnWidths:widths, rows:[headRow,...bodyRows] });
}

function blockToDocx(b){
  if (b.t==='h2') return [h2Node(b.x)];
  if (b.t==='p') return [paraNode(b.x)];
  if (b.t==='note') return [noteNode(b.x)];
  if (b.t==='ul') return b.x.map(bulletNode);
  if (b.t==='tbl') return [tableNode(b.head,b.rows), new Paragraph({spacing:{after:120},children:[]})];
  return [];
}

// Capa
const cover = [
  new Paragraph({ spacing:{after:80}, alignment:AlignmentType.CENTER, children:[ new TextRun({text:'Estágio Empresarial II — Sistemas de Informação', color:SLATE, size:22}) ] }),
  new Paragraph({ spacing:{before:2400,after:0}, alignment:AlignmentType.CENTER, children:[ new TextRun({text:'BabelStack Júnior', bold:true, color:INDIGO, size:64, font:'Arial'}) ] }),
  new Paragraph({ spacing:{after:120}, alignment:AlignmentType.CENTER, children:[ new TextRun({text:'Soluções em EdTech', color:GRAFITE, size:30}) ] }),
  new Paragraph({ spacing:{after:2000}, alignment:AlignmentType.CENTER, children:[ new TextRun({text:'"Codificando fluência, estruturando conexões globais."', italics:true, color:TEAL, size:24}) ] }),
  new Paragraph({ spacing:{after:40}, alignment:AlignmentType.CENTER, children:[ new TextRun({text:'Projeto Final — Criação de Empresa Júnior', bold:true, size:24}) ] }),
  new Paragraph({ spacing:{after:240}, alignment:AlignmentType.CENTER, children:[ new TextRun({text:'Documento institucional (versão 0.1 — junho/2026)', color:SLATE, size:20}) ] }),
  new Paragraph({ spacing:{after:20}, alignment:AlignmentType.CENTER, children:[ new TextRun({text:'Equipe', bold:true, size:22}) ] }),
  new Paragraph({ spacing:{after:20}, alignment:AlignmentType.CENTER, children:[ new TextRun({text:'Raquel Pereira — Diretora Executiva e de Produto (CPO)', size:22}) ] }),
  new Paragraph({ spacing:{after:240}, alignment:AlignmentType.CENTER, children:[ new TextRun({text:'Roger Quinelato — Diretor de Engenharia de Software e Operações (CTO)', size:22}) ] }),
  new Paragraph({ spacing:{after:0}, alignment:AlignmentType.CENTER, children:[ new TextRun({text:'Brasília — DF', color:SLATE, size:20}) ] }),
  new Paragraph({ alignment:AlignmentType.CENTER, children:[ new PageBreak() ] }),
];

// Sumário
const toc = [
  new Paragraph({ heading:HeadingLevel.HEADING_1, children:[ new TextRun('Sumário') ] }),
  new TableOfContents('Sumário', { hyperlink:true, headingStyleRange:'1-1' }),
  new Paragraph({ children:[ new PageBreak() ] }),
];

// Seções
const body = [];
sections.forEach((s,idx)=>{
  body.push(new Paragraph({ heading:HeadingLevel.HEADING_1, pageBreakBefore: idx>0, children:[ new TextRun(`${s.n}. ${s.title}`) ] }));
  for (const b of s.body){ for (const node of blockToDocx(b)) body.push(node); }
});

const doc = new Document({
  styles: {
    default: { document: { run: { font:'Arial', size:22 } } },
    paragraphStyles: [
      { id:'Heading1', name:'Heading 1', basedOn:'Normal', next:'Normal', quickFormat:true,
        run:{ size:32, bold:true, font:'Arial', color:INDIGO },
        paragraph:{ spacing:{before:240,after:160}, outlineLevel:0 } },
      { id:'Heading2', name:'Heading 2', basedOn:'Normal', next:'Normal', quickFormat:true,
        run:{ size:26, bold:true, font:'Arial', color:GRAFITE },
        paragraph:{ spacing:{before:160,after:80}, outlineLevel:1 } },
    ],
  },
  numbering:{ config:[ { reference:'bullets', levels:[
    { level:0, format:LevelFormat.BULLET, text:'•', alignment:AlignmentType.LEFT, style:{ paragraph:{ indent:{ left:560, hanging:280 } } } }
  ] } ] },
  sections:[{
    properties:{ page:{ size:{ width:12240, height:15840 }, margin:{ top:1440, right:1440, bottom:1440, left:1440 } } },
    footers:{ default: new Footer({ children:[ new Paragraph({ alignment:AlignmentType.CENTER, children:[ new TextRun({text:'BabelStack Júnior  ·  ', color:SLATE, size:18}), new TextRun({children:[PageNumber.CURRENT], color:SLATE, size:18}) ] }) ] }) },
    children:[ ...cover, ...toc, ...body ],
  }],
});

Packer.toBuffer(doc).then(buf=>{
  fs.writeFileSync(OUTDOCX, buf);
  console.log(`OK: ${wroteMd} seções .md atualizadas`);
  console.log(`OK: docx gerado (${(buf.length/1024).toFixed(0)} KB) -> ${OUTDOCX}`);
});
