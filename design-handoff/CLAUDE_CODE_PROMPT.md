Rebuild the homepage of my startup's website, TefriX Solutions, from an approved design. It has a desktop layout and a dedicated phone layout.

The design hand-off is in ./design-handoff/:
- reference.html — the approved desktop/tablet homepage (≥ 768px). Visual source of truth; open it in Chrome.
- mobile-home.html, mobile-menu.html, mobile-contact.html — the approved phone layout (< 768px), linked to each other.
- screens/ — screenshots of every reference (desktop.jpg, mobile-home.jpg, mobile-home-top.jpg, mobile-home-scrolled.jpg, mobile-menu.jpg, mobile-contact.jpg).
- DESIGN_SPEC.md — tokens, sections, assets (including how to use the transparent hero video), motion, responsive rules, accessibility, content placeholders, performance, acceptance criteria, and §13 for the phone layout and its shorter copy.
- assets/ — glass images, hero video, grain texture, logo SVGs.
- glass-source/ — the scripts that rendered the glass assets (only needed for new sizes or colours later).

Steps:
1. Read DESIGN_SPEC.md and all four reference pages completely. Then explore this repo (framework, routing, styling approach, any existing contact-form API) and give me a short plan before you change anything.
2. Build the homepage as clean, typed, responsive components: Navbar (with MobileMenu), Hero (HeroVisual, DeployTerminal), StatsBar, ClientLogos, Services, TechStack, Process, SelectedWork, WhyTefrix, About, Contact, Footer, and MobileActionBar. Keep services, stats, process steps, values, clients, case studies and nav links in data arrays, with a short phone label where §13 gives one.
3. One codebase, two layouts: below 768px follow the mobile references exactly (shorter copy, 2-column tiles, swipe rows, vertical process, full-screen menu dialog, pinned action bar, phone contact page). From 768px up follow reference.html.
4. Put the colour, font, radius and spacing tokens from the spec in one place: CSS variables, or the project's theme if it already uses Tailwind, Mantine or similar.
5. Copy ./design-handoff/assets into the public/static folder. Use the hero video exactly as the spec describes: transparent VP9 WebM, no blend mode, muted and play() set from a ref, play only while visible, and the still image on Safari and under reduced motion.
6. Implement the motion with CSS plus IntersectionObserver (reveals, count-ups, process line, showing the phone action bar after the hero buttons scroll away), not CSS scroll timelines. Respect prefers-reduced-motion. Animate only transform and opacity. No animation library unless the project already has one.
7. The mobile menu must be an accessible dialog: focus trap, Esc and the close button, scroll lock, focus returned to the menu button.
8. Client logos and case studies are placeholders: render them from data and hide each section while its array is empty.
9. Keep /about, /services and /contact working; on phones /contact is the mobile contact page. Keep the Google Analytics tag and page titles/meta. Use tefrix-mark-on-dark.svg for the favicon.
10. Wire the contact form to the existing submission logic if there is one. Otherwise leave a clearly marked handler. Add validation, loading, success and error states.
11. Verify: run the dev server and take screenshots at 1440px and 390px (Playwright if available), plus the menu open and the contact page on a phone. Compare them with screens/ and fix differences. Confirm: no horizontal scroll at 375px, no black box behind the hero glass, the action bar never covers the hero buttons, and reduced motion shows the still image with no motion. Run Lighthouse on mobile and desktop and report the scores.

Rules:
- Use the copy, colours and fonts from the references and spec. Do not add gradients, glows, emoji, stock images or sections beyond what the references have.
- Subtle hover, tap (:active) and focus-visible states are fine.
- If something in the spec is unclear, follow the reference pages.
- When you finish, list what you built, any deviations, and what I still need to provide: client logos, case-study content, an official SVG of the logo if one exists, and the confirmations listed in DESIGN_SPEC.md §9.
