---
title: "Is This Package Safe to Depend On?"
description: >-
  Adding a dependency takes seconds and removing one can take weeks. CRAN already publishes enough to answer the question before you commit — it's just spread across three APIs most of us don't check.
date: 2026-08-22
categories: [R]
tags: [r, cran, dependencies, shiny]
---

# Is This Package Safe to Depend On?

Adding a package to `DESCRIPTION` takes a few seconds. Taking one back out, three years later, can take weeks (probably just days with some AI assistance).

The decision to depend on something is made in a moment, usually while you're focused on something else entirely — you need a date parser, someone on Stack Overflow (remember Stack Overflow?) used this one, it works, move on. But every so often, the package stops building against the current R release, or the maintainer's email starts bouncing, or CRAN archives it and that glossed-over reverse dependency becomes a proper headache.

We've built good habits around a lot of things that are cheaper to get wrong than this. We review pull requests that change five lines but we don't review the line that adopts twelve thousand lines of somebody else's code. Which probably says more about human nature than the explicit habits of coders, but I digress.

## CRAN already publishes the answer

The information you'd want is public, free, and machine-readable. It's just spread across three separate services, none of which is the page you land on when you Google a package name.

- [**crandb**](https://crandb.r-pkg.org) has package metadata, the full release timeline, reverse dependency listings (with a caveat I'll come back to), and — importantly — whether the package has ever been archived.
- [**cranlogs**](https://cranlogs.r-pkg.org) has download counts, daily or aggregated over arbitrary windows.
- [**search.r-pkg.org**](https://search.r-pkg.org) does full-text search across all of it.

Most of us don't check all three before adding a dependency. At least, I didn't. I was fortunate enough to have good training that made me think about these sorts of things but the overhead of a thorough package audit was just too boring and honestly a bit hand-wavy — if there was a good enough package to do a job you needed, you used it. But we have AI for these boring jobs now (like writing tests — I've never seen this many tests in repos ever [which is great btw]) so there's no longer an excuse to implement the good practices you know you should be but don't.

## The five signals

Five signals are worth weighing. Each is easy to over-read on its own, which matters more than the list.

**Recency.** When was the last CRAN release? This is the signal most reach for but is also easy to misinterpret. A package with no release in three years might be abandoned — or it might be *finished*. Some of the best small packages on CRAN do one thing, do it correctly, and have had no reason to change. Recency only becomes damning in combination: a long gap *plus* failing checks on current R is a package on its way to the archive. A long gap plus clean checks is often just a stable package.

**Download momentum.** What matters is the direction. A package whose downloads have halved over a year is telling you something that its lifetime total is hiding. It is the most forward-looking of the five, and the easiest to compute wrong. cranlogs returns rows only from a package's first publication, so a four-month-old package has four months of data. Divide its total by twelve to get a baseline and you understate that baseline threefold, which turns a decline into growth. Compare mean downloads per day over the last 30 days against the mean per day over the days before them, and report nothing at all with fewer than 60 days of history.

**Download volume.** Useful, but inflated. cranlogs counts fetches from Posit's mirror, so it is a sample of CRAN, and crawlers and mirror syncs are counted alongside installs. Installing a package also pulls its dependencies down with it, which means anything sitting in a popular dependency tree posts numbers that reflect *its dependents'* popularity and not necessarily its own adoption. Peter Li made that point, and the observation that the bias dilutes as real downloads rise, in [packageRank](https://cran.r-project.org/package=packageRank) and [his write-up of it](https://www.r-bloggers.com/2020/05/counting-and-visualizing-cran-downloads-with-packagerank-with-caveats/). A package with two million downloads a month might have very few humans who chose it deliberately.

**Ecosystem adoption.** How many other CRAN packages depend on this one. It functions as a form of insurance: CRAN is reluctant to archive a package that would break a long tail of dependents, and maintainers of widely-depended-on packages get pressure, help, and sometimes successors in a way that solo packages don't. High reverse dependency counts mean the ecosystem itself has a stake in the thing continuing to work.

**Maturity.** How long the package has been on CRAN. This separates something first published in 2007 from something first published six months ago, which the other four signals can't distinguish. It's the weakest of the five, and weighted accordingly, but it captures the case where seemingly promising new packages are relegated on the author's list of priorities.

Using release count as proxy for age proves a poor decision. Across a systematic sample of 140 CRAN packages the two correlate at 0.49, and 17 of them had been on CRAN eight years or more with four releases or fewer — stable packages that a release-count measure files as new. Take the age from the first publication date, and show the release count beside it as a track record.

## Doing it yourself

You don't need an app for this. Two API calls and one base R function get you most of the way:

```r
library(httr2)

# The slow part; available.packages() caches for the session.
cran_db <- available.packages(repos = "https://cloud.r-project.org")

cran_signals <- function(pkg, db = cran_db) {
  meta <- request("https://crandb.r-pkg.org") |>
    req_url_path_append(pkg, "all") |>
    req_perform() |>
    resp_body_json()

  dl <- request("https://cranlogs.r-pkg.org") |>
    req_url_path_append("downloads", "total", "last-month", pkg) |>
    req_perform() |>
    resp_body_json()

  revdeps <- tools::package_dependencies(
    pkg, db = db, reverse = TRUE,
    which = c("Depends", "Imports", "LinkingTo")
  )[[1]]

  dates <- sort(unlist(meta$timeline))

  list(
    version       = meta$latest,
    first_release = unname(as.Date(dates[1])),
    last_release  = unname(as.Date(dates[length(dates)])),
    releases      = length(dates),
    revdeps       = length(revdeps),
    archived      = meta$archived,
    downloads_30d = dl[[1]]$downloads
  )
}

str(cran_signals("ggplot2"))
```

```text
List of 7
 $ version      : chr "4.0.3"
 $ first_release: Date[1:1], format: "2007-06-01"
 $ last_release : Date[1:1], format: "2026-04-22"
 $ releases     : int 55
 $ revdeps      : int 4833
 $ archived     : logi FALSE
 $ downloads_30d: int 2000824
```

Nineteen years, 55 releases, two million downloads a month, 4,833 packages depending on it, never archived. You didn't need the data to know ggplot2 is safe — if your method disagrees with the obvious cases, you probably need to go back and check your working.

The `archived` field is worth singling out. A package that has been archived and restored has already demonstrated the failure mode you're worried about, and it's the one signal here that's binary rather than a matter of degree.

## crandb has two reverse dependency numbers and one of them is a trap

The reverse dependency count above doesn't come from the same call as everything else - deliberately.

The `/{package}/all` response carries a `revdeps` field. It arrives in the JSON you already have, it's a single integer, and it is very tempting. It also isn't the number you want:

| Package | `revdeps` field | Actual strong revdeps |
| --- | --- | --- |
| ggplot2 | 410 | 4,833 |
| dplyr | 63 | 4,916 |
| jsonlite | 63 | 1,653 |
| httr2 | *absent* | 455 |

dplyr and jsonlite both come back with 63, though dplyr has three times as many actual dependents, and httr2 has no value at all. Whatever that field counts, it isn't what its name suggests, and a score weighted on it would be ranking packages by an artefact.

The number you actually want is at a different crandb endpoint, `/-/revdeps/{package}`, which returns the dependent package names split by relationship:

```r
revdeps <- request("https://crandb.r-pkg.org") |>
  req_url_path_append("-", "revdeps", "ggplot2") |>
  req_perform() |>
  resp_body_json()

lengths(revdeps$ggplot2)
#>   Imports  Suggests   Depends  Enhances
#>      4440      2033       395         7
```

That agrees with `tools::package_dependencies()` to within a handful of packages — 4,835 against 4,833 — and the difference is just which mirror snapshot each one saw. Either route is correct. The single integer in the metadata blob is not.

The discrepancy is only visible if you already have a sense of the right magnitude. When you assemble a metric from convenient sources, the field that's easiest to reach is not always the field you want, and a plausible wrong number is much harder to notice than a missing one.

## The Score

Five signals is four more than most people will weigh in the few seconds the decision actually gets. So I collapsed them into a 0–100 viability score, weighted like this:

| Factor | Weight |
| --- | --- |
| Recency | 30% |
| Download momentum | 25% |
| Download volume | 20% |
| Ecosystem adoption | 15% |
| Maturity | 10% |

Those weights are a judgement call. Recency and momentum are the forward-looking signals and volume is the backward-looking one, so the front of the list gets the weight — but somebody with different priorities should weight them differently.

The score is a triage tool. It's good for sorting a shortlist and for noticing that something you assumed was fine has been declining. It is not a verdict, and a low score on a small, finished, well-written package that does exactly what you need is probably a false alarm you should overrule.

## The app

I built [**cranExploreR**](https://github.com/ces0491/cranExploreR). It's a Shiny app — `bslib`, `plotly`, `httr2` — that pulls the signals above, draws the twelve-month download trend, and lets you put two or three candidate packages side by side, which is usually the actual question.

It's [running here](https://019d3e9e-b1a7-77dc-9266-40ce0b717eb3.share.connect.posit.cloud/). Source code on GitHub.

The app is convenient but the question is answerable from data CRAN has been publishing all along.

The tooling is there too. [packageRank](https://cran.r-project.org/package=packageRank) has been on CRAN since 2019, across 25 releases, and treats the download half of this more carefully than anything above — it works from the raw logs rather than the aggregates, which is what it takes to separate an install from a crawler. The data and the tools were both available the whole time. But the percieved overhead of maintaining the discipline of checking meant I wasn't always doing this. I hope that cranExploreR makes the check trivial enough for it to always be a part of any of your consequential workflows.
