# Mockups — BabelStack Júnior

Imagens dos produtos para o **Portfólio de Produtos e Serviços** (Seção 8) do documento. Geradas a partir dos produtos reais em `produtos/`.

| Arquivo | Produto | Referência |
| --- | --- | --- |
| `babelux_antes_depois.png` | BabelUX — comparativo Antes/Depois do Portal Acadêmico (2 telas) | Seção 8 · item S3-4 |
| `edulanding_feira_cultural.png` | EduLanding — landing "Feira Cultural de Idiomas" | Seção 8 · item S3-1 |
| `lingoboard_dashboard.png` | LingoBoard — dashboard com os 4 gráficos (média por turma, evolução por avaliação, ranking de risco, distribuição de faltas) + tabela de alunos em risco | Seção 8 · item S4-1 |
| `vocabdeck_estudo.png` | VocabDeck — tela de estudo do baralho (card revelado, motor Leitner de 5 caixas) | Seção 8 · item S4-1 |
| `integraschool_simulacao.png` | IntegraSchool — prévia formatada de um resumo + lembrete gerados em modo simulação (conteúdo real de `saida/AAAA-MM-DD_Turma/`) | Seção 8 · item S4-1 |
| `site_home.png` | Site institucional — home publicada no GitHub Pages | Seção 8 · item S4-1 · Seção 9 |

> Reexportar: renderizar o `.html`/app correspondente em `produtos/` e capturar a página inteira (usado `deviceScaleFactor: 2` para nitidez). LingoBoard: `streamlit run app.py` e capturar via navegador. IntegraSchool: rodar `python integraschool.py` e formatar o `.txt` gerado em `saida/` numa página de prévia antes de capturar (a saída do produto é textual, não uma GUI).
