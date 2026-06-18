#!/usr/bin/env python3
"""Build the Lambda deployment package for the FastAPI backend.

Installs dependencies as Linux (manylinux) wheels so compiled packages like
pydantic-core work on the Lambda runtime even when this script runs on macOS,
then bundles the backend source + data files into terraform/build/lambda.zip.

Usage:
    python terraform/scripts/build_lambda.py
"""

import shutil
import subprocess
import sys
import zipfile
from pathlib import Path

PYTHON_VERSION = "3.12"

REPO_ROOT = Path(__file__).resolve().parents[2]
BACKEND_DIR = REPO_ROOT / "backend"
TERRAFORM_DIR = REPO_ROOT / "terraform"
BUILD_DIR = TERRAFORM_DIR / "build"
PACKAGE_DIR = BUILD_DIR / "package"
ZIP_PATH = BUILD_DIR / "lambda.zip"


def run(cmd: list[str]) -> None:
    print("+", " ".join(cmd))
    subprocess.run(cmd, check=True)


def install_dependencies() -> None:
    run(
        [
            sys.executable,
            "-m",
            "pip",
            "install",
            "-r",
            str(BACKEND_DIR / "requirements.txt"),
            "--target",
            str(PACKAGE_DIR),
            "--platform",
            "manylinux2014_x86_64",
            "--implementation",
            "cp",
            "--python-version",
            PYTHON_VERSION,
            "--only-binary=:all:",
            "--upgrade",
        ]
    )


def copy_source() -> None:
    # Application modules.
    for py_file in BACKEND_DIR.glob("*.py"):
        shutil.copy2(py_file, PACKAGE_DIR / py_file.name)
    # Bundled data (resume PDF + context text files).
    src_data = BACKEND_DIR / "data"
    if src_data.is_dir():
        shutil.copytree(src_data, PACKAGE_DIR / "data", dirs_exist_ok=True)


def make_zip() -> None:
    if ZIP_PATH.exists():
        ZIP_PATH.unlink()
    with zipfile.ZipFile(ZIP_PATH, "w", zipfile.ZIP_DEFLATED) as zf:
        for path in PACKAGE_DIR.rglob("*"):
            if "__pycache__" in path.parts or path.suffix == ".pyc":
                continue
            if path.is_file():
                zf.write(path, path.relative_to(PACKAGE_DIR))
    print(f"Wrote {ZIP_PATH} ({ZIP_PATH.stat().st_size / 1_048_576:.1f} MB)")


def main() -> None:
    if PACKAGE_DIR.exists():
        shutil.rmtree(PACKAGE_DIR)
    PACKAGE_DIR.mkdir(parents=True)
    install_dependencies()
    copy_source()
    make_zip()


if __name__ == "__main__":
    main()
