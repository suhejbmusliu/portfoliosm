# Suhejb Musliu — Portfolio

Static portfolio site. No build step, no dependencies — plain HTML, CSS and JavaScript.

## Files

- `index.html` — page structure and content
- `styles.css` — all styling (design tokens at the top in `:root`)
- `script.js` — project data, SVG mockups, marquee, scroll animations
- `admin-demo.js` — the Zendo admin console simulation

## Zendo admin console demo

The Zendo section embeds a working, client-side simulation of the back office:

- **Overview** — KPI cards (GMV, commission revenue, pending payouts) with count-up
  animation and a revenue bar chart
- **Orders** — filterable order table; Ship → Deliver advances an order and makes the
  vendor's earnings payable
- **Vendors** — per-vendor commission rates (8–12%), gross sales, commission kept and
  unpaid balances
- **Payouts** — run a payout per vendor; generates a reference (PO-…) and a history entry
- **Access & roles** — the RBAC permission matrix; the Admin/Vendor switcher in the top
  bar re-scopes all data and locks admin-only pages
- **Live orders** — simulated orders stream in every ~4s while the section is visible
  (pauses automatically when the tab is hidden; toggle with the "Live orders" pill)
- **Live storefront** — embeds the real zendo.mk in an iframe (zendo.mk currently sends
  no `X-Frame-Options` header; the fallback link covers the case where that changes)

Seeded numbers are consistent: every commission, balance and payout is computed from the
order data with the vendor's rate, never hard-coded.

## Run locally

Open `index.html` in a browser, or serve the folder:

```
python -m http.server 5517
```

## Deploy to Vercel

```
npm i -g vercel
vercel
```

Or drag the folder into vercel.com/new — it deploys as-is (static).

## Personalize

1. **Photo** — replace the `SM` monogram in `.avatar-core` (index.html) with an `<img>` of yourself.
2. **Project screenshots** — live in `assets/<id>.png` where `<id>` is one of:
   `zendo, nexon, shkdituria, saqipi, keramika, qendraera, birent, pandamind`.
   Overwrite any of them with your own screenshot (keep the same filename; ~1280px wide,
   16:10-ish, top of the page). If a file is missing or broken, the card automatically
   falls back to the hand-drawn SVG mockup — nothing breaks.
3. **GitHub link** — add your GitHub profile URL to the nav icons and footer (currently only LinkedIn + email).
4. **Experience dates** — the timeline dates in `index.html` (`#experience`) are estimates; adjust to the real ones.
5. **Contact form** — currently composes an email via `mailto:`. For a real form, swap in Formspree or a serverless function.

Note: the current `assets/zendo.png` was captured with the site's promo popup and cookie
banner open — replace it with a clean screenshot when you take yours.
