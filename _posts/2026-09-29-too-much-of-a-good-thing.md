---
title: 'Too Much of a Good Thing: Testing Why AI "Sounds Like AI"'
description: >-
  In May I argued AI sounds like AI because it writes like the average of us. Four pre-registered studies found the tells are ours, with an open model using some far more than any human writers do.
date: 2026-09-29
tags: [ai, writing]
---

In May I wrote [*The Average Human Problem*](ai-average-human-problem.html), arguing that the "AI sound" people complain about is averaged humanness. A model writes like the centre of millions of human writers, so its tells are the patterns of the most common kind of human writing, and post-training adds a layer of polish on top. That was the intuition based on what I knew at the time - but I never tested it. So I decided to look into this properly, or at least to go beyond desktop research and prod at some real numbers. While some of it held, it's not all quite right.

The tells are ours. Of the 15 constructions I tested, 14 could be searched in web pages from 2012, a decade before ChatGPT, and all 14 turn up in every country measured. But the model I tested uses some of them several times more often than any group of human writers does, and others less than any group, with 3 never appearing in 10 million words of its writing. An average can't sit outside the range of the things it averages, so whatever this is, it isn't averaging. The constructions it leans on hardest also aren't the American ones, though the study itself started from a guess that they would be. The one it leans on most, the contrast, rises at every stage of its training after the first, and none of the text it trained on uses it at anything like the rate it ends up at.

## What I Tested

The constructions were fixed before any counting, and are of the variety that we typically see being called out: announcing a point before making it, the contrast, the epigram at the end of a paragraph, and the reveal. Four studies used them. Each was registered on OSF before its own data existed ([Study 1](https://osf.io/48wjn), [Study 2](https://osf.io/qjgtc), [Study 3](https://osf.io/ngt3m), [Study 4](https://osf.io/d79u4)), which means the tests, and what would count as support, were written down in advance where the results couldn't steer them.

- **Study 1** counted the constructions in web writing from the US, Britain, Ireland, Australia and South Africa, from a [corpus](https://www.english-corpora.org/glowbe/) collected in 2012. The date matters because text collected since ChatGPT's release contains machine writing in unknown amounts. One study estimates that at least 13.5% of biomedical abstracts published in 2024 were processed with language models ([Kobak et al., 2025](https://doi.org/10.1126/sciadv.adt3813)).
- **Study 2** had Olmo 3, an open model from the Allen Institute for AI (Ai2), write 4,000 blog posts, one for each of 4,000 titles taken from those same 2012 blogs. It did this four ways: as the raw model straight out of pretraining, and as the assistant version fine-tuned from it, each at two sampling settings.
- **Study 3** counted the constructions in a sample of the text Olmo 3 learned from, which Ai2 publishes, so the model's rates could be set against its own input. The training text of GPT, Claude or Gemini can't be counted, which is why the model is Olmo.
- **Study 4** followed the contrast through Olmo 3's training. Ai2 released the model at the end of each stage of training, along with the text each stage used, so nine of those saved versions wrote the same 4,000 posts, and the contrast was counted in each stage's training text as well.

In Study 1, every other country used the constructions less than American writers did, at between half and two-thirds of the American rate. In Study 2, the model's rate was above every country's, but the test only confirmed that against South Africa. In Study 3, the test found no clear evidence that the model uses them more than its training text does. Study 4's results are further down.

Studies 2 and 3 were mostly inconclusive, for the same reason. The constructions disagree. The model is far above people on some and below them on others, so a single verdict averaged across all of them carries a wide margin of error. The breakdown by family, which the registrations list as exploratory, is where the disagreement shows, and Study 4 was registered with the contrast family as an outcome of its own for that reason. The counts, the code and the full results, with their intervals, are in the [study's repository](https://github.com/ces0491/englishRegisterStudy).

## Where It Departs From Us

The four families, each as a multiple of how often American web writers used them in 2012:

| Family | Example | Other countries, 2012 | Olmo 3, raw | Olmo 3, assistant |
|---|---|---|---|---|
| Announcing the point | "here's the thing" | 0.54 to 0.65 | 1.0 | 3.9 |
| Contrast | "it isn't just X" | 0.60 to 0.86 | 4.3 | 14 |
| Epigram | "which is the point" | 0.54 to 0.80 | 0.45 | 0.79 |
| Reveal | "turns out" | 0.43 to 0.64 | 0.54 | 0.43 |

The 2012 corpus and the model's text are counted with different word rules, so comparisons across that line are approximate. Comparisons within the model's text, and between the model and its training data, use the same rule.

The raw model uses the contrast family about four times as often as American writers did, and the assistant about fourteen times. On the epigrams the raw model is below every country. The web portion of what Olmo 3 learned from sits below American writing on every family, close to the other countries. The raw model uses the contrast family about five times as often as that text, and uses the text's own most common constructions, "turns out" and "and that's", less.

The assistant model uses "isn't just" in about a quarter of its posts, at roughly sixty times the rate of American web writing in 2012. It doesn't come from a few runaway texts. The construction turns up in hundreds of the raw model's posts and more than a thousand of the assistant's, and never more than a few times in any one.

## The May Post, Claim by Claim

**Held: the tells are learned from us.** Every construction that could be measured in 2012 was already there in ordinary human writing.

**Held: some patterns are amplified and others smoothed out.** In May I wrote that there was "something interesting in which of us — in which patterns get smoothed out, which get amplified". Both happen, and they happen to different families: the contrast goes up, the epigram goes down.

**Held, and understated: post-training.** I said the training that shapes a model into an assistant adds a second layer, a preference for structure, hedging and helpful framing. It also pushes these constructions further. The assistant uses them about twice as often as the raw model overall, and the contrast family about three times as often. [Reinhart and colleagues](https://doi.org/10.1073/pnas.2422455122) found the same direction in Llama 3 and GPT-4o, comparing models with human writing on a much wider set of grammatical features, in a study that came out before my May post.

**Didn't hold: the average.** The table is the evidence. The raw model sits outside the human range in both directions, and it departs from its own training text the same way.

**Didn't hold: careful prose.** I said the tells were marks of careful writing, "the kind written in academia, in formal correspondence". In the training text these constructions are rarest in the most formal writing (Wikipedia, academic papers and scientific PDFs) and 3 to 7 times as common in ordinary web pages. They belong to web writing. The other tells I named, hedging and structure, weren't measured here and may still fit what I said.

**Didn't hold: "not synthesised".** I wrote that every pattern AI produces "was learned from human text. Not human-adjacent or synthesised." For this model that's wrong. Ai2's own documentation labels more than half the text in Olmo 3's [second training stage](https://huggingface.co/datasets/allenai/dolma3_dolmino_mix-100B-1025) as synthetic, including reasoning written by other models such as QwQ, Gemini and Nemotron. The assistant version was [fine-tuned](https://huggingface.co/datasets/allenai/dolci-instruct-sft) partly on responses written by GPT-4.1, and about half of its [preference pairs](https://huggingface.co/datasets/allenai/dolci-3-instruct-dpo-with-metadata) were judged by a GPT model. Most of what the raw model read was written by people. The assistant layer leans on other models' writing.

**Mostly didn't hold: American.** The study started from the idea that these constructions are American, and that AI writing reads as foreign to a British or South African reader partly because it reads as American. The first half held for people in 2012. The model's writing mostly isn't American-shaped, which undercuts the second. Its biggest excess is in the contrast family, the one that separated the countries least: British writers used 2 of the 4 more often than Americans did. I'd also wondered whether the average had been dragged toward American English by the sheer volume of American text, but the training text doesn't lean American on these constructions, so there was nothing for volume to drag. The exception is the "here's the thing" family, the most American of the four, which the assistant model uses at about four times the American rate. If AI writing reads as American anywhere, it's there.

## Stage by Stage

Olmo 3 was trained in six stages: three of pretraining, then fine-tuning on example conversations, preference tuning on pairs of answers, and reinforcement learning. Study 4 counted the contrast in what the model wrote at the end of each stage, and in the training text of four of them.

The model at the end of the first stage uses the contrast less than the web text it learned from. Every stage after that raises it. The second stage, where Ai2 mixed synthetic question-answer, instruction and reasoning text into the pretraining, raised it sixfold. The third raised it about threefold, fine-tuning about twofold, and preference tuning and reinforcement learning a little each. By the time post-training started, the raw model was using the contrast about twenty times as often as it had after the first stage, and post-training then tripled it.

None of the training text comes close to the rates the model reaches. Most of the second stage's synthetic text uses the contrast less than ordinary web pages do. The fine-tuning examples richest in it, responses written by GPT-4.1, use it at under a tenth of the rate the fine-tuned model reaches. After the second stage the model uses the contrast at more than six times the rate of the text that stage trained on, and after fine-tuning at more than thirty times the rate of its examples. In preference tuning, the answers marked as better used it about a third more than the ones marked worse, though the two sides were mostly written by different models.

Ai2 also ran the second stage three ways from the same starting point, with different mixes of text. The mix heavy on web pages, question-answer and instruction data left the model using the contrast almost three times as often as the mix heavy on maths, code and reasoning. Of those three, ordinary web pages carry the contrast at the highest rate, so that is where I would look first. The mixes differ in more than one way, so it's a lead to follow up.

Eryk Salvaggio [has argued](https://mail.cyberneticforests.com/its-not-just-data-its-post-training/) that the contrast comes from the reinforcement-learning stage of post-training. In Olmo 3 that stage raised it by the smallest step of any. Reasoning written by other models, the kind of text his argument is about, was in the mix that left the model using the contrast less.

Of the nine registered tests on the contrast, the five that predicted a rise from one version of the model to the next, or from rejected answers to preferred ones, were supported. The three that predicted the training text, or the first-stage model, would carry more of it than what it was set against came out the other way, and the comparison of mixes favoured the question-answer data. On all 15 constructions together, eight of the nine tests were inconclusive, for the same reason as Studies 2 and 3, and the ninth, on the fine-tuning examples, came out the other way.

## Reading for Tells

In [*Lying Is Lying*](ai-lying-is-lying.html) I said the gap lives in "the pattern-matching against em-dashes and cadence and structure". The cadence turns out to be a real difference in rate. A reader who keeps running into the same contrast in machine writing is noticing something no group of human writers produces. [Wikipedia's editors](https://en.wikipedia.org/wiki/Wikipedia:Signs_of_AI_writing) list the construction among their signs of AI writing, and note in the same entry that it's common among human writers.

A single instance in someone's writing is evidence of nothing, because people use these constructions at ordinary rates, and British writers used some of them more than Americans did. The signal is the density. So I'd change who I think gets caught: in May I said it was people writing careful, average prose, and on these constructions it's anyone who uses them at all. The studies measured writing and not readers, so that last part is inference.

## What This Doesn't Show

- **Other models.** Olmo 3 was chosen because its training text is published. Nothing here says how GPT, Claude or Gemini write.
- **Other kinds of writing.** Every text answered one prompt, a blog post from a title. Other prompts and genres may draw on other registers.
- **How the constructions are used.** They were counted as fixed strings. Where they sit in a paragraph, and how they pile up, wasn't measured.
- **Readers.** Whether readers in different countries react differently wasn't tested.
- **Why a stage raises it.** Each stage changes the learning schedule along with the text, and fine-tuning changes the prompt format too, so Study 4 finds where the rise happens without showing what causes it.
- **The rest of the May post.** Em-dashes, tripled lists, hedging, bullet points, and my point about people writing in a second language weren't part of this.

The model learned the contrast from us, then used more of it at every stage of training after the first, well past anything in the text it was given. What drives that is still open. I've added a note to the May post pointing here.
