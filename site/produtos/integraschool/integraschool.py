"""IntegraSchool — automação de rotinas administrativas para professores de idiomas.

MVP P0 (Sprint S3-2) do produto IntegraSchool, do portfólio BabelStack Júnior.

O que faz, a partir de um CSV de alunos (nome, e-mail fictício, turma):
  1. Lê o CSV, validando cada linha (campos ausentes/vazios viram aviso, não crash).
  2. Gera, para cada aluno, um "resumo de aula" e um "lembrete" a partir de
     templates em pt-BR.
  3. Organiza a saída em pastas por data + turma.
  4. Grava um log de execução e imprime um resumo no console.

MODO SIMULAÇÃO: este script NÃO envia e-mail, WhatsApp ou qualquer mensagem real.
Ele apenas gera arquivos .txt locais. É um requisito ético do PRD
(docs/produtos/prd_integraschool.md) e está sinalizado em todo output gerado.

Uso (um comando só, sem argumentos obrigatórios):
    python integraschool.py

Argumentos opcionais:
    --csv    CAMINHO   CSV de entrada (padrão: alunos_exemplo.csv ao lado do script)
    --saida  CAMINHO   pasta base de saída (padrão: ./saida)
    --data   AAAA-MM-DD  data de referência das aulas (padrão: data de hoje)

Filosofia custo-zero: usa apenas a biblioteca padrão do Python (sem pip install).
"""

from __future__ import annotations

import argparse
import csv
import sys
import unicodedata
from dataclasses import dataclass
from datetime import date, datetime
from pathlib import Path

# --------------------------------------------------------------------------- #
# Constantes
# --------------------------------------------------------------------------- #

AVISO_SIMULACAO = (
    "===============================================================\n"
    "=== MODO SIMULAÇÃO — nenhuma mensagem real foi enviada ===\n"
    "=== Este arquivo é apenas uma PRÉVIA gerada localmente pelo ===\n"
    "=== IntegraSchool (BabelStack Júnior). Nada foi enviado por  ===\n"
    "=== e-mail, WhatsApp ou qualquer outro canal.               ===\n"
    "===============================================================\n"
)

COLUNAS_ESPERADAS = ("nome", "email", "turma")

# Conteúdo fictício genérico de aula, por turma. Serve de exemplo para a
# demonstração; num uso real o professor editaria estes textos (P1 do PRD).
CONTEUDO_POR_TURMA = {
    "Inglês A1": (
        "Verbo 'to be' no presente, cumprimentos e apresentação pessoal; "
        "vocabulário de nacionalidades e números de 1 a 20."
    ),
    "Inglês B1": (
        "Present Perfect vs. Simple Past; vocabulário de viagens e experiências; "
        "prática de conversação sobre planos futuros."
    ),
    "Inglês B2": (
        "Orações condicionais (2º e 3º condicional); expressões idiomáticas de "
        "trabalho; leitura e discussão de um artigo curto."
    ),
    "Espanhol A2": (
        "Pretérito indefinido dos verbos regulares; vocabulário de rotina diária "
        "e alimentação; diálogo em um restaurante."
    ),
}

CONTEUDO_PADRAO = (
    "Revisão dos tópicos da unidade atual e prática oral guiada. "
    "(Conteúdo genérico — turma sem plano específico cadastrado.)"
)


# --------------------------------------------------------------------------- #
# Modelo de dados
# --------------------------------------------------------------------------- #

@dataclass(frozen=True)
class Aluno:
    """Um aluno lido do CSV de entrada."""

    nome: str
    email: str
    turma: str


# --------------------------------------------------------------------------- #
# Utilidades
# --------------------------------------------------------------------------- #

def slugify(texto: str) -> str:
    """Converte um texto em um nome de pasta/arquivo seguro.

    'Inglês A1' -> 'Ingles-A1' ; 'Ana Beatriz Silva' -> 'Ana-Beatriz-Silva'.
    """
    # Remove acentos (NFKD + descarta marcas de combinação).
    normalizado = unicodedata.normalize("NFKD", texto)
    sem_acento = "".join(c for c in normalizado if not unicodedata.combining(c))
    # Mantém apenas alfanuméricos; o resto vira separador.
    partes = ["".join(ch for ch in palavra if ch.isalnum()) for palavra in sem_acento.split()]
    slug = "-".join(p for p in partes if p)
    return slug or "sem-nome"


def conteudo_da_turma(turma: str) -> str:
    """Retorna o conteúdo fictício de aula associado à turma (ou um padrão)."""
    return CONTEUDO_POR_TURMA.get(turma, CONTEUDO_PADRAO)


# --------------------------------------------------------------------------- #
# Leitura do CSV
# --------------------------------------------------------------------------- #

def ler_alunos(caminho_csv: Path) -> tuple[list[Aluno], list[str]]:
    """Lê o CSV de alunos.

    Retorna (alunos_validos, avisos). Linhas com campo ausente/vazio geram um
    aviso claro e são puladas — não interrompem o processamento das demais.
    Erros estruturais (arquivo inexistente, cabeçalho faltando) levantam exceção.
    """
    if not caminho_csv.exists():
        raise FileNotFoundError(
            f"Arquivo CSV não encontrado: {caminho_csv}. "
            "Verifique o caminho ou use --csv para apontar outro arquivo."
        )

    alunos: list[Aluno] = []
    avisos: list[str] = []

    with caminho_csv.open("r", encoding="utf-8-sig", newline="") as arq:
        leitor = csv.DictReader(arq)

        cabecalho = leitor.fieldnames or []
        faltando = [c for c in COLUNAS_ESPERADAS if c not in cabecalho]
        if faltando:
            raise ValueError(
                f"CSV com cabeçalho inválido. Faltam as colunas: {', '.join(faltando)}. "
                f"Esperado: {', '.join(COLUNAS_ESPERADAS)}."
            )

        for numero, linha in enumerate(leitor, start=2):  # linha 1 é o cabeçalho
            valores = {c: (linha.get(c) or "").strip() for c in COLUNAS_ESPERADAS}
            vazios = [c for c, v in valores.items() if not v]
            if vazios:
                avisos.append(
                    f"Linha {numero} ignorada: campo(s) ausente(s)/vazio(s): "
                    f"{', '.join(vazios)}. Conteúdo: {dict(linha)}"
                )
                continue
            alunos.append(Aluno(**valores))

    return alunos, avisos


# --------------------------------------------------------------------------- #
# Geração de conteúdo (templates)
# --------------------------------------------------------------------------- #

def gerar_resumo(aluno: Aluno, data_aula: date) -> str:
    """Gera o texto do resumo de aula para um aluno (modo simulação)."""
    data_fmt = data_aula.strftime("%d/%m/%Y")
    return (
        f"{AVISO_SIMULACAO}\n"
        f"Assunto: Resumo da aula de {aluno.turma} — {data_fmt}\n"
        f"Para (simulado): {aluno.nome} <{aluno.email}>\n"
        f"{'-' * 63}\n\n"
        f"Olá, {aluno.nome}!\n\n"
        f"Segue o resumo da nossa aula de {aluno.turma} do dia {data_fmt}:\n\n"
        f"  • Conteúdo abordado: {conteudo_da_turma(aluno.turma)}\n\n"
        f"Continue revisando o material da unidade e traga suas dúvidas na "
        f"próxima aula.\n\n"
        f"Um abraço,\n"
        f"Equipe IntegraSchool (mensagem gerada automaticamente — modo simulação)\n"
    )


def gerar_lembrete(aluno: Aluno, data_aula: date) -> str:
    """Gera o texto do lembrete para um aluno (modo simulação)."""
    data_fmt = data_aula.strftime("%d/%m/%Y")
    return (
        f"{AVISO_SIMULACAO}\n"
        f"Assunto: Lembrete — próxima aula de {aluno.turma}\n"
        f"Para (simulado): {aluno.nome} <{aluno.email}>\n"
        f"{'-' * 63}\n\n"
        f"Olá, {aluno.nome}!\n\n"
        f"Este é um lembrete amigável sobre a sua turma de {aluno.turma}:\n\n"
        f"  • Não se esqueça da atividade pendente da última aula ({data_fmt}).\n"
        f"  • Chegue alguns minutos antes para organizar o material.\n"
        f"  • Em caso de falta, avise com antecedência.\n\n"
        f"Até a próxima aula!\n"
        f"Equipe IntegraSchool (mensagem gerada automaticamente — modo simulação)\n"
    )


# --------------------------------------------------------------------------- #
# Organização de arquivos / escrita
# --------------------------------------------------------------------------- #

def pasta_da_turma(base_saida: Path, turma: str, data_aula: date) -> Path:
    """Cria (se preciso) e retorna a pasta 'saida/AAAA-MM-DD_Turma-Slug'."""
    nome_pasta = f"{data_aula.isoformat()}_{slugify(turma)}"
    pasta = base_saida / nome_pasta
    pasta.mkdir(parents=True, exist_ok=True)
    return pasta


def gerar_arquivo_aluno(aluno: Aluno, data_aula: date, base_saida: Path) -> Path:
    """Gera um único .txt por aluno com resumo + lembrete, na pasta da turma.

    Formato escolhido: um arquivo por aluno (a "prévia de e-mail" da demo),
    contendo o resumo e o lembrete separados por um divisor. Ver README.
    """
    pasta = pasta_da_turma(base_saida, aluno.turma, data_aula)
    caminho = pasta / f"{slugify(aluno.nome)}.txt"

    conteudo = (
        gerar_resumo(aluno, data_aula)
        + "\n"
        + ("=" * 63)
        + "\n\n"
        + gerar_lembrete(aluno, data_aula)
    )
    caminho.write_text(conteudo, encoding="utf-8")
    return caminho


# --------------------------------------------------------------------------- #
# Log
# --------------------------------------------------------------------------- #

class Log:
    """Acumula mensagens, imprime no console e grava em arquivo ao final."""

    def __init__(self) -> None:
        self.linhas: list[str] = []

    def escrever(self, mensagem: str) -> None:
        print(mensagem)
        self.linhas.append(mensagem)

    def salvar(self, caminho: Path) -> None:
        caminho.parent.mkdir(parents=True, exist_ok=True)
        caminho.write_text("\n".join(self.linhas) + "\n", encoding="utf-8")


# --------------------------------------------------------------------------- #
# Orquestração
# --------------------------------------------------------------------------- #

def executar(caminho_csv: Path, base_saida: Path, data_aula: date) -> int:
    """Executa o fluxo completo. Retorna 0 em sucesso, 1 em erro fatal."""
    log = Log()
    momento = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    log.escrever("=" * 63)
    log.escrever("IntegraSchool — geração de resumos e lembretes (MODO SIMULAÇÃO)")
    log.escrever("Nenhuma mensagem real é enviada. Saídas são apenas arquivos locais.")
    log.escrever("=" * 63)
    log.escrever(f"Início: {momento}")
    log.escrever(f"CSV de entrada: {caminho_csv}")
    log.escrever(f"Pasta de saída: {base_saida}")
    log.escrever(f"Data de referência das aulas: {data_aula.isoformat()}")
    log.escrever("-" * 63)

    try:
        alunos, avisos = ler_alunos(caminho_csv)
    except (FileNotFoundError, ValueError) as erro:
        log.escrever(f"[ERRO FATAL] {erro}")
        _salvar_log(log, base_saida)
        return 1

    # Avisos de linhas puladas.
    for aviso in avisos:
        log.escrever(f"[AVISO] {aviso}")

    if not alunos:
        log.escrever("[ERRO] Nenhum aluno válido encontrado no CSV. Nada a gerar.")
        _salvar_log(log, base_saida)
        return 1

    # Geração.
    resumos_gerados = 0
    lembretes_gerados = 0
    turmas: set[str] = set()

    for aluno in alunos:
        try:
            caminho = gerar_arquivo_aluno(aluno, data_aula, base_saida)
        except OSError as erro:
            log.escrever(f"[AVISO] Falha ao gerar arquivo para {aluno.nome}: {erro}")
            continue
        resumos_gerados += 1
        lembretes_gerados += 1
        turmas.add(aluno.turma)
        log.escrever(f"[OK] {aluno.turma} · {aluno.nome} -> {caminho.relative_to(base_saida.parent)}")

    # Resumo final.
    log.escrever("-" * 63)
    log.escrever("RESUMO DA EXECUÇÃO")
    log.escrever(f"  Alunos válidos processados : {len(alunos)}")
    log.escrever(f"  Turmas atendidas           : {len(turmas)} ({', '.join(sorted(turmas))})")
    log.escrever(f"  Resumos gerados            : {resumos_gerados}")
    log.escrever(f"  Lembretes gerados          : {lembretes_gerados}")
    log.escrever(f"  Linhas com aviso/ignoradas : {len(avisos)}")
    log.escrever("  Envios reais               : 0 (MODO SIMULAÇÃO)")
    log.escrever("=" * 63)

    _salvar_log(log, base_saida)
    return 0


def _salvar_log(log: Log, base_saida: Path) -> None:
    """Grava o log com timestamp dentro da pasta de saída."""
    carimbo = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
    caminho_log = base_saida / f"log_execucao_{carimbo}.txt"
    log.salvar(caminho_log)
    print(f"\nLog salvo em: {caminho_log}")


# --------------------------------------------------------------------------- #
# CLI
# --------------------------------------------------------------------------- #

def _parse_data(texto: str) -> date:
    try:
        return datetime.strptime(texto, "%Y-%m-%d").date()
    except ValueError:
        raise argparse.ArgumentTypeError(
            f"Data inválida: '{texto}'. Use o formato AAAA-MM-DD (ex.: 2026-07-14)."
        )


def main(argv: list[str] | None = None) -> int:
    raiz = Path(__file__).resolve().parent

    parser = argparse.ArgumentParser(
        description="IntegraSchool — gera resumos e lembretes em modo simulação.",
    )
    parser.add_argument(
        "--csv",
        type=Path,
        default=raiz / "alunos_exemplo.csv",
        help="Caminho do CSV de entrada (padrão: alunos_exemplo.csv).",
    )
    parser.add_argument(
        "--saida",
        type=Path,
        default=raiz / "saida",
        help="Pasta base de saída (padrão: ./saida).",
    )
    parser.add_argument(
        "--data",
        type=_parse_data,
        default=date.today(),
        help="Data de referência das aulas, AAAA-MM-DD (padrão: hoje).",
    )
    args = parser.parse_args(argv)

    return executar(args.csv, args.saida, args.data)


if __name__ == "__main__":
    sys.exit(main())
