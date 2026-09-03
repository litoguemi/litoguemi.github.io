# litoguemi.github.io

Personal portfolio of **Miguel Jarama** — software analyst developer exploring AI, machine learning, LLMs and sustainable tech from Germany.

![Deployed on GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-✓-2f6b4f)

## About the site

A single-page, static portfolio built **by hand** — no frameworks, no build step, no cookies:

- **HTML5** semantics with SEO / Open Graph metadata
- **CSS** custom properties powering a light & dark theme (follows system preference, with a manual toggle)
- **Vanilla JavaScript** only — smooth reveals, mobile nav, theme persistence
- Inline SVG icons (no icon font), Google Fonts (`Fraunces` + `Inter`)
- Fully responsive with `prefers-reduced-motion` support

## Sections

1. **Hero** — who I am and what I care about
2. **Work** — areas I focus on (AI/ML, LLMs & chatbots, environmental data, full-stack)
3. **Projects** — selected repositories, pulled live from GitHub's auto-generated preview cards
4. **About** — story, location and collaboration interests
5. **Contact** — GitHub, LinkedIn and my blog

## Local development

Any static server works, for example:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000>.

## Deploying

Pushing to the `main` branch deploys automatically to
<https://litoguemi.github.io/> via GitHub Pages.

## Editing the project list

The Projects grid lives in `index.html`. Each card links to one of my
repositories. Card thumbnails are **local representative images** in
`assets/img/projects/<project>.jpg`; if one is missing they gracefully fall
back to the repository's GitHub preview card, then to a designed SVG cover.

Photo sources and licenses are tracked in
[`assets/img/projects/CREDITS.md`](assets/img/projects/CREDITS.md).

## Adding a portrait

To use a real photo instead of the "MJ" monogram in the hero, drop an image at
`images/portrait.jpg` and replace the `.avatar-inner` content in `index.html`
with an `<img>` tag.

---

&copy; Miguel Jarama · Crafted with restraint.
