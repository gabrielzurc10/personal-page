from pathlib import Path

# Pre-extracted from "Professional Summary.pdf" by extract_pdfs.py. Reading plain
# text avoids importing pymupdf and parsing the PDF on every Lambda cold start.
_TXT_PATH = Path(__file__).resolve().parent / "data" / "summary.txt"

SUMMARY_CONTEXT: str = _TXT_PATH.read_text().strip()
