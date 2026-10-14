# TefriX Solutions — Homepage (Cherry glass, professional) · Design spec

**Sources of truth** (open in Chrome; they load everything from `./assets`):
- Desktop and tablet (≥ 768px): `reference.html` — screenshot `screens/desktop.jpg` (1440px).
- Phone (< 768px): `mobile-home.html`, `mobile-menu.html`, `mobile-contact.html` (linked to each other) — screenshots `screens/mobile-home.jpg` (full page), `mobile-home-top.jpg` (first screen), `mobile-home-scrolled.jpg` (with the pinned action bar), `mobile-menu.jpg`, `mobile-contact.jpg`. See §13.

This spec explains the system behind the references so they can be rebuilt as real components. If a reference and this spec disagree, match the reference.

---

## 1. Colour tokens (dark theme)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0A0607` | Page background (near-black with a cherry undertone) |
| `--panel` | `#110A0C` | Contact panel |
| `--card` | `linear-gradient(180deg, rgba(255,255,255,.045), rgba(255,255,255,.012))` | Service cards |
| `--card-flat` | `rgba(255,255,255,.03)` | Pillars, vision/mission, stats bar |
| `--border` | `rgba(255,226,232,.10)` | Card borders, dividers |
| `--border-strong` | `rgba(255,226,232,.18)` | Ghost buttons, inputs (`.14`) |
| `--text` | `#FFF9FA` | Headings, primary text |
| `--text-2` | `#E2D0D4` | Nav links, footer links, labels |
| `--text-3` | `#CDBCC0` | Lead paragraphs |
| `--muted` | `#BFAEB2` | Card body text |
| `--faint` | `#9F8D92` | Mono eyebrow labels in footer/logo row |
| `--cherry` | `#75070C` | Brand cherry (logo secondary stroke, deep gradient stops) |
| `--cherry-600` | `#9F0C1F` | Button gradient end, panels |
| `--crimson` | `#C8102E` | Glow blobs, logo stroke |
| `--red` | `#E11D48` | Button gradient start |
| `--rose` | `#FF4D6D` | Logo X, status dot, glows |
| `--rose-300` | `#FF8FA3` | Accent text on dark (eyebrows, links, checks) |
| `--blush` | `#FFC2CF` | Icon strokes, gradient highlight |
| `--success` | `#6EE7B7` | Terminal check marks and "Live" dot only |

Gradients:
- Primary button: `linear-gradient(135deg, #E11D48, #9F0C1F)` + `box-shadow: 0 14px 40px -16px rgba(255,77,109,.8)`.
- Hero highlight text ("scalable & secure"): `linear-gradient(100deg, #FFC2CF, #FF4D6D 35%, #E11D48 60%, #FF4D6D 85%, #FFC2CF)`, `background-size: 220% 100%`, clipped to text.
- Ambient glow: `radial-gradient(circle, rgba(200,16,46,.42), rgba(117,7,12,.18) 42%, transparent 70%)`.
- Quote panel: `radial-gradient(120% 160% at 0% 0%, #9F0C1F 0%, #4A0710 40%, #170B0E 80%)`.

Contrast (all on `--bg`): `--text` 19:1, `--muted` ≈ 9:1, `--rose-300` ≈ 9:1, `--faint` ≈ 6:1. Keep it that way — never put `--cherry` text on the dark background.

## 2. Typography

| Role | Font | Settings |
|---|---|---|
| H1 | **Geist** 600 | `clamp(42px, 5.4vw, 80px)` / 1.03, letter-spacing −0.04em, sentence case |
| H2 | Geist 600 | `clamp(34px, 3.8vw, 54px)` / 1.08, −0.035em |
| H3 | Geist 600 | 18–20px, −0.02em |
| Body | Geist 400–500 | 17px / 1.6; lead 18–19px; small 14–15px |
| Eyebrow labels | **Geist Mono** 400/500 | 12–13px, UPPERCASE, letter-spacing 0.08em, `--rose-300` |
| Terminal / tags | Geist Mono | 12–14px; terminal 13.5px / 1.9 |

Load from Google Fonts (`Geist:wght@400..700`, `Geist+Mono:wght@400;500`, `display=swap`) or self-host (the `geist` npm package ships the woff2 files).

## 3. Layout, spacing, shape

- Container `max-width: 1280px`, side padding `clamp(16px, 4vw, 40px)`.
- Section spacing `clamp(96px, 10vw, 140px)`.
- Radii: buttons/inputs 10–12px · cards 20–22px · large panels 24–28px · pills 999px.
- Grids use `repeat(auto-fit, minmax(min(100%, Npx), 1fr))` so they collapse without breakpoints (N = 220 stats, 250 pillars, 240 process, 340 services/work, 360 vision/mission, 260 values).
- Sticky nav: `rgba(10,6,7,.7)` + `backdrop-filter: blur(16px)` + bottom border.

## 4. Sections (in order, with anchor ids)

1. **Nav** — logo mark + "TefriX Solutions"; links Services / Process / Work / About / Contact; primary CTA "Book a free consultation".
2. **Hero `#top`** — eyebrow pill with pulsing dot; H1; lead paragraph; primary + ghost buttons; three check-mark proof points. Right: transparent glass video loop, floating glass pill, and a **deploy terminal** card overlapping the bottom-left of the glass (illustration only; `role="img"` with an aria-label).
3. **Stats bar** — 20+ team members · 50+ projects delivered · 3+ years in industry · 99% client satisfaction (the last in `--rose-300`). Numbers count up.
4. **Clients & partners** — row of 5 logo slots (placeholders — see §9).
5. **Services `#services`** — heading + intro, 6 cards (icon, title, description, 2–3 tags), then a "Technologies we master" row of mono chips.
6. **How we work `#process`** — 4 numbered steps on a connector line that fills as you scroll.
7. **Selected work `#work`** — 3 case-study cards: gradient tile with an empty browser frame + one floating glass shape, tags, name, one-line result, "View case study →" (placeholders — see §9).
8. **Why TefriX / About `#about`** — heading + text + floating glass orb (left), 2×2 pillars (right); then a full-width "Who we are" quote panel, Vision and Mission cards, and a 4-column values strip.
9. **Contact `#contact`** — panel with drifting glow: heading, text, phone/email/location rows; frosted form card (Name\*, Phone\* "WhatsApp preferred", Email, Message\*; Send + Chat on WhatsApp).
10. **Footer** — brand + blurb + social icon buttons; Services / Company / Contact columns; large faded "TefriX" wordmark; copyright row.

## 5. Assets (`./assets`)

| File | What | Used in |
|---|---|---|
| `hero-loop.webm` | 900×900, 10s seamless loop, 30fps, **VP9 with alpha** (transparent background), 2.2 MB | Hero |
| `hero-poster.webp` | Transparent first frame of the loop | `poster` of the hero video |
| `glass-hero.webp` | Transparent still of the hero sculpture | Reduced-motion / no-video fallback; faded inside the orb |
| `glass-orb.webp` | Glass sphere | Why TefriX |
| `glass-ring.webp`, `glass-pill.webp`, `glass-twist.webp` | Small floating accents | Hero (pill), work cards |
| `grain.png` | 180px transparent noise tile | Page-wide overlay at 9% opacity, above content, `pointer-events: none` |
| `tefrix-mark-on-dark.svg`, `tefrix-mark-on-light.svg` | Redrawn TX logo mark | Nav, footer, favicon |

**Video rules (important):**
- The loop has a real alpha channel, so it needs **no blend mode**. Do not swap it for a black-background video with `mix-blend-mode: screen`: inside isolated stacking contexts that renders as a black square (we hit exactly this).
- VP9-alpha plays transparently in Chrome, Edge and Firefox. Safari does not reliably support it: on Safari show `glass-hero.webp` instead (or add an HEVC-with-alpha `.mov` built on a Mac — see `glass-source/README.md` — as an extra `<source type='video/mp4; codecs="hvc1"'>`).
- `muted`, `loop`, `playsInline`, `autoPlay`; in React also set `ref.current.muted = true` and call `play()` in an effect (React does not reliably render the `muted` attribute, which blocks autoplay on some browsers).
- Only play while on screen (IntersectionObserver), `preload="metadata"`, poster always set.

## 6. Motion

All animation uses `transform`/`opacity` only.

| Element | Animation |
|---|---|
| Hero (load) | Fade-up 16px, 0.9s `cubic-bezier(.2,.7,.2,1)`, staggered: eyebrow 0s, H1 .08s, lead .18s, buttons .28s, proof points .38s, terminal .5s |
| Terminal lines | Appear one by one at 1.0 / 1.4 / 1.8 / 2.2 / 2.6s (fade + 6px slide, 0.5s); caret blinks (1s steps) |
| Highlight text | Gradient shimmer, background-position over 10s, linear, infinite |
| Glass video | Continuous loop |
| Floating glass | translateY −14px + rotate 4°, 9–12s ease-in-out infinite (vary durations so they don't sync) |
| Glow blobs | Drift ±5% and scale .96–1.08, 24s ease-in-out alternate |
| Status dots | Pulse (opacity/scale) 2.2s |
| Scroll reveals | Sections/cards fade up 36px when ~15% visible, once |
| Stats | Count up 0 → value over ~1.2s (ease-out) when visible, once; real number available to screen readers |
| Process line | Fills left → right (scaleX 0→1) as the section enters |
| Hover | Cards lift 4px + soft rose shadow + brighter border; "→" nudges 4px; buttons lift 1px with a light sweep |

The reference uses CSS scroll-driven animations (Chrome-only) for reveals, count-ups and the process line. **In production use IntersectionObserver** so they work in every browser.

**Reduced motion** (`prefers-reduced-motion: reduce`): no animations at all, video replaced by `glass-hero.webp`, content visible immediately, counters show final values.

## 7. Responsive

- ≥ 768px: the desktop layout (`reference.html`). Between 768 and 1024 the grids collapse via auto-fit; hide the process connector line and the orb illustration below 900px.
- < 768px: the **dedicated phone layout** in §13 — not the squeezed desktop layout.
- No horizontal scroll at 375px. Check 375, 390, 768, 1024, 1440.

## 8. Accessibility

- Real `<button>`, `<a href>`, `<label>` + inputs; touch targets ≥ 44px; visible `:focus-visible` ring (2px `--rose-300`, 2px offset).
- Decorative layers (`glow`, grain, floating glass, video) are `aria-hidden` / `alt=""`; the terminal has `role="img"` + `aria-label`.
- Icon-only links (social) have `aria-label`.

## 9. Content

All copy in `reference.html` is final **except**:

- **Placeholders — do not ship as-is.** Client logos (5 slots) and the 3 case studies (`[Project name]`, `[Industry]`, `[Project screenshot]`, one-line result). Drive both from data arrays and **hide the section when its array is empty**.
- **New copy the owner should confirm:** the "Software engineering studio" eyebrow, the second sentence of the hero paragraph, the four process steps, "The first consultation is free."
- The terminal card is an illustration, not a real log.

## 10. Functional details

- Contact form: Name\* · Phone\* (WhatsApp preferred) · Email · Message\*. Wire to the existing submission endpoint if there is one; validation, loading, success and error states in the same style.
- Links: WhatsApp `https://wa.me/94765907934` · `tel:+94765907934` · `mailto:tefrixsolutions@gmail.com` · Facebook `https://www.facebook.com/tefrix` · LinkedIn `https://www.linkedin.com/company/tefrix/` · `https://www.tefrix.com`.
- Keep the Google Analytics tag (`G-HW51VZVK92`), page titles and meta descriptions. Keep `/about`, `/services`, `/contact` routes working.

## 11. Performance

- LCP should be the H1 text, not the video. Load the video after first paint, lazy-load below-the-fold images, preconnect/self-host fonts.
- Targets: Lighthouse Performance ≥ 90 and Accessibility ≥ 95 (desktop); no layout shift when fonts or the video load.

## 12. Acceptance criteria

- At 1440px it matches `reference.html` / `screens/desktop.jpg`; at 390px it matches `mobile-home.html` and the `screens/mobile-*.jpg` set (colours, type, spacing, glass, textures).
- The menu overlay and the phone contact page match `mobile-menu.html` and `mobile-contact.html`.
- Hero glass is transparent over the background in Chrome/Edge/Firefox; Safari shows the still image with no black box.
- On phones the pinned action bar is hidden on the first screen and never covers the hero buttons.
- No horizontal scroll at 375px; reduced motion removes all motion.
- Placeholder sections are hidden until real data exists.

## 13. Phone layout (< 768px)

Same tokens, fonts, glass assets and motion as desktop — less text, bigger touch targets, one column. Content width 390 − 2×20px side padding. Section spacing 64px.

**Shorter copy on phones (use these exact strings below 768px):**

| Element | Phone copy |
|---|---|
| Hero eyebrow | Software studio · Colombo |
| Hero paragraph | Web, design, e-commerce and marketing — from idea to launch. |
| Stats labels | Team members · Projects · Years · Satisfaction |
| Services heading | What we build — tiles show the service name only: Web development, UI/UX design, E-commerce, Marketing & SEO, Responsive design, Maintenance & support |
| Tech row label | Our stack (chip says "Laravel" instead of "PHP Laravel") |
| Process heading | Idea to launch in 4 steps — lines: Goals, scope and plan · Clickable UI/UX you approve · Secure, tested code · Live, monitored, maintained |
| Work heading | Recent projects (+ "Swipe →") |
| Why heading | Built to last — "Reliable, secure, scalable." — four pillar names only |
| Quote | "Great software is built by the best team working together." |
| Contact card | Ready to build with us? — The first consultation is free. |
| Contact page | Tell us about your project — Free consultation. Quick reply. |

The phone layout drops: the client-logo row, the long "who we are" paragraph, vision, mission and values (keep them on desktop and on `/about`).

**Components:**

1. **Top bar** — sticky, 64px: logo mark + "TefriX"; a 44×44 menu button (☰) on the right. No CTA in the bar.
2. **Menu** (`mobile-menu.html`) — a full-screen overlay, not a separate page: big links 01–05 (Services, Process, Work, About, Contact) at 34px, a "Book a free consultation" button, then WhatsApp / Call / Email buttons. Links stagger in (60ms apart). Implement it as an accessible dialog: focus trap, Esc and the ✕ button close it, page scroll locked, focus returns to the ☰ button. Tapping a link closes the menu and scrolls to the section.
3. **Hero** — 40px H1; a 330px glass video; a compact deploy card (3 lines) overlapping its bottom-left; full-width primary + ghost buttons (54px).
4. **Stats** — 2×2 grid card.
5. **Services** — 2-column tiles (icon + name only), whole tile tappable.
6. **Stack** — one horizontally scrolling row of chips (scroll-snap, no scrollbar).
7. **Process** — vertical timeline: 40px numbered dots on a gradient line, title + one short line each.
8. **Work** — horizontally swiping cards (286px wide, scroll-snap, the next card peeks in) with page dots; hidden while there are no real projects.
9. **Why TefriX** — heading + small floating orb, 2×2 pillar tiles, short quote card.
10. **Contact card** — "Send us a message" (opens the contact page) + WhatsApp / Call / Email buttons in a 3-column row.
11. **Footer** — logo + social buttons, a 2-column link list, faded wordmark, ©.
12. **Pinned action bar** — floats 12px above the bottom edge (add `env(safe-area-inset-bottom)`): "Free consultation" + a WhatsApp icon button. **Hidden on the first screen**: slide it up (200ms) once the hero buttons have scrolled out of view (IntersectionObserver on the hero CTA group). Hide it while the menu is open, on the contact page, and when the footer is visible.
13. **Contact page** (`mobile-contact.html`, route `/contact` on phones) — back button, short heading, WhatsApp / Call / Email chips, the same form fields (48px inputs, 16px text so iOS doesn't zoom), Send button. Use `type="tel"`/`type="email"` and `autocomplete` attributes.

Tap feedback: `:active { transform: scale(.97) }` on every tappable card and button. All targets ≥ 44px.
