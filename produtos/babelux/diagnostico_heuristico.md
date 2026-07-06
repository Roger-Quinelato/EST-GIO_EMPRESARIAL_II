# BabelUX — Diagnóstico Heurístico do "Portal Acadêmico"

**Produto:** BabelUX (consultoria de redesign UX/UI) · **Entregável S3-3** (Sprint 3, P0)
**Interface-alvo:** Portal Acadêmico — sistema web fictício representativo de portais escolares legados (ver [`briefing.md`](briefing.md))
**Telas avaliadas:** (1) Acesso/Login · (2) Boletim / Painel de Notas
**Método:** avaliação heurística individual à luz das **10 heurísticas de usabilidade de Nielsen**, com pontuação pela **escala de severidade de Nielsen (0–4)**.
**Autoria:** Raquel Pereira (CPO/UX) · revisão da dupla.

> Os problemas abaixo são **modelados** a partir de padrões recorrentes em portais escolares defasados; o alvo é fictício para não expor sistemas reais. O redesign correspondente está em [`antes_depois.html`](antes_depois.html) (item S3-4).

## Escala de severidade (Nielsen)

| Grau | Significado | Ação |
| --- | --- | --- |
| 0 | Não é problema de usabilidade | — |
| 1 | Cosmético | Corrigir se sobrar tempo |
| 2 | Menor | Baixa prioridade |
| 3 | Maior | **Alta prioridade** — corrigir |
| 4 | Catastrófico | **Corrigir antes de lançar** |

Severidade combina **frequência**, **impacto** e **persistência** do problema.

## As 10 heurísticas de Nielsen (referência)

H1 Visibilidade do status do sistema · H2 Correspondência com o mundo real · H3 Controle e liberdade do usuário · H4 Consistência e padrões · H5 Prevenção de erros · H6 Reconhecimento em vez de memorização · H7 Flexibilidade e eficiência · H8 Estética e design minimalista · H9 Ajuda para reconhecer e recuperar-se de erros · H10 Ajuda e documentação.

---

## Problemas identificados

### P1 — Mensagem de erro de login genérica e culpabilizadora
- **Tela:** Acesso/Login
- **Heurística violada:** **H9** (recuperação de erros) e **H5** (prevenção de erros)
- **Severidade:** **4 — Catastrófico**
- **Descrição:** ao errar a senha, o portal exibe apenas *"ERRO 403 — Acesso negado"*, sem dizer o que fazer, sem link de "esqueci a senha" e sem indicar se o usuário ou a senha estão errados. O responsável fica travado logo na porta de entrada.
- **Recomendação:** mensagem em linguagem humana ("Usuário ou senha incorretos"), com link visível de recuperação de senha e validação inline dos campos antes do envio.

### P2 — Baixo contraste e fonte diminuta na tabela de notas
- **Tela:** Boletim
- **Heurística violada:** **H8** (estética/minimalismo) e acessibilidade (contraste WCAG AA)
- **Severidade:** **4 — Catastrófico**
- **Descrição:** notas em cinza-claro (#AAA) sobre branco, fonte ~11px, numa tabela densa com 12 colunas. No celular exige zoom e rolagem horizontal. Falha o critério de contraste WCAG AA (mínimo 4.5:1).
- **Recomendação:** tipografia ≥14px, contraste AA (texto grafite sobre branco-gelo), tabela responsiva que vira cartões no mobile, destaque visual para nota abaixo da média.

### P3 — Ausência de feedback de carregamento
- **Tela:** Login e Boletim
- **Heurística violada:** **H1** (visibilidade do status do sistema)
- **Severidade:** **3 — Maior**
- **Descrição:** ao entrar, a tela congela por alguns segundos sem qualquer indicador; o usuário não sabe se o clique funcionou e muitas vezes clica de novo, disparando ações duplicadas.
- **Recomendação:** estado de carregamento explícito (spinner/botão "Entrando…" desabilitado) e skeleton na tabela enquanto as notas carregam.

### P4 — Jargão técnico e siglas sem explicação
- **Tela:** Boletim
- **Heurística violada:** **H2** (correspondência com o mundo real) e **H6** (reconhecimento vs. memorização)
- **Severidade:** **3 — Maior**
- **Descrição:** colunas rotuladas como *"AV1", "AV2", "REC", "MF", "CH", "FJ"* sem legenda. O aluno precisa memorizar ou adivinhar o significado (MF = média final? FJ = falta justificada?).
- **Recomendação:** rótulos por extenso ("Avaliação 1", "Média Final", "Faltas"), com sigla opcional entre parênteses e tooltip de ajuda.

### P5 — Navegação inconsistente e sem indicação de onde se está
- **Tela:** ambas
- **Heurística violada:** **H4** (consistência e padrões) e **H1** (status: localização)
- **Severidade:** **3 — Maior**
- **Descrição:** o menu muda de posição entre telas (topo no login, lateral no boletim), usa cores e nomes diferentes para a mesma ação ("Sair" x "Logoff") e não destaca a página atual. O usuário perde a noção de onde está.
- **Recomendação:** navegação única e persistente, item ativo destacado, vocabulário consistente, logo sempre voltando à home.

### P6 — Nenhum caminho de volta / confirmação em ações
- **Tela:** Boletim
- **Heurística violada:** **H3** (controle e liberdade do usuário)
- **Severidade:** **2 — Menor**
- **Descrição:** ao abrir o detalhe de uma disciplina, não há botão "voltar" na interface (só o do navegador); o "Sair" fica colado ao "Imprimir", convidando ao clique acidental sem confirmação.
- **Recomendação:** botão de voltar explícito, "saídas de emergência" claras e confirmação em ações destrutivas/irreversíveis.

### P7 — Excesso de informação competindo por atenção (poluição visual)
- **Tela:** Boletim
- **Heurística violada:** **H8** (estética e design minimalista)
- **Severidade:** **2 — Menor**
- **Descrição:** banners, avisos piscando, três tons de vermelho e blocos com bordas 3D disputam o foco. A informação mais buscada (nota e faltas) não tem destaque; tudo tem o mesmo peso visual.
- **Recomendação:** hierarquia visual clara (a nota como elemento principal), paleta contida (tokens BabelStack), remoção de ornamentos e uso de espaço em branco.

---

## Resumo por severidade

| # | Problema | Tela | Heurística | Severidade |
| --- | --- | --- | --- | --- |
| P1 | Erro de login genérico | Login | H9, H5 | 4 — Catastrófico |
| P2 | Baixo contraste / fonte diminuta | Boletim | H8 + WCAG | 4 — Catastrófico |
| P3 | Sem feedback de carregamento | Ambas | H1 | 3 — Maior |
| P4 | Jargão e siglas sem legenda | Boletim | H2, H6 | 3 — Maior |
| P5 | Navegação inconsistente | Ambas | H4, H1 | 3 — Maior |
| P6 | Sem caminho de volta/confirmação | Boletim | H3 | 2 — Menor |
| P7 | Poluição visual | Boletim | H8 | 2 — Menor |

**7 problemas** — 2 catastróficos, 3 maiores, 2 menores. (Aceite S3-3: ≥5 problemas com severidade e princípio violado. ✔)

## Recomendações priorizadas (P1 do PRD — quick wins vs. estruturais)

**Quick wins (baixo esforço, alto impacto):**
- Reescrever mensagens de erro em linguagem humana + link "esqueci a senha" (P1).
- Aumentar fonte e contraste da tabela para WCAG AA (P2).
- Rótulos por extenso no boletim (P4).

**Estruturais (exigem reorganização de layout/fluxo):**
- Navegação única e persistente com estado ativo (P5).
- Tabela → cartões responsivos no mobile + hierarquia visual (P2, P7).
- Estados de carregamento em todo o app (P3).

## Próximo passo

Redesenhar as 2 telas-chave aplicando estas recomendações e os tokens BabelStack → **S3-4** ([`antes_depois.html`](antes_depois.html)), gerando o comparativo Antes/Depois para o portfólio (Seção 8).
