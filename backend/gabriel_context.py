from pathlib import Path

_TXT_PATH = Path(__file__).resolve().parent / "data" / "gabriel.txt"

GABRIEL_CONTEXT: str = _TXT_PATH.read_text().strip()
