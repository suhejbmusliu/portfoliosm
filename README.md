# Suhejb Musliu — CV website

A static CV page with no build step and no dependencies: plain HTML, CSS and JavaScript.

## Files

- `index.html` — all CV content: header, profile, experience, Zendo project (with challenges), skills, education, languages
- `styles.css` — page layout, design tokens in `:root`, and the print stylesheet used by "Save as PDF"
- `script.js` — tech marquee, project data (`PROJECTS`), SVG fallback mockups, scroll animations
- `assets/` — `profile.jpg` plus one screenshot per project (`<id>.png`)
- `_archive/` — the removed Zendo admin-panel demo (`admin-demo.js`, `demo.css`), not used by the page

## Editing content

- **Zendo challenges**: edit the five `<article class="challenge">` blocks in `index.html`.
- **Other projects**: edit the `PROJECTS` array in `script.js` (`name`, `type`, `desc`, `tech`, `url`, `label`, and optionally `img`).
- **Screenshots**: overwrite `assets/<id>.png`. If a file is missing, the hand-drawn SVG mockup is shown instead.
- After editing CSS or JS, bump the `?v=` number on the matching `<link>`/`<script>` tag in `index.html`, or press Ctrl+F5.

## Save as PDF

The "Save as PDF" button opens the browser print dialog. The print stylesheet hides the
navigation, the marquee, the screenshots and the demo, so the result is a clean text CV.

## Run locally / deploy

```
python -m http.server 5517
```

Deploy by dragging the folder into vercel.com/new, or run `vercel` in this folder.
