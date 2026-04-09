# SBTCVM Project Hub (Public Web Version)

A web-accessible version of the SBTCVM Project Hub. The same content and tools as the Firefox sidebar extension, in a full-page browser layout.

## What's here

- `index.html` — main hub page (the entry point)
- `hub.css` — stylesheet
- `hub.js` — navigation logic and item list
- `content/` — bundled documents and tools:
  - `sbtcvm_tutorial.txt` — SBTCVM Architecture Tutorial
  - `ternoo_tutorial.txt` — TernOO Tutorial
  - `bases_tutorial.txt` — Counting Bases & The Ternary Advantage
  - `design_v0.2.txt` — TernOO Design Document v0.2
  - `inspector.html` (+ .css, .js) — TernOO Object Inspector tool
  - `opcode_ref.html` (+ .css, .js) — SBTCVM Opcode Reference tool

## Deploying to GitHub Pages

This folder is designed to be served as a static site. There are two common ways to deploy it:

### Option 1: Serve from a `docs/` folder on the main branch

1. Copy the contents of this folder into a `docs/` directory at the root of your repository
2. Commit and push
3. In your GitHub repo settings, go to **Pages**
4. Under "Build and deployment" set **Source** to "Deploy from a branch"
5. Set **Branch** to `main` and **Folder** to `/docs`
6. Save. GitHub will publish at `https://<username>.github.io/<repo>/`

### Option 2: Serve from a dedicated `gh-pages` branch

1. Create a new branch called `gh-pages` in your repository
2. Replace the contents of that branch with the contents of this folder
3. Push the branch
4. In repo settings → Pages, set source to the `gh-pages` branch
5. URL will be the same as Option 1

### Local preview

To check it works before deploying, serve it locally:

```bash
cd path/to/this/folder
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Updating content

To add a new artifact:

1. Drop the file (`.txt` for documents, `.html` for tools) into the `content/` folder
2. Edit `hub.js` and add an entry to the `items` array
3. Commit and push

## Credits

Hub built collaboratively by Stevo (SkepticusMaximus) and Claude.
SBTCVM Gen2-9 by Thomas Leathers.
April 2026.
