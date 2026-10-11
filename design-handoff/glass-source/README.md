# Glass asset renderer

Renders the cherry glass shapes with three.js in headless Chromium, then adds bloom and a transparent background in Python.

Requirements: Node 18+, Python 3 with `numpy` and `Pillow`, `ffmpeg` with libvpx-vp9.

```bash
npm install
npx playwright install chromium

# Stills (raw renders on black → out/*_raw.png)
npm run stills
python3 post.py still out/hero-c_raw.png ../assets/glass-hero.webp
python3 post.py still out/orb_raw.png    ../assets/glass-orb.webp
python3 post.py still out/ring_raw.png   ../assets/glass-ring.webp
python3 post.py still out/pill_raw.png   ../assets/glass-pill.webp
python3 post.py still out/twist_raw.png  ../assets/glass-twist.webp

# Hero loop: 300 frames → bloom → transparent frames → VP9-alpha WebM
npm run frames                         # writes vraw/f0000.png …
python3 post.py frames vraw vpost      # bloom
python3 make_alpha.py vpost vrgba 900  # transparent RGBA frames
ffmpeg -framerate 30 -i vrgba/f%04d.png -c:v libvpx-vp9 -pix_fmt yuva420p \
  -b:v 0 -crf 42 -row-mt 1 -auto-alt-ref 0 -an ../assets/hero-loop.webm
```

Safari (optional, on a Mac): HEVC with alpha from the same RGBA frames:

```bash
ffmpeg -framerate 30 -i vrgba/f%04d.png -c:v hevc_videotoolbox -alpha_quality 0.75 \
  -allow_sw 1 -tag:v hvc1 -b:v 3M ../assets/hero-loop-hevc.mov
```

Then add it as the first `<source src="hero-loop-hevc.mov" type='video/mp4; codecs="hvc1"'>` before the WebM.

Changing the look:
- Colours: `PAL` in `render.html` (deep cherry, crimson, rose, highlight).
- Shapes: the `setup()` scenes in `render.html` (`hero-c`, `orb`, `ring`, `pill`, `twist`).
- Glow strength: `bloom()` parameters in `post.py`.
