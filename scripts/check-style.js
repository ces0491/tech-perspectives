/**
 * The writing rules from CLAUDE.md, enforced.
 *
 * These were checked by hand, which is why they drifted. Four of the ten front
 * matter descriptions had never been read against the article underneath them:
 * one promised a dependency "can cost you years" while its own body said weeks.
 * Bodies and descriptions are both checked here, because the description is
 * what a search result shows and it is the easiest text in the repo to forget.
 *
 * Generated content is skipped: fenced code, its printed output, gt's HTML and
 * stylesheet. A rule about prose has nothing to say about a column name.
 *
 * Some phrasings are deliberate and stay. Those live in ALLOWED, each with the
 * reason, so an exemption is a decision on the record rather than a hole.
 */

const fs = require('fs');
const path = require('path');

const { getArticles, POSTS_DIR } = require('./articles');

/** @see CLAUDE.md, "Writing Style". */
const RULES = [
  {
    name: 'hyperbole',
    pattern:
      /\b(comprehensive|robust|seamless(?:ly)?|game.chang\w+|revolutionar\w+|brilliantly|effortless\w*|near-infinite|staggering|drastically|massively)\b/gi,
    note: 'inflates without evidence',
  },
  {
    name: 'false-precision',
    pattern: /\b(?:about|roughly|around|nearly|almost|approximately|just over|just under)\s+\d/gi,
    note: 'a specific number invented for effect; use a real measurement or an honest vague quantifier',
  },
  {
    name: 'announce-the-point',
    pattern:
      /(?:Here(?:'?s| is) (?:the|what|why|how|where)|The (?:thing|point|interesting part|frustrating part|actual lesson)\b[^.]{0,30}\bis\b|What'?s (?:interesting|frustrating|notable|useful)\b[^.]{0,20}\bis\b|Notice that|which is the actual|worth saying plainly|is the whole (?:problem|point))/g,
    note: 'the sentence after the announcement is the content; start there',
  },
  {
    name: 'hedge',
    pattern: /\b(?:to be honest|let'?s be honest|I'?ll be direct|to be fair|the honest (?:answer|reading))\b/gi,
    note: 'performative qualifier; name the specific uncertainty instead',
  },
  {
    name: 'contrastive-tic',
    pattern: /\b(?:not just|isn'?t just|is not just|aren'?t just|not only)\b/gi,
    note: '"it\'s not X, it\'s Y"; state the point directly',
  },
  {
    // The same tic with the halves split by a dash, which the rule above
    // never saw. It was the most common form in the corpus by some way.
    name: 'contrastive-dash',
    pattern:
      /\b(?:isn'?t|aren'?t|wasn'?t|weren'?t|doesn'?t|don'?t|didn'?t|is not|are not|was not|not)\b[^.\n]{0,60}[—-]{1,2}\s*(?:it|they|that|this|what)(?:'?s|'?re| is| are| was)\b/gi,
    note: 'the "X — it\'s Y" form of the same tic; make the point in one clause',
  },
  {
    // "isn't only" and "isn't merely" read as hedged versions of the same
    // move, and passed the tic rule because it names `just` and `only`
    // separately rather than the negation that precedes them.
    name: 'hedged-contrast',
    pattern: /\b(?:isn'?t|aren'?t|wasn'?t|is not|are not|was not)\s+(?:only|merely|simply|purely)\b/gi,
    note: 'a softened "not X, but Y"; say what it is',
  },
  {
    // A heading that states the conclusion its own section argues. These
    // collected at the end of a piece, where the section under them was
    // usually the article said a second time.
    // Narrow on purpose: "Why it came apart" and "What I changed" name their
    // section, which is what a heading is for. What this catches is a heading
    // claiming significance the section below has to earn.
    name: 'heading-asserts',
    pattern:
      /^#{2,6}\s+(?:Why (?:This|It|These|We) (?:Matters|Matter|Is Useful|Are Useful)|Why I (?:think|believe)|What This (?:Matters|Leaves|Means)|The (?:takeaway|deeper realisation|deeper realization|real lesson|actual point|bigger picture)|My Take|Conclusion)\b/gi,
    note: 'the section proves it; a heading that asserts it says it twice',
  },
  {
    name: 'unchecked-quantifier',
    pattern: /\b(?:nobody|no one|everyone|everybody) (?:checks|does|has|knows|tests|reads|uses)\b/gi,
    note: 'a claim about people rather than evidence; check it or drop it',
  },
];

/**
 * Deliberate exceptions. `where` must appear in the matched line, so an
 * exemption cannot quietly widen to cover a new instance elsewhere.
 */
const ALLOWED = [
  {
    file: '2026-05-04-ai-average-human-problem.md',
    rule: 'contrastive-tic',
    where: 'cadence',
    why: 'the essay quotes the construction as its subject',
  },
  {
    file: '2026-05-04-bounding-ai-code-reviews.md',
    rule: 'contrastive-tic',
    where: 'Pass/fail criteria',
    why: 'a list item where terseness is the form, and it matches the scope skill',
  },
  {
    file: '2026-03-20-tech-fashion-cycles.md',
    rule: 'hyperbole',
    where: 'presented as revolutionary',
    why: 'quotes the marketing claim rather than making it',
  },
];

/** Prose only. Everything a chunk printed is somebody else's text. */
function proseLines(raw) {
  const lines = raw.split('\n');
  const out = [];
  let inFence = false;
  let inStyle = false;
  let inFrontMatter = false;

  lines.forEach((line, i) => {
    const s = line.trim();

    if (i === 0 && s === '---') {
      inFrontMatter = true;
      return;
    }
    if (inFrontMatter) {
      // The description is prose and is checked; the rest is machine-read.
      if (s === '---') inFrontMatter = false;
      else if (/^(description:|\s+\S)/.test(line) && !/^(title|date|categories|tags|output):/.test(s)) {
        out.push({ n: i + 1, text: line.replace(/^description:\s*>-\s*/, '') });
      }
      return;
    }

    if (s.startsWith('```')) {
      inFence = !inFence;
      return;
    }
    if (inFence) return;
    if (s.startsWith('<style')) inStyle = true;
    if (inStyle) {
      if (s.includes('</style>')) inStyle = false;
      return;
    }
    // gt tables, kable pipe tables, and collapsed chunk output.
    if (/^\s*(<|\||#>)/.test(line)) return;

    out.push({ n: i + 1, text: line });
  });

  return out;
}

function exempt(file, rule, text) {
  return ALLOWED.some((a) => a.file === file && a.rule === rule && text.includes(a.where));
}

const findings = [];

for (const article of getArticles()) {
  const file = article.file;
  const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf-8');

  for (const { n, text } of proseLines(raw)) {
    for (const rule of RULES) {
      rule.pattern.lastIndex = 0;
      let m;
      while ((m = rule.pattern.exec(text)) !== null) {
        if (exempt(file, rule.name, text)) continue;
        findings.push({ file, line: n, rule: rule.name, hit: m[0], note: rule.note });
      }
    }
  }
}

if (findings.length > 0) {
  console.error(`${findings.length} style problem(s):\n`);
  for (const f of findings) {
    console.error(`  ${f.file}:${f.line}  [${f.rule}]  "${f.hit}"`);
    console.error(`      ${f.note}`);
  }
  console.error(
    '\nFix the wording, or add a deliberate exception to ALLOWED in scripts/check-style.js with the reason.'
  );
  process.exit(1);
}

console.log(
  `OK: ${getArticles().length} articles, bodies and descriptions, ${RULES.length} rules, ${ALLOWED.length} recorded exceptions.`
);
