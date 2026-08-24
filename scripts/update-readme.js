const fs = require('fs');
const path = require('path');

const { getArticles, ROOT_DIR } = require('./articles');

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
function generateIndex(articles) {
  let content = '---\ntitle: Tech Perspectives\n---\n\n# Tech Perspectives\n\n';
  content += 'Essays on AI, software and the shape of technical work.\n\n';

  for (const article of articles) {
    const dateStr = article.date ? ` *(${article.date})*` : '';
    content += `## [${article.title}](./${article.slug}.html)

`;
    if (article.description) content += `${article.description}\n\n`;
    if (dateStr) content += `${dateStr.trim()}\n\n`;
  }

  content += INDEX_FOOTER;

  return content;
}

const articles = getArticles();
fs.writeFileSync(README_PATH, generateReadme(articles));
fs.writeFileSync(INDEX_PATH, generateIndex(articles));

console.log(`Updated README.md and index.md with ${articles.length} articles:`);
articles.forEach((a) => console.log(`  - ${a.title}`));
