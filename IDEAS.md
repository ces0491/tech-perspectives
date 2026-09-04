# Ideas

A working list of concepts I'm thinking through for future pieces. These are unfinished — half-formed observations, questions I haven't resolved, threads I want to pull on. Some will become articles; some won't. Worth keeping in one place either way.

## What counts as enough rigour to ship

cranExploreR went live at the end of March with band edges I'd picked off a log scale, a momentum baseline that was wrong for any package under a year old, release count standing in for age, and a leaf package's zero reverse dependencies rendered in red. It was usable the whole time and got the obvious cases right, which is why none of it surfaced for five months — the errors sat in the middle of the distribution, where nobody looks closely. Two days of actually checking turned up one in each of the four factors, and every fix exposed the next.

The tension worth testing is that the recalibration only happened because the thing shipped and I kept using it; holding it back for rigour might have meant no app at all. So the useful question is what minimum earns publication, and whether that minimum shifts when the output carries a number somebody will act on. AI makes a first version cheap and polished at the same time, which widens the gap between looking finished and being right. Related to *Evidence of thought as the new literacy* below, from the producer's side rather than the reader's. Worked example in [*Look Before You Leap*](./_posts/2026-09-04-scoring-bands-i-never-checked.md), which is the incident rather than the argument.

## Infrastructure lock-in as a transition problem

Code embedded in the computing stack looks less like a technology choice than like fossil-fuel infrastructure: the replacement can be strictly better and the switch still takes decades, because the cost sits in everything built around it rather than in the thing itself. Cut from [*Musings on the Future of Programming Languages*](./_posts/2025-12-12-the-future-of-programming-languages.md), which gestured at the analogy without making it. Worth testing how far it holds — where it predicts something non-obvious about which languages persist, and where it breaks.

## What an honestly-uncertain AI would feel like

Most AI today produces equally fluent prose whether it's quoting a textbook or hallucinating. A model that signaled confidence the way a careful human does — visible hedging, explicit "I'm not sure," audible uncertainty around the things it actually doesn't know — would be a different reading experience entirely. Worth thinking about what we'd lose, what we'd gain, and why nobody really ships this.

## Generation as a category beyond writing

The volume / category-mistake argument from [*Lying Is Lying*](./_posts/2026-05-04-ai-lying-is-lying.md) applies to image, audio, video too — anywhere generative AI has compressed production cost. The dynamics differ across media, but the underlying issue (trust mismatch, evidence of thought) probably generalises. Worth a piece that's media-agnostic.

## Centroid as creative constraint

The "average humanness" point in [*The Average Human Problem*](./_posts/2026-05-04-ai-average-human-problem.md) was framed as a detection problem. There's a different angle: what does it mean for culture when the median register gets reinforced at scale? Models trained on common patterns produce more common patterns, which then feed the next generation of training data. Does individuality get harder over time, or just more valuable?

## Evidence of thought as the new literacy

If readers can't reliably distinguish AI from human writing, the question shifts from *who wrote this* to *did anyone think about this*. That's a different skill — both for producers (when does AI help vs. when does it replace thinking?) and consumers (how do you read for engagement rather than for source?). Probably its own piece.

---

*Add new ideas at the top. Keep them short — a paragraph or two each. If something becomes an article, move the reasoning into the article and remove the entry here.*

*This file holds essay concepts — things that need thinking through. Short-form
topics, which have to land on a checkable observation instead, live in
[notes/short-form-pipeline.md](./notes/short-form-pipeline.md). If an idea here
turns out not to need a build-up, move it there.*
