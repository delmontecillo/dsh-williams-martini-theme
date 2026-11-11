"""Render the plugin-manager icon from the supplied die-cut logo."""

from __future__ import annotations

from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent
SIZE = 256


def rounded_mask(size: int, radius: int) -> Image.Image:
    mask = Image.new("L", (size, size), 0)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, size - 1, size - 1), radius=radius, fill=255)
    return mask


def main() -> None:
    # Diagonal navy field.
    y, x = np.mgrid[0:SIZE, 0:SIZE]
    t = ((x + y) / (2 * (SIZE - 1))).clip(0, 1)
    top = np.array([10, 42, 74], dtype=np.float32)
    bottom = np.array([3, 11, 22], dtype=np.float32)
    rgb = top + (bottom - top) * t[:, :, None]
    tile = Image.fromarray(rgb.astype(np.uint8), "RGB").convert("RGBA")
    tile.putalpha(rounded_mask(SIZE, 56))

    draw = ImageDraw.Draw(tile)
    draw.rounded_rectangle((2, 2, SIZE - 3, SIZE - 3), radius=54, outline=(53, 196, 240, 110), width=3)

    logo = Image.open(ROOT / "martini-logo.webp").convert("RGBA")
    logo = logo.resize((212, round(logo.height * 212 / logo.width)), Image.LANCZOS)
    tile.alpha_composite(logo, ((SIZE - logo.width) // 2, 50))

    bars = [
        (56, 178, 144, "#4FD3F7"),
        (56, 188, 144, "#009FDF"),
        (56, 198, 96, "#E4002B"),
        (56, 208, 144, "#009FDF"),
    ]
    for bx, by, bw, colour in bars:
        draw.rounded_rectangle((bx, by, bx + bw, by + 7), radius=3, fill=colour)

    # A thin gold reference tick at the right of the flag.
    draw.rounded_rectangle((208, 178, 214, 215), radius=3, fill="#EFBF4C")
    tile.convert("RGB").save(ROOT / "icon.png", optimize=True)
    # The manifest points at the package root, so keep both copies in sync.
    tile.convert("RGB").save(ROOT.parent / "icon.png", optimize=True)
    print("icon.png", tile.size, (ROOT.parent / "icon.png").stat().st_size)


if __name__ == "__main__":
    main()
