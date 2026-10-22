#!/usr/bin/env python3
"""Build outlined scene lettering from a user-supplied Bubbly Humble font.

Requires fonttools and uharfbuzz. Font binaries are kept outside the repository.
"""

import argparse
from html import escape
from pathlib import Path

from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.ttLib import TTFont
import uharfbuzz as hb


LABELS = {
    "oreo": "OREO",
    "banan-xurmo": "BANAN & XURMO",
    "marakuya": "MARAKUYA",
    "matcha": "MATCHA",
    "ananas": "ANANAS",
    "tagline": "Not Just Tea",
    "outro": "Not Jus Tea",
}


def make_svg(font_path, text, color):
    font = TTFont(font_path)
    family = font["name"].getDebugName(1)
    if family != "Bubbly Humble":
        raise ValueError(f"Expected Bubbly Humble; received {family!r}")
    glyphs = font.getGlyphSet()
    order = font.getGlyphOrder()
    face = hb.Face(font_path.read_bytes())
    shaping_font = hb.Font(face)
    shaping_font.scale = (face.upem, face.upem)
    hb.ot_font_set_funcs(shaping_font)
    buffer = hb.Buffer()
    buffer.add_str(text)
    buffer.guess_segment_properties()
    hb.shape(shaping_font, buffer)
    paths = []
    bounds = []
    cursor_x = cursor_y = 0
    for info, position in zip(buffer.glyph_infos, buffer.glyph_positions):
        if info.codepoint == 0:
            raise ValueError(f"Missing glyph in {text!r}")
        glyph = glyphs[order[info.codepoint]]
        path_pen = SVGPathPen(glyphs)
        bounds_pen = BoundsPen(glyphs)
        glyph.draw(path_pen)
        glyph.draw(bounds_pen)
        x = cursor_x + position.x_offset
        y = cursor_y + position.y_offset
        if bounds_pen.bounds:
            left, bottom, right, top = bounds_pen.bounds
            bounds.append((left + x, bottom + y, right + x, top + y))
            paths.append(
                f'<path transform="translate({x} {y})" d="{path_pen.getCommands()}"/>'
            )
        cursor_x += position.x_advance
        cursor_y += position.y_advance
    left = min(b[0] for b in bounds) - 8
    bottom = min(b[1] for b in bounds) - 8
    right = max(b[2] for b in bounds) + 8
    top = max(b[3] for b in bounds) + 8
    width, height = right - left, top - bottom
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" '
        f'viewBox="{left} {-top} {width} {height}" '
        f'width="{width}" height="{height}" role="img">\n'
        f'<title>{escape(text)}</title>\n'
        f'<g fill="{escape(color, quote=True)}" transform="scale(1 -1)">\n'
        + "\n".join(paths)
        + "\n</g>\n</svg>\n"
    )


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("font", type=Path)
    parser.add_argument("--color", default="#FF5266")
    parser.add_argument("--out", type=Path, default=Path(__file__).resolve().parents[1] / "assets/lettering")
    args = parser.parse_args()
    args.out.mkdir(parents=True, exist_ok=True)
    for slug, text in LABELS.items():
        target = args.out / f"{slug}.svg"
        target.write_text(make_svg(args.font, text, args.color), encoding="utf-8")
        print(f"{target.name}: {text}")


if __name__ == "__main__":
    main()
