---
title: "Lost in Translation: What Your Agent Gets When You Share a Document"
description: >-
  Send an agent the source. In my tests a web link gave it a short summary, an artifact link failed or cost up to twice the page, a Quarto page defeated its Read tool, and PDFs broke file paths.
date: 2026-09-17
tags: [ai, claude, tooling]
---

# Lost in Translation: What Your Agent Gets When You Share a Document

I used to write for people, but now more of the documents I share pass through a person on their way to an agent. I review an engineer's work with Claude, the engineer reads the report (maybe), and then hands it to their own Claude session to make the changes. The engineer wants a page that reads well, and their session needs everything in the report intact. I've been writing in various flavours of Markdown for ages, and that's been a really smooth workflow into this AI era. Sending a beautifully formatted HTML document has always been a no-brainer, but that was when the reader was exclusively human. I'm now starting to think about my non-human readers as well. So I tested a few things and came up with the following, which will all seem pretty intuitive to those of you who work with reproducible documentation flows.

## Send the source

- Send the Markdown, or whatever the page was rendered from. A person can read it as it is and render it if they want. It was the cheapest copy for Claude to read, and it's the only one with no rendering step to lose anything in.
- Don't send a link to a web page. In my tests the agent got only a short summary of the page, and once said it had read the whole thing.
- If Claude published the document as an artifact, ask it for the Markdown too and send that.
- Don't send a single-file Quarto page. With only its Read tool, Claude couldn't read it at all.
- Don't rely on a PDF. Most of the tools that make one can break file paths across lines, and Claude doesn't always put them back together. If you do print one from a browser, set inline code to `white-space: nowrap` first.

## A link

A pasted link to an ordinary web page goes through WebFetch, which by Claude Code's own description converts the page to Markdown and has "a small fast model" answer a prompt about it. The agent gets that answer. I gave a session the arXiv link for *Attention Is All You Need* and asked it to read the whole page. It got back two short answers from a 189 KB page and replied that it had read it. In a second session on a newer Claude Code, it got the same kind of answers and said it couldn't honestly claim to have read the page.

Claude can also publish a document as an artifact, a page on claude.ai you share by link. My review of my tidylearn package went out that way, with no Markdown copy. I tried the ways an agent could read it. Each copy was read in full, one session per copy, and the tokens each read added come from the session's own usage records.

| Copy | Tokens added |
|---|---|
| Markdown copy, read from disk | 18.8K |
| The page's HTML, read from disk | 23.7K |
| The link, read with the Artifact tool | 26.5K to 46.1K |
| The link, read with WebFetch | failed |

WebFetch didn't get the page in any session I measured. Told to use it, it got HTTP 403 each time. Left to choose, the agent didn't try, saying it couldn't open claude.ai links, and asked for the content to be pasted in. Those were headless sessions (`claude -p`). In my own interactive session in VS Code, WebFetch opened the same link through my claude.ai login and returned it the way the Artifact tool does. So what WebFetch gets depends on the session, and I haven't pinned down which part of it matters.

The tidylearn page is over 50 KB. The Artifact tool handed over the first 50 KB and saved the whole file to disk with an instruction to read all of it. In two sessions the agent then read the whole file, so most of the page went in twice. In a third, on a newer Claude Code, it read only the part it hadn't seen. Two smaller artifacts of mine came back whole in one call. Having the Artifact tools available also adds context to every call a session makes, whether or not it reads an artifact.

I own this artifact, which is why the tool gave me its HTML. For an artifact someone else shared with you, the tool's own description says a read returns an isolated summary. That's the usual case for the engineer, and a summary can drop exactly the file paths and line numbers the engineer's session needs.

Turning the page into Markdown after the fact was harder than it should be. The content isn't in the HTML as text: a script builds it in the browser, so pandoc turned the saved page into an empty file. I had to render the page in a headless browser first. Asking Claude for the Markdown when it writes the document avoids all of that.

## Rendered copies

The other document is a review Claude wrote for a new product feature: 12 KB of Markdown with headings, lists, and file paths and line numbers in code formatting. I rendered it to HTML with pandoc, to a single-file HTML page with Quarto (`embed-resources`, which is what makes it one file you can send), and to PDF by printing the pandoc page from Chrome. Claude read each copy with its Read tool.

| Form | File size | Tokens added |
|---|---|---|
| Markdown | 12 KB | 4.9K |
| HTML, pandoc | 18 KB | 8.3K |
| PDF, 5 pages | 161 KB | 12.5K |
| HTML, Quarto single file | 1.2 MB | not read |

With only its Read tool, Claude never got through the Quarto page. Quarto packs the page's scripts, fonts and stylesheet into the file, some of them as single lines too long for the Read tool to return, and the report itself starts more than two thousand lines in. Claude hit one of those lines, couldn't get past it, and said it could not read the file. Given search tools as well, it found where the report starts and read it from there, adding about three times the tokens the Markdown did.

The PDF broke file paths. Pandoc's stylesheet lets inline code wrap, and Chrome treats a hyphen as a place to break a line, so a path like `load-model.ts:120-135` can end up split across two lines. Word and LibreOffice do the same. Typst breaks paths at slashes too, and LaTeX keeps them whole but lets a long one run off the edge of the page. Pull the text back out of a split path and you get a line break in the middle of it, or the hyphen gone: `loadmodel.ts`. The HTML kept every path exactly as written.

Claude usually put split paths back together, but not always. On two synthetic reviews with known paths, it gave every split path back exactly on one, and on the other some reads came back with a hyphen missing: `statement-run-8` as `statement-run8`. Adding `code { white-space: nowrap; }` to the page before printing from Chrome stopped the splits: each path moved whole to the next line.

## What it costs

For a light document the difference is small. The Markdown session above cost $0.070 at list price and the PDF session $0.101, against $0.046 for a session with no document. The PDF cost the most because a short PDF goes in as a document block, which [Anthropic's documentation](https://platform.claude.com/docs/en/build-with-claude/pdf-support) says carries each page as an image with its extracted text alongside, so Claude got it twice.

The dollar figures are Claude Code's list prices, which is the unit it reports. On a subscription you won't see a bill for any of this: the figures are a weighting for how much of your usage limit each copy takes up.

Whatever a read adds stays in the session, and every later call sends it again, from the prompt cache, until you `/clear`. Cache reads are billed at a fraction of normal input, so for a light document that stays small.

Heavy markup costs far more. The arXiv HTML page of *Attention Is All You Need* added 101.8K tokens against 19.4K for its PDF, and that session cost $0.59 at list price against $0.13.

## What the numbers do not cover

- A link someone else shared with you. The artifact was read by the account that owns it, and the shared case, where the agent gets a summary, isn't measured.
- Your own documents. A page with heavier markup than my reports will cost more to read, and a different renderer may break different things. The scripts in the footer run the same checks on your files.
- Other models. Everything ran on Sonnet 5 at low effort, and another model or effort level may repair broken paths more or less reliably.
- Other web pages. WebFetch was tried on one page, and another may come back differently.
- The measured sessions were headless. An interactive session can behave differently, as WebFetch did with the artifact link.
- The path checks show whether exact paths survive. They don't show whether Claude understood the rest of a document.

*The rendered report and the paper were recorded on 16 September 2026 and everything else on 17 September, all on Claude Sonnet 5 at low effort, on Claude Code 2.1.272 except the link sessions repeated on 2.1.273. The WebFetch 403s, a second 2.1.272 Artifact-tool read of the tidylearn page (46.4K) and the interactive WebFetch call come from sessions that aren't saved. The scripts and the saved runs are in the [tokenwise](tokenwise-for-claude.html) repository, under [experiments/doc-format](https://github.com/ces0491/tokenwise/tree/main/experiments/doc-format), whose README has the figures left out here and the command to reprint each table for free. The report is a client document and isn't published, and the artifacts are private, so their saved runs record hashes and versions but not the documents or links. `measure.mjs` measures your own files and links, `pdf-wrap.mjs` checks which paths survive each PDF tool without spending anything, and `recall.mjs` checks whether Claude gives the paths back. The 94 sessions behind the saved runs came to $9.96 at list price.*
