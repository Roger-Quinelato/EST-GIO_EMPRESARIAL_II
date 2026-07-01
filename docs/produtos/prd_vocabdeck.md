# PRD — VocabDeck

**Produto:** VocabDeck — Plataforma web de flashcards
**Categoria:** Aplicação web educacional · **Valor (privado):** R$ 1.500–3.000 [estimativa] · gratuito p/ escolas públicas
**Autores:** Roger (CTO), Raquel (CPO) · **Status:** rascunho v1 · **Fase de build:** Semana 4

## Problema

Alunos de idiomas estudam vocabulário de forma passiva e desorganizada fora da sala, e professores particulares não têm ferramenta gamificada de baixo custo para sustentar a revisão. Sem revisão espaçada, a retenção de vocabulário cai rapidamente. O custo de não resolver é menor progresso do aluno e evasão por falta de percepção de evolução.

## Objetivos

1. Entregar uma **aplicação web responsiva** de flashcards com **repetição espaçada** (caixas de Leitner).
2. Permitir que um professor **crie e compartilhe um baralho** de vocabulário sem código.
3. Funcionar **offline-first** no MVP (sem backend obrigatório) para demonstração simples.
4. Arquitetura **preparada para múltiplos idiomas** desde o início.

## Não-objetivos

- **Não** terá conta de usuário/sincronização em nuvem no v1 — progresso salvo localmente (localStorage).
- **Não** incluirá áudio/pronúncia nativa no MVP — só texto (frente/verso).
- **Não** será app nativo (iOS/Android) — web responsiva apenas.
- **Não** terá marketplace de baralhos no v1.

## Personas e user stories

**Professor(a) particular de idiomas:**
- Como professor, quero cadastrar pares termo/definição, para montar o baralho da minha turma.
- Como professor, quero compartilhar o baralho por link/arquivo, para os alunos estudarem em casa.

**Aluno(a):**
- Como aluno, quero revisar cards e marcar "acertei/errei", para o sistema reagendar os difíceis (Leitner).
- Como aluno, quero ver meu progresso (cards dominados vs a revisar), para me manter motivado.
- Como aluno, quero estudar no celular, para revisar em qualquer lugar.

## Requisitos

### Must-Have (P0)
- **CRUD de cards** (frente/verso) e organização em baralho.
  - *Aceite:* criar, editar e remover um card reflete imediatamente na sessão de estudo.
- **Motor de revisão Leitner** (caixas que promovem/rebaixam o card conforme acerto/erro).
  - *Aceite:* card marcado "errei" volta a aparecer mais cedo; "acertei" é adiado.
- **Persistência local** (localStorage) do baralho e do progresso.
- **Layout responsivo** (desktop e mobile).

### Nice-to-Have (P1)
- Importar/exportar baralho em JSON/CSV.
- Indicador visual de progresso (barra/contagem).
- Estilo com a identidade BabelStack.

### Future Considerations (P2)
- Contas de usuário + sincronização (backend PostgreSQL).
- Áudio/TTS e imagens nos cards.
- Múltiplos idiomas com pacotes prontos; gamificação (streaks, pontos).

## Métricas de sucesso

- **Líderes:** criar um baralho de 10 cards em < 5 min [estimativa]; sessão de revisão concluível sem travar em desktop e mobile.
- **Defasados:** retenção de vocabulário percebida (depoimento) [estimativa]; reuso por ≥1 professor-piloto.
- **Acadêmico:** demonstração funcional na 1ª apresentação.

## Questões em aberto

- [produto] Quantas caixas de Leitner no MVP (3 ou 5)?
- [design] Compartilhamento por link exige backend? (senão, exportar arquivo)
- [eng] Hospedagem: GitHub Pages?

## Cronograma

- **Semana 4 (07–13/07):** implementar `index.html` + JS (motor Leitner, localStorage, responsivo).
- Marco: demonstrável na 1ª apresentação (24/07).
