const fs = require('fs');
const path = require('path');

const { getArticles, isShortForm, ROOT_DIR } = require('./articles');

const README_PATH = path.join(ROOT_DIR, 'README.md');
const INDEX_PATH = path.join(ROOT_DIR, 'index.md');

/** The repo's front page, read on GitHub, where `.md` links resolve. */
/**
 * Everything below the article list, rebuilt on every run.
 *
 * This file is generated, so anything hand-written in it is lost on the next
 * article commit - which left the repo with nowhere to record that the hook
 * has to be enabled per clone. Setup notes belong here, in the template,
 * rather than in the file the template overwrites.
 */
const README_FOOTER = [
  '',
  '## Working on this repo',
  '',
  'Articles live in `_posts/`, named `YYYY-MM-DD-slug.md`, each carrying its',
  'title, description, date and tags in front matter. The permalink drops the',
  'date prefix, so `_posts/2026-06-02-partly-cloudy.md` publishes at',
  '`/partly-cloudy.html`.',
  '',
  'A post carrying `random-twalk` in its `categories` is a short piece: it is',
  'listed under that heading on `index.md` and gets its own feed at',
  '`/feed/random-twalk.xml`. Categories are feed memberships rather than one',
  'shelf per post, so a short R piece carries `[R, random-twalk]` and appears',
  'in both that feed and `/feed/R.xml`.',
  '',
  '`README.md` and `index.md` are both written by `scripts/update-readme.js`.',
  'Edit the articles, not these two files. To regenerate them on every commit,',
  'enable the hook once per clone:',
  '',
  '```sh',
  'git config core.hooksPath .githooks',
  '```',
  '',
  'The deploy workflow regenerates them on push as well, so the hook saves a',
  'round trip rather than being load-bearing.',
  '',
  'The R article is knitted, not written by hand: its figures, tables and',
  'printed output come from running the code. The source is',
  '`_source/tidylearn-reporting.Rmd` and the post is generated from it, so',
  'edit the source and re-render rather than editing the post:',
  '',
  '```sh',
  'Rscript scripts/render-r-post.R              # against the installed package',
  'Rscript scripts/render-r-post.R --pkg ../pkg # against a source checkout',
  '```',
  '',
].join('\n');

/**
 * The blogroll, on the published front page.
 *
 * R-bloggers will not accept a feed until the blog links back to it, and a
 * person checks for that link by hand before the feed is added. It has to be
 * on the site rather than inside a post, and `index.md` is generated, so it
 * belongs in this template rather than in the file the template overwrites.
 */
const INDEX_FOOTER = `
## Blogroll

- [R-bloggers](https://www.r-bloggers.com) — R news and tutorials from hundreds of R bloggers.
`;

function generateReadme(articles) {
  let content = '# Tech Perspectives\n\n## Articles\n\n';

  for (const article of articles) {
    const dateStr = article.date ? ` *(${article.date})*` : '';
    content += `- [${article.title}](./_posts/${article.file})${dateStr}
`;
  }

  if (fs.existsSync(path.join(ROOT_DIR, 'IDEAS.md'))) {
    content += "\n## Ideas\n\nConcepts I'm exploring for future pieces — see [IDEAS.md](./IDEAS.md).\n";
  }

  content += README_FOOTER;

  return content;
}

/**
 * The site's front page, which is a different document to the README.
 *
 * They were the same file until the articles gained front matter, and it could
 * not stay that way: a `.md` link is what a reader wants when browsing the
 * repo, and on the built site it serves raw markdown rather than the rendered
 * page. This one links to the pages Jekyll writes, and carries each article's
 * description so the index says what a piece is about rather than only naming
 * it.
 */
function renderArticle(article, level) {
  let content = `${'#'.repeat(level)} [${article.title}](./${article.slug}.html)\n\n`;
  if (article.description) content += `${article.description}\n\n`;
  if (article.date) content += `*(${article.date})*\n\n`;
  return content;
}

/**
 * The short-form shelf, which appears only once something is on it.
 *
 * A named section promises a cadence, and an empty one says the promise is
 * already being missed. So the index stays a flat list until the first short
 * piece exists, and the headings arrive with it.
 */
const SHORT_FORM_HEADING = 'Random Twalk';
const SHORT_FORM_BLURB = 'Short pieces on whatever turns up, usually something small I went and checked. [Feed](/feed/random-twalk.xml)';

function generateIndex(articles) {
  let content = '---\ntitle: Tech Perspectives\n---\n\n# Tech Perspectives\n\n';

  const short = articles.filter(isShortForm);
  const essays = articles.filter((a) => !isShortForm(a));

  if (short.length === 0) {
    content += 'Essays on AI, software and the shape of technical work.\n\n';
    for (const article of articles) content += renderArticle(article, 2);
  } else {
    // The blog's line rather than the essays', since with the shelf listed
    // below, an intro naming only the essays describes half the page.
    content += 'Writing on AI, software and the shape of technical work.\n\n';
    content += '## Essays\n\n';
    for (const article of essays) content += renderArticle(article, 3);
    content += `## ${SHORT_FORM_HEADING}\n\n${SHORT_FORM_BLURB}\n\n`;
    for (const article of short) content += renderArticle(article, 3);
  }

  content += INDEX_FOOTER;

  return content;
}

const articles = getArticles();
fs.writeFileSync(README_PATH, generateReadme(articles));
fs.writeFileSync(INDEX_PATH, generateIndex(articles));

console.log(`Updated README.md and index.md with ${articles.length} articles:`);
articles.forEach((a) => console.log(`  - ${a.title}`));
