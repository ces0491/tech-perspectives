# Blog structure — decisions and open questions

Where the structural and branding thinking lives, so it converges instead of
circling. The failure mode is the one in *How Long Is a Piece of String?*: a
question with no stop condition generates opinions forever. So every open item
below carries the criterion that closes it.

Rules for this file: once something moves to **Decided**, it stops being
reopened without new information, and the new information gets written down.
Article ideas belong in `IDEAS.md`, not here.

---

## Decided

**3 September 2026 — two shelves, not three.** The essays, which are what the
blog already is, plus one short-form shelf. No third named column.
*Because:* a named column promises cadence. Actual cadence is bursty — 10 posts
over 345 days, gaps of 92, 80, 61 and 45 days, and clusters of three in a day.
More shelves than can be kept stocked read worse than untagged posts.

**3 September 2026 — the axis is whether there is a target.** Not tone, not
length. IQR pieces have a specific artefact, a capture and a correction.
Short-form pieces without a target are the other kind.
*Because:* tone can't be known until the piece is written. IQR #001 was captured
under the rage method, graded Q4, and came out measured.

**3 September 2026 — Interquartile Rage is a format inside the short shelf**,
for artefact teardowns. Not a shelf of its own.
*Because:* at 400 words there is no room for the forensic build, so what
survives is the sharp version the name was always promising.

**3 September 2026 — the essays get no new name.** The domain is the name.
*Because:* naming both halves doubles the branding work and the second name does
nothing `blog.sheetsolved.com` doesn't already do.

**3 September 2026 — IQR #001 is written and not published.** See
[iqr-001-case-file.md](iqr-001-case-file.md).

**3 September 2026 — the subject does not narrow.** The remit is tech and stats,
broadly. AI takes up six of ten posts because it takes up that much room in the
industry's attention at the moment, not because the blog lost its focus.
*Because:* Ces wants to write across the space rather than about one thing, and
the AI share is a snapshot of a moment rather than a permanent tilt.

*What follows:* the breadth is deliberate, so nothing in the structure should be
built to correct it. The short shelf gets no subject remit either — a name
promising assorted and unpredictable suits a deliberately broad blog better than
one implying a beat.

*Also noted:* a through-line has emerged in the recent work without being
imposed — whether something was actually thought about, across writing,
dependencies, code review and charts. It runs through five posts and both new
directions. It is a theme to notice and possibly tag, not a constraint.

**3 September 2026 — the study repo is on GitHub, private for now.**
`ces0491/englishRegisterStudy`, flipping to public when the OSF pre-registration
is filed and there are results.
*Because:* the plan already commits to a public repository as part of the
output, so this is timing rather than a reversal. Private to public is a safe
move; public to private does not unpublish anything that has been indexed or
forked.

---

## Open

### 1. The name is Random Twalk — pending a post shipping under it

Chosen 3 September 2026 over *Off on a Tangent*, which is crowded (four-plus
podcasts on the exact or near name) and reads as an apology for digressing where
Random Twalk claims the wandering as method. Random Twalk is unclaimed; the
nearest neighbours are *A Random Walk* and *Random Walk Random Talk*, both
podcasts in unrelated subjects.

Accepted cost: "twalk" is not a word, so it can read as a typo in a URL or a
search result. Judged worth it for the pun and for the promise of assorted and
unpredictable, which suits a blog whose breadth is deliberate.

**Singular: Random Twalk.** Settled 3 September 2026. The pun is on "random
walk", and the singular is the name of the thing rather than a count of pieces.
It has to match across the category, the URL and the heading.

**Closes when:** the name reaches `_config.yml` or an `index.md` heading and a
post ships under it.

### 2. How is the shelf represented in Jekyll?

**Decided 3 September 2026: a category.** The three options were never
alternatives — an index section needs a field to group by, so it is the output
rather than the mechanism, and the real choice was tag or category.

Category wins on one checkable ground: it buys `/feed/random-twalk.xml` for a
single line in `feed.categories`, and a tag buys nothing here, because the
tag-archive plugins are not on the GitHub Pages whitelist. Neither touches URLs,
since `permalink: /:title.html` carries no `:categories`.

Categories mean *feed memberships* rather than "which one shelf this is on", so
a short R piece carries `[R, random-twalk]` and lands in both — R-bloggers gets
it for being R, shelf subscribers for being short. Tags stay purely about
subject, so the two axes never mix.

Implementation, deferred until the first short post exists:

1. Short pieces get `categories: [random-twalk]`, plus `R` where it applies.
2. Add `random-twalk` to `feed.categories` in `_config.yml`.
3. Teach the generator to group `index.md` on whether `random-twalk` is present.

Steps 2 and 3 wait, because an empty section is worse than no section.

**Closes when:** the first short post is published and the generator groups it.

### 3. Is there a cadence commitment?

Ces wants weekly and is not sure it can be sustained. Recorded as an aim rather
than a commitment, which is the honest state of it.

The evidence says be careful: 10 posts over 345 days, gaps of 92, 80, 61 and 45
days, and clusters of three in a day. Weekly is roughly five times the current
rate, against a pattern that is bursty rather than slow. Nothing published
should promise a cadence the buffer cannot cover.

**Closes when:** three short pieces are banked and finished, per the triage
kit's own rule, and the answer is then yes or no in writing here. Announcing a
cadence before the buffer exists is how a column goes visibly stale.

---

## Parked

Things raised and set aside, kept so they are not rediscovered as new.

- **A third shelf split by tone.** Rejected above. Tone is unknowable in advance.
- **Dividing by length.** The corpus is uniform at 670–1,710 words, most
  900–1,400. There is no long/short divide to formalise yet; the short form is a
  mode to start, not a reorganisation of what exists.
- **Filter 1 of the triage kit** tests who the target is, not how much scrutiny
  the artefact can bear. Worth adding, and it belongs in the kit rather than
  here.
