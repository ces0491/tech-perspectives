const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.join(__dirname, '..');
const README_PATH = path.join(ROOT_DIR, 'README.md');

function extractTitle(content) {
  const match = content.match(/^#\s+(.+)$/m);
  return match ? match[1] : null;
}

function extractDate(content) {
  // Look for date at the end of the file (e.g., *October 13, 2025*)
  const italicMatch = content.match(/\*([A-Z][a-z]+ \d{1,2}, \d{4})\*\s*$/);
  if (italicMatch) return italicMatch[1];

  // Look for date in format "Month Day, Year" anywhere
  const dateMatch = content.match(/([A-Z][a-z]+ \d{1,2}, \d{4})/);
  return dateMatch ? dateMatch[1] : null;
}

function parseDate(dateStr) {
  if (!dateStr) return new Date(0);
  return new Date(dateStr);
}

function getArticles() {
  const files = fs.readdirSync(ROOT_DIR);
  const articles = [];

  for (const file of files) {
    if (file === 'README.md' || !file.endsWith('.md')) continue;

    const filePath = path.join(ROOT_DIR, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    const title = extractTitle(content);
    const date = extractDate(content);

    if (title) {
      articles.push({
        file: file.replace('.md', ''),
        title,
        date,
        parsedDate: parseDate(date)
      });
    }
  }

  // Sort by date descending (newest first)
  articles.sort((a, b) => b.parsedDate - a.parsedDate);
  return articles;
}

function generateReadme(articles) {
  let content = `# Tech Perspectives

## Articles

`;

  for (const article of articles) {
    const dateStr = article.date ? ` *(${article.date})*` : '';
    content += `- [${article.title}](./${article.file})${dateStr}\n`;
  }

  return content;
}

const articles = getArticles();
const readme = generateReadme(articles);
fs.writeFileSync(README_PATH, readme);

console.log(`Updated README.md with ${articles.length} articles:`);
articles.forEach(a => console.log(`  - ${a.title}`));
