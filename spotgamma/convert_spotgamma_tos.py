#!/usr/bin/env python3
"""
Convert SpotGamma ThinkOrSwim export (.txt) to chart-ready thinkScript (.ts).

SpotGamma's raw export uses red solid lines for all levels. This script adds
Paint_Strategy / Style inputs and applies the styling used in ThinkOrSwim_Final.ts
(bubbles only for key levels; combo/L lines hidden on chart). Maps /MES and /MNQ
to the same levels as /ES and /NQ.

Usage:
  python convert_spotgamma_tos.py
  python convert_spotgamma_tos.py -i ThinkOrSwim.txt -o ThinkOrSwim_Final.ts
"""

from __future__ import annotations

import argparse
import re
import sys
from pathlib import Path

PAINT_INPUTS = """input Paint_Strategy = PaintingStrategy.DASHES;
input Style = Curve.MEDIUM_DASH;"""

HIDE_PLOTS = ("ComboL1", "ComboL2", "ComboL3", "ComboL4", "L1", "L2", "L3", "L4")
VISIBLE_PLOTS = ("PutWall", "VolTrig", "CallWall", "ZeroGamma")

# Micro E-mini futures use the same SpotGamma levels as their mini counterparts.
MICRO_FUTURES_ALIASES: tuple[tuple[str, str], ...] = (
    ('"/ES:XCME"', '"/MES:XCME"'),
    ('"/NQ:XCME"', '"/MNQ:XCME"'),
)


def insert_paint_inputs(text: str) -> str:
    if "input Paint_Strategy" in text:
        return text
    pattern = re.compile(r"^input Line_Weight\s*=.*?;\s*\n", re.MULTILINE)

    def repl(match: re.Match[str]) -> str:
        return match.group(0) + PAINT_INPUTS + "\n"

    new_text, count = pattern.subn(repl, text, count=1)
    if count == 0:
        raise ValueError("Could not find 'input Line_Weight = ...;' in input file")
    return new_text


def _plot_has_painting_strategy(text: str, plot_name: str) -> bool:
    return bool(
        re.search(
            rf"^{re.escape(plot_name)}\.SetPaintingStrategy\(Paint_Strategy\);",
            text,
            re.MULTILINE,
        )
    )


def normalize_plot_block(text: str, plot_name: str, *, hide_line: bool) -> str:
    """Replace legacy SpotGamma styling with Final.ts styling for one plot."""
    hide_suffix = f"\n{plot_name}.Hide();" if hide_line else ""

    # Already converted (has SetPaintingStrategy)
    if _plot_has_painting_strategy(text, plot_name):
        if hide_line and not re.search(
            rf"^{re.escape(plot_name)}\.Hide\(\);", text, re.MULTILINE
        ):
            text = re.sub(
                rf"(^{re.escape(plot_name)}\.SetStyle\(Style\);)\s*\n",
                rf"\1{hide_suffix}\n",
                text,
                count=1,
                flags=re.MULTILINE,
            )
        return text

    # Line-anchored so L1 does not match inside ComboL1, etc.
    legacy = re.compile(
        rf"(^{re.escape(plot_name)}\.HideTitle\(\);\s*\n)"
        rf"^{re.escape(plot_name)}\.SetLineWeight\(Line_Weight\);\s*\n"
        rf"^{re.escape(plot_name)}\.SetDefaultColor\(Color\.(?:RED|CYAN)\);\s*\n",
        re.MULTILINE,
    )
    replacement = (
        rf"\1{plot_name}.SetPaintingStrategy(Paint_Strategy);\n"
        rf"{plot_name}.SetLineWeight(Line_Weight);\n"
        rf"{plot_name}.SetDefaultColor(Color.CYAN);\n"
        rf"{plot_name}.SetStyle(Style);"
        rf"{hide_suffix}\n"
    )
    new_text, count = legacy.subn(replacement, text, count=1)
    if count == 0:
        raise ValueError(f"Could not find plot styling block for {plot_name}")
    return new_text


def add_micro_futures_aliases(text: str) -> str:
    """Map /MES and /MNQ to the same level defs as /ES and /NQ."""
    for primary, micro in MICRO_FUTURES_ALIASES:
        micro_symbol = micro.strip('"')
        if f'GetSymbol() == {micro}' in text or f'GetSymbol()=={micro}' in text:
            continue
        pattern = re.compile(
            rf"(GetSymbol\(\)\s*==\s*{re.escape(primary)})(\s*\))",
        )
        new_text, count = pattern.subn(
            rf"\1 OR GetSymbol() == {micro}\2",
            text,
            count=1,
        )
        if count == 0:
            raise ValueError(
                f"Could not find GetSymbol() branch for {primary.strip('\"')}"
            )
        text = new_text
    return text


def convert(text: str) -> str:
    text = add_micro_futures_aliases(text)
    text = insert_paint_inputs(text)
    # Longer names first so L* is not confused with ComboL* when scanning.
    for name in sorted(HIDE_PLOTS, key=len, reverse=True):
        text = normalize_plot_block(text, name, hide_line=True)
    for name in VISIBLE_PLOTS:
        text = normalize_plot_block(text, name, hide_line=False)
    if not text.endswith("\n"):
        text += "\n"
    return text


def main() -> int:
    here = Path(__file__).resolve().parent
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument(
        "-i",
        "--input",
        type=Path,
        default=here / "ThinkOrSwim.txt",
        help="SpotGamma ThinkOrSwim export (default: spotgamma/ThinkOrSwim.txt)",
    )
    parser.add_argument(
        "-o",
        "--output",
        type=Path,
        default=here / "ThinkOrSwim_Final.ts",
        help="Converted thinkScript output (default: spotgamma/ThinkOrSwim_Final.ts)",
    )
    args = parser.parse_args()

    if not args.input.is_file():
        print(f"Input not found: {args.input}", file=sys.stderr)
        return 1

    source = args.input.read_text(encoding="utf-8")
    try:
        result = convert(source)
    except ValueError as exc:
        print(f"Conversion failed: {exc}", file=sys.stderr)
        return 1

    args.output.write_text(result, encoding="utf-8")
    print(f"Wrote {args.output} ({len(result)} bytes) from {args.input}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
