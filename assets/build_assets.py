"""Derive theme-ready artwork from the supplied Williams Martini references.

The supplied logo sits on a flat light-grey field with a white die-cut border.
The field is flood-filled away from the crop edges, keeping the white sticker
border and the shadowless artwork intact.  The car photograph becomes a cool
monochrome ghost for the canvas layer.

Run with the bundled Python:
    python assets/build_assets.py
"""

from __future__ import annotations

import base64
from pathlib import Path

import numpy as np
from PIL import Image, ImageFilter

ROOT = Path(__file__).resolve().parent


def cut_logo() -> None:
    src = Image.open(ROOT / "source-logo.png").convert("RGB")
    rgb = np.array(src).astype(np.int16)
    h, w, _ = rgb.shape
    bg = rgb[0, 0]
    near = np.abs(rgb - bg).sum(axis=2) < 22

    # Flood-fill the grey field from every edge so the white die-cut border
    # stays opaque even though it is also light.
    seen = np.zeros((h, w), dtype=bool)
    stack = []
    for x in range(w):
        for y in (0, h - 1):
            if near[y, x]:
                stack.append((y, x))
    for y in range(h):
        for x in (0, w - 1):
            if near[y, x]:
                stack.append((y, x))
    while stack:
        y, x = stack.pop()
        if seen[y, x] or not near[y, x]:
            continue
        seen[y, x] = True
        if y > 0:
            stack.append((y - 1, x))
        if y + 1 < h:
            stack.append((y + 1, x))
        if x > 0:
            stack.append((y, x - 1))
        if x + 1 < w:
            stack.append((y, x + 1))

    alpha = np.where(seen, 0, 255).astype(np.uint8)
    # One-pixel erosion removes the grey anti-aliasing fringe.
    alpha = np.array(Image.fromarray(alpha).filter(ImageFilter.MinFilter(3)))
    ys, xs = np.where(alpha > 0)
    pad = 10
    box = (
        max(0, int(xs.min()) - pad),
        max(0, int(ys.min()) - pad),
        min(w, int(xs.max()) + pad + 1),
        min(h, int(ys.max()) + pad + 1),
    )
    art = np.dstack([np.array(src), alpha]).astype(np.uint8)
    logo = Image.fromarray(art, "RGBA").crop(box)
    logo = logo.resize((round(logo.width * 1.5), round(logo.height * 1.5)), Image.LANCZOS)
    logo.save(ROOT / "martini-logo.webp", quality=90, method=6)
    print("martini-logo.webp", logo.size, (ROOT / "martini-logo.webp").stat().st_size)

    # A borderless plate, used where the die-cut sticker would be too loud.
    inner = logo.crop(
        (
            int(logo.width * 0.045),
            int(logo.height * 0.055),
            int(logo.width * 0.955),
            int(logo.height * 0.945),
        )
    )
    inner.save(ROOT / "martini-plate.webp", quality=90, method=6)
    print("martini-plate.webp", inner.size, (ROOT / "martini-plate.webp").stat().st_size)


def cut_car() -> None:
    car = Image.open(ROOT / "source-car.png").convert("RGB")
    car = car.resize((1000, round(car.height * 1000 / car.width)), Image.LANCZOS)
    arr = np.array(car).astype(np.float32)

    # Cinematic cool grade for the night canvas: keep the Martini blue/red on
    # the bodywork, push the shadows navy, lift the highlights ice-white.
    lum = arr[:, :, 0] * 0.299 + arr[:, :, 1] * 0.587 + arr[:, :, 2] * 0.114
    lo, hi = np.percentile(lum, 1), np.percentile(lum, 99)
    lum = ((lum - lo) / max(hi - lo, 1)).clip(0, 1)
    tone = np.stack(
        [
            4 + lum * 228,
            12 + lum * 239,
            26 + lum * 229,
        ],
        axis=2,
    )
    graded = arr * 0.42 + tone * 0.58
    graded = (graded * 0.92 + 6).clip(0, 255).astype(np.uint8)
    night = Image.fromarray(graded)
    night.save(ROOT / "car-night.webp", quality=82, method=6)
    print("car-night.webp", night.size, (ROOT / "car-night.webp").stat().st_size)

    # Paper-mode ghost: a negative keeps the bodywork dark on a near-white
    # field, so multiply shows the car rather than the tarmac.
    neg = (255 - lum * 255).clip(0, 255).astype(np.uint8)
    paper = np.stack([neg, neg, neg], axis=2)
    paper_img = Image.fromarray(paper).filter(
        ImageFilter.UnsharpMask(radius=1.2, percent=45, threshold=2)
    )
    paper_img.save(ROOT / "car-paper.webp", quality=82, method=6)
    print("car-paper.webp", paper_img.size, (ROOT / "car-paper.webp").stat().st_size)


def write_b64() -> None:
    for name in (
        "martini-logo.webp",
        "martini-plate.webp",
        "car-night.webp",
        "car-paper.webp",
        "icon-art.png",
    ):
        data = base64.b64encode((ROOT / name).read_bytes()).decode("ascii")
        (ROOT / f"{name}.b64").write_text(data, encoding="ascii")
        print(f"{name}.b64: {len(data)} chars")


if __name__ == "__main__":
    cut_logo()
    cut_car()
    write_b64()
