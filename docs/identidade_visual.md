# Identidade Visual — BabelStack Júnior

> _"Codificando fluência, estruturando conexões globais."_
>
> Mini guia de marca (Fase 1 do roteiro). Base: esboço da Raquel + DNA "tecnológico e jovem",
> EdTech para idiomas com foco em escolas públicas do DF.

O conceito da marca une duas ideias: **linguagem/comunicação** (idiomas, balão de fala) e
**camadas de software / stack** (blocos empilhados, `{ }` de código). A identidade abaixo
traduz isso em cor, tipografia e estilo — tudo gratuito e pronto para o site, os 5 produtos e os slides.

---

## 1. Paleta de cores (5 cores)

| Papel | Nome | HEX | Justificativa |
|---|---|---|---|
| **Primária** | Índigo BabelBlue | `#4338CA` | Azul-índigo transmite **tecnologia e confiança**; é moderno, sério sem ser corporativo demais, e remete ao lado "stack/software" da marca. É a cor dominante (estrutura, cabeçalho, links). |
| **Secundária** | Teal LingoTeal | `#0EA5A4` | Verde-água equilibra o azul sério com **frescor e crescimento (educação)**; representa o lado humano e dos idiomas. Usar em apoios, ícones, destaques de seção e gradientes com o índigo. |
| **Destaque / Ação** | Âmbar Energia | `#F59E0B` | Cor quente e jovem para **CTAs e chamadas de ação** ("Conheça nossas soluções"). Contrasta com o índigo/teal (quente × frio), gerando energia e foco. Usar com parcimônia (só botões e destaques pontuais). |
| **Neutra escura** | Grafite InkSlate | `#1E293B` | Cinza-azulado escuro no lugar do preto puro: mais suave e moderno para **textos, rodapé e fundos escuros**. Combina com o índigo sem brigar. |
| **Neutra clara** | Branco-gelo Cloud | `#F8FAFC` | Quase branco para **fundos e respiro**. Reduz fadiga visual, dá leveza e melhora o contraste/legibilidade (acessibilidade WCAG, um valor da marca). |

**Regra de aplicação (60/30/10):** ~60% neutros (branco-gelo + grafite), ~30% índigo (primária),
~10% teal/âmbar (apoio + ação).

**Acessibilidade:** texto sempre em Grafite sobre Branco-gelo (ou Branco sobre Índigo) para garantir
contraste AA. O Teal e o Âmbar funcionam bem em áreas grandes e botões — evitar texto pequeno em teal sobre branco.

---

## 2. Tipografia (Google Fonts — gratuitas)

| Uso | Fonte | Onde usar |
|---|---|---|
| **Títulos / Display** | **Space Grotesk** | Logo (wordmark), H1–H3, slogan do hero, títulos de seção, números de KPI do LingoBoard. Geométrica, techy e jovem — dá personalidade à marca. |
| **Texto corrido / UI** | **Inter** | Parágrafos, listas, botões, formulários, tabelas, legendas e rótulos de interface. Neutra, otimizada para tela e altamente legível. |

```html
<!-- Importação (colar no <head> do site e dos produtos) -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap" rel="stylesheet">
```

_Alternativa mais "suave" (se a banca preferir): **Poppins** nos títulos + **Inter** no corpo._

---

## 3. Estilo geral (diretrizes)

1. **Formas:** cantos arredondados (raio 8–16 px), cards com sombra leve e bastante espaço em branco.
   Metáfora visual de **camadas/stack** (blocos empilhados) e **balão de fala + `{ }`** nos elementos gráficos.
2. **Ícones:** estilo *line/outline*, traço consistente (~2 px), minimalista e flat — coerente com o logo.
   Bibliotecas gratuitas sugeridas: **Lucide**, **Phosphor** ou **Tabler**.
3. **Tom visual:** moderno, limpo, jovem e acessível. Gradientes sutis **índigo → teal** em destaques (hero, botões secundários); nunca poluído.
4. **Consistência:** as mesmas cores e fontes valem para site, os 5 produtos, slides e redes sociais — a marca tem que parecer "a mesma" em todos os pontos de contato.

---

## 4. Tokens prontos para código

Os valores acima estão centralizados em [`assets/identidade/tokens.css`](../assets/identidade/tokens.css)
como variáveis CSS (`--cor-primaria`, `--fonte-titulo`, etc.), para o site e os produtos reutilizarem sem repetir HEX.

---

## 5. Arquivo no Figma

Guia visual interativo (paleta como estilos de cor, estilos de texto e quadro da marca) — base para o logo e os mockups do BabelUX:

**https://www.figma.com/design/BwHP5UWR51JXmtGOW9cfS1/**

Já contém: 5 estilos de cor (`Marca/1…5`), 3 estilos de texto (Título/Subtítulo/Corpo) e um board com paleta, tipografia e prévia da marca aplicada.
