"""Bloom + optional alpha extraction for additive glass renders on black."""
import sys, glob, os
import numpy as np
from PIL import Image, ImageFilter

def bloom(img, th=0.38, r1=6, s1=0.32, r2=24, s2=0.30):
    a = np.asarray(img.convert('RGB')).astype(np.float32) / 255.0
    lum = a.max(axis=2)
    k = np.clip((lum - th) / (1 - th), 0, 1)[..., None]
    bright = Image.fromarray((a * k * 255).astype(np.uint8))
    b1 = np.asarray(bright.filter(ImageFilter.GaussianBlur(r1))).astype(np.float32) / 255.0
    b2 = np.asarray(bright.filter(ImageFilter.GaussianBlur(r2))).astype(np.float32) / 255.0
    out = a + s1 * b1 + s2 * b2
    # soft tone-map so highlights roll off instead of clipping hard
    knee = 0.82
    out = np.where(out < knee, out, knee + (1 - knee) * (1 - np.exp(-(out - knee) / (1 - knee))))
    return np.clip(out, 0, 1)

def to_rgba(arr, pad=24):
    alpha = arr.max(axis=2)
    rgb = np.where(alpha[..., None] > 1e-4, arr / np.maximum(alpha[..., None], 1e-4), 0)
    rgba = np.dstack([rgb, alpha])
    im = Image.fromarray((np.clip(rgba, 0, 1) * 255).astype(np.uint8), 'RGBA')
    bbox = Image.fromarray((alpha > 0.02).astype(np.uint8) * 255).getbbox()
    if bbox:
        x0, y0, x1, y1 = bbox
        w, h = im.size
        im = im.crop((max(0, x0 - pad), max(0, y0 - pad), min(w, x1 + pad), min(h, y1 + pad)))
    return im

if __name__ == '__main__':
    mode = sys.argv[1]
    if mode == 'still':  # post.py still in.png out.webp
        arr = bloom(Image.open(sys.argv[2]))
        im = to_rgba(arr)
        im.save(sys.argv[3], 'WEBP', quality=88, method=6)
        print(sys.argv[3], im.size, os.path.getsize(sys.argv[3]))
    elif mode == 'frames':  # post.py frames inDir outDir
        os.makedirs(sys.argv[3], exist_ok=True)
        for f in sorted(glob.glob(os.path.join(sys.argv[2], '*.png'))):
            arr = bloom(Image.open(f))
            Image.fromarray((arr * 255).astype(np.uint8)).save(os.path.join(sys.argv[3], os.path.basename(f)))
        print('done')
