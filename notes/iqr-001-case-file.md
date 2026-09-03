# IQR #001 — Case file

Working notes for the first Interquartile Rage post. Everything verified as of
3 September 2026. Companion doc: `interquartile-rage-triage-kit.md`.

**Status: written, not published.** The draft is at
`_drafts/a-picture-of-the-hypothesis.md`. Held back because the scrutiny is
disproportionate to a post with 24 reactions, and because the method here
produces a calm forensic piece rather than a ragey one. Names are removed from
these notes: the repo is public and a name in history stays there.

---

## The artefact

LinkedIn post, ~1 week old at capture, by a Partner at a large international law firm
(corporate lawyer, energy and mining). Caption opens: "I prompted AI to plot a graph of
commodity prices vs resource nationalism policies and it had some interesting results."

**Chart title:** "Commodity Price Cycles vs. African Resource Nationalism (Illustrating a
12-24 Month Policy Lag)"

- Blue solid line — "Commodity Price Index (Left Axis)", range ~50–180
- Pink dashed line — "Policy Restrictiveness Index (Right Axis)", range ~25–200
- Grey bands — "Lag Phase (Policy tightening follows peak)", two of them
- X-axis labelled "Time (Months)", ticked "Yr 1" through "Yr 11"
- No source line anywhere on the chart. No base year on either index.

**Claims in the caption:** a distinct cyclical relationship; commodity price spikes are
the primary catalyst for resource nationalism policies; regulatory changes lag market
peaks by 12 to 24 months; therefore miners bear the brunt during downturns and states
miss the peak.

**Engagement:** 24 reactions, 4 comments. Modest reach.

**Grade: Q4 — Fabricated.** No underlying data exists.

---

## The comment thread (complete — verified, no further replies)

1. **Commenter (CFA charterholder):** "What is the construction of the Policy Restrictiveness Index?"
2. **Author:** "It is a combination of laws/policies that fall under the 'resource
   nationalism' umbrella. It includes increased state participation in projects,
   increased taxes and royalties, local beneficiation requirements etc."
3. **Commenter:** "does it include all African countries, and how are these weighted? How are
   the policies or activities scored?"
4. **Commenter:** "also which calendar years does your graph correspond to?"

No response to 3 or 4. State this factually. No adverbs, no implication of evasion —
people don't answer LinkedIn follow-ups for many reasons.

---

## The argument

**Thesis: domain expertise does not transfer to measurement, and a generated chart
hides the gap.**

The author's description of resource nationalism is probably accurate — he works in the
field. What he has no way to do is decide whether Zimbabwe's raw ore export ban scores
higher or lower than the DRC's cobalt quota, or how many index points a four-point
royalty increase is worth. Those trade-offs have no natural answer. A real index makes
them explicit and defends them. This chart made them invisible, and the smooth line
concealed that they were never made.

This framing is deliberate: the target is the epistemics, not the man.

### Point 1 — the chart is a picture of the hypothesis

No data was supplied. An image model asked to plot a relationship renders one that looks
like the request; it does not retrieve a series. The chart's own title announces the
conclusion ("Illustrating a 12-24 Month Policy Lag") and the caption then reports that
lag as a finding. Circular.

### Point 2 — the index doesn't exist in this form (nuance matters here)

Do NOT write "no such index exists." One does. Verisk Maplecroft publishes a Resource
Nationalism Index measuring protectionism and interventionism in energy and mining across
198 countries. But it is proprietary, country-level and annual — not a monthly African
aggregate running 25 to 200 over eleven years. The correct line is: something by that
name exists, this isn't it, and the plotted version can't be built from anything public.
- https://www.mining-technology.com/features/mapping-the-rise-of-resource-nationalism-in-africa/

### Point 3 — the statistical kill shot (nobody in the thread made this)

The pink series rises from ~28 to ~200 with one shallow dip. It is effectively
monotonic. If policy restrictiveness only ever rises, policy tightening follows *every*
commodity peak by construction. No arrangement of the blue line could falsify the claim.
Classic spurious relationship between non-stationary series.
- Granger, C.W.J. & Newbold, P. (1974), "Spurious regressions in econometrics",
  *Journal of Econometrics* 2(2), 111–120. https://doi.org/10.1016/0304-4076(74)90034-7
- Earlier: Yule, G.U. (1926), "Why do we sometimes get nonsense correlations between
  time series?"

Lay version: a line that only goes up will always look like it's responding to whatever
you put beside it.

### Point 4 — supporting tells

- X-axis labelled in months, ticked in years. Labels contradicting geometry.
- Three visible commodity peaks, two shaded lag bands. The Yr 2 peak gets no band.
- "12 to 24 months" is a 2:1 window on year-resolution data with three cycles. Almost
  nothing could fail to fit it.
- "Yr 1–11" with no start date. Real series arrive with dates attached; you have to
  actively strip them. The commenter's fourth question lands on exactly this.

### Point 5 — the honest version is the payoff

The chart cannot be rebuilt, and the reason is the finding: there is no public, monthly,
continent-level measure of resource nationalism, because the concept resists that kind of
quantification. **The absence of the y-axis is the story.** End here.

### The portable tool for readers

Four questions to ask of any index, no arithmetic needed:
what is counted, over what population, weighted how, covering what dates.
If any answer is a concept rather than a procedure, stop reading.

### Context stat for the opening (optional)

A systematic analysis of 100 AI-generated infographics (Nano Banana Pro, 20 thematic
categories) found 99 of 100 contained at least one misleading element — fabricated data,
inconsistent encodings, segments not summing to 100%. AVI 2026.
- https://dl.acm.org/doi/full/10.1145/3811427.3811469

Related, and useful for the series thesis generally: design-guideline violations are NOT
the dominant way people mislead with charts; reasoning errors in the surrounding argument
are. Lisnic et al., CHI 2023.
- https://dl.acm.org/doi/10.1145/3544548.3580910

---

## Editorial decisions already made

- **Anonymise the author.** He engaged when questioned, his reach was modest, and the
  pattern matters more than the person. Describe him by role only.
- **Credit the commenter by name, with his permission.** His four questions are the spine of the
  post. Ask him first; he's also a useful second reader before publication.
- **Do not assert the prompt's contents.** We don't know what was typed. Say the title
  asserts the conclusion and the caption reports it as a finding. That's observable.
- **Do not assert which model or tool.** "I prompted AI" is all we have.
- **No dunking.** If a line reads as contempt for the author, cut it.

## Hard constraints

- **Anonymise before the first commit.** `ces0491/tech-perspectives` is a public repo.
  A name stripped in a later commit stays in the history permanently.
- Redacted captures are committed at `assets/iqr-001/` - the post, the full thread, and
  the chart on its own. Name, photograph, employer and every avatar are blacked out,
  and the files were re-encoded so no original metadata travels with them.
- The unredacted originals stay out of the repo. They are the only record of the post
  and want a deliberate home rather than the Screenshots folder they are in.
- Do not commit an image containing the author's name, photo, or profile URL.

## Open items

- [ ] Ask the commenter for permission to credit him; offer him the draft.
- [ ] Rebuild the "honest version" figure in R and show the code — gives statisticians
      something inspectable, and may open R-bloggers syndication. Check whether the blog
      is already syndicated there.
- [ ] Decide the series' home within the blog: standalone posts, or a tagged column.

## Voice notes

Match the existing subhead pattern — a concrete detail, then a turn. Compare
"An AI code review returned 27 findings. Asking how many were left to find turned out to
be the more useful question, and the harder one to answer." Same shape works here:
the questions in the comments were better than the chart.
