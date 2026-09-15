---
title: 'The Price of Asking: When a tokenwise Route Pays for Itself'
description: >-
  A tokenwise route has a cost of its own. What asking costs from three Claude Code settings, and the task size below which the answer costs more than it saves.
date: 2026-09-11
redirect_from: [/penny-wise.html, /tokenwise.html]
tags: [ai, claude, tooling]
---

# The Price of Asking: When a tokenwise Route Pays for Itself

[tokenwise](tokenwise-for-claude.html) answers one question for Claude Code: which model and effort level a piece of work needs. The answer comes from a model as well, so asking has a cost. On a small enough task that cost is more than the cheaper setting saves, and you would have done better picking a setting yourself.

I measured the cost of asking from three session settings and set it against what the cheaper settings saved on the benchmark behind the plugin's routing table.

[![What each setting cost on four benchmark tasks, what a route costs from three settings, and the task sizes where a route pays for itself]({{ '/assets/tokenwise/breakeven.svg' | absolute_url }})]({{ '/assets/tokenwise/breakeven.svg' | absolute_url }})

## What asking costs

A route runs on whatever model and effort your session is on, in a forked subagent, so only its answer comes back into the conversation.

| Asking from | A route mid-session | Context carried afterwards |
|---|---|---|
| Sonnet 5, medium | $0.04 | 655 tokens |
| Opus 5, high | $0.10 | 663 tokens |
| Opus 5, xhigh | $0.11 | 780 tokens |

Claude Code's model configuration docs put Max, Team Premium, Enterprise and API users on Opus 5 at high effort unless they change it, so the middle row is the default on those plans.

That context is carried on every later call until you clear. Anthropic's pricing page lists an Opus 5 cache read at $0.50 per million tokens, so 780 tokens comes to $0.0004 a call.

Each session routed the same two short task descriptions. Sonnet 5 at medium recommended the same settings for both as the Opus sessions did, at less than half their cost. Its answers ran to 160 and 193 words against 267 to 325 for Opus.

## What a cheaper setting saves

Four of the benchmark's tasks, all against a small invoicing library, ran on the expensive setting a routing claim was tested against and on the setting a route recommends. Every run in these cells passed its grader.

| Task | Moved from | Recommended | Saved |
|---|---|---|---|
| Implement a feature from a written spec | Opus 5, xhigh: $1.65 | Sonnet 5, medium: $0.28 | $1.36, or 83% |
| Rename a function across code, tests and README | Opus 5, xhigh: $0.25 | Sonnet 5, low: $0.08 | $0.17, or 67% |
| Fix a planted bug with a failing test | Opus 5, high: $0.41 | Sonnet 5, medium: $0.12 | $0.29, or 70% |
| Review a six-file diff | Opus 5, high: $0.82 | Opus 5, low: $0.25 | $0.57, or 70% |

The median saving across the four is 70%.

## Where the line falls

A route is told to read only its own instructions and the one-line description you give it, so the size of the work should not change its cost, though the benchmark only priced it on short descriptions. What it saves grows with the work. With a 70% saving, a route breaks even on a task whose cost on your current setting is the route's cost divided by 0.7, and it saves more than twice its cost only on tasks twice that size.

| Asking from | Costs more than it saves below | Saves less than twice its cost below |
|---|---|---|
| Sonnet 5, medium | $0.05 | $0.11 |
| Opus 5, high | $0.14 | $0.28 |
| Opus 5, xhigh | $0.16 | $0.31 |

The bands are worked from the unrounded route costs, so dividing the rounded ones above can land a cent out.

The rename lands in the middle band. It cost $0.25 on Opus at xhigh, moving it to Sonnet at low saved $0.17, and asking cost $0.11, so asking came out $0.06 ahead. That is a gain too small to be worth the typing. The feature, the bug fix and the review each landed where a route saves more than twice its cost.

A route saves nothing when the session is already on the setting it recommends, and then its whole cost is lost whatever the size of the task.

In practice that comes down to three habits:

- For a quick edit, pick a setting yourself: Sonnet at low effort, or Haiku.
- For a feature, a debugging session or a review, ask at the start of the phase, then `/clear` before you switch, so the switch does not re-process the conversation on the new setting.
- When you already know which setting the work needs, skip the question.

## What the numbers do not cover

The benchmark's tasks are small, and every saving above was measured at that size. The bands assume a larger task saves the same share on the cheaper setting, which is untested. If the cheaper setting fails and you run the task again, the retry comes off the saving.

The dollar figures are Claude Code's list prices. On a subscription they are a weighting for comparing settings.

Changing model on a conversation already under way re-processes all of it on the new model, and so does changing effort on most models, according to Claude Code's prompt caching docs. Straight after a `/clear`, only the system prompt and project context are re-processed, as in a new session. A switch without one adds a cost these figures leave out.

The route costs come from one run per setting. The 1.1.1 route, run twice on identical text, cost $0.155 and $0.129, so two runs of one route can differ by $0.025, against the rename's $0.06 margin. Sonnet 5 at high, the default on Pro and Team Standard plans, was not measured.

*Task runs on Claude Code 2.1.263, 8 September 2026. Routes on tokenwise 1.2.0 and Claude Code 2.1.270. The code, the transcripts and the chart's generator are at [github.com/ces0491/tokenwise](https://github.com/ces0491/tokenwise), and two commands check the figures without spending anything: `node bench/breakeven.mjs --check` confirms the chart follows from the committed runs, and `node bench/skill-cost.mjs --compare 1.2.0,1.2.0-opus-high@1.2.0,1.2.0-sonnet-medium@1.2.0` prints the route costs from the saved sessions.*
