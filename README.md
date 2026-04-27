# Cynarax MedIndia

Doctor-led GLP-1 weight-loss telehealth, designed for Indian patients. This repo contains the marketing landing page.

## Stack

Plain HTML, CSS, and vanilla JavaScript. No build step. Deploys to any static host (GitHub Pages, Cloudflare Pages, Netlify, S3 + CloudFront).

## Files

- `index.html` — landing page markup
- `styles.css` — design system, components, responsive layout
- `app.js` — scroll reveals, count-up stats, FAQ accordion, mobile drawer, sticky-nav border, hero parallax

## Local preview

Open `index.html` directly in a browser, or run any static server from the repo root:

```bash
python -m http.server 8000
# then visit http://localhost:8000/
```

## Deploying to GitHub Pages

1. Repo Settings → Pages
2. Source: **Deploy from a branch**
3. Branch: `main`, Folder: `/ (root)`
4. Save. Site goes live at `https://<user>.github.io/MedIndia/` within a minute.

## Replacing placeholders before launch

The page ships with gradient placeholders in three spots — search the HTML for `REPLACE:` to find them:

- Hero portrait
- Six before/after tiles
- Meals plate

Doctor names, testimonials, press mentions, pricing, and statistics are also illustrative and should be replaced with verified content before going public.
