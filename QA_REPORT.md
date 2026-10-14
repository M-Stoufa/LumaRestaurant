# QA report — LÜMA multi-page site (2026-10-13)

## What was built

Single anchored page → 5 real pages sharing one design system:

- `index.html` (home), `menu.html` (217 plats, recherche + filtres),
- `gallery.html` (19 photos, lightbox), `about.html`, `contact.html`,
- `assets/css/site.css`, `assets/js/site.js`, `assets/js/menu-data.js`.

## Tests performed

### Server & reachability — PASS
`python3 -m http.server 8123` in the site folder: all 5 pages + 3 shared
assets return HTTP 200.

### Internal links & assets — PASS
Script crawled every `href`/`src` in all pages: 0 broken, 0 escaping the
site folder. All 20 referenced photos exist on disk and return HTTP 200.
No page references the menu screenshots (`Menu/`, `Screenshot` absent).

### Navigation & current-page indicator — PASS (static)
Each page contains the shared header/footer with links to the other 4 pages
and exactly one `aria-current="page"` on the active link.

### Menu logic — PASS (Node DOM harness, `/tmp/domtest.js`)
- 23 category blocks, 24 filter buttons (`Toutes` + 23), 217 item rows.
- Category filter “Pizzas” → 1 block, 9 rows.
- Search “pizza” → 9 rows (category names included in search).
- Counter label renders (“9 plats affichés · 217 au total”).
- `node --check` clean for `menu-data.js` and `site.js` (also fixed one
  real bug found this way: search ignored category names).

### Menu accuracy — PASS with flags
Compared against all 15 unique menu screenshots: every legible line is in
`menu-data.js`. Fixed 6+ errors from the previous build (thé infusion 3 DT,
thé pignons 8 DT, 10 missing dishes incl. plateau 70 DT, bistrot, chevrette).
11 uncertain readings documented in `MENU_VERIFICATION.md`, none guessed.

### Images — PASS (static) / visual inspection NOT done in browser
- Highest-quality original kept for each photo; 172 px thumbnails excluded
  from gallery; new `dessert-cheesecake-logo.jpg` copied from the original
  (only copy; raw `Luma/` untouched).
- Every content `<img>` has `alt` + `width`/`height`; hero uses
  `fetchpriority="high"`, below-the-fold uses `loading="lazy"`.
- Pixel-level sharpness/cropping in a real browser was **not verified**
  (no browser automation available in this environment) — listed below.

### Accessibility spot-checks — PASS (static)
Skip link, `aria-pressed` filters, `aria-live` results, labelled lightbox
with Escape/arrow-key support, visible `:focus-visible`, `prefers-reduced-motion`
block, `tel:` links (`tel:+21697337588`), `rel="noopener noreferrer"` on
external links. Keyboard-only and screen-reader runs **not performed**.

### CSS — PASS (static)
Braces balanced (246/246), 3 media queries (980/720 px), no console errors
possible from CSS. `stylelint`/`htmlhint` not installed here — not run.

## NOT tested (honest gaps)

1. Rendered visual inspection at 360 / 390 / 768 / 1024 / 1440 px in a real
   browser (no browser tooling in this environment).
2. Touch navigation, drawer open/close, lightbox gestures on devices.
3. Screen-reader pass, Lighthouse scores, keyboard-only walkthrough.
4. Social/Maps destinations open correctly (URLs preserved from previous
   handoff; not re-verified live).

## Known benign notes

- Lightbox placeholder `<img id="lbImage">` intentionally has no
  `width`/`height` (source set by JS per photo).
- `noindex,nofollow` kept on all pages (private demo).
- Backup of pre-redesign site: `LUMA_BY_CHATGPT.backup-20261013/`.

## Screenshot audit — 2026-10-13 (round 2, all fixed & re-verified)

Method: Windows Brave driven from this environment — CLI screenshots plus
puppeteer-core over CDP (Windows-side Node). 18 captures: 5 pages ×
1440/768/390 full-page, plus mobile drawer open, lightbox open, and a
filtered-menu state. All re-shot after fixes; `scrollWidth == clientWidth`
on every capture (zero horizontal overflow).

Flaws found and fixed:

1. **Subpage hero titles invisible (critical).** `.page-hero .wrap` had no
   positioning, so the absolutely-positioned photo painted over the
   breadcrumb/title/intro on all 4 subpages. Fix: `.page-hero .wrap`
   gets `position:relative;z-index:1`.
2. **Home hero clipped at viewport edge (critical).** `.hero-inner`
   `width:100%` overrode `.wrap`'s centered max-width (proven by DOM
   measurement: hero x=0/w=1440 vs header x=100/w=1240). Fix: removed.
3. **Menu hero crop (high).** Portrait pizza photo cropped to fork tines,
   napkins and a candy jar. Replaced with `sharing-food-original.jpg`.
4. **About hero blur (high).** 640 px portrait upscaled into a 1440 px hero.
   Replaced with `restaurant-logo-photo.jpg` (+ `object-position` tune).
5. **Mobile search box 240 px tall (high).** `flex:1 1 240px` became height
   in the stacked toolbar. Fix: `flex:none;width:100%` on mobile.
6. **Mobile food cards (high).** Three cramped staggered cards with
   overflowing labels → horizontal snap-scroll strip on mobile.
7. **Filter wall (medium).** 24 chips in 3–5 wrapping rows → single
   horizontal scroll row with end-fade on all sizes.
8. **Gallery hero (medium).** Swapped dull mirror crop for
   `dessert-table.jpg`; gallery tile replaced with `seafood.jpg` to avoid
   same-page duplication. About split ⇄ hero images de-duplicated the
   same way; home contact visual now uses `food-table.jpg`.
9. **Header socials (low).** Text "ig"/"f" replaced with inline SVG icons.
10. **Mobile drawer (low).** Added tap-to-call + Instagram/Facebook links.

Verification after fixes: all 18 shots re-captured — hero titles visible on
all pages/sizes, chips scroll with active-state + counter ("9 plats
affichés · 217 au total"), drawer/lightbox/filter states render correctly,
no overflow anywhere. Remaining non-issues: occasional blank lazy images in
full-page captures are a capture-timing race only — a slow human-like scroll
probe loads 100% of images on all pages.
