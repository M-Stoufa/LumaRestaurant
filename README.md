# LÜMA — Italian Kitchen & More · multi-page site (private demo)

A responsive static multi-page website for LÜMA — Italian Kitchen & More, Le Kef.
Built from the authentic photos and menu screenshots supplied in the project handoff.
No AI-generated imagery and no stock photos are used.

## Pages

- `index.html` — Home: hero, menu preview, atmosphere, gallery preview, contact preview
- `menu.html` — Complete menu (217 entries, 23 categories) with live search + category filters
- `gallery.html` — Full photo gallery (19 authentic photos) with accessible lightbox
- `about.html` — The restaurant: documented identity only, no invented story
- `contact.html` — Address, telephone, Instagram, Facebook, Google Maps directions

Shared design system: `assets/css/site.css`. Shared behaviour: `assets/js/site.js`.
Menu content (separate from presentation): `assets/js/menu-data.js`.

## Run locally

From this directory:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

No build step, no backend, no dependencies.

## Business information (verified from project materials only)

- Address: Avenue Mongi Slim, Le Kef 7100, Tunisie
- Telephone: +216 97 337 588 (`tel:+21697337588`)
- Instagram: https://www.instagram.com/luma_italian_kitchen/
- Facebook: https://www.facebook.com/cocktail4saisons.kef/
- Maps: Google Maps search “LUMA Avenue Mongi Slim Le Kef”

No opening hours, ratings, reviews, awards, or history are published — none were
verified. See `MENU_VERIFICATION.md` for menu sources and `QA_REPORT.md` for tests.

## Important

Private demonstration, not an approved official site. `noindex,nofollow` is set
on every page. Verify social URLs, address, phone and all 217 menu prices with
the owner before any public launch. Do not deploy or submit to search engines.
Original assets are preserved: raw photos in `Luma/`, menu screenshots in
`Menu/`, pre-redesign backup at `LUMA_BY_CHATGPT.backup-20261013/`.
