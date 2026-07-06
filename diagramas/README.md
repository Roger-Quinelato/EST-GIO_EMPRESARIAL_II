# Diagramas — BabelStack Júnior

Anexos visuais do documento. Cada diagrama tem a **fonte editável** (`.mmd`, Mermaid), a **versão exportada** (`.svg`, pronta para inserir nas seções e no `.docx`) e, para o organograma e o fluxograma, a **versão nativa Draw.io** (`.drawio`, XML mxGraph aberto pelo diagrams.net/Draw.io desktop), prevista nas Seções 5/10 do documento e no plano de sprints como alternativa open-source ao Bizagi (proprietário, inviável via código). Todos usam a paleta da marca (Índigo `#4338CA`, Teal `#0EA5A4`, Âmbar `#F59E0B`, Grafite `#1E293B`).

| Arquivo | Anexo de | Descreve |
| --- | --- | --- |
| `organograma.svg` / `.mmd` / `.drawio` | Seção 5 — Estrutura Organizacional | Dupla fundadora (CPO/CTO) sob o Conselho de Orientação, com os 5 produtos sob cada diretoria. |
| `fluxograma_atendimento.svg` / `.mmd` / `.drawio` | Seção 10 — Plano Operacional | Fluxo ponta-a-ponta de um projeto: requisitos → protótipo → desenvolvimento → testes → code review → deploy → suporte. |
| `erd_babelstack.svg` / `.mmd` | Seção 16 — Tecnologia e Inovação | Modelo de dados PostgreSQL (6 entidades: aluno, professor, turma, matrícula, nota, presença). Base dos CSVs do LingoBoard/IntegraSchool. |
| `gantt_cronograma.svg` / `.mmd` | Seção 18 — Cronograma de Criação | Gantt com datas reais (16/06–31/07/2026), pacotes de trabalho por sprint e marcos das apresentações (24/07 e 31/07). |

## Como reexportar

As fontes `.mmd` são **diagramas como código** (open-source, custo-zero). Para gerar/editar:

- **Rápido:** cole o conteúdo do `.mmd` em [mermaid.live](https://mermaid.live) e exporte SVG/PNG.
- **VS Code:** extensão *Markdown Preview Mermaid* ou *Mermaid Editor*.
- **Draw.io/Bizagi:** importam Mermaid; útil se quiser a versão nas ferramentas citadas nas seções 5 e 10.

> Os `.svg` deste diretório foram desenhados à mão a partir das fontes `.mmd`, para ficarem com a identidade visual da marca. Ao alterar a fonte, reexporte o `.svg` correspondente.

## Versões nativas Draw.io (`.drawio`)

`organograma.drawio` e `fluxograma_atendimento.drawio` são o formato **nativo do diagrams.net/Draw.io** (XML `<mxfile>`/`<mxGraphModel>` não comprimido, editável diretamente — sem depender de importação de Mermaid). Reproduzem fielmente os nós, textos, decisões e conexões das fontes `.mmd` correspondentes, já com a paleta da marca aplicada nos preenchimentos/bordas:

- **Fluxograma** (`fluxograma_atendimento.drawio`): elipses (Teal) para início/fim, retângulos (Índigo) para processos, losangos (Âmbar) para decisões — incluindo os dois laços de reprovação ("Não" → volta ao passo anterior).
- **Organograma** (`organograma.drawio`): caixa raiz (Índigo) da BabelStack Júnior, caixa do Conselho de Orientação (Grafite, ligação simples sem seta), caixas das duas diretorias CPO/CTO (Teal, ligação hierárquica sólida) e os 5 produtos (Âmbar, ligação tracejada de supervisão).

Para editar: abra o arquivo em [app.diagrams.net](https://app.diagrams.net) (File → Open From → Device) ou no Draw.io Desktop. Ao alterar, mantenha a fonte `.mmd` sincronizada manualmente e reexporte o `.svg`.
