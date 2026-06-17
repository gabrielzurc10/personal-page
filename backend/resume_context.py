from pathlib import Path
import pymupdf

_PDF_PATH = Path(__file__).resolve().parent / "data" / "Gabriel_Cruz_Resume.pdf"


def _extract_text() -> str:
    doc = pymupdf.open(_PDF_PATH)
    text = ""
    for page in doc:
        text += page.get_text()
    doc.close()
    return text.strip()


RESUME_CONTEXT: str = _extract_text()
