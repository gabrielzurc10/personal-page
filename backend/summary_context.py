from pathlib import Path
import pymupdf

_PDF_PATH = Path(__file__).resolve().parent / "data" / "Professional Summary.pdf"


def _extract_text() -> str:
    doc = pymupdf.open(_PDF_PATH)
    text = ""
    for page in doc:
        text += page.get_text()
    doc.close()
    return text.strip()


SUMMARY_CONTEXT: str = _extract_text()
