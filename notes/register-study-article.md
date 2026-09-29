# Register study article: squaring it with *The Average Human Problem*

Working note, 29 September 2026. The article that reports the three register
studies, set against what has already been said in public, so that it
acknowledges each earlier claim it revises.

The numbers here come from `docs/study2-3-results.qmd` in the study repo
(`Dev/Rdev/analysis/englishRegisterStudy`), which computes them from the
committed counts. They are for checking the argument. The article itself
should carry very few of them (see *Numbers* below).

---

## What has already been said in public

1. **[The Average Human Problem](../_posts/2026-05-04-ai-average-human-problem.md)**
   (4 May 2026). The AI sound is "averaged humanness": the centroid of human
   writing, with RLHF adding a second layer.
2. **[Lying Is Lying](../_posts/2026-05-04-ai-lying-is-lying.md)** (4 May
   2026) sends readers to it: "the pattern-matching against em-dashes and
   cadence and structure … is where I think the gap lives."
3. **The study's README and research plan**, public since 22 September. The
   hypothesis: these frames are "characteristic of American web register
   rather than of English generally, and that this is part of why generated
   prose reads as foreign to a British, Irish, Australian or South African ear
   before it reads as machine-written."
4. **The three OSF registrations.** Each states a directional H1 with its
   inference rule, so each has a registered outcome the article must report.

The blog's plan from 3 September already framed Study 3 as "the centroid
claim from his published *Average Human Problem* essay, turned into a number".
The article is that test reporting back.

---

## Registered outcomes

These come first in the article, before anything exploratory, because they
were the tests set in advance.

| Study | Registered H1 | Outcome |
|---|---|---|
| 1 | GB, IE, AU and ZA each use the frames less than US | Supported for all four, at 0.50 to 0.69 of the US rate |
| 2 | Olmo 3 base uses them more than each of GB, IE, AU, ZA | Supported against ZA only |
| 3 | Olmo 3 base uses them more than its web training input | Not supported: 1.72, interval 0.65 to 4.53 |

Studies 2 and 3 have wide intervals because the frames disagree. The model
is far above the humans on some and below them on others, so an average over
frames is uncertain. That disagreement is the exploratory story.

---

## Claim ledger: the May post against the evidence

Each entry gives the May wording, what the studies show, and a verdict:
**holds**, **revise**, **retract** or **untested**.

**1. "The em-dash. The tripled list. The 'it's not just X, it's Y' cadence.
The careful hedging. Even the use of bullet points!"**
Only the cadence was measured, through `it 's not just`, `is n't just`,
`not just * but` and the full `it 's not * , it 's`. Em-dashes, tripled lists,
hedging and bullets were not.
*Untested, apart from the cadence.* The article should say which of the May
tells it cannot speak to.

**2. "The 'AI tells' people detect are artefacts learned from us."**
Every frame occurs in all five 2012 varieties and in the stage-1 web text the
model was trained on. The model uses some of them at several times any human
rate.
*Holds* for where the patterns come from. *Revise* for how much they are used.

**3. "which patterns get smoothed out, which get amplified"**
Both happen. Against its stage-1 input the base model uses the contrastive
frames about 5 times as often (`is n't just` about 10 times). It uses the
epigrammatic frames less than every variety, and three frames never appear
at all.
*Holds.* This is the May line the data bear out best, and the article can
quote it.

**4. "Every pattern AI produces was learned from human text. Not
human-adjacent or synthesised."**
Not for Olmo 3, per Ai2's own dataset cards:
- The base model's stage-1 pretraining (5.93 of 6.08 trillion tokens) is web
  pages, PDFs, code, maths, arXiv and Wikipedia.
- Its midtraining stage is another 100 billion tokens, and 57.5 billion of
  them are labelled synthetic. About 28 billion of those are prose-like: QA,
  instruction data, and reasoning traces from QwQ, Gemini and Llama Nemotron.
  ([card](https://huggingface.co/datasets/allenai/dolma3_dolmino_mix-100B-1025))
- The instruct model's fine-tuning set includes "WildChat with upgraded
  responses from GPT-4.1", 302,406 prompts, and the card tags it partly
  machine-generated.
  ([card](https://huggingface.co/datasets/allenai/dolci-instruct-sft))
- 125,000 of its 260,000 preference pairs come from a "GPT-judge pipeline".
  ([card](https://huggingface.co/datasets/allenai/dolci-3-instruct-dpo-with-metadata))

*Retract "not synthesised"* for this model. Most of what the base model read
was human-written, but its last stages and the whole instruct layer include
a lot of text other models wrote. This is the one May claim that fails on a
checkable fact. The others are matters of interpretation.

**5. "When someone declares 'this reads as AI,' they are pattern-matching
against their own register and mistaking unfamiliarity for artificiality."**
Perception wasn't measured. Production shows a real difference: the instruct
model's `is n't just` turns up in 26% of its posts, at about 60 times the
2012 American rate.
*Revise.* A reader reacting to that density is detecting something real. A
reader judging one instance in a human's text is guessing.

**6. "They're tells of careful prose — the kind written in academia, in formal
correspondence, in essays by people taught to structure their thoughts."**
In the training mix the frames are rarest where prose is most formal:

| Subset | Per million |
|---|---:|
| Wikipedia | 16.4 |
| Science PDFs | 32.8 |
| arXiv | 39.7 |
| Web | 115.4 |

This is descriptive, and the subsets differ in more than formality.
*Retract for these frames*, which are web and blog devices. Hedging and
structure weren't measured and may still fit the May description.

**7. "The kind written by people who learned English as a second language
and overcorrected toward formality."**
Not tested here. Liang et al. (2023) found that GPT detectors flag non-native
writing more often. That finding is about detectors and says nothing about
these frames.
*Untested.* Keep it only with that citation and as a claim about detectors.

**8. "It writes like the centroid of millions of them. … the combination
trends toward median register"**
Study 3 was registered to test exactly this: whether "a model writes like the
centroid of its training data rather than like a sample from it". The
registered test found no evidence the base model exceeds its input. The
exploratory results point away from a centroid:
- The model's frame profile sits outside the range of every human source.
  Its ratio of announce to contrastive frames is 0.24 of the American
  balance, against 0.74 to 1.00 for the five varieties and 0.82 for the
  crawl. That ratio is taken within each source, so the difference in word
  counts between Study 1 and Dolma cancels out.
- The three frames the crawl uses most (`and that 's`, `turns out`,
  `not * , but *`) are ones the model uses less than its input.
- How far the model over-produces a frame is unrelated to how American
  Study 1 found it (rank correlation −0.05 over 14 frames).
- Lower temperature, which concentrates sampling on the likelier
  continuations, gave fewer frames: 1.57 times, p = 0.052.

*Revise.* This is the central claim. On the tells, the model does not sit at
the centre of its data. It takes a few human constructions far past any
human rate and drops others.

**9. "Then RLHF … adds a second layer on top: a learned preference for
structure, hedging, helpful framing and slightly formal tone."**
The instruct model uses the frames about twice as often as the base model
(Holm p 0.013 and 0.014). On the contrastive frames it goes from 4 times the
American rate to 14–16 times. Reinhart et al. (2025) found the same direction
with Llama 3 and GPT-4o. Two qualifications:
- Olmo 3 Instruct's post-training is supervised fine-tuning, preference
  optimisation (DPO) and reinforcement learning with verifiable rewards, with
  GPT-4.1-written examples and GPT-judged preferences, so little of it is
  "human feedback".
- The instruct conditions also carry a default system prompt (S2-D1).

*Holds, and was understated:* post-training roughly doubles the composite
rate and triples the contrastive rate on top of the base model. It is not the
larger step on every measure: on the contrastive family the base model is
about five times its stage-1 input. Say "post-training" and drop the
human-feedback gloss.

**10. "It's averaged humanness."**
*Revise.* This is the phrase the article has to replace. The replacement
should be in your words: human patterns at a density no humans produce.

**11. "The people who write closest to that average, careful-prose baseline
are the ones most likely to get caught in the dragnet."**
Careful prose sits furthest from the model on these frames (entry 6). In
2012 British writers used two of the contrastive frames more often than
Americans did, and Australians one.
*Revise.* The writers most exposed are those who use the over-produced
constructions at all, at ordinary human rates.

**12. "the patterns flagged as machine-generated are the patterns of the most
common kind of human writing"**
The frames do come from web writing, the most common kind. But the model
uses the contrastive ones at about 5 times the stage-1 web rate, and the
web's commonest frames are the ones it uses less.
*Revise.*

**13. "In creative or literary writing, sounding like the average is itself a
problem. Voice is the point, and AI's centroid-tendency is a real limitation
there."**
*Revise the premise.* The point about voice survives restated as a narrow
set of devices used heavily. Literary writing wasn't tested.

**14. "What readers are really trying to detect is probably evidence of
thought … was this worth reading?"**
*Untested and unaffected.* It stays consistent with *Lying Is Lying*.

### The study's own public hypothesis

**15. README: "part of why generated prose reads as foreign to a British,
Irish, Australian or South African ear before it reads as machine-written"**
- The first half, that American web English uses these frames more, holds
  for 2012 human text (Study 1).
- On the second half, the model's excess sits mostly in the contrastive
  family, which separated the varieties least in Study 1.
- The announce family ("here's the thing") separated them most. The base
  model uses it at the American rate, and the instruct model at about 4
  times it. So instruct output, which is what people actually read, is where
  a regional reading could still hold.
- Perception was never measured.

*Mostly not borne out on the production side.* The article should say that
the study's own starting hypothesis largely failed.

### *Lying Is Lying*

Its "cadence" point is now a measured rate difference. It needs no edit if
the new article links back to both May posts, as the house style's
backwards-only links allow.

---

## Prior art to credit

Each item below was checked against its abstract or source on 29 September.

- **Reinhart et al. (2025)**, *PNAS* 122(8), e2422455122,
  [doi:10.1073/pnas.2422455122](https://doi.org/10.1073/pnas.2422455122). They
  compared Llama 3 and GPT-4o with human text on Biber's features and found
  differences that "are larger for instruction-tuned models than base
  models", concluding that "LLMs struggle to match human stylistic
  variation". It was on arXiv in October 2024, before the May post, so it's
  the established finding this extends and should be credited as such.
- **Kobak et al. (2025)**, *Science Advances* 11(27), eadt3813. After
  ChatGPT, certain style words jumped in PubMed abstracts, and at least 13.5%
  of 2024 abstracts were processed with LLMs. This is the vocabulary
  counterpart, and also the reason a post-2022 human baseline is contaminated.
- **[Wikipedia: Signs of AI writing](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing)**
  lists "Negative parallelisms", "Rule of three" and "Overuse of em dashes".
  It concedes that negative parallelism "is common among human writers". It
  shows that readers flag these constructions, and it measures nothing.
- **Eryk Salvaggio, ["It's Not Just X. It's Y."](https://mail.cyberneticforests.com/its-not-just-data-its-post-training/)**
  (31 May 2026) argues that reinforcement learning with verifiable rewards
  produces the construction, and presents no measurement.
  - Against it: the base model already over-uses the construction without
    fine-tuning, DPO or RL.
  - For it, in a sense: that base model's midtraining included reasoning
    traces from other models, so the mechanism could still arrive through
    data.
  - Credit it and engage with it.
- **Fleisig et al. (2024)**, EMNLP. Models default to "standard" varieties,
  American *and* British. Don't cite it for an American default.
- **Liang et al. (2023)**, *Patterns*. Detectors are biased against
  non-native writers (entry 7).

The study itself adds four things:
- a pre-LLM human baseline split by national variety;
- a comparison with the model's own training input;
- pre-registration;
- counts of the specific constructions readers cite.

Claim novelty no wider than this: the 29 September search found no study
comparing a model's output with its own training data on these
constructions, which falls well short of showing none exists.

---

## Decisions, 29 September 2026

Ces approved all five:

1. **One article, covering Studies 1 to 3.** Study 1 is not published on its
   own. Study 4 (below) is a later follow-up, and the article doesn't wait for
   it.
2. **A correction note on the May post**, added when the article is published.
   The rule for when a published post gets one is now in
   `notes/house-style.md` under *Corrections to published posts*. Draft
   wording, to go in with the publication date and the article's filename as
   the link:

   > *Update:* I later tested this argument with a pre-registered study,
   > written up in the follow-up. It bears out the starting point: these
   > patterns are learned from human writing. It doesn't bear out the centre.
   > The model it measured uses some of them far more often than any human
   > writing does, and part of its training text was written by other models.

3. **Answer first, with the May claim as the opening context.** The shape:
   1. **Context, two or three sentences.** What the May post argued, linked
      back, and that it is a checkable claim, so it got a pre-registered test.
   2. **The takeaway.** The tells are human constructions used at rates no
      group of humans uses. The ones pushed hardest aren't the American ones,
      and post-training pushes them further.
   3. **What held from May.** They were learned from us. Some patterns were
      smoothed out and others amplified. The post-training layer matters, and
      by more than May said.
   4. **What didn't.**
      - It isn't the centroid, and it isn't careful prose.
      - "Not synthesised" was wrong for this model.
      - The study's own American-register hypothesis held for humans in 2012
        but mostly not for the model.
   5. **The registered results, plainly**, with one sentence on why the
      intervals are wide, and a link to the repo write-up for the numbers.
   6. **What changes for readers and writers.** Density against instance:
      noticing the drumbeat is fair, and flagging one "isn't just" in a
      person's writing isn't.
   7. **Limits.** One model and one prompt, fifteen frames, and no measure of
      perception. The baseline is from 2012.
   8. **Close by returning to the opening.** Say what's still open: where the
      excess enters training. That is Study 4's question, and the close can
      say it is being tested without promising a result.

   **Numbers.** Per the house style, an insight post states findings at the
   level a reader acts on, such as "several times the rate of any group of
   human writers". It links the repo for counts and intervals. The registered
   outcomes are the exception: say supported or not, plainly.
4. **`IDEAS.md`: reframed.** "Centroid as creative constraint" is now "Tics
   that pass between models", about devices moving from one model to the next
   through synthetic training data.
5. **Study 4: designed, not registered.** The design is in the study repo's
   `RESEARCH-PLAN.md`, under *Study 4 — where the excess enters*, with the
   choices that have to be settled before a registration is drafted.

## Publishing it

The draft is `_drafts/too-much-of-a-good-thing.md`. When it goes live:

1. Settle the title and slug against the neighbouring posts before the first
   push. The draft's are *Too Much of a Good Thing: Testing Why AI "Sounds Like
   AI"* and `too-much-of-a-good-thing`.
2. Move it to `_posts/` with the publication date in the filename and the
   front matter.
3. Add two entries to `ALLOWED` in `scripts/check-style.js` for the new file:
   `contrastive-tic` where `a quarter of its posts`, because the line quotes
   the construction as its subject, and `contrastive-dash` where
   `cyberneticforests`, a false positive on the slug of Salvaggio's URL.
4. Add the correction note to *The Average Human Problem* (decision 2), linking
   `too-much-of-a-good-thing.html`. The draft's last line says the note is
   there.
5. Run `node scripts/check-style.js` and `node scripts/validate.js`, and build
   locally.
6. In the study repo, tick SCOPE's article boxes.

## Ideas from the chat that came from me

Per the rule about not putting my views in your voice, these came from me on
29 September. Use them if you agree, stated as what the data show. "I
realised" would put them in your voice:

- An average can't sit outside the range of what it averages, which is the
  argument against the centroid in entry 8.
- The density-versus-instance framing of the fairness point, which I first
  raised on 21 September.
- The announce-to-contrastive balance as a comparison that doesn't depend on
  word counts.
- Describing what the model does as sharpening.
