# LinkedIn post: what your agent gets when you share a document

The announcement for *Lost in Translation: What Your Agent Gets When You Share
a Document* (`_posts/2026-09-17-lost-in-translation.md`). Per the 9 September
2026 decision in [blog-structure.md](blog-structure.md), it says the piece is
out and links to it, so it gives the takeaway and leaves the tables, the
explanation and the caveats to the post.

The post went live on 17 September 2026.

Paste the body as-is: no markdown headings, link on the last line so the
preview card resolves.

---

More of what I write now passes through a person on its way to an AI agent. I send a review, an engineer reads it, then hands it to Claude to make the changes. So I tested what the agent actually gets.

The short version: send the Markdown.

A link to a web page gave the agent a short summary of the page. A Claude artifact link either didn't open or cost up to twice the page. A single-file Quarto page defeated Claude's Read tool. And PDFs broke file paths across lines, which Claude didn't always put back together.

What each copy costs, and scripts to run the same checks on your own documents:

https://blog.sheetsolved.com/lost-in-translation.html
