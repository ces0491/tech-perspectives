# LinkedIn announcements for the tokenwise posts

Two posts, so two announcements, per the 9 September 2026 decision in
[blog-structure.md](blog-structure.md): the blog hosts the writing and LinkedIn
says a new piece is out. Both bodies below are a hook and a link. A reader who
already has the argument has no reason to click, so neither reproduces the piece
it points at.

Paste each body as-is: no markdown headings, link on the last line so the
preview card resolves.

They do not go out together. The launch announcement goes first, then the
article's once *Marking My Own Homework* publishes. Announcing a thing and
reflecting on what building it taught you are two different posts, and running
them in the same week makes the launch read as a postmortem.

Both posts are still in `_drafts/`, so neither URL resolves yet.

---

## For *tokenwise for Claude Code*

Leads on the usage limit, because on a subscription that is the resource a task
spends.

---

On a subscription the money is settled before the month starts. What you spend during it is your usage limit, and it goes on whatever you happen to point Claude Code at — including phases that would have finished on a cheaper setting.

Every API call re-sends the whole conversation. On my own Claude Code transcripts the input side runs 444 tokens for every one of output, almost all of it conversation being re-read from cache. What a task consumes is context size multiplied by call count, and the model and effort level you pick set the rate on top of that.

That second half is what I built a Claude Code plugin for. It recommends a model and effort per phase of work, says what the cheaper choice gives up, and will not switch anything for you, because nothing can change a running session's model.

New piece on the blog, with the install:

https://blog.sheetsolved.com/save-it-for-the-hard-part.html

---

## For *Marking My Own Homework*

Leads on being wrong, because that is the reason to click. The tables, the costs
and the grader failures stay in the article.

---

I wrote a framework for picking which Claude model and effort level to use for each kind of coding work. Then I built a benchmark to check whether I was right.

I was wrong four times out of eight. Twice I had recommended a more expensive setting than the work needed, both times for a phase where being wrong felt costly.

My graders were wrong twice before they were right, and both times the error would have made a more flattering story. One version scored a good code review answer at 1 out of 5 because it had formatted its findings across separate lines. Had I trusted it, I would have published that a cheaper model collapses on code review.

Fifty-two graded runs, hidden tests written from the spec before any run, and the pass mark for each claim written down before that claim's data was read. Full write-up on the blog:

https://blog.sheetsolved.com/the-cheap-setting-was-enough.html
