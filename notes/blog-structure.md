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

---

## Open

### 1. What is the short shelf called?

| Candidate | Availability | For | Against |
|---|---|---|---|
| Random Twalk | unclaimed. Nearest: *A Random Walk* (investment podcast), *Random Walk Random Talk* (self-improvement) | statistical pun, family-consistent with Interquartile Rage, "random walk" promises assorted and unpredictable | "twalk" is not a word and reads as a typo in a URL or a search result |
| Off on a Tangent | crowded — four-plus podcasts on the exact or near name, no major blog | real English, no typo risk, "tangent" carries a maths sense, matches the digressive voice ("but I digress") | not distinctive, and it apologises for digressing where Random Twalk claims it as method |

**Closes when:** one name is written into `_config.yml` or an `index.md`
section heading and a post ships under it. Until a post ships, this is not
decided, whatever has been said.

### 2. How is the shelf represented in Jekyll?

Options: a `tag`, a `category` (which drives a feed, as `R` already does), or a
section heading in the generated `index.md`.

**Closes when:** the first short post is published and the generator groups it.
Note that `categories` already has a live consumer — R-bloggers reads
`/feed/R.xml` — so adding a category is not free of consequence.

### 3. Is there a cadence commitment?

**Closes when:** three short pieces are banked and finished, per the triage
kit's own rule. Announcing a cadence before the buffer exists is how a column
goes visibly stale.

### 4. Does the subject narrow?

Tags run `ai` ×6 then a long tail of ones — AI writing, cloud economics, R
packaging, dependency management. The catch-all feeling is probably subject
sprawl rather than form, and no amount of shelving fixes that.

**Closes when:** it is answered yes or no in writing here. Harder and more
consequential than naming, so it is the one most likely to be avoided.

### 5. Does the register study repo get a remote, and at what visibility?

`Rdev/analysis/englishRegisterStudy` is local git only.

**Closes when:** a remote is added, or a note here says deliberately not yet.
The plan commits to the repository being public as part of the output, so
"public eventually" is already implied.

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
