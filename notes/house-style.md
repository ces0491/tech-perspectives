# House style

Conventions this blog follows, recorded so they stay decidable rather than
being re-argued per post. `scripts/check-style.js` enforces the rules from
CLAUDE.md that a regex can see. What is here is what it cannot.

Each entry says how to decide, not just what the answer usually is. A rule
that needs taste to apply is still a rule; one that can only be applied by
recognising previous examples is a habit, and habits drift.

---

## Numbers: spelled or numeral

**Spell it when the number is arguing.** It is part of the sentence's logic
and the reader is not going to check it: "the other four signals", "two API
calls and one base R function", "five questions", "twelve months", "eight
years or more with four releases or fewer". This holds above ten when the
figure is round and rhetorical — "twelve thousand lines of somebody else's
code", "forty years", "Nineteen years".

**Use a numeral when the number is measuring.** It came from somewhere and a
reader could go and check it, or it is a parameter of a system: 27 findings,
140 packages, 0.49, 532 of 600, 17,313 of 24,887, 9% to 54%, band edges at 50
and 200, 60 days of history. Labels and literals go here too — list markers,
`Windows 365`, `1200 x 32`, section numbers.

**Where the two collide, measuring wins.** "I sampled 9 packages over 13 days"
rather than "nine packages over 13 days": both figures describe the sample, so
they take the same form even though one is under ten. Splitting them on size
puts a seam in the middle of one clause.

Corrected across the corpus on 4 September 2026. The three that had drifted
were "The 3 to 5 highest-impact items" (arguing, so spelled), "more than 10
years ago" against "Ten years ago" elsewhere (rhetorical, so spelled), and the
sampling clause above.

No checker rule for this. The test is whether a number is arguing or
measuring, which a regex cannot see, and it would flag every legitimate "one
thing, do it correctly" on the way past.

## Headings

Title Case or sentence case, consistently **within a post**. The corpus uses
both across posts and that is not worth unpicking; a post that mixes them is.

A heading names its section. It does not assert what the section proves —
`check-style.js` catches the `Why This Matters` family.

## Cross-links between posts

Bare filename, no leading `./`: `[text](partly-cloudy.html)`. The permalink is
`/:title.html`, so this is the filename with its date prefix removed.

Links point backwards, to posts that already exist when the linking post is
written. A reader arriving at a later piece wants the earlier context; a
reader of the earlier piece does not need the sequel, and editing a published
post to add one is a change to a live page for no reader's benefit.

## Titles

The front matter `title` and the `# H1` are the same string, in every post.

The `Idiom: descriptive half` shape is established — *Everything Old Is New
Again: Technology's Fashion Cycles*, *How Long Is a Piece of String? Bounding
AI Code Reviews*, *Look Before You Leap: Scoring Bands I Never Checked*. A
colon separates the halves; a dash gets normalised to one.

The filename slug is short and usually carries one half rather than the whole
title. Renaming a post after publication changes its URL, so the slug is
settled before the first push and left alone after.

## Numbers that came from somewhere else

A figure quoted from a source stays that source's claim until it is checked.
Attribute it, or verify it and state it. This is the CLAUDE.md rule; it is
repeated here because the blog is where it keeps mattering — a number in prose
does not read as a claim the way a number in a table does.
