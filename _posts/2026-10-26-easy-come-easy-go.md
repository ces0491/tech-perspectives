---
title: "Easy Come, Easy Go: Building Software When Anyone Can"
description: >-
  AI means I can build the tools I need myself. It also means anyone can, so what I build is less likely to add much for anyone else. Both come from the same fall in the cost of building.
date: 2026-10-26
tags: [ai, software]
---

I've been going back and forth between two thoughts about building software with AI, and they seem to pull in opposite directions.

The first is that I no longer have to hope someone builds the thing I need. I wanted to know where to buy firewood most cheaply in Cape Town, so I built [Wood Wiz](https://woodwiz.sheetsolved.com). It reads the vendors' online shops every morning and ranks what they sell by rand per kilogram. It cost me little time, effort or money to build. I build things like this on my own, in my spare time, and five years ago something like it would have taken me the better part of a year. That alone would have put me off building it at all. If I'd really wanted the tool, I might have made a spreadsheet, or a Shiny app (a small web app written in R) running on my own laptop if I thought it would be useful for more than the one job. I'd never have built anything as sophisticated as Wood Wiz, or the other tools I've built this way, like a [rugby tournament predictor](https://rtp.sheetsolved.com).

The second is that building software can feel quite pointless. In September I released [tokenwise](tokenwise-for-claude.html), a plugin for Claude Code, Anthropic's coding tool, to get more work out of a Claude subscription. Two weeks later Anthropic changed the model new sessions start on, and against the new default the plugin's main recommendation stopped saving enough to be worth making. In October Claude Code started warning you when resuming an old conversation would use up a noticeable share of your usage limit, which was another of the plugin's jobs. There isn't enough left in it now for anyone to bother installing it.

So building is easy, which is great when I'm the one who needs the thing. But it's easy for everyone, so the chance that what I build adds anything for anyone else keeps falling. Someone else, or some company, will have built it too, or built it better.

The two thoughts turn out to be the same fall in the cost of building, seen from two sides. For the person who needs a tool, cheaper building means getting exactly the thing they want, where before they'd often have made do or gone without. What a tool adds for other people is measured against whatever they'd have had without it, and that alternative gets better when anyone can build. Which side you end up on depends on who else has the problem.

Most of the pieces of this argument come from other people, and I've credited them as they come up. What I've tried to do is put them together around two projects of my own.

## Cooking at home

In 2004 Clay Shirky called software built for a handful of people [situated software](https://www.gwern.net/docs/technology/2004-03-30-shirky-situatedsoftware.html), after watching his students at NYU build tools for a few dozen people in their own community. Robin Sloan's [*An app can be a home-cooked meal*](https://www.robinsloan.com/notes/home-cooked-app/) (2020) is about a messaging app he built for his family: "no one else will ever use it." In 2024 Maggie Appleton argued that language models would bring this kind of [home-cooked software](https://maggieappleton.com/home-cooked-software) to technically minded people who don't want to become programmers.

Wood Wiz is one of these. It's used by me and a handful of other people, and it's worth having whether or not anyone else ever finds it.

## Cooking for everyone

It gets harder when the aim is to add something for other people. What you add is the difference between what happens with you and what would have happened anyway. The careers organisation 80,000 Hours built some of its early advice on this idea, which it calls [replaceability](https://80000hours.org/2015/07/replaceability-isnt-as-important-as-you-might-think-or-weve-suggested/). A surgeon who performs 100 life-saving operations hasn't saved 100 lives if someone nearly as good would have done the job in their place. They later said it matters less than they'd suggested, because often nobody else would have taken the job. That's the Wood Wiz case.

Inventions work the same way. In 1922 William Ogburn and Dorothy Thomas [listed inventions and discoveries](https://archive.org/details/jstor-2142320) made independently by two or more people, calculus among them, and argued that once the preconditions are in place an invention will turn up whoever makes it. AI coding tools have put many of the preconditions for software in front of anyone with a subscription.

A year ago I argued that AI would finish off proprietary languages like Stata and SAS ([*AI: The Final Nail in the Coffin*](ai-end-of-proprietary-platforms.html)). People paid for them because they were easier to use, and AI made Python and R just as easy. The same thing is now happening to the tools I build. AI has removed the cost that used to stop other people from building it too.

Appfigures, which tracks the app stores, [counted 557,000 new App Store apps in 2025](https://appfigures.com/resources/insights/20251205/2-the-app-store-just-logged-its-biggest-release-year-in-nearly-a-decade) in an analysis published that December, up from 448,000 in 2024, and puts part of the rise down to AI coding tools. In July Pieter Levels shared a summary of a Fireship video arguing that indie hackers, people who build and sell small software products on their own, [may be the first kind of developer to go extinct](https://levels.io/indie-hackers-first-to-go-extinct-with-ai), because "execution now costs ~$20/month, so anyone can build personal software" instead of paying a subscription for it.

## Overtaken by the platform

tokenwise ran into a different version of this. It was overtaken by Anthropic changing its own product, and even the figures tokenwise used to warn about a costly resume came from Claude Code itself.

That risk is much older than AI. Sherlock was the search tool built into Apple's Mac operating system. In 2001 a small developer, Karelia, released [Watson](https://en.wikipedia.org/wiki/Karelia_Watson), a separate app that did the same kind of web searching and more, and in 2002 Apple released Sherlock 3, which did most of what Watson did. Ever since, when Apple builds a feature that does the job of someone's app, people say the app has been [Sherlocked](https://9to5mac.com/2024/06/12/here-are-the-apps-sherlocked-by-apple-during-wwdc-2024/). A plugin that makes Claude Code cheaper to use is doing a job Anthropic can do itself, by changing Claude Code.

Not all of it was Anthropic. Before either change, my own benchmark had tested the plugin's claims and found that more than half of them didn't hold up. What has lasted is an experiment I ran alongside it, on how Claude reads a document you share with it, which became [*Lost in Translation*](lost-in-translation.html) and doesn't depend on the plugin.

## What survives

In 1945 Friedrich Hayek argued that much of the knowledge an economy runs on is ["the knowledge of the particular circumstances of time and place"](https://www.econlib.org/library/Essays/hykKnw.html), spread among the people on the spot, where no central planner can collect it. Wood Wiz runs on that kind of knowledge. Vendors sell in 18 kg bags, 500-piece bundles, 1-ton pallets and half-bakkie loads, and the prices only compare once they're all turned into rand per kilogram. Prices differ between cities mostly because of how far the wood has to travel, so ranking one city against another would tell a buyer nothing about their own options. None of that is anything a model vendor needs to know.

That's also why it reaches a handful of people. What lasts tends to be what nobody better placed has a reason to build, and often that's because few people need it. Something a lot of people need tends to draw other builders, and if it sits on someone's platform it draws the platform's owner as well. The space in between, a problem that enough people have and that nobody better placed is working on, is where building for others still adds something, and the app numbers suggest it's filling up.

So before building something for other people, it's worth asking who else has the problem. Anyone better qualified or better resourced, or who has been looking at it for longer, can get there first or build something much better, whether that's a person, a team or the company that owns the platform you're building on. If nobody else has the problem, the thing will probably last, and reach about as many people as share it.

## What this doesn't cover

- It rests on two projects, both mine. Other builders' cases may cut the other way.
- The app counts measure how much is being built. They don't show how many people use any of it, so "filling up" is an inference.
- Findings go stale too. *Lost in Translation* measured particular versions of Claude Code, and anything that depends on how a tool behaves can change with the next release.
