---
title: 'tokenwise for Claude Code'
description: >-
  On a subscription the cost of a task is a share of your usage limit. A Claude Code plugin for not spending that share on work that never needed it.
date: 2026-09-09
redirect_from: /save-it-for-the-hard-part.html
tags: [ai, claude, tooling]
---

# tokenwise for Claude Code

On a subscription the money is settled before the month starts. What you spend from then on is your usage limit, and it goes on whatever you happen to point Claude Code at, including phases that would have finished on a cheaper setting.

Every API call re-sends the whole conversation. What a task consumes is context size multiplied by the number of calls, and the model and effort level you pick set the rate on top of that.

On my own Claude Code transcripts the input side runs 444 tokens for every one of output, and almost all of it is conversation being re-read from cache. `node bench/context-profile.mjs` in the repository below produces that table from your transcripts instead of mine.

That leaves two levers. Context size is mostly a discipline problem: when you clear, what you delegate to a subagent, how large a slice you take on at once. tokenwise is for the other one, the model and effort you pick — a decision made once at the start and then usually left alone for the rest of the session.

## What it does

It adds one skill:

```
/tokenwise:route implement the plan in docs/plan.md, about 12 files
```

The answer names a model and an effort level as the exact `/model` and `/effort` commands to type, says whether to clear the context first and what the switch costs if you don't, says what to push into subagents, says what the cheaper choice gives up, and gives you one check to run to know the phase is finished before you trust it.

Every row of the routing table underneath it names where to start, and the seven rows with somewhere to escalate to name what has to go wrong before you move. The escalation rule comes from Anthropic's own guidance: if the model failed with the context it had, it did not know enough, so change the model; if it skipped files or stopped early, it did not try hard enough, so raise the effort. I used to treat those as one problem.

Reviewing a diff starts on the expensive model at low effort. High effort on a diff you can hold in your head buys more turns spent re-reading it, and the bound on what a review can usefully do is the subject of [How Long Is a Piece of String?](bounding-ai-code-reviews.html).

## What it will not do

It cannot switch anything for you. Nothing can change a running session's model or effort level — that is `/model` and `/effort`, typed by you. The skill recommends, and tells you what the recommendation gives up.

It ships no hooks either. What it does add to every session is the skill's description, 156 tokens, so that Claude knows the skill is there. That also means Claude can run the skill without being told to, and in testing it did when a session asked in plain words which model and effort to use.

## What it does not know

Five of the nine rows in the routing table carry no measurement behind them, and each says so in the table. They are informed guesses about work I have not benchmarked.

The four that are measured come from a benchmark I built to check the table, and it changed the table. Four of the eight claims I had written in turned out to be wrong: twice by recommending a setting more expensive than the work needed, once by overstating a saving, and once on a piece of process that charges you for writing a plan down and reading it back. That is its own story and I have written it up separately.

The benchmark counts in dollars, because list prices are the unit Claude Code reports. On a subscription they measure how much of your month a task eats rather than a charge you will see.

Every graded run passed, whatever the setting, so the benchmark compares consumption at equal outcomes and never reaches the point where an expensive setting earns its keep by succeeding where a cheap one fails. The graders, the pre-registered pass criteria and the raw results for every run are in the repository, so you can disagree with me using my own data.

## Install

```
/plugin marketplace add ces0491/tokenwise
/plugin install tokenwise@ces0491-plugins
```

Or read it before you install it:

```sh
git clone https://github.com/ces0491/tokenwise && cd tokenwise
node bench/summarize.mjs --check    # do the published tables follow from the published runs?
node bench/context-profile.mjs      # the token figures above, against your own transcripts
```

Neither makes an API call, so your limit is untouched. MIT licensed, at [github.com/ces0491/tokenwise](https://github.com/ces0491/tokenwise).
