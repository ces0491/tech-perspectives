/**
 * The checks that run before anything is published.
 *
 * The blog deployed on push with nothing verifying it, so a malformed front
 * matter block or a broken `_config.yml` would reach the live site and the
 * first sign of it would be the site itself. These are the failures that are
 * silent rather than loud: a post Jekyll skips, or a description that falls
 * back to the site's and reads identically on every page in a search result.
 */

const fs = require('fs');
const path = require('path');

const { getArticles, parseFrontMatter, POSTS_DIR, ROOT_DIR } = require('./articles');

const problems = [];

function fail(file, message) {
  problems.push(`${file}: ${message}`);
}

/** A description that is missing, borrowed or truncated in a search result. */
const MIN_DESCRIPTION = 60;
const MAX_DESCRIPTION = 200;

function checkPosts() {
  if (!fs.existsSync(POSTS_DIR)) {
    problems.push('_posts/ does not exist; there is nothing to publish');
    return;
  }

  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith('.md'));
  if (files.length === 0) problems.push('_posts/ holds no articles');

  for (const file of files) {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');

    if (!raw.startsWith('---')) {
      fail(file, 'no front matter, so Jekyll will not publish it as a post');
      continue;
    }

    const front = parseFrontMatter(raw);

    if (!front.title) fail(file, 'no title');
    if (!front.date) fail(file, 'no date');
    if (!front.description) {
      fail(file, 'no description, so it inherits the site description and reads identically to every other page in a search result');
    } else if (front.description.length < MIN_DESCRIPTION) {
      fail(file, `description is ${front.description.length} characters; under ${MIN_DESCRIPTION} says too little`);
    } else if (front.description.length > MAX_DESCRIPTION) {
      fail(file, `description is ${front.description.length} characters; over ${MAX_DESCRIPTION} is truncated in a result`);
    }

    // Jekyll takes the date from the filename and the front matter, and a
    // disagreement between them is a post dated one way and ordered another.
    const named = file.match(/^(\d{4}-\d{2}-\d{2})-/);
    if (!named) {
      fail(file, 'filename does not start with YYYY-MM-DD, so Jekyll will not treat it as a post');
    } else if (front.date && front.date !== named[1]) {
      fail(file, `front matter says ${front.date} but the filename says ${named[1]}`);
    }
  }
}

/** Descriptions are what the checks above exist to protect; duplicates defeat them. */
function checkDistinct() {
  const seen = new Map();
  for (const article of getArticles()) {
    if (!article.description) continue;
    const first = seen.get(article.description);
    if (first) fail(article.file, `description is identical to ${first}`);
    else seen.set(article.description, article.file);
  }
}

/** The published site needs an origin and a name to serve from. */
function checkConfig() {
  const config = path.join(ROOT_DIR, '_config.yml');
  if (!fs.existsSync(config)) {
    problems.push('_config.yml is missing');
    return;
  }
  const text = fs.readFileSync(config, 'utf-8');
  const url = text.match(/^url:\s*(\S+)/m);
  if (!url) problems.push('_config.yml has no url, so canonical tags and the feed have no origin');

  const cname = path.join(ROOT_DIR, 'CNAME');
  if (fs.existsSync(cname) && url) {
    const host = fs.readFileSync(cname, 'utf-8').trim();
    if (!url[1].includes(host)) {
      problems.push(`CNAME says ${host} but url says ${url[1]}; the site would serve on one and advertise the other`);
    }
  }
}

checkPosts();
checkDistinct();
checkConfig();

if (problems.length > 0) {
  console.error(`${problems.length} problem(s):\n`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

console.log(`OK: ${getArticles().length} articles, front matter valid, descriptions distinct.`);
