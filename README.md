# farzana0.github.io

Personal academic website of **Farzaneh Heidari** — PhD student at the Université de Montréal
and Mila – Quebec AI Institute, working on explainable AI, AI safety, mechanistic
interpretability, tensor networks, and Shapley values.

🌐 **Live:** https://farzana0.github.io

Built with **plain HTML, CSS, and vanilla JavaScript** — no build step, no framework, no
dependencies. Deploys directly on GitHub Pages.

---

## Design

Minimal, calm, and typography-led. Two font families (Inter + Newsreader), one accent colour,
near-white backgrounds, hairline borders, and generous whitespace. Dark/light mode with system
preference detection and a manual toggle. Responsive down to small screens.

## Data-driven content

All content lives in a **single data file** — [`assets/data/site.js`](assets/data/site.js).
Nothing about a project or paper is hardcoded in HTML; every page renders its cards, lists, and
detail pages from that file at load time.

To **add a project**, append an object to `SITE.projects`:

```js
{
  id: "my-project",                 // becomes project.html?id=my-project
  title: "My Project",
  subtitle: "One-line subtitle",
  category: "Research",             // Research | Master's | Bachelor's
  featured: true,                   // show on the homepage?
  status: { label: "In progress", kind: "progress" }, // accepted|published|review|progress
  tags: ["Tag A", "Tag B"],
  authors: "Farzaneh Heidari, …",
  venue: "…",
  teaser: "One-sentence description for the card.",
  overview: "…", motivation: "…",
  methods: ["…"], results: ["…"],
  figures: [{ src: "assets/img/xyz.png", caption: "…" }],
  poster: null,                     // or a URL
  links: { arxiv: "…", code: "…", pdf: "…", openreview: "…", doi: "…", poster: "…" },
  futureWork: "…"
}
```

To **add a publication**, append to `SITE.publications`; to **add news**, append to `SITE.news`.
The projects index, publications page, homepage, and sitemap all pick it up automatically.

## Structure

```
├── index.html            # home: hero, about, featured projects, papers, news, contact
├── about.html            # bio, education, interests, service
├── projects.html         # all projects, grouped by category (data-driven)
├── project.html          # single project template — renders project.html?id=<id>
├── publications.html     # full list with year filters (data-driven)
├── news.html             # updates timeline
├── cv.html               # CV overview (+ PDF slot when provided)
├── contact.html          # email and profiles
├── assets/
│   ├── css/style.css     # the whole design system
│   ├── js/main.js        # theme toggle, nav, scroll reveal
│   ├── js/render.js      # data → DOM renderers + icons
│   ├── data/site.js      # ← single source of truth for all content
│   └── img/              # favicon.svg, og-image.svg, figures, profile.jpg
├── sitemap.xml, robots.txt, .nojekyll
```

## Profile photo

The hero and About page look for **`assets/img/profile.jpg`**. If it is missing, a clean “FH”
monogram is shown instead (no broken image). Drop your photo at that path to use it.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Editing checklist

- Content → `assets/data/site.js`
- Design tokens (colours, spacing, fonts) → the `:root` block in `assets/css/style.css`
- CV PDF → add `assets/cv.pdf` and set `profile.links.cv` in the data file
- New page → copy any existing page's `<head>`/header/footer and add a nav link

## License

Code is MIT. Prose, figures, and the CV are © Farzaneh Heidari.
