"""LingoBoard — dashboard educacional (Streamlit).

Consolida notas e faltas de alunos de uma escola de idiomas para apoiar
gestores(as) sem conhecimento técnico a identificar turmas/alunos em risco
de evasão. Basta subir um CSV no formato de `dados_exemplo.csv`
(colunas: aluno, turma, nota1, nota2, nota3, faltas, status) — se nada for
enviado, o próprio `dados_exemplo.csv` é carregado como demonstração.

Rodar localmente:
    streamlit run app.py
"""

from pathlib import Path

import pandas as pd
import streamlit as st

# ---------------------------------------------------------------------------
# Configuração geral
# ---------------------------------------------------------------------------

st.set_page_config(
    page_title="LingoBoard — Painel de Risco de Evasão",
    page_icon="📊",
    layout="wide",
)

# Colunas obrigatórias no CSV (contrato de dados do produto).
COLUNAS_OBRIGATORIAS = ["aluno", "turma", "nota1", "nota2", "nota3", "faltas", "status"]
COLUNAS_NOTAS = ["nota1", "nota2", "nota3"]

# Limiares de risco padrão (P1: ajustáveis pela UI via sliders na sidebar —
# ver seção "Limiar de risco" abaixo). Estes valores continuam servindo como
# default inicial dos sliders e como referência do PRD. Um aluno é
# sinalizado como "em risco" se a média das notas cair abaixo do limiar OU
# se o número de faltas ultrapassar o limite considerado seguro de
# frequência.
LIMIAR_MEDIA_RISCO = 6.0
LIMIAR_FALTAS_RISCO = 8

PALETA = {
    "primaria": "#4338CA",   # índigo BabelBlue
    "secundaria": "#0EA5A4",  # teal LingoTeal
    "acao": "#F59E0B",       # âmbar Energia
}

# Sequência de cores da marca usada para ciclar entre séries (ex.: uma linha
# por turma no gráfico de evolução). Repete do início se houver mais séries
# do que cores.
CORES_SERIE = [PALETA["primaria"], PALETA["secundaria"], PALETA["acao"]]

DIR_APP = Path(__file__).resolve().parent
CSV_EXEMPLO = DIR_APP / "dados_exemplo.csv"


# ---------------------------------------------------------------------------
# Carregamento e validação dos dados
# ---------------------------------------------------------------------------

def carregar_dados(arquivo) -> pd.DataFrame:
    """Lê e valida o CSV enviado (ou o arquivo de exemplo).

    Levanta ValueError com uma mensagem amigável quando o CSV não segue o
    formato esperado, para que a UI mostre um erro claro em vez de travar.
    """
    try:
        df = pd.read_csv(arquivo)
    except Exception as exc:  # noqa: BLE001 - queremos capturar qualquer falha de parsing
        raise ValueError(
            "Não foi possível ler o arquivo como CSV. Verifique se o separador é "
            f"vírgula e se o arquivo não está corrompido. Detalhe técnico: {exc}"
        ) from exc

    if df.empty:
        raise ValueError("O arquivo CSV está vazio (sem linhas de dados).")

    colunas_faltando = [c for c in COLUNAS_OBRIGATORIAS if c not in df.columns]
    if colunas_faltando:
        raise ValueError(
            "O CSV não tem as colunas esperadas. Faltando: "
            f"{', '.join(colunas_faltando)}. "
            f"Colunas obrigatórias: {', '.join(COLUNAS_OBRIGATORIAS)}."
        )

    # Normaliza tipos: notas e faltas precisam ser numéricas.
    for col in COLUNAS_NOTAS + ["faltas"]:
        df[col] = pd.to_numeric(df[col], errors="coerce")

    linhas_invalidas = df[COLUNAS_NOTAS + ["faltas"]].isna().any(axis=1).sum()
    if linhas_invalidas:
        st.warning(
            f"{linhas_invalidas} linha(s) com valores não numéricos em notas/faltas "
            "foram ignoradas."
        )
        df = df.dropna(subset=COLUNAS_NOTAS + ["faltas"])

    if df.empty:
        raise ValueError(
            "Depois de remover linhas inválidas, não sobrou nenhum dado utilizável."
        )

    df["aluno"] = df["aluno"].astype(str).str.strip()
    df["turma"] = df["turma"].astype(str).str.strip()
    df["status"] = df["status"].astype(str).str.strip().str.lower()

    return df


def calcular_indicadores(
    df: pd.DataFrame, limiar_media: float, limiar_faltas: int
) -> pd.DataFrame:
    """Adiciona média de notas e sinalização de risco por aluno.

    `limiar_media`/`limiar_faltas` vêm dos controles da sidebar (P1: ajustáveis
    pela UI); os defaults ficam em LIMIAR_MEDIA_RISCO/LIMIAR_FALTAS_RISCO.
    """
    df = df.copy()
    df["media_notas"] = df[COLUNAS_NOTAS].mean(axis=1).round(2)
    df["em_risco"] = (df["media_notas"] < limiar_media) | (df["faltas"] > limiar_faltas)

    def nivel_risco(row):
        if row["media_notas"] < limiar_media and row["faltas"] > limiar_faltas:
            return "🔴 Crítico"
        if row["em_risco"]:
            return "🟠 Atenção"
        return "🟢 Regular"

    df["nivel_risco"] = df.apply(nivel_risco, axis=1)

    # Score simples só para ordenar o ranking de risco (quanto maior, pior).
    df["score_risco"] = (limiar_media - df["media_notas"]).clip(lower=0) * 2 + (
        df["faltas"] - limiar_faltas
    ).clip(lower=0)

    return df


# ---------------------------------------------------------------------------
# UI — cabeçalho e upload
# ---------------------------------------------------------------------------

st.title("📊 LingoBoard")
st.caption(
    "Painel de acompanhamento de notas e frequência para identificar turmas e "
    "alunos em risco de evasão. Suba o CSV de notas/faltas da sua escola ou "
    "explore com os dados de exemplo já carregados."
)

with st.sidebar:
    st.header("Dados")
    arquivo_enviado = st.file_uploader(
        "Suba o CSV de alunos (formato de dados_exemplo.csv)", type=["csv"]
    )
    st.caption(
        "Colunas esperadas: aluno, turma, nota1, nota2, nota3, faltas, status."
    )

fonte_dados = arquivo_enviado if arquivo_enviado is not None else CSV_EXEMPLO
usando_exemplo = arquivo_enviado is None

if usando_exemplo:
    st.info(
        "Nenhum arquivo enviado — exibindo os dados de exemplo "
        "(`dados_exemplo.csv`). Envie seu próprio CSV na barra lateral para "
        "substituir.",
        icon="ℹ️",
    )

try:
    dados_brutos = carregar_dados(fonte_dados)
except ValueError as erro:
    st.error(f"Erro ao processar o CSV: {erro}")
    st.stop()
except Exception as erro:  # noqa: BLE001 - último recorte de segurança para não travar a UI
    st.error(f"Ocorreu um erro inesperado ao ler o arquivo: {erro}")
    st.stop()

with st.sidebar:
    st.header("Limiar de risco")
    limiar_media = st.slider(
        "Média mínima considerada segura",
        min_value=0.0,
        max_value=10.0,
        value=LIMIAR_MEDIA_RISCO,
        step=0.5,
        help="Alunos com média abaixo deste valor são sinalizados como em risco.",
    )
    limiar_faltas = st.slider(
        "Faltas máximas consideradas seguras",
        min_value=0,
        max_value=30,
        value=LIMIAR_FALTAS_RISCO,
        step=1,
        help="Alunos com mais faltas que este valor são sinalizados como em risco.",
    )

dados = calcular_indicadores(dados_brutos, limiar_media, limiar_faltas)

# ---------------------------------------------------------------------------
# Filtros (turma e avaliação/período)
# ---------------------------------------------------------------------------

with st.sidebar:
    st.header("Filtros")
    turmas_disponiveis = ["Todas as turmas"] + sorted(dados["turma"].unique().tolist())
    turma_selecionada = st.selectbox("Turma", turmas_disponiveis)

    opcoes_avaliacao = {
        "Média geral (nota1–nota3)": "media_notas",
        "1ª avaliação (nota1)": "nota1",
        "2ª avaliação (nota2)": "nota2",
        "3ª avaliação (nota3)": "nota3",
    }
    avaliacao_selecionada = st.selectbox(
        "Período / avaliação", list(opcoes_avaliacao.keys())
    )
    coluna_avaliacao = opcoes_avaliacao[avaliacao_selecionada]

dados_filtrados = dados.copy()
if turma_selecionada != "Todas as turmas":
    dados_filtrados = dados_filtrados[dados_filtrados["turma"] == turma_selecionada]

if dados_filtrados.empty:
    st.warning("Nenhum aluno encontrado para os filtros selecionados.")
    st.stop()

# ---------------------------------------------------------------------------
# KPIs
# ---------------------------------------------------------------------------

total_alunos = len(dados_filtrados)
total_risco = int(dados_filtrados["em_risco"].sum())
pct_risco = (total_risco / total_alunos * 100) if total_alunos else 0
media_geral = dados_filtrados["media_notas"].mean()
media_faltas = dados_filtrados["faltas"].mean()

col1, col2, col3, col4 = st.columns(4)
col1.metric("Alunos (filtro atual)", total_alunos)
col2.metric("Alunos em risco", total_risco, f"{pct_risco:.0f}% do total")
col3.metric("Média geral de notas", f"{media_geral:.1f}")
col4.metric("Faltas médias por aluno", f"{media_faltas:.1f}")

st.divider()

# ---------------------------------------------------------------------------
# Gráfico 1 — Média por turma (na avaliação/período selecionado)
# ---------------------------------------------------------------------------

st.subheader("1. Média por turma")
media_por_turma = (
    dados_filtrados.groupby("turma")[coluna_avaliacao].mean().round(2).sort_values(ascending=False)
)
st.bar_chart(media_por_turma, color=PALETA["secundaria"])

# ---------------------------------------------------------------------------
# Gráfico 2 — Evolução temporal (nota1 -> nota2 -> nota3) por turma
# ---------------------------------------------------------------------------

st.subheader("2. Evolução das médias ao longo das avaliações")
evolucao = dados_filtrados.groupby("turma")[COLUNAS_NOTAS].mean().round(2).T
evolucao.index = ["1ª avaliação", "2ª avaliação", "3ª avaliação"]
# Cicla pela paleta da marca caso haja mais turmas do que cores definidas.
cores_evolucao = [CORES_SERIE[i % len(CORES_SERIE)] for i in range(len(evolucao.columns))]
st.line_chart(evolucao, color=cores_evolucao)

# ---------------------------------------------------------------------------
# Gráfico 3 — Ranking de risco
# ---------------------------------------------------------------------------

st.subheader("3. Ranking de risco (top 10 alunos)")
ranking_risco = dados_filtrados.sort_values("score_risco", ascending=False).head(10)
st.bar_chart(ranking_risco.set_index("aluno")["score_risco"], color=PALETA["acao"])

# ---------------------------------------------------------------------------
# Gráfico 4 — Distribuição de faltas
# ---------------------------------------------------------------------------

st.subheader("4. Distribuição de faltas")
faixas_faltas = pd.cut(
    dados_filtrados["faltas"],
    bins=[-1, 2, 5, 8, 12, dados_filtrados["faltas"].max() + 1],
    labels=["0–2", "3–5", "6–8", "9–12", "13+"],
)
distribuicao_faltas = faixas_faltas.value_counts().sort_index()
st.bar_chart(distribuicao_faltas, color=PALETA["primaria"])

st.divider()

# ---------------------------------------------------------------------------
# Indicador de risco por aluno + tabela destacada
# ---------------------------------------------------------------------------

st.subheader("Alunos em risco de evasão")
st.caption(
    f"Regra aplicada: média de notas abaixo de {limiar_media:.1f} "
    f"e/ou mais de {limiar_faltas} faltas. Ajuste os limiares na barra lateral."
)

tabela_risco = (
    dados_filtrados[dados_filtrados["em_risco"]]
    .sort_values("score_risco", ascending=False)[
        ["aluno", "turma", "media_notas", "faltas", "status", "nivel_risco"]
    ]
    .rename(
        columns={
            "aluno": "Aluno",
            "turma": "Turma",
            "media_notas": "Média",
            "faltas": "Faltas",
            "status": "Status",
            "nivel_risco": "Nível de risco",
        }
    )
)

if tabela_risco.empty:
    st.success("Nenhum aluno em risco para os filtros selecionados. 🎉")
else:
    st.dataframe(tabela_risco, use_container_width=True, hide_index=True)

with st.expander("Ver todos os alunos (dados completos, incluindo os que não estão em risco)"):
    st.dataframe(
        dados_filtrados
        .sort_values("score_risco", ascending=False)[
            ["aluno", "turma", "nota1", "nota2", "nota3", "media_notas", "faltas", "status", "nivel_risco"]
        ]
        .rename(columns={"aluno": "Aluno", "turma": "Turma", "media_notas": "Média", "faltas": "Faltas", "status": "Status", "nivel_risco": "Nível de risco"}),
        use_container_width=True,
        hide_index=True,
    )

st.caption(
    "LingoBoard — BabelStack Júnior. Dados de demonstração; nenhum dado real de "
    "aluno é utilizado nesta versão."
)
