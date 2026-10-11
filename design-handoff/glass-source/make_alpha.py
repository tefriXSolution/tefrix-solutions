"""Turn bloomed frames rendered on black into transparent RGBA frames.

usage: python3 make_alpha.py <in_dir> <out_dir> [size]
"""
import glob
import os
import sys

import numpy as np
from PIL import Image

src, dst = sys.argv[1], sys.argv[2]
size = int(sys.argv[3]) if len(sys.argv) > 3 else None
os.makedirs(dst, exist_ok=True)
for f in sorted(glob.glob(os.path.join(src, '*.png'))):
    im = Image.open(f).convert('RGB')
    if size:
        im = im.resize((size, size), Image.LANCZOS)
    a = np.asarray(im).astype(np.float32) / 255
    alpha = a.max(axis=2)
    alpha = np.where(alpha < 0.012, 0, alpha)  # drop near-black noise
    rgb = np.where(alpha[..., None] > 0, a / np.maximum(alpha[..., None], 1e-4), 0)
    out = np.dstack([np.clip(rgb, 0, 1), alpha])
    Image.fromarray((out * 255).astype(np.uint8), 'RGBA').save(os.path.join(dst, os.path.basename(f)))
print('done')
