# Diagramas — BabelStack Júnior

Anexos visuais do documento. Cada diagrama tem a **fonte editável** (`.mmd`, Mermaid) e a **versão exportada** (`.svg`, pronta para inserir nas seções e no `.docx`). Todos usam a paleta da marca (Índigo `#4338CA`, Teal `#0EA5A4`, Âmbar `#F59E0B`, Grafite `#1E293B`).

| Arquivo | Anexo de | Descreve |
| --- | --- | --- |
| `organograma.svg` / `.mmd` | Seção 5 — Estrutura Organizacional | Dupla fundadora (CPO/CTO) sob o Conselho de Orientação, com os 5 produtos sob cada diretoria. |
| `fluxograma_atendimento.svg` / `.mmd` | Seção 10 — Plano Operacional | Fluxo ponta-a-ponta de um projeto: requisitos → protótipo → desenvolvimento → testes → code review → deploy → suporte. |
| `erd_babelstack.svg` / `.mmd` | Seção 16 — Tecnologia e Inovação | Modelo de dados PostgreSQL (6 entidades: aluno, professor, turma, matrícula, nota, presença). Base dos CSVs do LingoBoard/IntegraSchool. |

## Como reexportar

As fontes `.mmd` são **diagramas como código** (open-source, custo-zero). Para gerar/editar:

- **Rápido:** cole o conteúdo do `.mmd` em [mermaid.live](https://mermaid.live) e exporte SVG/PNG.
- **VS Code:** extensão *Markdown Preview Mermaid* ou *Mermaid Editor*.
- **Draw.io/Bizagi:** importam Mermaid; útil se quiser a versão nas ferramentas citadas nas seções 5 e 10.

> Os `.svg` deste diretório foram desenhados à mão a partir das fontes `.mmd`, para ficarem com a identidade visual da marca. Ao alterar a fonte, reexporte o `.svg` correspondente.
