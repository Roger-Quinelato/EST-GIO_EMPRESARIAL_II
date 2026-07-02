# IntegraSchool

Automação de rotinas administrativas para professores de idiomas — geração de **resumos de aula** e **lembretes** a partir de uma planilha de alunos, em **modo simulação** (nenhuma mensagem é enviada de verdade).

MVP P0 do portfólio BabelStack Júnior (Sprint 3, item S3-2). Ver `docs/produtos/prd_integraschool.md` para o PRD completo.

## O que faz

1. Lê um CSV de alunos (`nome`, `email`, `turma`). Linhas com campo ausente/vazio geram um aviso e são puladas — não interrompem o processamento das demais.
2. Gera, para cada aluno válido, um **resumo de aula** e um **lembrete** a partir de templates em pt-BR, com o aviso `MODO SIMULAÇÃO` bem visível em todo arquivo.
3. Organiza a saída em pastas por **data + turma**.
4. Grava um **log de execução** com a contagem de itens processados e imprime o mesmo resumo no console.

Nenhum e-mail, WhatsApp ou mensagem real é enviado — é só geração de arquivos `.txt` locais, por segurança e ética acadêmica (ver "Não-objetivos" do PRD).

## Como rodar

Só biblioteca padrão do Python (sem `pip install`):

```bash
cd produtos/integraschool
python integraschool.py
```

Argumentos opcionais:

| Flag | Padrão | Descrição |
| --- | --- | --- |
| `--csv` | `alunos_exemplo.csv` | caminho do CSV de entrada |
| `--saida` | `./saida` | pasta base onde as saídas são gravadas |
| `--data` | data de hoje | data de referência das aulas (`AAAA-MM-DD`) |

## Formato do CSV de entrada

Colunas obrigatórias: `nome`, `email`, `turma`. Ver `alunos_exemplo.csv` para um exemplo com ~20 alunos fictícios em 4 turmas (mais duas linhas propositalmente inválidas, para demonstrar a validação).

## Saídas geradas

Tudo é gravado em `saida/` (ignorado pelo git — ver `.gitignore` da raiz), organizado assim:

```
saida/
  AAAA-MM-DD_Nome-Da-Turma/
    Nome-Do-Aluno.txt      # resumo + lembrete do aluno, com aviso de modo simulação
  log_execucao_AAAA-MM-DD_HH-MM-SS.txt   # log da execução
```

## Limitações conhecidas (v1)

- Sem envio real de e-mail/WhatsApp, sem GUI, sem integração com APIs externas — fora de escopo do MVP (ver "Não-objetivos" no PRD).
- Templates de mensagem são fixos no código (`CONTEUDO_POR_TURMA`); torná-los configuráveis por arquivo é um item Nice-to-Have (P1) para uma iteração futura.
