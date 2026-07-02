#!/usr/bin/env python3
"""
Gera docs/sprints/jira_backlog.pdf a partir de docs/sprints/jira_backlog.csv.

Uso:
    py -3 _build/build_jira_pdf.py

Requer: fpdf2 (pip install fpdf2). Sem dependencias pagas/nao-triviais
(alinhado a regra do projeto de stack open-source / custo-zero).
"""
import csv
import os
from datetime import date

from fpdf import FPDF
from fpdf.enums import XPos, YPos

REPO = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
CSV_PATH = os.path.join(REPO, "docs", "sprints", "jira_backlog.csv")
PDF_PATH = os.path.join(REPO, "docs", "sprints", "jira_backlog.pdf")

COLORS = {
    "indigo": (67, 56, 202),
    "teal": (14, 165, 164),
    "amber": (245, 158, 11),
    "grafite": (30, 41, 59),
    "gelo": (248, 250, 252),
    "cinza": (100, 116, 139),
}

STATUS_LABELS = {
    "status-concluido": ("Concluído", (14, 165, 164)),
    "status-em-andamento": ("Em andamento", (245, 158, 11)),
    "status-a-fazer": ("A fazer", (100, 116, 139)),
}

# Itens sem label de status (Sprints futuras) aparecem como "Planejado".
DEFAULT_STATUS = ("Planejado", (100, 116, 139))

NEXT_LINE = dict(new_x=XPos.LMARGIN, new_y=YPos.NEXT)


def status_from_labels(labels: str):
    for key, val in STATUS_LABELS.items():
        if key in (labels or ""):
            return val
    return DEFAULT_STATUS


def load_rows():
    # utf-8-sig tolera CSV com ou sem BOM (o backlog usa BOM p/ Excel pt-BR)
    with open(CSV_PATH, newline="", encoding="utf-8-sig") as f:
        return list(csv.DictReader(f))


def sanitize(text: str) -> str:
    # fontes core do fpdf2 usam latin-1; troca caracteres fora do conjunto
    return (text or "").encode("latin-1", "replace").decode("latin-1")


class BacklogPDF(FPDF):
    def header(self):
        if self.page_no() == 1:
            return
        self.set_font("Helvetica", "B", 9)
        self.set_text_color(*COLORS["grafite"])
        self.cell(0, 8, sanitize("BabelStack Júnior - Jira Backlog (projeto EST)"), **NEXT_LINE)
        self.set_draw_color(*COLORS["indigo"])
        self.set_line_width(0.4)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(2)

    def footer(self):
        self.set_y(-12)
        self.set_font("Helvetica", "", 8)
        self.set_text_color(*COLORS["cinza"])
        self.cell(0, 8, sanitize(f"Página {self.page_no()}"), align="C")


def cover(pdf: BacklogPDF, rows):
    pdf.add_page()
    pdf.set_fill_color(*COLORS["indigo"])
    pdf.rect(0, 0, 210, 40, style="F")
    pdf.set_xy(10, 12)
    pdf.set_text_color(255, 255, 255)
    pdf.set_font("Helvetica", "B", 20)
    pdf.cell(0, 10, sanitize("BabelStack Júnior"), **NEXT_LINE)
    pdf.set_x(10)
    pdf.set_font("Helvetica", "", 12)
    pdf.cell(0, 8, "Jira Backlog - projeto EST (board 100)", **NEXT_LINE)

    pdf.set_y(50)
    pdf.set_x(10)
    pdf.set_text_color(*COLORS["grafite"])
    pdf.set_font("Helvetica", "", 11)
    pdf.multi_cell(
        0,
        6,
        sanitize(
            "Espelho do backlog do Jira (projetooaplicado6.atlassian.net, projeto EST). "
            "Cobre os épicos, histórias e tarefas planejados para as Sprints 1-5 "
            f"(30/06 a 31/07/2026). Gerado em {date.today().strftime('%d/%m/%Y')} "
            "a partir de docs/sprints/jira_backlog.csv."
        ),
        **NEXT_LINE,
    )
    pdf.ln(4)

    # Resumo por status
    counts = {"Concluído": 0, "Em andamento": 0, "A fazer": 0, "Planejado": 0}
    for r in rows:
        if r["Issue Type"] == "Epic":
            continue
        label, _ = status_from_labels(r.get("Labels", ""))
        counts[label] = counts.get(label, 0) + 1

    pdf.set_x(10)
    pdf.set_font("Helvetica", "B", 12)
    pdf.cell(0, 8, sanitize("Resumo de status (Histórias e Tarefas)"), **NEXT_LINE)
    pdf.set_font("Helvetica", "", 11)
    for label, qty in counts.items():
        if qty == 0:
            continue
        color = DEFAULT_STATUS[1]
        for k, v in STATUS_LABELS.items():
            if v[0] == label:
                color = v[1]
        pdf.set_fill_color(*color)
        pdf.rect(10, pdf.get_y() + 1.5, 3, 3, style="F")
        pdf.set_x(16)
        pdf.cell(0, 6, sanitize(f"{label}: {qty} item(ns)"), **NEXT_LINE)

    pdf.ln(4)
    pdf.set_x(10)
    pdf.set_font("Helvetica", "B", 12)
    pdf.cell(0, 8, sanitize("Épicos"), **NEXT_LINE)
    pdf.set_font("Helvetica", "", 10)
    for r in rows:
        if r["Issue Type"] != "Epic":
            continue
        pdf.set_x(10)
        pdf.set_font("Helvetica", "B", 10)
        pdf.cell(0, 6, sanitize(f"- {r['Summary']}"), **NEXT_LINE)
        pdf.set_font("Helvetica", "", 10)
        pdf.set_x(14)
        pdf.multi_cell(0, 5.5, sanitize(r["Description"]), **NEXT_LINE)


def sprint_sections(pdf: BacklogPDF, rows):
    sprints = ["Sprint 1", "Sprint 2", "Sprint 3", "Sprint 4", "Sprint 5"]
    for sprint in sprints:
        items = [r for r in rows if r.get("Sprint") == sprint]
        if not items:
            continue
        pdf.add_page()
        pdf.set_x(10)
        pdf.set_font("Helvetica", "B", 14)
        pdf.set_text_color(*COLORS["indigo"])
        pdf.cell(0, 10, sprint, **NEXT_LINE)
        pdf.set_text_color(*COLORS["grafite"])

        for r in items:
            label, color = status_from_labels(r.get("Labels", ""))
            pdf.set_x(10)
            pdf.set_font("Helvetica", "B", 11)
            pdf.set_fill_color(*color)
            pdf.set_text_color(255, 255, 255)
            badge = f" {label} "
            badge_w = pdf.get_string_width(badge) + 4
            pdf.cell(badge_w, 6, sanitize(badge), fill=True, align="C")
            pdf.set_text_color(*COLORS["grafite"])
            pdf.cell(4, 6, "")
            title = f"[{r['Issue Type']}] {r['Summary']}"
            pdf.multi_cell(0, 6, sanitize(title), **NEXT_LINE)

            pdf.set_font("Helvetica", "", 9)
            pdf.set_text_color(*COLORS["cinza"])
            meta = (
                f"Épico: {r.get('Epic Link','-') or '-'}  |  "
                f"Prioridade: {r.get('Priority','-') or '-'}  |  "
                f"Pontos: {r.get('Story Points','-') or '-'}  |  "
                f"Responsável: {r.get('Assignee(Responsavel)','-') or '-'}"
            )
            pdf.set_x(10)
            pdf.multi_cell(0, 5, sanitize(meta), **NEXT_LINE)

            pdf.set_font("Helvetica", "", 9.5)
            pdf.set_text_color(*COLORS["grafite"])
            pdf.set_x(10)
            pdf.multi_cell(0, 5, sanitize(r.get("Description", "")), **NEXT_LINE)
            pdf.ln(2)
            pdf.set_draw_color(226, 232, 240)
            pdf.set_x(10)
            pdf.line(10, pdf.get_y(), 200, pdf.get_y())
            pdf.ln(3)


def main():
    rows = load_rows()
    pdf = BacklogPDF(orientation="P", unit="mm", format="A4")
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.set_margins(10, 12, 10)
    cover(pdf, rows)
    sprint_sections(pdf, rows)
    pdf.output(PDF_PATH)
    print(f"PDF gerado: {PDF_PATH} ({pdf.page_no()} páginas)")


if __name__ == "__main__":
    main()
