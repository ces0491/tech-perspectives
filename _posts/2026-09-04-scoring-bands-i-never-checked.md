---
title: "Pulling on Threads: Scoring Bands I Never Checked"
description: >-
  I banded monthly downloads by powers of ten without checking where the packages actually were. A sample of 600 put 532 of them in one band, and the band below caught nothing at all.
date: 2026-09-04
categories: [R]
tags: [r, cran, scoring]
---

# Pulling on Threads: Scoring Bands I Never Checked

I have a dashboard that [scores CRAN packages](is-this-package-safe-to-depend-on.html) on how reasonable they may be to include in your next project. Monthly downloads are worth 20 of its 100 points, and I banded them by powers of ten: under 100, then 1,000, then 10,000, then 100,000. Five bands across four orders of magnitude, for a quantity that runs from a handful to millions. It looked about right, and I didn't give it any further thought.

What sent me back to it was a different bug. The momentum factor had been dividing a package's lifetime downloads by twelve months whether or not it had been on CRAN that long, so a package four months old got a baseline three times too low and its decline came out as growth. Pulling on that thread began to expose a few other gaps.

So: 600 packages spaced evenly through the 24,887 CRAN publishes, in name order, and cranlogs for last month's totals in three batched requests.

```r
idx  <- available.packages(repos = "https://cloud.r-project.org",
                           filters = character())
pkgs <- sort(rownames(idx))
sel  <- unique(pkgs[round(seq(1, length(pkgs), length.out = 600))])

counts <- unlist(lapply(split(sel, ceiling(seq_along(sel) / 200)), function(ch) {
  jsonlite::fromJSON(paste0(
    "https://cranlogs.r-pkg.org/downloads/total/last-month/",
    paste(ch, collapse = ",")))$downloads
}), use.names = FALSE)

median(counts)
#> [1] 277.5
sum(counts >= 100 & counts < 1000)
#> [1] 532
min(counts)
#> [1] 100
```

532 of the 600 in one band. The median package gets 277 downloads a month. The factor was carrying a fifth of the weight and telling me almost nothing: a package on 150 a month sits at the 4th percentile of that sample, one on 900 sits at the 88th, and both scored 6 out of 20.

The part I hadn't gone looking for was the band underneath. Labelled *very low*, and empty. The smallest count anywhere in 600 packages was exactly 100.

It turns out that cranlogs counts fetches from Posit's mirror, and crawlers and mirror syncs get counted alongside installs. The raw logs record the R version a client reported, and a fetch with none didn't come from `install.packages()`. I sampled 9 packages over 13 days: the share reporting a version ran from 9% to 54%, lowest for the packages with the fewest downloads. Nothing on CRAN reads as zero, and the smaller the package, the less of its count is people.

Then I went looking for prior art, in the wrong order. Peter Li shipped [packageRank](https://cran.r-project.org/package=packageRank) in 2019 and [wrote the caveat up](https://www.r-bloggers.com/2020/05/counting-and-visualizing-cran-downloads-with-packagerank-with-caveats/) in 2020, working from the raw logs rather than the aggregates. Had I read that before writing the scoring code, I'd have started from his caveats instead of reconstructing a rougher version of them.

The bands now break at 50, 200, 500, 2,000, 10,000 and 100,000, cut finer through the range the packages are actually in and left as absolute counts: a few hundred downloads a month is a small user base however much of the repository it beats.

The same pass turned up two more. Maturity was using release count as a proxy for age, and the two correlate at 0.49. Having no reverse dependencies was rendering as a red flag, when 17,313 of the 24,887 packages on CRAN have none.

All of it had been live since the end of March, getting the obvious cases right. ggplot2 near the top, an archived package near the bottom, which seemed like common-sense sniff tests. The errors sat in the middle of the distribution, which is the only part anyone really needs a score for. Sometimes a sniff test is good enough — not everything you build needs to be bulletproof — but I've been shown time and time again to never stop pulling on the threads.

*Figures from a live run on 4 September 2026; cranlogs totals move daily.*
