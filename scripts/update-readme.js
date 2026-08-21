const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const README_PATH = path.join(ROOT_DIR, 'README.md');
const INDEX_PATH = path.join(ROOT_DIR, 'index.md');
// The articles are Jekyll posts, so they are dated filenames in `_posts/`.
const POSTS_DIR = path.join(ROOT_DIR, '_posts');

const NON_ARTICLE_FILES = new Set(['README.md', 'IDEAS.md', 'index.md']);

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

/**
 * The YAML front matter block, as a flat map.
 *
 * Deliberately not a YAML parser. The three keys read here are written by this
 * repo in one shape - a quoted scalar, a date, or a `>-` folded block - and a
 * dependency for that would have to be installed in CI before the README could
 * be regenerated.
 */
function parseFrontMatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};

  const fields = {};
  const lines = match[1].split(/\r?\n/);

  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i];
    const pair = line.match(/^([a-zA-Z_]+):\s*(.*)$/);
    if (!pair) continue;

    const [, key, rawValue] = pair;
    let value = rawValue.trim();

    // A folded block: the value is the indented lines that follow.
    if (value === '>-' || value === '>' || value === '|') {
      const folded = [];
      while (i + 1 < lines.length && /^\s+\S/.test(lines[i + 1])) {
        folded.push(lines[i + 1].trim());
        i += 1;
      }
      value = folded.join(' ');
    }

    // A quoted scalar. Single quotes are what this repo uses for a title
    // containing double quotes, so nothing inside needs unescaping. The
    // double-quoted branch defers to JSON, whose escape rules are the same
    // ones YAML uses here and which a hand-rolled regex got wrong.
    if (value.startsWith("'") && value.endsWith("'")) {
      value = value.slice(1, -1).replace(/''/g, "'");
    } else if (value.startsWith('"') && value.endsWith('"')) {
      try {
        value = JSON.parse(value);
      } catch {
        value = value.slice(1, -1);
      }
    }

    fields[key] = value;
  }

  return fields;
}

function extractTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1] : null;
}

/** `2026-05-04` as `May 4, 2026`, which is how the listings read. */
function formatIsoDate(iso) {
  const match = iso.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) return null;
  const [, year, month, day] = match;
  return `${MONTHS[Number(month) - 1]} ${Number(day)}, ${year}`;
}

function extractDate(content) {
  const italicMatch = content.match(/\*([A-Z][a-z]+ \d{1,2}, \d{4})\*\s*$/);
  if (italicMatch) return italicMatch[1];

  const dateMatch = content.match(/([A-Z][a-z]+ \d{1,2}, \d{4})/);
  return dateMatch ? dateMatch[1] : null;
}

function parseDate(dateStr) {
  if (!dateStr) return new Date(0);
  return new Date(dateStr);
}

function getArticles() {
  if (!fs.existsSync(POSTS_DIR)) return [];
  const files = fs.readdirSync(POSTS_DIR);
  const articles = [];

  for (const file of files) {
    if (NON_ARTICLE_FILES.has(file) || !file.endsWith('.md')) continue;

    const filePath = path.join(POSTS_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const front = parseFrontMatter(content);

    // Front matter is the source of truth where it exists; the heuristics
    // below are what read this repo before it had any, and still cover a draft
    // that has not been given a header yet.
    const title = front.title || extractTitle(content);
    const date = (front.date && formatIsoDate(front.date)) || extractDate(content);
    const description = front.description || null;

    if (title) {
      const slug = file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '');
      articles.push({ file, slug, title, date, description, parsedDate: parseDate(date) });
    }
  }

  articles.sort((a, b) => b.parsedDate - a.parsedDate);
  return articles;
}

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
