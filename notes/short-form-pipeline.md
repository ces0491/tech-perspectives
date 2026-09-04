# Short-form pipeline

Banked material for Random Twalk. `IDEAS.md` holds essay concepts — things to
think through. These are different: a quick bite that lands on the observation
itself, in a paragraph, with no set-up and nothing a reader has to have read
first. Closer to a social post than to a short article.

**A candidate qualifies if:** the observation is surprising, checkable by a
reader in a couple of minutes, and complete in a paragraph. If it needs a
section to get going, a code block to make its point, or a sequence of events to
carry it, it is not this.

Triage kit rule: keep three finished and banked at all times. Aim to capture
three to four times what gets published.

**Bar revised 4 September 2026.** It previously read "complete in 300–500 words
without a build-up", which describes a short article. The first piece written to
it came out at 567 words with a build-up, a code block and a narrative, and
shipped as an ordinary post instead — see
[*Pulling on Threads*](../_posts/2026-09-04-scoring-bands-i-never-checked.md).
A piece whose content is the sequence — found this, pulled the thread, found
worse — is an essay however short it is. It goes in `_posts` without the
category, and the generator leaves the index ungrouped until an actual short
piece exists.

The six banked entries below were written as summaries and all six already sit
at or near a paragraph, so none needs re-triaging against the new bar. What
changes is that they get trimmed to land rather than expanded to fill.

---

## Banked

### 1. The CRAN API has a `revdeps` field that isn't the reverse dependency count

`https://crandb.r-pkg.org/ggplot2/all` returns `revdeps: 410`. The real number
is 4,833. dplyr and jsonlite both come back with 63, though dplyr has three
times as many actual dependents. httr2 has no value at all.

The right endpoint is `/-/revdeps/{package}`, which agrees with
`tools::package_dependencies()` to within a handful of packages.

Verified live 3 September 2026. Two curl commands reproduce it. The general
point — a plausible wrong number is much harder to notice than a missing one —
comes free and doesn't need stating twice.

*Status: ready. Currently a subsection of `is-this-package-safe-to-depend-on`,
where most readers won't reach it.*

### 2. gt escapes newlines as `&#10;`, which is invisible inside `<style>`

Correct in markdown, wrong in a `<style>` element: browsers don't decode
entities there, so the whole stylesheet collapses into one unparsed line and the
table headers render invisible. The page looks broken in a way that points
nowhere near the cause.

Found in the tidylearn post and fixed in `scripts/render-r-post.R`.

*Status: ready. Useful to anyone publishing gt tables outside R Markdown's own
HTML output.*

### 3. A pre-commit hook that silently stopped firing

The hook matched `^[^/]+\.md$` — top-level markdown. When the articles moved
into `_posts/` for Jekyll, it stopped matching any of them, and nothing said so.
A hook that never runs looks exactly like a hook with nothing to do.

It ran the day it was caught only because `IDEAS.md` happened to be in the same
commit. The same commit also revealed it had been staging one of two generated
files all along.

*Status: ready. The general shape — a check that silently stops checking — is
the transferable part.*

### 4. A README that cannot document itself

`scripts/update-readme.js` rebuilds `README.md` from a template on every run, so
anything hand-written in it is destroyed on the next article commit. Which left
nowhere to record that the git hook has to be enabled once per clone.

The fix is that setup notes belong in the generator, not in the file the
generator overwrites.

*Status: ready.*

### 5. A 2012 corpus is the last clean baseline for what human writing looks like

Any web corpus collected after 2022 contains generated text in unknown
proportion, so a "human baseline" drawn from one is circular. GloWbE's pages
were collected in December 2012, which turns its age from a limitation into the
reason to use it.

*Status: ready, and it stands alone. Also does work inside the register study,
so decide which comes first.*

### 6. Archiving a source and anonymising its author cancel out

Capture protocols say archive the URL on the Wayback Machine and archive.today.
Anonymisation says don't name the person. For an anonymised subject those
instructions contradict each other, and archiving is the half that can't be
undone — a permanent, indexed, unredacted copy under their name.

The resolution: archive for institutional accounts and anyone you intend to
name; for anonymised subjects record dates, role and engagement, and accept that
nothing external corroborates the capture.

*Status: ready. Drawn from the Interquartile Rage capture protocol.*

---

## Not yet qualifying

- **Poisson intervals on rates.** A frame seen 4 times and one seen 4,000 both
  render as "per million", and the interval is what carries the difference.
  True and useful, but dry on its own — probably a paragraph inside the study
  write-up rather than a piece. *Worth re-reading against the revised bar: it
  was disqualified for being only a paragraph, which is now the target.*
- **Detectors are biased against non-native writers** (Liang et al. 2023). Real
  and citable, but the interesting version needs the register argument around
  it, which makes it an essay.

---

## Rules

Move an item to an article and delete the entry. Add new ones at the top of
**Banked**. If something turns out to need a build-up to land, it was an essay —
move it to `IDEAS.md` rather than forcing it short. If it needs a build-up and
is already written, it is a post: put it in `_posts` with subject categories
only, and leave `random-twalk` off.
