// Build do documento BabelStack Júnior: gera os 18 .md (fonte do repo) + o .docx montado.
// Conteúdo definido UMA vez como dados estruturados e renderizado para os dois formatos.
const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, AlignmentType,
  HeadingLevel, LevelFormat, BorderStyle, WidthType, ShadingType, TableOfContents,
  PageBreak, PageNumber, Header, Footer, ImageRun
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
// bloco de imagem: renderiza um Paragraph centralizado com imgRun(...) + legenda opcional em itálico.
// w/h já devem preservar a proporção original do arquivo (ver assets/mockups/README.md).
const img = (relPath, w, h, caption) => ({ t: 'img', relPath, w, h, caption });

// ---------- imagem helper (reutilizável — Seções 8/9, mockups, capa, etc.) ----------
// imgRun(relPath, widthPx, heightPx) -> ImageRun pronto para entrar em `children` de um Paragraph.
// relPath é relativo à raiz do repo (REPO); o tipo é inferido da extensão do arquivo
// (suporta png/jpg/jpeg/gif/bmp — a lib `docx` não aceita svg diretamente em ImageRun).
const IMG_TYPE_BY_EXT = { '.png':'png', '.jpg':'jpg', '.jpeg':'jpg', '.gif':'gif', '.bmp':'bmp' };
function imgRun(relPath, widthPx, heightPx) {
  const ext = path.extname(relPath).toLowerCase();
  const type = IMG_TYPE_BY_EXT[ext];
  if (!type) throw new Error(`imgRun: extensão não suportada em "${relPath}" (use png/jpg/gif/bmp — converta o SVG antes)`);
  return new ImageRun({
    type,
    data: fs.readFileSync(path.join(REPO, relPath)),
    transformation: { width: widthPx, height: heightPx },
  });
}

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
    '**Setor público e validação social:** gestores, coordenadores pedagógicos e professores de escolas públicas do Distrito Federal e dos Centros Interescolares de Línguas (CILs). Esse segmento constitui o laboratório de validação técnica, testes de usabilidade em ambiente real e consolidação de impacto social, alinhado às diretrizes de extensão universitária e ao programa "Código Fluente".',
    '**Setor privado e sustentabilidade financeira:** escolas de idiomas de pequeno e médio porte e professores particulares de línguas estrangeiras no DF e no Brasil. Esse público necessita de automação pedagógica e plataformas próprias de estudo (como *VocabDeck* e *EduLanding*) e dashboards de engajamento (*LingoBoard*), mas carece de orçamento para contratar fábricas de software ou consultorias de TI tradicionais.',
  ),
  h2('Concorrentes'),
  ul(
    '**Diretos:** outras Empresas Juniores de Computação/TI do Distrito Federal (como a CJR da UnB) e agências boutique de desenvolvimento de software. O diferencial competitivo exclusivo da BabelStack Júnior reside na hiper-especialização no ecossistema de idiomas (EdTech), oferecendo um portfólio pré-estruturado (*LingoBoard*, *VocabDeck*, *EduLanding*, *BabelUX* e *IntegraSchool*) que reduz o tempo de entrega e garante metodologias pedagógicas integradas ao código.',
    '**Indiretos:** plataformas de gestão da aprendizagem consolidadas (LMS como Moodle, Geekie, Google Classroom e Agenda Edu) e softwares de prateleira genéricos. Tais soluções apresentam custos recorrentes elevados de licença, suporte técnico generalista e fluxos rígidos que engessam a autonomia metodológica do professor de idiomas.',
  ),
  h2('Parceiros potenciais'),
  ul(
    '**Institucionais e acadêmicos:** universidades e instituições de ensino superior do Distrito Federal, atuando no suporte metodológico, mentoria docente de engenharia de software e facilitação do diálogo com órgãos governamentais de educação.',
    '**Ecossistema de inovação e fomento:** programas de incubação e aceleradoras digitais do DF, propiciando infraestrutura de coworking, networking estratégico e capacitação em modelagem de negócios.',
    '**Rede de aplicação e teste (CILs):** os Centros Interescolares de Línguas da Secretaria de Estado de Educação do DF, distribuídos em diversas regiões administrativas, atuando como parceiros de co-criação para testes em escala com diversidade socioeconômica e linguística.',
  ),
  h2('Fornecedores e Stack Tecnológica'),
  ul(
    '**Sistemas operacionais e infraestrutura:** distribuições Linux para padronização das estações de desenvolvimento e ambientes virtuais.',
    '**Banco de dados:** PostgreSQL, sistema relacional open-source de alta robustez, conformidade ACID e custo zero de licenciamento.',
    '**Lógica de software e Business Intelligence:** bibliotecas Python modernas (Pandas para engenharia de dados e Streamlit para renderização ágil de dashboards interativos no *LingoBoard* e *IntegraSchool*).',
    '**Design de Experiência e Interface (UX/UI):** Figma (plano educacional/gratuito), padrão da indústria para prototipagem de alta fidelidade e auditorias heurísticas (*BabelUX*).',
    '**Hospedagem e DevOps em nuvem:** ecossistema Git/GitHub para versionamento e CI/CD, utilizando instâncias gratuitas do GitHub Pages para aplicações estáticas (*EduLanding* e *VocabDeck*) e plataformas em nuvem (Vercel e Streamlit Community Cloud) para aplicações dinâmicas.',
  ),
  h2('Oportunidades de mercado'),
  ul(
    '**Alta aderência a soluções open-source no setor público:** restrições orçamentárias de escolas públicas tornam atraente a adoção de sistemas de custo-zero de licença e baixo overhead operacional.',
    '**Demanda crítica por retenção de alunos via dados (BI):** cursos de idiomas enfrentam altas taxas históricas de evasão, gerando urgência por painéis analíticos (*LingoBoard*) que emitam alertas precoces de baixo engajamento.',
    '**Escalabilidade e replicabilidade multidiomas:** a arquitetura modular dos sistemas é projetada primariamente para o inglês, mas permite rápida expansão para espanhol, francês e outras línguas com custo marginal quase nulo.',
  ),
  h2('Ameaças e Mitigações'),
  ul(
    '**Limitações operacionais da equipe (grade curricular):** o quadro inicial conta com apenas dois estudantes dividindo a jornada de desenvolvimento com a graduação. *Mitigação:* aplicação rigorosa de metodologias ágeis (Scrum), escopo focado nos 5 produtos do portfólio e lançamento do Programa Trainee para expansão de pessoal.',
    '**Curva de aprendizado e configuração de servidores:** infraestrutura baseada em ambientes Linux e bancos de dados relacionais puros exige esforço técnico inicial de configuração. *Mitigação:* uso de rotinas automatizadas de CI/CD, conteinerização e plataformas de nuvem nativas para os estágios iniciais dos produtos.',
    '**Heterogeneidade de letramento digital docente:** parte do corpo docente apresenta resistência a novas plataformas de software. *Mitigação:* priorização de design centrado no usuário (*BabelUX*) para garantia de interfaces intuitivas com baixa carga cognitiva, além de treinamentos práticos na entrega.',
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
  img('assets/mockups/lingoboard_dashboard.png', 360, 850, 'LingoBoard — dashboard com os 4 gráficos (média por turma, evolução por avaliação, ranking de risco e distribuição de faltas) e a tabela de alunos em risco.'),
  h2('2. VocabDeck — Plataforma web de flashcards'),
  ul(
    '**Descrição:** aplicação web responsiva para revisão espaçada de vocabulário (caixas de Leitner), com arquitetura preparada para múltiplos idiomas.',
    '**Público-alvo:** professores particulares de idiomas e infoprodutores.',
    '**Problema que resolve:** passividade do aluno no estudo fora da sala e falta de ferramentas gamificadas de baixo custo.',
    '**Benefícios:** aumento da retenção de vocabulário por metodologias ativas e gamificação.',
  ),
  img('assets/mockups/vocabdeck_estudo.png', 500, 409, 'VocabDeck — tela de estudo do baralho, com o card revelado e o motor de revisão espaçada (Leitner) de 5 caixas.'),
  h2('3. EduLanding — Criação de páginas/sites educacionais'),
  ul(
    '**Descrição:** template de landing page educacional reutilizável em HTML/CSS/JS, responsivo (ex.: "Feira Cultural de Idiomas").',
    '**Público-alvo:** escolas públicas e projetos de línguas que precisam de presença web.',
    '**Problema que resolve:** ausência de páginas próprias para eventos, simulados e materiais didáticos.',
    '**Benefícios:** presença digital de baixo custo, responsiva e fácil de editar pela própria escola.',
  ),
  img('assets/mockups/edulanding_feira_cultural.png', 300, 862, 'EduLanding — landing page responsiva do exemplo "Feira Cultural de Idiomas" (hero, sobre, programação, galeria, FAQ e CTA).'),
  h2('4. BabelUX — Consultoria de redesign UX/UI'),
  ul(
    '**Descrição:** redesenho da usabilidade de portais educacionais existentes, com entregáveis "antes/depois" em alta fidelidade no Figma.',
    '**Público-alvo:** escolas e professores com sistemas defasados.',
    '**Problema que resolve:** interfaces confusas que frustram os alunos e elevam a carga cognitiva.',
    '**Benefícios:** ambiente de estudo mais acessível, intuitivo e agradável.',
  ),
  img('assets/mockups/babelux_antes_depois.png', 440, 804, 'BabelUX — comparativo Antes/Depois do Portal Acadêmico (telas de Login e Boletim), aplicando os tokens de identidade da marca.'),
  h2('5. IntegraSchool — Automação de rotinas administrativas'),
  ul(
    '**Descrição:** scripts em Python (modo simulação) que automatizam envio de resumos de aula e lembretes, e organizam arquivos.',
    '**Público-alvo:** professores de idiomas com processos manuais.',
    '**Problema que resolve:** tempo perdido com tarefas administrativas repetitivas.',
    '**Benefícios:** ganho de horas semanais e padronização da comunicação com alunos/responsáveis.',
  ),
  img('assets/mockups/integraschool_simulacao.png', 480, 643, 'IntegraSchool — prévia formatada de um resumo e um lembrete gerados em modo simulação (conteúdo real da saída do script).'),
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
  img('assets/mockups/site_home.png', 500, 565, 'Site institucional — home publicada no GitHub Pages, com a identidade visual da marca e o portfólio dos 5 produtos.'),
  note('[Anexo: prints do site publicado e calendário de posts — Fases 4 e 5]'),
]},

{ n:10, slug:'10_plano_operacional', title:'Plano Operacional', body:[
  h2('Metodologia e Fluxo de Execução de Serviços'),
  p('A execução dos serviços da BabelStack Júnior adota a metodologia ágil Scrum adaptada à realidade universitária, estruturada em cinco fases sequenciais e iterativas que garantem alinhamento entre rigor pedagógico e excelência em engenharia de software:'),
  ul(
    '**Fase 1 — Diagnóstico e Requisitos (CPO):** a Diretoria Executiva e de Produto (Raquel Pereira) realiza reuniões de imersão com os gestores da escola ou professor cliente para levantamento de requisitos funcionais e pedagógicos, gerando o Product Backlog no Jira e os protótipos interativos no Figma (*BabelUX*).',
    '**Fase 2 — Validação e Alinhamento Visual:** o cliente revisa e valida as telas e fluxos de navegação pretendidos (`Definition of Ready`). Somente após a aprovação visual formal é autorizada a entrada das histórias de usuário na sprint de codificação.',
    '**Fase 3 — Codificação e Sprints Ágeis (CTO):** a Diretoria de Engenharia de Software e Operações (Roger Quinelato) assume o desenvolvimento técnico em ciclos semanais, empregando tecnologias open-source da stack (Python, PostgreSQL, HTML/CSS/JS e Streamlit para o *LingoBoard* ou *IntegraSchool*), com controle rigoroso de versionamento via Git/GitHub.',
    '**Fase 4 — Code Review Acadêmico e Garantia de Qualidade:** concluída a codificação, a solução passa por testes de integração e revisão paritária externa com o conselho de professores orientadores (`Definition of Done`), garantindo conformidade arquitetural e segurança de dados pedagógicos.',
    '**Fase 5 — Implantação e Transferência Tecnológica:** a aplicação é hospedada em nuvem acessível ao cliente (como GitHub Pages para *EduLanding* e *VocabDeck*, ou Vercel/Streamlit Community Cloud para sistemas dinâmicos), acompanhada da entrega da documentação técnica e sessão prático-pedagógica de capacitação.',
  ),
  h2('Aspectos Operacionais e Infraestrutura'),
  ul(
    '**Horário de funcionamento e dedicação:** regime flexível e assíncrono, com dedicação estimada de ~20 horas semanais por estudante (`[estimativa]`), conciliação harmônica com a grade curricular de Sistemas de Informação e ritos ágeis (Dailies assíncronas e reuniões de planejamento/retrospectiva).',
    '**Local e modelo de atendimento:** modelo híbrido — desenvolvimento de software, documentação técnica e reuniões de sincronização executados 100% em regime remoto via Google Meet; reuniões de mentoria acadêmica e sessões presenciais de teste de usabilidade conduzidas nos laboratórios da instituição de ensino ou nas unidades dos Centros Interescolares de Línguas (CILs).',
    '**Equipamentos e estações de trabalho:** notebooks pessoais dos sócios devidamente equipados com ambientes virtuais Linux, conteinerização e conexão de banda larga, complementados pela infraestrutura laboratorial de informática da universidade para simulações de carga e testes multiusuário.',
    '**Ferramental tecnológico operacional:** padronização de estações de desenvolvimento em Linux, versionamento de código e CI/CD via Git e GitHub, IDE Visual Studio Code (VS Code), design e auditoria heurística no Figma (*BabelUX*), além do ecossistema Jira (gestão de sprints no board EST), Discord e Notion para comunicação e repositório de conhecimento institucional.',
  ),
  note('[Anexo: fluxograma de atendimento ponta-a-ponta — ver diagramas/fluxograma_atendimento.svg (fontes .mmd e .drawio)]'),
]},

{ n:11, slug:'11_plano_financeiro', title:'Plano Financeiro', body:[
  h2('Metodologia Financeira e Alocação de Recursos'),
  p('A modelagem financeira da BabelStack Júnior baseia-se estritamente na metodologia de Bootstrapping (alavancagem orgânica sem capital externo), viabilizada pela natureza acadêmica da Empresa Júnior. Ao utilizar a infraestrutura laboratorial do curso de Sistemas de Informação da universidade, ferramentas 100% open-source (Python, PostgreSQL, HTML/CSS/JS, Streamlit) e instâncias em nuvem com planos educacionais ou gratuitos (GitHub Pages, Vercel e Streamlit Community Cloud), a empresa elimina a necessidade de investimento inicial (CAPEX) e reduz os custos operacionais (OPEX) a patamares mínimos de manutenção de domínio e deslocamento.'),
  tbl(['Item','Valor'],[
    ['Capital inicial','R$ 0,00'],
    ['Empréstimos','Não se aplica'],
    ['Custos fixos','R$ 40,00/ano (domínio babelstack.com.br no Registro.br; hospedagem em planos gratuitos como GitHub Pages e Vercel)'],
    ['Custos variáveis','R$ 50,00 a R$ 150,00/mês [estimativa] (transporte para visitas a escolas e eventuais manutenções)'],
    ['Receita estimada','R$ 3.000,00 a R$ 6.000,00 no 1º semestre [estimativa] (3 a 5 contratos privados que subsidiam os projetos sociais)'],
  ]),
  h2('Estrutura de Custos e Política de Reinvestimento Social'),
  ul(
    '**Análise de Custos Operacionais:** os custos fixos restringem-se ao pagamento da anuidade do domínio de internet institucional (`babelstack.com.br` no Registro.br por R$ 40,00/ano). Os custos variáveis (`[estimativa]` de R$ 50,00 a R$ 150,00/mês) cobrem exclusivamente despesas logísticas e de transporte para visitas técnicas presenciais nas escolas públicas do DF (CILs) e em clientes privados, além de eventuais aquisições pontuais de ativos de testes de interface.',
    '**Modelo de Subsidiação Cruzada (Programa Código Fluente):** em total conformidade com a Lei Federal nº 13.267/2016, a BabelStack Júnior não distribui lucros ou dividendos aos seus membros. A receita arrecadada nos 3 a 5 contratos privados de comercialização de soluções customizadas (`[estimativa]` de R$ 3.000,00 a R$ 6.000,00 no 1º semestre) opera em modelo de subsidiação cruzada: cada 3 contratos privados custeiam integralmente a implantação, capacitação e suporte de 1 projeto social gratuito na rede pública de ensino do Distrito Federal.',
    '**Destinação de Excedente de Caixa:** o superávit financeiro remanescente é alocado em duas frentes estritamente institucionais: (1) Fundo de Capacitação Técnica da equipe (aquisição de cursos, livros, certificações e inscrições em hackathons e eventos de EdTech) e (2) Fundo de Reserva Institucional para sustentar os custos de integração e onboarding de novos membros no Programa Trainee.',
  ),
]},

{ n:12, slug:'12_aspectos_legais', title:'Aspectos Legais', body:[
  h2('Natureza Jurídica e Enquadramento Institucional'),
  ul(
    '**Tipo jurídico e regulamentação:** constituição formal como associação civil sem fins lucrativos com finalidade educacional e extensionista, enquadrada nos termos da Lei Federal nº 13.267/2016 (Lei das Empresas Juniores) e do Código Civil Brasileiro. A instituição opera sob gestão exclusiva de estudantes regularmente matriculados no curso de graduação em Sistemas de Informação e veda, por força estatutária, a remuneração de dirigentes ou a distribuição de lucros/surplus financeiro entre os sócios.',
  ),
  h2('Formalização e Documentação Societária'),
  ul(
    '**Documentos constitutivos mandatórios:** para obtenção de personalidade jurídica e regularidade cadastral perante o Cartório de Registro Civil de Pessoas Jurídicas e a Receita Federal do Brasil, a abertura da BabelStack Júnior requer a formalização de: Edital de Convocação da Assembleia Geral de Fundação; Ata de Fundação e Eleição da Primeira Diretoria; Estatuto Social submetido a visto de advogado; Regimento Interno regulamentando o fluxo de diretorias e quóruns deliberativos; documentação comprobatória de matrícula de todos os fundadores; e emissão do Comprovante de Inscrição e Situação Cadastral no CNPJ.',
  ),
  h2('Vínculo Universitário e Licenciamento Operacional'),
  ul(
    '**Reconhecimento institucional (IES) e alvará:** a regularidade de funcionamento da Empresa Júnior está condicionada à emissão da Carta de Reconhecimento pela Instituição de Ensino Superior (IES) sediadora, atestando que as atividades realizadas são compatíveis com o projeto pedagógico do curso. Adicionalmente, em virtude do funcionamento em dependências acadêmicas, a associação beneficia-se de isenção ou simplificação para concessão de alvará de funcionamento distrital/municipal, submetendo-se à orientação acadêmica contínua do conselho de professores tutor.',
  ),
  h2('Conformidade Normativa em EdTech (LGPD e Propriedade Intelectual)'),
  ul(
    '**Conformidade à Lei Geral de Proteção de Dados (Lei nº 13.709/2018):** no desenvolvimento e operação dos sistemas *LingoBoard* e *IntegraSchool*, que processam métricas de rendimento pedagógico e chamadas escolares, a BabelStack Júnior aplica a metodologia de `Privacy by Design` e `Privacy by Default`. Os dados de discentes (muitas vezes menores de idade nas escolas públicas e privadas atendidas) são estritamente minimizados, armazenados sob criptografia e anonimizados em dashboards gerenciais, impedindo qualquer vazamento ou uso não autorizado de dados pessoais ou sensíveis.',
    '**Licenciamento de software e propriedade intelectual:** os códigos-fonte desenvolvidos no âmbito dos projetos sociais ("Código Fluente") e de extensão são publicados sob licenças open-source abertas (como MIT ou GNU GPLv3), promovendo transparência técnica e reutilização por outras instituições públicas. Nos contratos de prestação de serviços para clientes privados, os direitos patrimoniais sobre as customizações específicas e regras de negócio proprietárias são integralmente transferidos à escola contratante, mantendo a BabelStack Júnior a titularidade sobre suas bibliotecas de base e componentes modulares de UX/UI.',
  ),
]},

{ n:13, slug:'13_sustentabilidade', title:'Sustentabilidade e Responsabilidade Social', body:[
  p('A BabelStack Júnior adota o compromisso de integrar sustentabilidade ambiental, responsabilidade social e governança inclusiva em todas as suas atividades operacionais e no desenvolvimento de software, alinhando inovação educacional ao impacto positivo na comunidade do Distrito Federal.'),
  h2('1. Ações Ambientais e Política Zero Papel'),
  ul(
    '**Política Paperless (Zero Papel):** digitalização integral de contratos de prestação de serviços, levantamento de requisitos, relatórios técnicos e entregas operacionais, eliminando o consumo de papel e reduzindo a pegada de carbono da empresa [estimativa].',
    '**Infraestrutura Verde e Custo-Zero:** preferência por tecnologias de baixo consumo de recursos e servidores de nuvem de alta eficiência energética (como GitHub Pages para deploys estáticos e Streamlit Community Cloud para dashboards BI).'
  ),
  h2('2. Responsabilidade Social: Programa "Código Fluente"'),
  ul(
    '**Compromisso 3 para 1:** a cada 3 contratos comerciais pagos fechados com escolas de idiomas privadas, a BabelStack Júnior se compromete a implementar, de forma gratuita e integral, 1 sistema educacional (o dashboard LingoBoard ou a automação IntegraSchool) em uma escola pública ou Centro Interescolar de Línguas (CIL) do DF [estimativa].',
    '**Democratização da Tecnologia Educacional:** combate direto ao hiato tecnológico (`digital divide`) entre o setor privado e a rede pública de ensino, oferecendo ferramentas de Business Intelligence e automação para apoiar o corpo docente público.'
  ),
  h2('3. Inclusão, Acessibilidade Digital e Governança'),
  ul(
    '**Conformidade WCAG 2.1 AA:** todas as interfaces e produtos web (VocabDeck, EduLanding, BabelUX e site institucional) são projetados com contraste de cores rigoroso (`tokens.css`), tipografia legível (Inter e Space Grotesk) e suporte a leitores de tela para alunos com deficiência visual ou neurodivergências.',
    '**Usabilidade Inclusiva:** design centrado no usuário (BabelUX) visando reduzir a carga cognitiva, garantindo que professores com diferentes níveis de letramento digital possam operar os sistemas sem barreiras.'
  ),
  h2('4. Impacto Social Esperado'),
  ul(
    '**Redução da Evasão Escolar:** monitoramento contínuo da frequência e notas pelo LingoBoard permite intervenções pedagógicas precoces, salvaguardando a permanência dos alunos nos cursos de línguas.',
    '**Formação Cidadã dos Membros:** o modelo de Empresa Júnior proporciona aos estudantes fundadores uma experiência prática orientada à ética e ao retorno social do conhecimento técnico adquirido na universidade.'
  )
]},

{ n:14, slug:'14_gestao_qualidade', title:'Gestão da Qualidade', body:[
  p('A Política da Qualidade da BabelStack Júnior estabelece diretrizes rigorosas para assegurar a excelência técnica dos 5 produtos do portfólio e a máxima satisfação das instituições de ensino contratantes, integrando metodologias ágeis, inspeção contínua de código e métricas centradas no usuário.'),
  h2('1. Monitoramento da Satisfação dos Clientes'),
  ul(
    '**Net Promoter Score (NPS):** aplicação sistemática de pesquisas de NPS aos gestores e professores 30 dias após a entrega do projeto, visando manter o índice em zona de excelência (NPS ≥ 75 [estimativa]).',
    '**Entrevistas Qualitativas de Aderência:** acompanhamento pós-implantação para avaliar a efetividade no dia a dia da escola, coletando feedback sobre facilidade de uso e impacto na produtividade docente.'
  ),
  h2('2. Indicadores e Metas de Qualidade Técnica (KPIs)'),
  ul(
    '**Taxa de Defeitos (Bug Rate):** meta de zero bugs de severidade crítica ou alta na primeira semana de operação contínua [estimativa], assegurada por validação de dados de entrada nos scripts e SPAs.',
    '**Lead Time de Entrega:** cumprimento rigoroso das 5 Sprints do cronograma técnico (Seção 18), monitorando o tempo desde a concepção do backlog até a publicação no GitHub Pages ou entrega final.',
    '**Aderência de Interface e Usabilidade:** aplicação de testes de usabilidade baseados nas 10 heurísticas de Nielsen (metodologia do produto BabelUX), medindo o tempo de conclusão de tarefas-chave pelos usuários.'
  ),
  h2('3. Ciclos de Melhoria Contínua e Engenharia'),
  ul(
    '**Sprint Retrospectives:** reuniões quinzenais (a cada 15 dias) entre a dupla executora (Roger Quinelato, CTO; Raquel Pereira, CPO) e o orientador acadêmico para identificar gargalos de processo, refinamento técnico e ajustes na alocação de esforço ([estimativa] de 16 story points por sprint).',
    '**Code Review e Padrões Arquiteturais:** revisão obrigatória em dupla de todos os Pull Requests no repositório GitHub antes de integração à branch `main`, garantindo conformidade com o TDD (`tdd_arquitetura.md`), modularidade de scripts Python e uso correto do design system (`tokens.css`).'
  ),
  h2('4. Acordo de Nível de Serviço (SLA) e Garantia'),
  ul(
    '**Tratamento de Reclamações e Correções (SLA):** garantia formal de 90 dias após a entrega final do sistema [estimativa], com compromisso de atendimento e correção gratuita de falhas críticas que impeçam o funcionamento (ex.: erro na importação de CSV no LingoBoard) em até 48 horas úteis [estimativa].',
    '**Suporte Evolutivo:** disponibilização de documentação em markdown, guias rápidos e manuais autoexplicativos em cada produto (`README.md`), garantindo autonomia para a instituição de ensino.'
  )
]},

{ n:15, slug:'15_gestao_riscos', title:'Gestão de Riscos', body:[
  p('A gestão de riscos da BabelStack Júnior abrange a identificação precoce, monitoramento contínuo e planos de mitigação para as ameaças de negócios, financeiras, operacionais e arquiteturais do projeto. A matriz abaixo consolida os riscos institucionais da Empresa Júnior e os riscos técnicos mapeados no TDD (`tdd_arquitetura.md`).'),
  tbl(['Risco','Categoria','Impacto / Probab.','Mitigação'],[
    ['Inadimplência de clientes privados','Financeiro','Alto / Média','Cobrança antecipada de 50% do valor na assinatura do contrato e 50% na homologação da entrega.'],
    ['Conflito com o calendário acadêmico (provas, TCC)','Operacional','Alto / Alta','Pausa programada nos contratos no fechamento do semestre letivo e planejamento de capacidade conservador ([estimativa] ~75% de ocupação por sprint).'],
    ['Sobrecarga da dupla executora (2 pessoas)','Operacional / Equipe','Médio / Alta','Divisão rigorosa por trilhas de especialidade (Roger = técnico/dados/deploy; Raquel = produto/design/conteúdo) e escopo de MVP explícito.'],
    ['Tempo curto para entrega (5 semanas para 5 produtos + site)','Tecnológico / Prazo','Alto / Alta','Priorização estrita dos itens P0 nas Sprints 1 a 5 (ADR-0005); adoção de stack open-source/custo-zero ágil (ADR-0001); critério "demonstrável > completo".'],
    ['Produtos ficarem apenas como stub incompletos','Tecnológico / Produto','Alto / Média','Definição clara de "Pronto" (Definition of Done) para cada MVP, garantindo execução real de fluxos e validação com dados de exemplo.'],
    ['Perda de código ou indisponibilidade de infraestrutura','Tecnológico / Infra','Médio / Baixa','Versionamento contínuo no nuvem (GitHub), deploy automatizado via GitHub Actions e backup do modelo de referência PostgreSQL (ADR-0003).'],
    ['Falta de dados educacionais realistas para demonstração','Tecnológico / Dados','Médio / Média','Geração e validação de massas de dados CSV de exemplo (`dados_exemplo.csv` e `alunos_exemplo.csv`) rigorosamente derivadas do diagrama ERD PostgreSQL.'],
    ['Privacidade e segurança de dados de alunos (LGPD)','Jurídico / Conformidade','Alto / Baixa','Uso exclusivo de dados fictícios em ambiente de demonstração; execução do IntegraSchool em modo simulação local, sem tráfego de dados sensíveis em redes públicas.'],
    ['Resistência tecnológica de professores e gestores','Mercado / Adoção','Médio / Alta','Desenvolvimento de interfaces intuitivas e acessíveis (tokens de cores de alto contraste, WCAG 2.1 AA), acompanhadas de manuais em vídeo e relatórios simplificados.']
  ]),
]},

{ n:16, slug:'16_tecnologia_inovacao', title:'Tecnologia e Inovação', body:[
  p('A arquitetura tecnológica da BabelStack Júnior é fundamentada em uma stack **100% open-source e custo-zero** (ADR-0001), projetada para permitir a execução ágil por uma equipe compacta de duas pessoas no prazo acadêmico, assegurando alta qualidade, facilidade de demonstração e viabilidade de manutenção por escolas de idiomas públicas e privadas sem ônus com licenças ou servidores pagos [estimativa].'),
  h2('1. Stack Tecnológica Aberta e Modular'),
  ul(
    '**Linguagens de Programação:** Python (biblioteca padrão para automação de scripts e processamento de dados) e JavaScript puro (ES6+, para interatividade frontend e lógica client-side sem dependências pesadas).',
    '**Business Intelligence & Dashboards (LingoBoard):** Python com **Streamlit** e **Pandas** (ADR-0002). O Streamlit viabiliza interfaces analíticas interativas com sliders de limiares de risco configuráveis e filtros dinâmicos, enquanto o Pandas realiza o cálculo de médias, frequências e desvios nas planilhas de notas e chamadas.',
    '**Automação e Scripts (IntegraSchool):** Python nativo para processamento de arquivos CSV e geração de relatórios administrativos (resumos de aula e lembretes de pendências) em modo simulação com saída em arquivo (`saida/AAAA-MM-DD_Turma/`) e rastreabilidade via log de execução.',
    '**Frontend & Single Page Applications (VocabDeck, EduLanding e Site):** HTML5 semântico, Vanilla CSS3 estruturado com design tokens (`assets/identidade/tokens.css`) e JavaScript client-side com persistência em `localStorage` (motor Leitner de 5 caixas do VocabDeck), garantindo portabilidade máxima e tempo de carregamento instantâneo.',
    '**UX/UI Design & Prototipação (BabelUX):** **Figma** (ADR-0004, plano gratuito) utilizado para a criação da identidade visual, diagnóstico heurístico baseado nas 10 heurísticas de Nielsen e prototipação de alta fidelidade do comparativo "Antes/Depois".',
    '**Hospedagem e CI/CD:** deploy estático automatizado via **GitHub Pages** (com pipeline em GitHub Actions) para o site institucional e aplicações web, e execução local ou em **Streamlit Community Cloud** para os dashboards analíticos.'
  ),
  h2('2. Modelo de Dados de Referência (ERD PostgreSQL)'),
  p('Para garantir consistência semântica e integridade no processamento das informações escolares, a BabelStack Júnior adota o **PostgreSQL** como paradigma e banco de dados relacional de referência (ADR-0003). Embora os MVPs demonstráveis na fase acadêmica consumam arquivos CSV organizados em memória e `localStorage` — eliminando custos operacionais e complexidade de setup durante as apresentações —, todas as estruturas e planilhas derivam estritamente do Diagrama Entidade-Relacionamento (ERD) canônico do domínio de escolas de idiomas.'),
  ul(
    '**ALUNO (`id`, `nome`, `email`, `responsavel_contato`, `data_nascimento`):** entidade que armazena os dados cadastrais do estudante. Por privacidade (LGPD), os contatos de responsáveis e e-mails nos ambientes demonstrativos utilizam dados sintéticos fictícios.',
    '**PROFESSOR (`id`, `nome`, `idioma`):** docente responsável pela condução pedagógica das turmas de inglês, espanhol ou francês.',
    '**TURMA (`id`, `professor_id FK`, `idioma`, `nivel`, `periodo`):** agrupamento de ensino categorizado por idioma, nível (Ex.: Básico A1, Intermediário B1) e turno letivo, vinculada à chave estrangeira do professor.',
    '**MATRICULA (`id`, `aluno_id FK`, `turma_id FK`, `data_matricula`, `status`):** entidade associativa central que resolve o relacionamento N:N entre Aluno e Turma, registrando o status de vínculo (`ativo`, `concluido`, `evadido`) e servindo de âncora para avaliações e chamadas.',
    '**NOTA (`id`, `matricula_id FK`, `avaliacao`, `valor`, `data`):** registro quantitativo de desempenho (Ex.: Prova Oral, Redação, Midterm) vinculado à matrícula, base para os gráficos de evolução por avaliação no LingoBoard.',
    '**PRESENCA (`id`, `matricula_id FK`, `data`, `presente`):** registro longitudinal de chamadas diárias por matrícula. A agregação de faltas consecutivas e porcentagem de presença alimenta diretamente o algoritmo de alerta precoce de evasão do LingoBoard.'
  ),
  note('[Anexo: diagrama ERD do banco PostgreSQL (aluno, professor, turma, matrícula, nota, presença) — ver diagramas/erd_babelstack.svg (fonte .mmd)]'),
  h2('3. Metodologia de Gestão de Engenharia (Kanban + Jira)'),
  p('A condução técnica e gerencial do projeto segue o modelo ágil documentado no ADR-0005, combinando as melhores práticas do desenvolvimento de software profissional à rotina acadêmica:'),
  ul(
    '**Jira (Projeto EST):** plataforma oficial de rastreamento de issues do time, estruturada em 8 Épicos (`EP-LINGO`, `EP-VOCAB`, `EP-EDU`, `EP-BABELUX`, `EP-INTEGRA`, `EP-PLAT`, `EP-DOCS`, `EP-ENTREGA`) e organizada em 5 Sprints formais de execução (Sprints 1 a 5, cobrindo o período de 30/06 a 31/07/2026). O backlog completo e o status de entrega são mantidos sincronizados com o repositório em `docs/sprints/jira_backlog.csv`.',
    '**Quadros Kanban Auxiliares (Trello/Notion/Jira):** utilização de fluxos visuais `A Fazer`, `Em Progresso`, `Em Revisão` e `Concluído` para garantir transparência nas reuniões de alinhamento entre a dupla executora (Roger Quinelato, CTO; Raquel Pereira, CPO) e a orientação acadêmica.'
  ),
  h2('4. Inovações Propostas e Diferencial Técnico'),
  ul(
    '**Democratização do Business Intelligence Educacional:** adaptação de práticas corporativas de análise de dados (BI) e estatística descritiva para a realidade cotidiana de professores e coordenadores de Centros Interescolares de Línguas (CILs) da rede pública, substituindo o preenchimento manual de tabelas dispersas por diagnósticos visuais imediatos.',
    '**Alerta Preditivo de Risco de Evasão:** lógica analítica no LingoBoard que cruza notas médias (limiar configurável, default `< 6.0`) e acúmulo de faltas (limiar configurável, default `> 8 faltas`) para classificar alunos em faixas de risco (`Crítico`, `Atenção`, `Normal`), possibilitando ações pedagógicas preventivas antes do abandono do curso.',
    '**Arquitetura Autônoma e Modular (`Portfólio Desacoplado`):** ao contrário de sistemas de gestão monolíticos e complexos que exigem longos períodos de treinamento e migração de dados, os 5 produtos da BabelStack Júnior operam de maneira autônoma e sob demanda. Uma escola pode adotar apenas o VocabDeck para revisão ou o EduLanding para um evento específico, mantendo coesão de dados via modelo PostgreSQL e coesão visual através do design system comum (`tokens.css`).'
  ),
  p('Documentação técnica de apoio: arquitetura detalhada dos 5 produtos e modelo de dados em `docs/produtos/tdd_arquitetura.md`; especificações funcionais em `docs/produtos/prd_*.md`; e os registros de decisões arquiteturais em `docs/adr/` (ADRs 0001 a 0005).')
]},

{ n:17, slug:'17_resultados_esperados', title:'Resultados Esperados', body:[
  p('A consolidação do plano de negócios e a implementação do portfólio da BabelStack Júnior visam gerar impactos mensuráveis e positivos tanto para o ecossistema educacional de idiomas do Distrito Federal quanto para a formação profissional dos estudantes fundadores da Empresa Júnior.'),
  h2('1. Impacto Quantitativo e Atendimento (6 Meses)'),
  ul(
    '**Professores e Gestores Atendidos:** adoção direta das soluções por 5 a 10 professores e gestores educacionais nos primeiros 6 meses de operação [estimativa], em parcerias com Centros Interescolares de Línguas (CILs) e escolas de idiomas da rede privada.',
    '**Alunos Impactados:** alcance indireto de mais de 300 estudantes de idiomas [estimativa] beneficiados pelas metodologias ativas do VocabDeck, clareza visual do BabelUX e monitoramento pedagógico do LingoBoard.'
  ),
  h2('2. Retorno Acadêmico e Social na Comunidade'),
  ul(
    '**Engajamento e Retenção de Alunos:** melhoria substancial no engajamento dos estudantes na revisão de vocabulário e redução da taxa de evasão escolar em até 15% a 25% [estimativa] nas turmas monitoradas, impulsionada pela identificação precoce de risco educacional.',
    '**Eficiência Operacional Docente:** economia média de 4 a 6 horas semanais [estimativa] por professor através da automação de relatórios e lembretes com o IntegraSchool e da digitalização de páginas de eventos escolares com o EduLanding.',
    '**Redução do Custo Tecnológico:** barateamento em até 70% [estimativa] dos custos com software educacional para as escolas parceiras, graças ao modelo de soluções abertas, custo-zero de licença (ADR-0001) e ao programa social "Código Fluente".'
  ),
  h2('3. Crescimento e Sustentabilidade da Empresa Júnior'),
  ul(
    '**Expansão do Quadro Social:** crescimento planejado para escalar a equipe inicial de 2 integrantes (Roger Quinelato, CTO; Raquel Pereira, CPO) para até 8 estudantes universitários [estimativa] ao final do primeiro ano de funcionamento, abrindo novas diretorias operacionais e de projetos.',
    '**Reinvestimento e Fundo de Caixa:** direcionamento integral dos superávits financeiros gerados nos contratos de consultoria privada ([estimativa] entre R$ 500 e R$ 3.000 por projeto) para o fundo de reserva da Empresa Júnior, custeando certificações técnicas na nuvem, licenças de ferramentas avançadas e auxílio para congressos acadêmicos dos membros.'
  )
]},

{ n:18, slug:'18_cronograma_criacao', title:'Cronograma de Criação', body:[
  p('O cronograma geral da BabelStack Júnior abrange o período de **16 de junho a 31 de julho de 2026 (7 semanas corridas)**, estruturado em um modelo ágil híbrido: duas semanas iniciais de fundação e planejamento (`Sprint 0`) seguidas por **5 Sprints semanais de execução técnica e montagem documental (Sprints 1 a 5)**, gerenciadas no Jira (Projeto **EST** — ADR-0005) com uma capacidade planejada de [estimativa] 16 story points por sprint para a dupla (Roger Quinelato, CTO; Raquel Pereira, CPO).'),
  h2('1. Cronograma e Mapeamento de Sprints (Semanas 1 a 7)'),
  tbl(['Semana / Período','Sprint Jira','Foco e Épicos Prioritários','Entregáveis, Pacotes e Marcos'],[
    ['Semana 1 (16–22/06)','Sprint 0 (Prep I)','Fundação, Identidade e Setup','Logo oficial (Conceito B), design tokens (`tokens.css`), setup das ferramentas e repositório GitHub, e revisão estrutural das seções 1 a 4.'],
    ['Semana 2 (23–29/06)','Sprint 0 (Prep II)','Mercado, Estrutura e Portfólio','Organograma oficial da dupla em Draw.io, definição do portfólio de 5 produtos (`EP-LINGO`, `EP-VOCAB`, `EP-EDU`, `EP-BABELUX`, `EP-INTEGRA`) e redação das seções 5 a 8.'],
    ['Semana 3 (30/06–06/07)','Sprint 1 (Execução)','Planos, Modelagem e Site Base (`EP-DOCS`, `EP-PLAT`)','ERD PostgreSQL referencial (`erd_babelstack.svg`, item `S1-1`), fluxograma de atendimento (`fluxograma_atendimento.svg`, `S1-2`), organograma (`S1-3`), publicação do esqueleto do site no ar (`S1-4`) e revisão das seções 9 a 16 (`S1-5`).'],
    ['Semana 4 (07–13/07)','Sprint 2 (Execução)','Build Técnico I: BI e Flashcards (`EP-LINGO`, `EP-VOCAB`, `EP-PLAT`)','Publicação do site no GitHub Pages (`S2-5`), **VocabDeck MVP** funcional (`index.html`/`app.js` com motor Leitner em `localStorage`, `S2-3`, `S2-4`) e **LingoBoard MVP** funcional (`app.py` em Streamlit com 4 gráficos via Pandas, `S2-2`), lendo CSV derivado do ERD (`S2-1`) e limiares interativos na sidebar (`S2-6`).'],
    ['Semana 5 (14–20/07)','Sprint 3 (Execução)','Build Técnico II: Landing, Automação, UX e Gantt (`EP-EDU`, `EP-INTEGRA`, `EP-BABELUX`)','**EduLanding** completo com exemplo "Feira Cultural" (`S3-1`), **IntegraSchool** em modo simulação Python para relatórios de aula (`S3-2`), **BabelUX** com diagnóstico heurístico e protótipo Antes/Depois (`S3-3`, `S3-4`), gráfico de Gantt SVG (`gantt_cronograma.svg`, `S3-5`) e setup de redes sociais (`S3-6`, [estimativa] opcional).'],
    ['Semana 6 (21–24/07)','Sprint 4 (Execução)','Montagem Documental, Deck e 1ª Apresentação (`EP-DOCS`, `EP-ENTREGA`)','Captura de mockups para seções 8 e 9 (`S4-1`), montagem do documento final e regeneração do `.docx` com 18 seções + anexos (`S4-2`, `S4-3`), deck de apresentação (`S4-4`) e **1ª Apresentação na Banca (Marco em 24/07/2026, `S4-5`)**.'],
    ['Semana 7 (25–31/07)','Sprint 5 (Fechamento)','Ajustes Pós-Feedback e Entrega Final (`EP-ENTREGA`)','Ajustes finos no relatório técnico e nos códigos do portfólio com base nas considerações da banca avaliadora, ensaio final e **2ª Apresentação e Entrega Definitiva do Projeto (Marco em 31/07/2026)**.']
  ]),
  h2('2. Caminho Crítico e Dependências Interligadas'),
  ul(
    '**Caminho Crítico do Build Técnico:** o progresso arquitetural depende estritamente da sequência `ERD PostgreSQL (Sprint 1) → CSVs de Exemplo (Sprint 2) → LingoBoard e IntegraSchool (Sprints 2 e 3) → Anexos e Documento Final (Sprint 4)`. A formalização das 6 entidades em `tdd_arquitetura.md` foi pré-requisito indispensável para validar a lógica analítica em Streamlit e a geração de relatórios administrativos.',
    '**Independência de Frontend:** VocabDeck, EduLanding e o site institucional seguem trilha paralela baseada no design system compartilhado (`tokens.css`), permitindo à CPO (Raquel) evoluir o front e protótipos Figma simultaneamente aos desenvolvimentos de dados conduzidos pelo CTO (Roger).'
  ),
  note('[Anexo: gráfico de Gantt do cronograma, com as datas reais (16/06–31/07/2026) e os marcos das apresentações (24/07 e 31/07) — ver diagramas/gantt_cronograma.svg (fonte .mmd)]'),
  p('**Data final do projeto: 31/07/2026** — conclusão integral de todos os entregáveis acadêmicos, site em produção com os 5 produtos funcionais e apresentações devidamente homologadas nos dias 24/07 e 31/07/2026.')
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
  if (b.t==='img'){
    const rel = path.relative(SECDIR, path.join(REPO, b.relPath)).replace(/\\/g,'/');
    const alt = b.caption ? b.caption.replace(/[[\]]/g,'') : '';
    return b.caption ? `![${alt}](${rel})\n\n_${b.caption}_\n` : `![${alt}](${rel})\n`;
  }
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
  if (b.t==='img'){
    const nodes = [ new Paragraph({ spacing:{before:120,after:b.caption?60:160}, alignment:AlignmentType.CENTER, children:[ imgRun(b.relPath, b.w, b.h) ] }) ];
    if (b.caption) nodes.push(new Paragraph({ spacing:{after:160}, alignment:AlignmentType.CENTER, children:[ new TextRun({ text:b.caption, italics:true, color:SLATE, size:18 }) ] }));
    return nodes;
  }
  if (b.t==='ul') return b.x.map(bulletNode);
  if (b.t==='tbl') return [tableNode(b.head,b.rows), new Paragraph({spacing:{after:120},children:[]})];
  return [];
}

// Capa
const cover = [
  new Paragraph({ spacing:{before:400,after:280}, alignment:AlignmentType.CENTER, children:[ imgRun('assets/logo/lockup.png', 360, 96) ] }),
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
