# LinkedIn announcements for the tokenwise posts

Three posts, so three announcements, per the 9 September 2026 decision in
[blog-structure.md](blog-structure.md): the blog hosts the writing and LinkedIn
says a new piece is out. Each body below is a hook and a link. A reader who
already has the argument has no reason to click, so neither reproduces the piece
it points at.

Paste each body as-is: no markdown headings, link on the last line so the
preview card resolves.

They go out in order: the launch announcement, then the route-cost post, then the
article's once *Marking My Own Homework* publishes, from 14 September.
Announcing a thing and reflecting on what building it taught you are two
different posts, and running them in the same week makes the launch read as a
postmortem.

The launch post and the route-cost post are live. *Marking My Own Homework* is in
`_drafts/`, so its URL does not resolve yet.

---

## For *tokenwise for Claude Code*

Leads on the escalation rule, which is the most useful thing in the post that is
not its opening paragraph. An announcement that starts where the piece starts
has already given a reader the first thing they would have clicked for.

---

When Claude Code gets something wrong there are two failures behind it, and they take different fixes. If it failed with the context it had, it did not know enough, so change the model. If it skipped files or stopped early, it did not try hard enough, so raise the effort. I spent a long time treating those as one problem and reaching for the expensive model either way.

That distinction is the spine of a Claude Code plugin I have just put up. You say what phase you are about to start, and it answers with the exact /model and /effort to type, whether to clear the context first, what to push into subagents, and what the cheaper choice gives up.

It will not switch anything for you. Nothing can change a running session's model or effort, so it recommends and tells you what the recommendation costs.

Five of its nine routing rows carry no measurement behind them, and the table says so in the row. The four that are measured come from a benchmark that changed the table: four of the eight claims I had written into it turned out to be wrong.

On a subscription none of this arrives as a bill. It is a share of your month, and running out of limit on work that would have finished on a cheaper setting is what I built this to stop.

Install and the reasoning:

https://blog.sheetsolved.com/save-it-for-the-hard-part.html

---

## For *tokenwise: When Asking Which Model to Use Pays for Itself*

Leads on the plugin costing something to use, which a reader of the launch
announcement has not been asked to think about. The table and the bands stay in
the piece.

---

A plugin that tells you which Claude model to use is itself a call to a Claude model, so asking has a cost. On a small enough task that cost is more than the cheaper setting saves, and you would have done better picking a setting yourself.

I measured what a route costs from three Claude Code settings and set it against what the cheaper settings saved on my benchmark. A quick rename barely covered the cost of asking. A feature build, a bug fix and a code review each saved more than twice what the question cost.

The chart, the task sizes where the line falls, and two free commands that check the figures:

https://blog.sheetsolved.com/tokenwise.html

---

## For *Marking My Own Homework*

Leads on being wrong, because that is the reason to click. The tables, the costs
and the grader failures stay in the article.

---

I wrote a framework for picking which Claude model and effort level to use for each kind of coding work. Then I built a benchmark to check whether I was right.

I was wrong four times out of eight. Twice I had recommended a more expensive setting than the work needed, both times for a phase where being wrong felt costly.

My review grader was wrong four times, and the first two errors would both have made a more flattering story. One version scored a good code review answer at 1 out of 5 because it had formatted its findings across separate lines. Had I trusted it, I would have published that a cheaper model collapses on code review.

Fifty-two graded runs, hidden tests written from the spec before any run, and the pass mark for each claim written down before that claim's data was read. Full write-up on the blog:

https://blog.sheetsolved.com/the-cheap-setting-was-enough.html
