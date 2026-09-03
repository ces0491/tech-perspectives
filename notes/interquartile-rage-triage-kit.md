# Interquartile Rage — Capture & Triage Kit

## 1. Capture protocol

Do this the moment you find something, before you decide whether it's a post.
Deleted posts are the main reason these series lose material.

- [ ] **Screenshot the whole post**, not just the chart. Caption, handle, engagement
      counts, date. The caption is usually where the actual deception lives.
- [ ] **Archive the URL** — web.archive.org and archive.today. Do both; they fail
      differently.
- [ ] **Copy the claim verbatim** into your notes. Not your paraphrase of it. You will
      be accused of strawmanning, and the verbatim quote is your defence.
- [ ] **Record**: account name, follower count at capture, engagement at capture, where
      you found it, date captured.
- [ ] **Note any source it cites**, exactly as written, even if it looks fake. Especially
      if it looks fake.

## 2. Triage filters

Most captures should die here. Run them in order and stop at the first failure.

**Filter 1 — Is the target above the floor?**
Institutional account, media outlet, brand, politician, or a personal account with
significant reach. If it's a small private account, drop it or anonymise it. You are not
in the business of directing pile-ons at individuals.

**Filter 2 — Is the claim checkable?**
Can you find out what the true number is, from a source a reader can reach? If not, the
post is "I don't know either," which is not content. Drop it.

**Filter 3 — Does correcting it change the conclusion?**
This is the important one. Rebuild the honest version in your head. If the corrected
chart supports the same conclusion, the offence is cosmetic and you're just being a
pedant about aesthetics. Drop it.

**Filter 4 — Is it misleading, or merely ugly?**
Ugly is a different genre and it's already saturated. Ugly with a sound conclusion is
not your material.

**Filter 5 — Does it teach something transferable?**
Would a reader recognise the same move next week in a different context? If the answer
is "only if they see this exact chart again," it's a one-liner, not a post.

## 3. Rage scale

Grade the **artefact**, not the person. How far does the claim survive correction?

| Grade | Name | Test |
|---|---|---|
| **Q1** | Careless | Real data, sloppy presentation. Conclusion survives correction intact. |
| **Q2** | Negligent | The presentation is doing persuasive work the data doesn't support. Conclusion weakens under correction. |
| **Q3** | Unsupported | Conclusion does not survive correction. The data can't bear the claim. |
| **Q4** | Fabricated | The underlying data does not exist. Invented numbers, invented sources, invented precision. |

Intent is a **separate axis** and you usually can't observe it. A Q4 artefact routinely
comes from someone acting in complete good faith who simply didn't know that a chart
requires a measurement and not just subject knowledge. Say what the artefact does. Only
claim intent when you can evidence it, which is almost never.

Q1s are filler. Q3s and Q4s are the series. If your backlog is mostly Q1, your filters
are too loose.

## 4. Sin taxonomy

**Classical (well-covered elsewhere — use as supporting detail, rarely as the headline)**
Truncated axis · cherry-picked baseline · dual-axis manipulation · area/3D encoding of a
linear quantity · percent vs percentage point · denominator swap · small n ·
correlation presented as causation · survivorship bias · Simpson's paradox ·
regression to the mean · base rate neglect

**Argument-level (the richer seam)**
The chart is accurate and the caption doesn't follow from it · the trend is real but the
mechanism is asserted · the comparison group is wrong · the metric doesn't measure the
thing being claimed · the definition changed mid-series · aggregation hides the
distribution that matters

**Generative-AI-specific (mostly unnamed — your territory)**
- Printed labels contradict the plotted geometry
- Fabricated precision: decimal places attached to a claim that was always a vibe
- Plausible-looking citation that leads nowhere ("Source: OECD, 2023")
- Categories that overlap, or don't exhaust, or don't sum to 100
- Professional styling used as a credibility signal, fully decoupled from accuracy
- Axis that is ordinal, categorical and numeric at different points along its length

Name the ones you find. That's the part statisticians will actually enjoy.

## 5. Sourcing channels

Ranked roughly by yield per hour.

1. **LinkedIn.** Highest-volume source of AI-generated business charts, and the accounts
   are almost all institutional, so the punching-down problem disappears.
2. **Industry "State of X 2026" reports and vendor press releases.** Fabricated-precision
   factory. Reliable, above the floor, and comes with a PDF you can quote.
3. **r/dataisugly** and the comments under r/dataisbeautiful. The comments are where the
   debunk usually already started; useful for spotting, not for your analysis.
4. **X Community Notes.** A pre-filtered stream of contested claims. Verify independently
   rather than relying on the note — notes are sometimes wrong, and "the note was also
   wrong" is a genuinely good post.
5. **Instagram / TikTok infographic accounts.** High volume, low checkability. Filter 2
   kills most of it.
6. **Reader submissions.** Slow to start, becomes the main channel if the series works.

## 6. Backlog hygiene

- Aim to capture 3–4x what you publish. Weekly cadence needs a buffer.
- Keep 3 evergreen pieces finished and banked at all times so a quiet week never breaks
  the run.
- Tag each banked item with its rage grade and sin so you can avoid running two of the
  same sin back to back.

## 7. Before publishing

- [ ] Read the primary source, not the article about it.
- [ ] Establish where the failure actually occurred: original data, the analysis, the
      press release, the journalist, or the person who reshared it. Attribute precisely.
- [ ] Do not assert AI origin unless you have evidence. Describe the artefact, not the
      tool.
- [ ] Include the honest version of the chart. Every time. The correction is the product.
- [ ] Link everything a reader would need to check you.
- [ ] Confirm your correction survives someone hostile reading it carefully.
