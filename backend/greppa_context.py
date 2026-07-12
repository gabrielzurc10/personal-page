from pathlib import Path

_MD_PATH = Path(__file__).resolve().parent / "data" / "greppa.md"

GREPPA_CONTEXT: str = _MD_PATH.read_text().strip()
