# Footer wordmark renderer

Renders `public/assets/footer-wordmark.webp`: the glossy cherry-red extruded "TefriX" (Geist Bold) on a reflective floor that sits behind the desktop footer. It uses three.js in headless Chrome, like the glass assets in `design-handoff/glass-source/`.

Requirements: Node 18+ and Google Chrome.

```bash
npm install
npm run serve           # keep running: serves render.html on http://localhost:4173
npm run render          # in a second terminal: writes ../../public/assets/footer-wordmark.webp
npm run render:mask     # writes ../../public/assets/footer-wordmark-mask.webp
```

`render.html` takes its look from query parameters (see the `render` script): material colour and roughness, light intensities and positions, bloom, mirror strength and blur (`mirror`, `mirrorRes`), reflection fade, and output size and type. For quick previews, run `node shoot.mjs preview.png "w=1600&h=650&..."`.

The backdrop is exactly the page background (`#0A0607`; tone mapping would otherwise crush it darker, leaving a visible seam) and the edges fade into it, so the image blends at any width. `mode=mask` renders the same lettering and framing as flat white on black; the footer uses it (CSS `mask-mode: luminance`) to confine its light sweep to the letters. Re-render both together if you change the camera or text.
