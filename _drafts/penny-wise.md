---
title: 'Penny Wise: When Asking Which Model to Use Pays for Itself'
description: >-
  A tokenwise route has a price of its own. What asking costs from three Claude Code settings, and the task size below which the answer costs more than it saves.
date: 2026-09-11
tags: [ai, claude, tooling]
---

# Penny Wise: When Asking Which Model to Use Pays for Itself

[tokenwise](save-it-for-the-hard-part.html) answers one question for Claude Code: which model and effort level a piece of work needs. The answer comes from a model as well, so asking has a price. On a small enough task that price is more than the cheaper setting saves, and you would have done better picking a setting yourself.

I measured the price of asking from three session settings and set it against what the cheaper settings saved on the benchmark behind the plugin's routing table.

[![What each setting cost on four benchmark tasks, what a route costs from three settings, and the task sizes where a route pays for itself]({{ '/assets/tokenwise/breakeven.svg' | absolute_url }})]({{ '/assets/tokenwise/breakeven.svg' | absolute_url }})

## What asking costs

A route runs on whatever model and effort your session is on, in a forked subagent, so only its answer comes back into the conversation.

| Asking from | A route mid-session | Answer left in context |
|---|---|---|
| Sonnet 5, medium | $0.04 | 590 tokens |
| Opus 5, high | $0.12 | 860 tokens |
| Opus 5, xhigh | $0.17 | 889 tokens |

Claude Code's model configuration docs put Max, Team Premium, Enterprise and API users on Opus 5 at high effort unless they change it, so the middle row is the default on those plans.

The answer is carried on every later call until you clear. Anthropic's pricing page lists an Opus 5 cache read at $0.50 per million tokens, so 889 tokens comes to $0.0004 a call.

Asking from a cheaper session costs less and gets a shorter answer. Sonnet 5 at medium recommended the same settings as the Opus sessions in half the words.

## What a cheaper setting saves

The benchmark ran four tasks against a small invoicing library, each on the expensive setting a routing claim was tested against and on the setting a route recommends. Every run in these cells passed its grader.

| Task | Moved from | Recommended | Saved |
|---|---|---|---|
| Implement a feature from a written spec | Opus 5, xhigh: $1.65 | Sonnet 5, medium: $0.28 | $1.36, or 83% |
| Rename a function across code, tests and README | Opus 5, xhigh: $0.25 | Sonnet 5, low: $0.08 | $0.17, or 67% |
| Fix a planted bug with a failing test | Opus 5, high: $0.41 | Sonnet 5, medium: $0.12 | $0.29, or 70% |
| Review a six-file diff | Opus 5, high: $0.82 | Opus 5, low: $0.25 | $0.57, or 70% |

The median saving across the four is 70%.

## Where the line falls

A route reads its own instructions and the one-line description you give it, and nothing else, so its price does not grow with the task. The saving does. With a 70% saving, a route breaks even on a task that would cost the route's price divided by 0.7 on your current setting, and it saves more than twice its price only on tasks twice that size.

| Asking from | Costs more than it saves below | Saves less than twice its price below |
|---|---|---|
| Sonnet 5, medium | $0.06 | $0.12 |
| Opus 5, high | $0.17 | $0.35 |
| Opus 5, xhigh | $0.24 | $0.48 |

The rename lands on the line. It cost $0.25 on Opus at xhigh, routing it saved $0.17, and the route cost $0.17, so asking broke even and was not worth the typing. The feature, the bug fix and the review each landed in the top band.

A route saves nothing when the session is already on the setting it recommends, and then its whole price is lost whatever the size of the task.

In practice that comes down to three habits:

- For a quick edit, pick Sonnet or Haiku at low effort yourself.
- For a feature, a debugging session or a review, ask at the start of the phase, just before a `/clear`, so the answer is not carried into the work.
- When you already know which setting the work needs, skip the question.

## What the numbers do not cover

The benchmark's tasks are small, and every saving above was measured at that size. The bands assume a larger task saves the same share on the cheaper setting, which is untested. If the cheaper setting fails and you run the task again, the retry comes off the saving.

The dollar figures are Claude Code's list prices. On a subscription they show how much of your usage limit a task takes, and no bill arrives for them.

Changing model on a conversation already under way re-processes all of it on the new model, and so does changing effort on most models, according to Claude Code's prompt caching docs. Straight after a `/clear` there is little left to re-process. A switch without one adds a cost these figures leave out.

The route prices come from one run per setting. Two runs of the previous version on identical text differed by $0.026, which is more than the rename's margin. Sonnet 5 at high, the default on Pro and Team Standard plans, was not measured.

*Task runs on Claude Code 2.1.263, 8 September 2026. Routes on tokenwise 1.1.2 and Claude Code 2.1.267, 11 September 2026. The code, the transcripts and the chart's generator are at [github.com/ces0491/tokenwise](https://github.com/ces0491/tokenwise), and two commands check the figures without spending anything: `node bench/breakeven.mjs --check` confirms the chart follows from the committed runs, and `node bench/skill-cost.mjs --compare 1.1.2@1.0.1,1.1.2-opus-high@1.0.1,1.1.2-sonnet-medium@1.0.1` prints the route costs from the saved sessions.*
