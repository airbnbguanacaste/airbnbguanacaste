# Explore Guanacaste

A simple bilingual (English / Español) neighborhood guide for guests of two Airbnb apartments in Barrio Guanacaste, Tegucigalpa. Built with React + Vite. No backend, no database, no paid services.

## What's inside

```
src/data/source-places.csv   <- your Google My Maps export (the original data)
src/data/places.json         <- generated from the CSV (the site reads this)
src/i18n.js                  <- all English and Spanish text
src/config.js                <- map link and optional map embed
src/components/              <- page pieces (header, cards, filters, map)
src/styles.css               <- colors and design
scripts/build-places.mjs     <- turns the CSV into places.json
scripts/verify.mjs           <- checks the data, links, filters and translations
netlify.toml                 <- Netlify settings
```

## Preview on your computer

You need [Node.js](https://nodejs.org) 20 or newer (the LTS download is fine).

```bash
npm install      # once, downloads the tools
npm run dev      # starts the site; open the address it prints (usually http://localhost:5173)
```

To check everything is correct: `npm run verify`. To make the production version: `npm run build` (the finished site appears in `dist/`).

## Publish on Netlify

**Option A: from GitHub (recommended, updates automatically)**

1. Create a free account at [github.com](https://github.com) and a new repository. Upload this project's files (do **not** upload `node_modules` or `dist`).
2. Create a free account at [netlify.com](https://www.netlify.com).
3. In Netlify: **Add new site → Import an existing project → GitHub**, then choose your repository.
4. Netlify reads `netlify.toml` automatically (build command `npm run build`, publish folder `dist`). Click **Deploy**.
5. In about a minute you get a link like `https://something.netlify.app`. Change it under **Site configuration → Change site name**.

**Option B: drag and drop (no GitHub)**

1. On your computer run `npm install` then `npm run build`.
2. In Netlify open **Sites**, and drag the generated `dist` folder onto the "drag and drop" area.

## Updating the places

1. In Google My Maps, export your layer as CSV (the menu next to the layer name → **Export data → CSV**).
2. Replace `src/data/source-places.csv` with the new file.
3. Run `npm run build` (or push to GitHub and Netlify rebuilds). `places.json` is regenerated automatically.

The CSV needs three columns: `WKT`, `name`, `description`. The `description` must be one of: `Attractions`, `Restaurants / Bars`, `Street Food`, `Coffee Shops`, `Groceries`, `Transport`. Anything else is shown under "Other". Coordinates are `POINT (longitude latitude)`; if a row has no valid coordinates, its button opens a Google Maps search for the business name instead.

## The map

The "Explore the map" button opens your Google My Maps using the public *viewer* link. Your original link ended in `/edit`, which only works for the owner, so the site uses the viewer version of the same map. Make sure the map is shared as **Anyone with the link can view** (My Maps → **Share**), otherwise guests will be asked to sign in.

### Embedding the map (optional)

The site works without this. If you want the map shown inside the page:

1. Open your map in Google My Maps (signed in).
2. Click the **⋮** menu next to the map title → **Embed on my site**.
3. Copy the `src="…"` address from the code shown (it looks like `https://www.google.com/maps/d/embed?mid=…`).
4. Paste it into `MAP_EMBED_URL` in `src/config.js`, save, and rebuild.

Leave `MAP_EMBED_URL` empty (`''`) to show only the button.

## Changing text, colors and photos

- **Text:** edit `src/i18n.js`. Business names are never translated; they come from the CSV.
- **Colors:** edit the values at the top of `src/styles.css`.
- **Photos (optional):** none are included. To add one, set `"image"` for a place in `src/data/places.json` to a file in the `public/` folder (for example `"/photos/cafe.jpg"`). Only use photos you own or have permission to use. Note: `places.json` is regenerated from the CSV by `npm run build`, so for permanent photos add them in `scripts/build-places.mjs` or ask for help wiring a small `photos.json`.

## Honest content

The site shows only what is in your CSV: names, categories and coordinates. Descriptions are short and generic per category. There are no ratings, prices, opening hours, walking times or photos, and the footer reminds guests to check hours on Google Maps.
