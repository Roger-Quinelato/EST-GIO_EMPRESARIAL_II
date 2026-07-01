# PRD — IntegraSchool

**Produto:** IntegraSchool — Automação de rotinas administrativas
**Categoria:** Automação / scripts (Python) · **Valor (privado):** R$ 700–2.000 [estimativa] · gratuito p/ escolas públicas
**Autores:** Roger (CTO), Raquel (CPO) · **Status:** rascunho v1 · **Fase de build:** Semana 5

## Problema

Professores de idiomas perdem horas por semana com tarefas administrativas repetitivas: enviar resumos de aula, lembretes a responsáveis e organizar arquivos manualmente. Esse trabalho manual rouba tempo de ensino e gera comunicação inconsistente. O custo de não resolver é sobrecarga do professor e mensagens fora do padrão (ou esquecidas).

## Objetivos

1. Automatizar, em **modo simulação** (sem envio real), a geração de **resumos de aula** e **lembretes**.
2. **Organizar arquivos** (ex.: materiais por turma/data) automaticamente.
3. Rodar com **um comando**, a partir de uma planilha de exemplo (`alunos_exemplo.csv`).
4. Demonstrar ganho de tempo de forma tangível e auditável (logs/saídas em arquivo).

## Não-objetivos

- **Não** fará envio real de e-mail/WhatsApp no MVP — saída é "modo simulação" (texto/arquivo), por segurança e ética acadêmica.
- **Não** terá interface gráfica no v1 — execução por linha de comando/script.
- **Não** integrará com provedores externos (Gmail API, etc.) no escopo base.
- **Não** armazenará dados sensíveis de alunos além do CSV de exemplo.

## Personas e user stories

**Professor(a) de idiomas (operador):**
- Como professor, quero gerar automaticamente o resumo padrão da aula para cada turma, para não reescrever tudo manualmente.
- Como professor, quero gerar lembretes personalizados a partir da lista de alunos, para padronizar a comunicação.
- Como professor, quero que os arquivos sejam organizados por turma/data, para encontrá-los depois.

## Requisitos

### Must-Have (P0)
- **Leitura do CSV** de exemplo (alunos, turma, contato fictício).
  - *Aceite:* CSV válido é lido sem erro; campos ausentes geram aviso claro.
- **Geração de resumo/lembrete** por aluno/turma a partir de um template (modo simulação).
  - *Aceite:* para cada linha do CSV, é gerado um texto de saída coerente, salvo em arquivo (não enviado).
- **Organização de arquivos** (criação de pastas por turma/data e movimentação simulada/local).
- **Log de execução** mostrando quantos itens foram processados.

### Nice-to-Have (P1)
- Templates de mensagem editáveis (arquivo de configuração).
- Relatório-resumo da execução (quantos resumos/lembretes gerados).

### Future Considerations (P2)
- Envio real via API (e-mail/WhatsApp) com consentimento.
- Agendamento (cron) e modo "produção".
- Interface gráfica simples.

## Métricas de sucesso

- **Líderes:** processar a planilha de exemplo em < 1 min [estimativa]; 100% das linhas válidas geram saída.
- **Defasados:** economia de tempo percebida pelo professor [estimativa]; reuso por ≥1 professor-piloto.
- **Acadêmico:** demonstração do "modo simulação" na apresentação, com exemplo de e-mail gerado.

## Questões em aberto

- [produto] Quais rotinas entram no MVP: resumo + lembrete + organização, ou subconjunto?
- [eng] Formato da saída: `.txt` por aluno ou um único relatório?
- [ética] Deixar explícito "modo simulação" em todas as saídas (sem dados reais).

## Cronograma

- **Semana 5 (14–20/07):** implementar `integraschool.py` (P0) com `alunos_exemplo.csv`.
- Marco: demonstrável na 2ª apresentação (31/07).
