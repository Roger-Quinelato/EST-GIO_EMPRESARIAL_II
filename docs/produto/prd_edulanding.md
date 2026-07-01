# PRD — EduLanding

**Produto:** EduLanding — Criação de páginas/sites educacionais
**Categoria:** Template web / serviço de presença digital · **Valor (privado):** R$ 600–1.800 [estimativa] · gratuito p/ escolas públicas
**Autores:** Roger (CTO), Raquel (CPO) · **Status:** rascunho v1 · **Fase de build:** Semana 5

## Problema

Escolas públicas e projetos de idiomas não têm páginas próprias para eventos, simulados e materiais didáticos, e dependem de redes sociais ou avisos em papel. Criar um site do zero exige verba e conhecimento que essas instituições não têm. O custo de não resolver é baixa divulgação de eventos (ex.: feira cultural) e ausência de presença digital.

## Objetivos

1. Entregar um **template de landing page educacional reutilizável** (HTML/CSS/JS), responsivo.
2. Permitir que a própria escola **edite textos e imagens** sem mexer em lógica.
3. Demonstrar o template com um caso real (ex.: **"Feira Cultural de Idiomas"**).
4. Custo de hospedagem **zero** (estático).

## Não-objetivos

- **Não** será um CMS com painel administrativo no v1 — edição direta em arquivos/seções marcadas.
- **Não** terá backend, banco ou formulário com persistência no MVP — formulário pode ser link externo.
- **Não** cobrirá e-commerce/pagamentos.
- **Não** entregará múltiplos temas no v1 — um template base sólido.

## Personas e user stories

**Coordenador(a)/professor(a) de escola pública:**
- Como coordenador, quero uma página pronta para divulgar um evento, para informar alunos e responsáveis.
- Como coordenador, quero trocar título, datas, descrição e imagens facilmente, para reaproveitar em outro evento.

**Visitante (aluno/responsável):**
- Como visitante, quero ver as informações do evento no celular, para me organizar.
- Como visitante, quero um botão de inscrição/contato, para participar.

## Requisitos

### Must-Have (P0)
- **Template responsivo** com seções: hero (título/data), sobre o evento, programação, chamada para ação (CTA).
  - *Aceite:* renderiza corretamente em desktop e mobile; conteúdo trocável em pontos claramente marcados.
- **CTA configurável** (link para inscrição/contato externo).
- **Exemplo preenchido** "Feira Cultural de Idiomas".

### Nice-to-Have (P1)
- Galeria de imagens simples.
- Seção de FAQ/contato.
- Identidade BabelStack como tema padrão + fácil troca de cores.

### Future Considerations (P2)
- Variantes de tema (simulado, curso, matrícula).
- Mini-CMS para edição sem código.
- Formulário com captura real (backend).

## Métricas de sucesso

- **Líderes:** publicar uma página a partir do template em < 30 min [estimativa]; aprovação no teste de responsividade.
- **Defasados:** reuso do template em ≥2 contextos [estimativa]; página de evento no ar usada por ≥1 escola.
- **Acadêmico:** template demonstrável e (idealmente) publicado.

## Questões em aberto

- [produto] Os pontos editáveis ficam em HTML comentado ou num pequeno JSON de config?
- [design] Reaproveitar o tema do site institucional?
- [eng] Hospedagem: GitHub Pages.

## Cronograma

- **Semana 5 (14–20/07):** implementar `index.html` (template + exemplo da feira).
- Marco: demonstrável na 2ª apresentação (31/07).
