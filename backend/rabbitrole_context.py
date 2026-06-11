from pathlib import Path

_MD_PATH = Path(__file__).resolve().parent / "data" / "rabbitrole.md"

RABBITROLE_CONTEXT: str = _MD_PATH.read_text().strip()
