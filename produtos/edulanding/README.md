# EduLanding — Template de landing page educacional

Produto da **BabelStack Júnior**. Template responsivo, **estático e custo-zero** (HTML/CSS/JS puro, sem backend nem banco) para escolas divulgarem eventos, simulados e materiais. PRD: [`docs/produtos/prd_edulanding.md`](../../docs/produtos/prd_edulanding.md).

- **Sprint 3 · item S3-1** — entregável P0: template + exemplo preenchido **"Feira Cultural de Idiomas"**.

## Arquivo

- `index.html` — **arquivo único autocontido** (estilos e script embutidos). É ao mesmo tempo o template e o exemplo demonstrável.

## Como abrir

Abra `index.html` em qualquer navegador (duplo clique) — não precisa de servidor. Para publicar, suba o arquivo em qualquer hospedagem estática (ex.: **GitHub Pages**).

## Como reaproveitar em outro evento (sem mexer em lógica)

1. Procure os comentários **`EDITÁVEL:`** no HTML e troque os textos ao lado (título, subtítulo, data, local, contatos).
2. **Programação:** cada `div.agenda__item` é um horário — copie/edite à vontade.
3. **CTA/inscrição:** troque o `href` dos botões pelo link do seu formulário externo (ex.: Google Forms).
4. **Galeria:** substitua cada `<figure>` colorido por `<figure><img src="foto.jpg" alt="..."></figure>`.
5. **Tema/cores:** para outra escola, altere apenas as variáveis do bloco `:root` (espelham `assets/identidade/tokens.css`).

## Seções incluídas

Navegação fixa · Hero (título/data/local + CTA) · Sobre (3 destaques) · Programação (agenda) · Galeria (P1) · FAQ (P1) · CTA de inscrição + contatos · Rodapé.

## Identidade

Cores Índigo `#4338CA` / Teal `#0EA5A4` / Âmbar `#F59E0B`, fontes Space Grotesk + Inter — alinhado a [`docs/identidade_visual.md`](../../docs/identidade_visual.md). Referenciado na **Seção 8** (Portfólio de Produtos e Serviços) do documento.
