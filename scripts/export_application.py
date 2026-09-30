#!/usr/bin/env python3
"""Export one standalone application without copying local-only artifacts."""

from __future__ import annotations

import argparse
import os
import re
import shutil
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
APPLICATIONS = ("frontend", "backend")
LOCAL_ARTIFACT_NAME = re.compile(
    r"^(?:\.git|\.cache|\.coverage|\.hypothesis|\.idea|\.mypy_cache|\.nox|"
    r"\.pytest_cache|\.ruff_cache|\.tox|\.venv|\.vscode|\.envrc|\.DS_Store|"
    r"Thumbs\.db|__pycache__|build|coverage|dist|htmlcov|logs|node_modules|"
    r"playwright-report|test-results|"
    r".*(?:\.egg-info|\.log|\.pyc|\.pyd|\.pyo|\.swp|\.tmp|\.tsbuildinfo|~))$"
)


def is_environment_example(name: str) -> bool:
    folded = name.casefold()
    return folded == ".env.example" or (folded.startswith(".env.") and folded.endswith(".example"))


def is_local_artifact_name(name: str) -> bool:
    folded = name.casefold()
    private_env = folded == ".env" or (
        folded.startswith(".env.") and not is_environment_example(name)
    )
    return bool(LOCAL_ARTIFACT_NAME.fullmatch(name) or name.startswith(".coverage.") or private_env)


def should_exclude(relative_path: Path) -> bool:
    return any(is_local_artifact_name(part) for part in relative_path.parts)


def is_link_like(path: Path) -> bool:
    """Reject links and Windows junctions before traversing or copying them."""
    return path.is_symlink() or path.is_junction()


def raise_walk_error(error: OSError) -> None:
    """Make discovery fail closed instead of silently omitting unreadable paths."""
    raise error


def application_files(source: Path) -> tuple[Path, ...]:
    selected: list[Path] = []
    for current_directory, directory_names, file_names in os.walk(
        source,
        topdown=True,
        onerror=raise_walk_error,
        followlinks=False,
    ):
        current = Path(current_directory)
        relative_directory = current.relative_to(source)
        kept_directories: list[str] = []
        for name in sorted(directory_names):
            path = current / name
            relative = relative_directory / name
            if should_exclude(relative):
                continue
            if is_link_like(path):
                raise ValueError(
                    f"Application exports do not permit links or junctions: {relative}"
                )
            kept_directories.append(name)
        directory_names[:] = kept_directories

        for name in sorted(file_names):
            path = current / name
            relative = relative_directory / name
            if should_exclude(relative):
                continue
            if is_link_like(path):
                raise ValueError(
                    f"Application exports do not permit links or junctions: {relative}"
                )
            selected.append(relative)
    return tuple(sorted(selected, key=Path.as_posix))


def copy_selected_files(source: Path, destination: Path, entries: tuple[Path, ...]) -> None:
    selected: list[Path] = []
    for relative in entries:
        if relative.is_absolute() or relative == Path(".") or ".." in relative.parts:
            raise ValueError(f"Unsafe source path: {relative}")
        selected.append(relative)

    directories = {
        parent for relative in selected for parent in relative.parents if parent != Path(".")
    }
    for relative in sorted(directories, key=lambda path: len(path.parts)):
        (destination / relative).mkdir(parents=True, exist_ok=True)
    for relative in selected:
        source_path = source / relative
        if not source_path.is_file() or is_link_like(source_path):
            raise ValueError(f"Invalid source file: {relative}")
        shutil.copy2(source_path, destination / relative)
    for relative in sorted(
        {Path("."), *directories}, key=lambda path: len(path.parts), reverse=True
    ):
        shutil.copymode(source / relative, destination / relative)


def export_application(application: str, target: Path) -> Path:
    if application not in APPLICATIONS:
        choices = ", ".join(APPLICATIONS)
        raise ValueError(f"Application must be one of: {choices}")
    source = ROOT / application
    if not source.is_dir():
        raise ValueError(f"Application source is missing: {source}")
    if is_link_like(source):
        raise ValueError(f"Application source must not be a link or junction: {source}")
    destination = Path(os.path.abspath(target.expanduser()))
    if destination.exists() or destination.is_symlink():
        raise ValueError(f"Target already exists: {destination}")
    resolved_destination = destination.resolve()
    resolved_root = ROOT.resolve()
    if resolved_destination == resolved_root or resolved_root in resolved_destination.parents:
        raise ValueError("Target must be outside the full-stack repository.")

    entries = application_files(source)
    destination.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(
        dir=destination.parent,
        prefix=f".{destination.name}.",
        suffix=".tmp",
    ) as staging_name:
        staging = Path(staging_name)
        copy_selected_files(source, staging, entries)
        if destination.exists() or destination.is_symlink():
            raise ValueError(f"Target appeared during export: {destination}")
        staging.rename(destination)
    return destination


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description="Export one standalone application directory.")
    parser.add_argument("--application", required=True, choices=APPLICATIONS)
    parser.add_argument("--target", required=True, type=Path)
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    target = export_application(args.application, args.target)
    print(f"Exported {args.application} to {target}")
    return 0


if __name__ == "__main__":
    try:
        raise SystemExit(main())
    except (OSError, ValueError) as error:
        print(f"Application export failed: {error}", file=sys.stderr)
        raise SystemExit(2) from error
