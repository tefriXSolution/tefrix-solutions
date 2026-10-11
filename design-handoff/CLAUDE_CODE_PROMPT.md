Rebuild the homepage of my startup's website, TefriX Solutions, from an approved design.

The design hand-off is in ./design-handoff/:
- reference.html — static export of the approved homepage. It is the visual source of truth; open it in Chrome. Its assets are in ./design-handoff/assets.
- screens/desktop.jpg and screens/mobile.jpg — how every section should look at 1440px and 390px.
- DESIGN_SPEC.md — colour and type tokens, layout, every section, the assets and how to use the transparent hero video, the motion spec, responsive rules, accessibility, content placeholders, performance and acceptance criteria.
- glass-source/ — the scripts that rendered the 3D glass images and video (only needed if we want new sizes or colours later).

Steps:
1. Read DESIGN_SPEC.md and reference.html completely. Then explore this repo (framework, routing, styling approach, any existing contact-form API) and give me a short plan before you change anything.
2. Build the homepage to match reference.html as clean, typed components: Navbar, Hero (with HeroVisual and the DeployTerminal), StatsBar, ClientLogos, Services, TechStack, Process, SelectedWork, WhyTefrix, About (quote, vision and mission, values), Contact, Footer. Keep services, stats, process steps, values, clients, case studies and nav links in data arrays.
3. Put the colour, font, radius and spacing tokens from the spec in one place: CSS variables, or the project's theme if it already uses Tailwind, Mantine or similar.
4. Copy ./design-handoff/assets into the public/static folder. Use the hero video exactly as the spec describes: transparent VP9 WebM, no blend mode, muted and play() set from a ref, play only while visible, and the still image on Safari and under reduced motion.
5. Implement the motion from the spec with CSS plus IntersectionObserver (reveals, count-ups, process line), not CSS scroll timelines, so it works in every browser. Respect prefers-reduced-motion. Animate only transform and opacity. Don't add an animation library unless the project already has one.
6. Client logos and case studies are placeholders: render them from data and hide each section while its array is empty. Leave the arrays ready for me to fill.
7. Keep the existing /about, /services and /contact routes working, because they may be indexed and linked. Use the same nav and footer and render the matching sections there. Keep the Google Analytics tag and the page titles/meta. Use tefrix-mark-on-dark.svg for the favicon.
8. Wire the contact form to the existing submission logic if there is one. Otherwise leave a clearly marked handler. Add validation, loading, success and error states.
9. Verify: run the dev server, take screenshots at 1440px and 390px (Playwright if available), compare them with screens/*.jpg, and fix differences. Confirm there is no horizontal scroll at 375px, the hero glass has no black box, and reduced motion shows the still image with no motion. Run Lighthouse and report the scores.

Rules:
- Do not change copy, colours or fonts. Do not add gradients, glows, glassmorphism, emoji, stock images or sections beyond what the reference has.
- Subtle hover and focus-visible states are fine.
- If something in the spec is unclear, follow reference.html.
- When you finish, list what you built, any deviations, and what I still need to provide: client logos, case-study content, an official SVG of the logo if one exists, and the confirmations listed in DESIGN_SPEC.md §9.
