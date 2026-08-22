# Tech Perspectives

## Articles

- [Is This Package Safe to Depend On?](./_posts/2026-08-22-is-this-package-safe-to-depend-on.md) *(August 22, 2026)*
- [From Model to Report: How tidylearn Simplifies ML Reporting](./_posts/2026-08-21-tidylearn-reporting.md) *(August 21, 2026)*
- [Partly Cloudy: Forecasting Your Needs in a Fragmented Cloud](./_posts/2026-06-02-partly-cloudy.md) *(June 2, 2026)*
- [The Average Human Problem: Why AI "Sounds Like AI"](./_posts/2026-05-04-ai-average-human-problem.md) *(May 4, 2026)*
- [Lying Is Lying: AI and the Standard We Already Apply](./_posts/2026-05-04-ai-lying-is-lying.md) *(May 4, 2026)*
- [How Long Is a Piece of String? Bounding AI Code Reviews](./_posts/2026-05-04-bounding-ai-code-reviews.md) *(May 4, 2026)*
- [Everything Old Is New Again: Technology's Fashion Cycles](./_posts/2026-03-20-tech-fashion-cycles.md) *(March 20, 2026)*
- [Squashing New Hardware Headaches](./_posts/2026-02-11-ai-assisted-laptop-migration.md) *(February 11, 2026)*
- [Musings on the Future of Programming Languages](./_posts/2025-12-12-the-future-of-programming-languages.md) *(December 12, 2025)*
- [AI: The Final Nail in the Coffin for Proprietary Software Languages?](./_posts/2025-09-11-ai-end-of-proprietary-platforms.md) *(September 11, 2025)*

## Ideas

Concepts I'm exploring for future pieces — see [IDEAS.md](./IDEAS.md).

## Working on this repo

Articles live in `_posts/`, named `YYYY-MM-DD-slug.md`, each carrying its
title, description, date and tags in front matter. The permalink drops the
date prefix, so `_posts/2026-06-02-partly-cloudy.md` publishes at
`/partly-cloudy.html`.

`README.md` and `index.md` are both written by `scripts/update-readme.js`.
Edit the articles, not these two files. To regenerate them on every commit,
enable the hook once per clone:

```sh
git config core.hooksPath .githooks
```

The deploy workflow regenerates them on push as well, so the hook saves a
round trip rather than being load-bearing.
