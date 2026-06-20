#!/usr/bin/env python3
"""Pre-extract PDF text to .txt so the Lambda runtime never parses PDFs.

The resume PDF is static, so we extract its text once here and commit the
resulting .txt file. The context module then reads the plain text at import
time — no pymupdf import or PDF parsing on every cold start.

Re-run this whenever the source PDF changes (pymupdf is only needed here, not at
runtime):

    uv run --with pymupdf python backend/extract_pdfs.py
"""

from pathlib import Path

import pymupdf

DATA_DIR = Path(__file__).resolve().parent / "data"

# (source PDF, extracted text file)
PDFS = [
    ("Gabriel_Cruz_Resume.pdf", "resume.txt"),
]


def extract_text(pdf_path: Path) -> str:
    doc = pymupdf.open(pdf_path)
    text = "".join(page.get_text() for page in doc)
    doc.close()
    return text.strip()


def main() -> None:
    for pdf_name, txt_name in PDFS:
        text = extract_text(DATA_DIR / pdf_name)
        (DATA_DIR / txt_name).write_text(text)
        print(f"Wrote {txt_name} ({len(text)} chars) from {pdf_name}")


if __name__ == "__main__":
    main()
