from pathlib import Path

_TXT_PATH = Path(__file__).resolve().parent / "data" / "winston.txt"

WINSTON_CONTEXT: str = _TXT_PATH.read_text().strip()
