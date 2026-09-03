---
title: "A Picture of the Hypothesis"
description: >-
  A chart of commodity prices against African resource nationalism drew four questions in the comments. Two went unanswered, and they are the two that decide whether the line measures anything.
date: 2026-09-03
tags: [data, charts, ai, interquartile-rage]
---

# A Picture of the Hypothesis

This is the first of these, so a word on what it is. I keep seeing charts that look like analysis and aren't. What holds my attention is never the chart itself, it's the gap between what the picture claims to measure and what could be measured at all. Interquartile Rage is me working through those one at a time. The rule I'm holding myself to: go after the artefact, never the person who posted it.

So, the artefact.

A partner at a large international law firm posted a chart on LinkedIn last week. He's a corporate lawyer working in energy and mining, so this is his field. The caption said he'd prompted an AI to plot commodity prices against resource nationalism policies and that it had produced some interesting results.

The chart is titled "Commodity Price Cycles vs. African Resource Nationalism (Illustrating a 12-24 Month Policy Lag)". A blue solid line runs across it, labelled "Commodity Price Index (Left Axis)", moving between roughly fifty and a hundred and eighty. A pink dashed line, "Policy Restrictiveness Index (Right Axis)", climbs from near 25 to 200. Two grey bands are labelled "Lag Phase (Policy tightening follows peak)". The x-axis says "Time (Months)" and is ticked "Yr 1" through "Yr 11".

There is no source line. Neither index has a base year.

The caption reports four findings: the two series are cyclically related, price spikes are the primary catalyst for resource nationalism, regulation lags market peaks by twelve to twenty-four months, and so miners carry the downturn while states miss the peak.

It got 24 reactions and 4 comments. Modest reach, which is part of why I'm not naming him.

![]({{ '/assets/iqr-001/post-capture-redacted.png' | absolute_url }})

*The post as captured. Name, photograph and employer are blacked out here and were never in this repository. Everything I quote below is legible in the image.*

## The comments were better than the chart

A CFA charterholder asked what the construction of the Policy Restrictiveness Index was. The author answered, and the answer was reasonable: laws and policies under the resource nationalism umbrella, increased state participation in projects, higher taxes and royalties, local beneficiation requirements.

Then two more questions, which went unanswered:

> does it include all African countries, and how are these weighted? How are the policies or activities scored?

> also which calendar years does your graph correspond to?

![]({{ '/assets/iqr-001/thread-capture-redacted.png' | absolute_url }})

*The complete thread. Four questions, one answer.*

People don't answer LinkedIn follow-ups for all sorts of reasons and I'd read nothing into the silence. But those two questions are the whole post, so I want to spend the rest of this on why.

## Knowing the subject is not the same as measuring it

The author's description of resource nationalism is probably correct. He works in this area and I have no reason to doubt him on what belongs under the heading.

What that knowledge cannot tell him — cannot tell anyone — is whether Zimbabwe's raw ore export ban should score higher or lower than the DRC's cobalt quota. Or how many index points a four-point royalty increase is worth. Or whether a country with one severe measure sits above a country with three mild ones.

Those trade-offs have no natural answer. Someone has to decide them, write the decision down, and defend it. That's most of what building an index is. Domain expertise tells you what to put in the basket; it doesn't weigh the basket.

A smooth line hides that the weighing never happened.

## The chart is a picture of the hypothesis

No data went into it. Ask an image model to plot a relationship and it renders something that looks like the request — it doesn't go and retrieve a series.

You can see this in the title. "Illustrating a 12-24 Month Policy Lag" states the conclusion, and then the caption reports that lag back as a finding. The chart was told what to show, showed it, and was then read as evidence for it.

I don't know what was typed into the prompt and I'm not going to guess. But the title asserting the conclusion and the caption reporting it as a result are both there on the page.

## There is an index by that name. This isn't it.

Worth being careful here, because "no such index exists" would be wrong. Verisk Maplecroft publishes a [Resource Nationalism Index](https://www.mining-technology.com/features/mapping-the-rise-of-resource-nationalism-in-africa/) that scores countries on close to the criteria the author described — state participation, taxes and royalties, expropriation risk.

It's proprietary. It's scored by country, and reported by year.

The chart plots a single continental line, monthly, running from the high twenties to the low two hundreds over eleven years. That series can't be assembled from the index that exists, and I couldn't find a public source it could be assembled from instead.

## Both lines trend, and that's the trap

No one in the thread raised this, and it decides whether the lag is a finding or an artefact.

The policy index starts near 25 and ends at 200 — an eightfold rise across eleven years. It doesn't climb in a straight line; it plateaus through Yr 3 and Yr 4 and falls away properly between Yr 7 and Yr 9. But the direction over the window is not in doubt. The commodity line trends up as well, its three peaks landing near 130, then 163, then 180.

Two series that both trend will appear to track each other whether or not anything connects them. It is the oldest trap in time series work. Granger and Newbold gave it its modern name in [Spurious regressions in econometrics](https://doi.org/10.1016/0304-4076(74)90034-7) (*Journal of Econometrics*, 1974), and Yule was already asking in 1926 why we sometimes get nonsense correlations between time series.

The eye is good at spotting a lag between two rising lines and bad at telling whether the lag means anything. Which brings us to the shading.

## The lag bands don't follow the peaks

The grey bands are labelled "Lag Phase (Policy tightening follows peak)". Look at where they sit.

![]({{ '/assets/iqr-001/chart.png' | absolute_url }})

*The chart on its own, so the shading can be checked against the peaks.*

The first band runs up to the second commodity peak and stops just past it. The second stops short of the third peak altogether. Neither begins after a peak — each one ends at one. Whatever the shading marks, the period following a commodity peak isn't it.

There are three visible peaks and two bands, and the Yr 2 peak gets nothing.

The lag is the claim the caption rests on, and it is drawn on the chart in a way that contradicts the chart's own legend.

## The smaller tells

The x-axis is labelled in months and ticked in years. The label and the geometry disagree, and one of them is wrong.

"12 to 24 months" is a two-to-one window applied to data ticked in years. With three cycles to fit, very little could fall outside it.

And the axis runs "Yr 1" to "Yr 11" with no start date. Real series arrive with dates attached — you have to take them off on purpose. Which is exactly what the fourth question in the comments was asking about.

## Four questions for any index

None of this needs arithmetic. When something is presented to you as an index, ask:

1. What is counted?
2. Over what population?
3. Weighted how?
4. Covering what dates?

If any of those four comes back as a concept rather than a procedure, you can stop reading. "Laws and policies under the resource nationalism umbrella" is a concept. "One point per royalty increase above two percentage points, summed across the fifty-four member states of the African Union, GDP-weighted, monthly from January 2015" is a procedure. You can argue with a procedure. A concept just sits there.

## The honest version

I'd normally rebuild the chart properly at this point and show the working. I can't, and the reason I can't is the finding.

There's no public series to rebuild it from. The index that does exist is proprietary, scored by country, and reported annually. Resource nationalism resists the kind of quantification a smooth monthly continental line implies, and it resists it for real reasons — the underlying events are heterogeneous, contested, and don't come with magnitudes attached.

The chart's most informative feature is the one thing it doesn't have. No numbers on the right-hand axis, no base year, no source. The absence of the y-axis is the story.

---

September 3, 2026
