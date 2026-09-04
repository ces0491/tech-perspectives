---
title: "Partly Cloudy: Forecasting Your Needs in a Fragmented Cloud"
description: >-
  The cloud has come apart into components. When a production stack needs no hyperscaler console, the question stops being whether you can run it and becomes which option to choose.
date: 2026-06-02
tags: [cloud, infrastructure]
---

# Partly Cloudy: Forecasting Your Needs in a Fragmented Cloud

You can stand up a serious production stack today without ever opening a hyperscaler console. GPU compute from a neocloud, object storage from Cloudflare, ephemeral functions from Modal, deployment from Vercel — each piece a few lines of config, each one live in minutes. Ten years ago that stack was either science fiction or a maintenance burden no small team would take on. Now it's an ordinary afternoon's work.

That shift is easy to miss under the louder noise about AI, but it matters at least as much. The cloud has come apart into components, and the consequence reaches past the technical. It changes what the central question even is. For a long time the question was *can we run this at all?* Now it's *which of dozens of viable options do we pick, and what does it cost us to keep them talking to each other?*

## Commitment became composition

There was a time when reaching for the cloud was a weighty, deliberate act. The cloud was for big things — real storage, real compute, the workloads you genuinely couldn't run on your own hardware. Getting there meant learning networking, identity, regions, billing, a stack of concepts you had to absorb before a single line of your own code would run.

That overhead did something subtle. It pushed everyone toward standardising on one provider. If you were going to pay the setup cost once, you paid it on AWS, you learned AWS, and you did *everything* on AWS. The friction was itself a centralising force. Nobody shopped around, because shopping around meant paying the tax again.

The friction is mostly gone now. Provisioning a GPU, a bucket, or a function is close to free in both money and effort. And when the cost of trying something drops to nearly zero, the cloud stops being a destination you commit to and becomes a set of parts you compose. You no longer adopt a specialist because there's no other way to do the job. You adopt it because, for that one slice of the problem, it is faster, cheaper, or simply more pleasant than the generalist. The cloud went from something you needed to something you reach for.

## Why it came apart

The single broad platform has been unbundled into a field of specialists, each one taking a single layer and beating the generalist inside it.

Neoclouds like Nebius, CoreWeave, and Lambda took GPU compute, born out of a stretch where the hyperscalers simply couldn't supply accelerators fast enough or at a sane price. Cloudflare's R2 took object storage, leading with no egress fees — a direct strike at what was, on the big platforms, less a cost than a way to make leaving expensive. Modal took ephemeral compute, Vercel took deployment, and there is a new name worth evaluating most months.

Each of these succeeds by being deep instead of broad. They don't try to be all things to everyone. They try to be the best available version of one thing, and they tend to arrive bottom-up — a developer adopts one to solve a problem in front of them — rather than top-down through an architecture review.

## The bill you don't see at signup

A perfect tool for every layer is wonderful right up to the point where you have to assemble them.

Five specialists means five identity models, five billing relationships, five security postures to reason about, data moving *between* providers, and observability stitched across boundaries that don't naturally line up. The specialist saves money on the line item and bills you back, quietly, in integration work. This is the moment the generalist's perfectly serviceable managed database starts to look appealing — not because it's better, but because it is already there and already wired into everything else.

There is a second cost, subtler than integration and rarely mentioned: the cost of *knowing*. When a credible new platform appears most months, how do you know when something genuinely better has arrived? How much time goes into evaluating it, and how much churn can a team absorb chasing improvements that are real but marginal? The freedom to pick the best tool becomes a standing obligation to keep checking whether you still have it. That is a real and continuous load, and it didn't exist when the friction made the decision once and left it settled.

## When the platform still wins

None of this retires the generalist. It relocates its value.

The hyperscaler used to be valuable because it was the only practical option. That is over, but what remains is genuinely worth paying for, to the right buyer. Integration is the actual product: one identity model, one invoice, services built to wire into each other, so that if your binding constraint is engineering time rather than the cloud bill, the coherence is worth more than a cheaper component. Procurement and compliance matter too — committed-spend agreements, a single vendor to hold accountable, broad certification — which is unglamorous and exactly why large organisations still default there. And breadth is a form of insurance: you don't re-evaluate vendors every time your needs shift, and good-enough-and-present beats excellent-but-elsewhere more often than engineers like to admit.

## The view from here

Most of that argument has been written as though the choice were borderless. From where we sit, it isn't. Geography reasserts itself the moment you take residency, latency, and regulation seriously — and in South Africa all three arrive at once.

The hyperscalers have spent real money locally. AWS [opened its Cape Town region in 2020](https://press.aboutamazon.com/2020/4/aws-launches-region-in-south-africa), Microsoft runs regions in both Johannesburg and Cape Town, and Google [opened Johannesburg in 2024](https://cloud.google.com/blog/products/infrastructure/heita-south-africa-new-cloud-region). That means in-country data residency and low latency from a generalist you can also buy everything else from. Most of the new specialists offer nothing of the sort: the GPU neoclouds and platforms like Modal run from data centres abroad, with no African region at all. A few are exceptions — Cloudflare has [edge presence in Johannesburg, Cape Town, and Durban](https://www.cloudflare.com/network/) — but the typical specialist sits across an ocean. Using one from here means accepting the latency and, more consequentially, sending your data offshore.

That last part is where the trade-off stops being academic. POPIA doesn't demand blanket localisation, but [section 72](https://popia.co.za/section-72-transfers-of-personal-information-outside-republic/) restricts moving personal information out of the country without adequate protection in place, and the regulators who watch finance and insurance lean hard toward keeping customer data close to home. For a regulated client, a specialist with no African region turns a latency question into a compliance conversation, with penalties that run to millions of rands. Layer on the currency exposure of paying for a USD-billed service in rands, and the marginal performance edge that made the specialist attractive can quietly be eaten alive by everything attached to it.

So the broad-versus-deep call tilts here in a way it doesn't in the US. A specialist's depth has to clear a higher bar — enough advantage to justify the latency, the cross-border data question, and the currency risk all at once. Sometimes it does. Often, for the regulated and the latency-sensitive, the local region of a generalist wins on exactly the grounds the global commentary overlooks. Knowing which case you're in isn't a generic skill, and it doesn't come off a pricing page.

## What's temporary and what isn't

Some of this fragmentation will compress, and some won't, and it pays to tell them apart.

The neocloud boom is partly an arbitrage on a supply shortage. The clearest sign of how unusual that shortage is: the hyperscalers themselves have become customers of the specialists, renting capacity they can't build out fast enough. When supply normalises and the platforms' own silicon matures, some of that margin will close, and some of these names will be absorbed or undercut.

The egress story is the opposite. It started as a competitive pitch and in the EU it is becoming law. From January 2027 [the Data Act](https://digital-strategy.ec.europa.eu/en/factpages/data-act-explained) bars cloud providers from charging switching fees at all — including the egress charges that made leaving expensive — dismantling through regulation a lock-in that competition had only dented. A moat that is being removed by statute is not coming back. The same goes for bottom-up adoption: once developers can route around procurement to pick their own tools, that habit doesn't reverse. One of these forces is a passing distortion. The others are a change in the terrain.

## The skill moved

The cloud stopped being a decision you make once and became one you make continuously.

The old skill was provisioning — could you stand the thing up at all? That has been commoditised, and AI tooling has finished the job. The skill that matters now is judgement: choosing well from an overwhelming menu, recognising when a marginal gain isn't worth the integration cost, and holding the discipline to stop chasing the newest name once what you have is good enough. Knowing what to compose, what to consolidate, and when "already integrated" beats "technically better" is harder to teach and harder to hire for than knowing how to configure a VPC. Increasingly it is the work itself — less about standing systems up than about deciding what belongs where, and making the parts hold together once they're chosen.

The barrier has shifted from *can you build it* to *can you choose well without drowning in the options*. That second skill is the one worth investing in now, and we're not convinced it's the easier of the two.

The cloud was made easier precisely so you wouldn't need a specialist to use it — and the proliferation that came with that ease has made experienced guidance more valuable. What's become scarce is judgement. When there was one obvious provider, advice was nearly redundant — you learned the platform and got on with it. With dozens of defensible options and a new one most months, the rare and useful thing is someone who has seen enough of these decisions to say which fragments are worth assembling, which are noise, and how to keep the whole thing coherent a year from now. Accessibility moved the need for expertise up the stack.

---

June 2, 2026
