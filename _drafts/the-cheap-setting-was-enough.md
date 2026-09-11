---
title: "Marking My Own Homework: The Cheap Setting Was Enough"
description: >-
  I wrote a framework for choosing a model and effort level per task, then benchmarked it. Four of its eight claims were wrong, and on model choice it told me to spend more than the work needed.
date: 2026-09-08
tags: [ai, claude, tooling, cost]
---

# Marking My Own Homework: The Cheap Setting Was Enough

I kept hitting my usage limit at the same rate whether I asked Claude Code to review a small repository or build a feature in a large one. That seemed worth understanding, so I parsed the transcripts Claude Code leaves in `~/.claude/projects`. The script that does it ships in the repo below, so these are numbers you can produce for your own machine rather than take from mine. Across 137 sessions on 11 September, input tokens outweighed output by 428 to 1, and 99% of that input was conversation being re-read from cache on every call. Of the ten sessions with the most calls, seven carried between 396K and 535K tokens of context per call.

Every API call re-sends the whole conversation. What a run consumes is context size multiplied by the number of calls. A review reads much of the repository into context early and then carries it for hundreds of calls, which is why it lands in the same place as a feature build.

So I wrote [a skill](save-it-for-the-hard-part.html) that recommends a model and effort level per phase of work: plan on the expensive model, implement on the cheap one, keep effort high for judgment-dense work like debugging and code review, delegate reading to subagents. It codified what I believed about where the tokens go.

Then I built a benchmark to check whether any of it was true.

## What a grader has to do

The hard part is deciding whether a cheaper setting still did the job, because a model that writes a confident summary of work it did badly reads exactly like one that succeeded. Every case needed a fact to check rather than prose to judge.

I built a small invoicing library with 29 tests, then wrote five tasks against it. Implementing a credit-note feature is graded by eight hidden tests written from the spec before any run. Fixing a planted bug is graded by five more: three fail both on the bug and on the plausible band-aid fixes, and two check that nothing else changed. Renaming a function is graded by the original tests with the rename applied, and a grep for the old name.

Two details did most of the work. Before grading, the original test files are overwritten with pristine copies, so a model that deletes a failing assertion gets no credit for it. And the code review case is a six-file diff carrying five planted defects where all 29 visible tests pass, because the CSV defect comes with a deleted assertion and a trimmed round-trip test that used to catch it. You cannot find those bugs by running the tests.

Then I wrote the pass mark for each claim into a file before that claim's data was read, along with what would change in the skill if it failed. The file was written while the first matrix was running, with three of the chore results already visible, and it says so. Without it I would have been free to reinterpret whatever came back.

## Fifty-two graded runs

Every model passed every graded run. What varied was the cost — Claude Code's own list-price figure for the run, which on a subscription measures how much of your allowance it took rather than a charge you will see.

Implementing the credit-note feature:

| Setting | Cost | Result |
|---|---|---|
| haiku | $0.17 | passed |
| sonnet, medium | $0.28 | passed |
| sonnet, xhigh | $0.62 | passed |
| opus, medium | $0.86 | passed |
| opus, xhigh | $1.65 | passed |
| fable, xhigh | $2.63 | passed |

Fifteen times the cost for the same 37 tests green. Fixing the planted bug ran from six cents on Haiku to forty-four on Opus at xhigh, all passing. The rename ran from six cents to twenty-five.

The code review went the wrong way.

| Setting | Defects found | Turns | Cost |
|---|---|---|---|
| sonnet, high | 4, 4, 5 of 5 | 11 | $0.24 |
| opus, low | 5 of 5 every run | 3 | $0.25 |
| opus, high | 5 of 5 every run | 13 | $0.82 |

Opus at low effort found all five defects in three turns. The same model at high effort found the same five in thirteen turns for 3.3 times the money. The extra ten turns went into reading the diff and turned up nothing further. Sonnet was cheapest and missed the in-place array sort in two runs out of three, which is the defect that requires noticing a side effect rather than checking code against a documented rule.

Four of my eight claims were wrong. Debugging does not need the top model when there is a failing test pointing at the bug. Reviews do not need high effort on a diff you could hold in your head. Forcing subagents onto Haiku saved 30% rather than the 40% I had claimed. And splitting a small task into a planning session on Opus and an implementation session on Sonnet cost more than doing the whole thing in one Opus session, because the plan has to be written, read and paid for.

The first two ran the same direction: I had recommended a more expensive setting than the work required, in both cases for a phase where being wrong felt costly. The other two are different mistakes. One is a saving I overstated. The other is a piece of process I had assumed paid for itself, and which charges you for writing a plan down and reading it back.

## What the benchmark got wrong

The review grader was wrong four times. The first two errors turned up before I trusted any of its numbers, and both would have produced a more flattering story.

The first version counted false positives per paragraph, so an answer that explained one defect across three paragraphs was charged with two spurious findings. I hand-read four answers and found zero false positives where the grader had counted eight, two, one and two.

The second version broke on formatting. One run wrote each finding as `**File**:` and `**Defect**:` on separate lines, and my block-splitting logic put the file name and the defect description in different blocks, so it scored one out of five. Reading it showed it had found four. Had I trusted that number, this post would have claimed Sonnet collapses on code review. It does not.

The other two turned up after the results were in the repository, and both ran the other way, towards passing answers that had not earned it. The CSV defect's patterns included words like "test" and "deleted", which any answer mentioning that file uses. And a one-line answer naming four files beside the right keywords passed, while invented findings added to a real answer cost nothing. The grader now splits an answer into findings, each led by a file:line reference, and matches each against the mechanism of a defect. Re-grading all ten saved answers changed no score, and it agrees with every hand grade I have on record.

The third error was mine, in the pre-registration. I wrote the test for "raise effort before you upgrade the model" with its comparison inverted, so a result showing model-upgrade-first was cheaper would have been recorded as supporting effort-first. The criterion is still in the file with a note, because a criterion you rewrite after seeing the data is not a criterion. Under the test as written the claim fails; under the claim as named the data supports it, at $0.59 per completed task against $0.82.

There was also a stretch where 23 runs returned HTTP 429 because I hit my own session limit, and the summariser cheerfully scored every one of them as a task failure. Zero-dollar medians, verdicts flipping. A usage limit is not a failure to do the work, and the runner now says so.

The benchmark also left out the plugin itself. The task runs loaded no plugins, so every saving above ignores what asking for a route costs. Once I measured it, a route in version 1.0.1 left 9.6K tokens in context for every later call, and cost about what moving a small chore to a cheaper model saved. The skill now runs in a forked subagent, so only its answer comes back, and [when a route pays for itself](tokenwise.html) is written up on its own.

## What I actually changed

The routing table now starts each row as cheap as the work allows and, where there is an escalation, names what has to go wrong before you take it. Debugging a reproducible failure starts on Sonnet at medium. Reviewing a diff starts on Opus at low. Anthropic's own guidance turns out to be the right escalation rule: if the model failed with the context it had, it did not know enough, so change the model; if it skipped files or stopped early, it did not try hard enough, so raise the effort.

The claim I could not test at all was the one about the prompt cache being per model, so that switching models mid-session re-processes your whole context. Resuming a session through the command line starts a new process, and the control run on the same model rewrote the entire prefix too, which means the comparison measures the harness rather than the cache. It stays in the skill labelled as documented behaviour rather than as something I measured.

The cost-per-completed-task measure is what I would defend from all of this. It divides cost by pass rate, so a setting that fails one run in three is charged for the retry. Without it, "cheaper" is just a smaller number next to an unstated risk. With it, the top of the model range has to earn its price on a task where it makes a difference, and on tasks like these it never got the chance.

The benchmark cannot tell you where the expensive settings pay off: on a small library with complete specifications, nothing ever reached the ceiling. For the ordinary work in between, the cheaper setting finished the job every time.

*Fifty-two graded runs on Claude Code 2.1.263, 8 September 2026. The code, the graders, the pre-registered criteria and the raw JSON for every run are at [github.com/ces0491/tokenwise](https://github.com/ces0491/tokenwise). Two commands check the figures without spending anything: `node bench/summarize.mjs --check` confirms the tables above follow from the committed runs, and `node bench/context-profile.mjs` reproduces the token measurements against your own transcripts.*
