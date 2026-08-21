const fs = require('fs');
const path = require('path');

const { getArticles, ROOT_DIR } = require('./articles');

const README_PATH = path.join(ROOT_DIR, 'README.md');
const INDEX_PATH = path.join(ROOT_DIR, 'index.md');

/** The repo's front page, read on GitHub, where `.md` links resolve. */
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

  return content;
}

const articles = getArticles();
fs.writeFileSync(README_PATH, generateReadme(articles));
fs.writeFileSync(INDEX_PATH, generateIndex(articles));

console.log(`Updated README.md and index.md with ${articles.length} articles:`);
articles.forEach((a) => console.log(`  - ${a.title}`));
