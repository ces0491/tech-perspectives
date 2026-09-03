---
title: 'From Model to Report: How tidylearn Simplifies ML Reporting'
description: >-
  Every R modelling package returns results in a different shape, so reporting code breaks whenever the model changes. What one tidy interface across twenty algorithms buys you.
date: 2026-08-21
categories: [R]
tags: [r, machine-learning, tidylearn]
---

# From Model to Report: How tidylearn Simplifies ML Reporting

<style>.gt-post-table table {
  font-family: system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.gt-post-table thead, .gt-post-table tbody, .gt-post-table tfoot, .gt-post-table tr, .gt-post-table td, .gt-post-table th {
  border-style: none;
}

.gt-post-table p {
  margin: 0;
  padding: 0;
}

.gt-post-table .gt_table {
  display: table;
  border-collapse: collapse;
  line-height: normal;
  margin-left: auto;
  margin-right: auto;
  color: #333333;
  font-size: 13px;
  font-weight: normal;
  font-style: normal;
  background-color: #FFFFFF;
  width: auto;
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #2C3E50;
  border-right-style: none;
  border-right-width: 2px;
  border-right-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #2C3E50;
  border-left-style: none;
  border-left-width: 2px;
  border-left-color: #D3D3D3;
}

.gt-post-table .gt_caption {
  padding-top: 4px;
  padding-bottom: 4px;
}

.gt-post-table .gt_title {
  color: #FFFFFF;
  font-size: 16px;
  font-weight: initial;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-color: #FFFFFF;
  border-bottom-width: 0;
}

.gt-post-table .gt_subtitle {
  color: #FFFFFF;
  font-size: 12px;
  font-weight: initial;
  padding-top: 3px;
  padding-bottom: 5px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-color: #FFFFFF;
  border-top-width: 0;
}

.gt-post-table .gt_heading {
  background-color: #2C3E50;
  text-align: center;
  border-bottom-color: #FFFFFF;
  border-left-style: none;
  border-left-width: 1px;
  border-left-color: #D3D3D3;
  border-right-style: none;
  border-right-width: 1px;
  border-right-color: #D3D3D3;
}

.gt-post-table .gt_bottom_border {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}

.gt-post-table .gt_col_headings {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
  border-left-style: none;
  border-left-width: 1px;
  border-left-color: #D3D3D3;
  border-right-style: none;
  border-right-width: 1px;
  border-right-color: #D3D3D3;
}

.gt-post-table .gt_col_heading {
  color: #FFFFFF;
  background-color: #34495E;
  font-size: 100%;
  font-weight: bold;
  text-transform: inherit;
  border-left-style: none;
  border-left-width: 1px;
  border-left-color: #D3D3D3;
  border-right-style: none;
  border-right-width: 1px;
  border-right-color: #D3D3D3;
  vertical-align: bottom;
  padding-top: 5px;
  padding-bottom: 6px;
  padding-left: 5px;
  padding-right: 5px;
  overflow-x: hidden;
}

.gt-post-table .gt_column_spanner_outer {
  color: #FFFFFF;
  background-color: #34495E;
  font-size: 100%;
  font-weight: bold;
  text-transform: inherit;
  padding-top: 0;
  padding-bottom: 0;
  padding-left: 4px;
  padding-right: 4px;
}

.gt-post-table .gt_column_spanner_outer:first-child {
  padding-left: 0;
}

.gt-post-table .gt_column_spanner_outer:last-child {
  padding-right: 0;
}

.gt-post-table .gt_column_spanner {
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
  vertical-align: bottom;
  padding-top: 5px;
  padding-bottom: 5px;
  overflow-x: hidden;
  display: inline-block;
  width: 100%;
}

.gt-post-table .gt_spanner_row {
  border-bottom-style: hidden;
}

.gt-post-table .gt_group_heading {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  color: #333333;
  background-color: #FFFFFF;
  font-size: 100%;
  font-weight: initial;
  text-transform: inherit;
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
  border-left-style: none;
  border-left-width: 1px;
  border-left-color: #D3D3D3;
  border-right-style: none;
  border-right-width: 1px;
  border-right-color: #D3D3D3;
  vertical-align: middle;
  text-align: left;
}

.gt-post-table .gt_empty_group_heading {
  padding: 0.5px;
  color: #333333;
  background-color: #FFFFFF;
  font-size: 100%;
  font-weight: initial;
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
  vertical-align: middle;
}

.gt-post-table .gt_from_md > :first-child {
  margin-top: 0;
}

.gt-post-table .gt_from_md > :last-child {
  margin-bottom: 0;
}

.gt-post-table .gt_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  margin: 10px;
  border-top-style: solid;
  border-top-width: 1px;
  border-top-color: #D3D3D3;
  border-left-style: none;
  border-left-width: 1px;
  border-left-color: #D3D3D3;
  border-right-style: none;
  border-right-width: 1px;
  border-right-color: #D3D3D3;
  vertical-align: middle;
  overflow-x: hidden;
}

.gt-post-table .gt_stub {
  color: #333333;
  background-color: #FFFFFF;
  font-size: 100%;
  font-weight: initial;
  text-transform: inherit;
  border-right-style: solid;
  border-right-width: 2px;
  border-right-color: #D3D3D3;
  padding-left: 5px;
  padding-right: 5px;
}

.gt-post-table .gt_stub_row_group {
  color: #333333;
  background-color: #FFFFFF;
  font-size: 100%;
  font-weight: initial;
  text-transform: inherit;
  border-right-style: solid;
  border-right-width: 2px;
  border-right-color: #D3D3D3;
  padding-left: 5px;
  padding-right: 5px;
  vertical-align: top;
}

.gt-post-table .gt_row_group_first td {
  border-top-width: 2px;
}

.gt-post-table .gt_row_group_first th {
  border-top-width: 2px;
}

.gt-post-table .gt_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}

.gt-post-table .gt_first_summary_row {
  border-top-style: solid;
  border-top-color: #D3D3D3;
}

.gt-post-table .gt_first_summary_row.thick {
  border-top-width: 2px;
}

.gt-post-table .gt_last_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}

.gt-post-table .gt_grand_summary_row {
  color: #333333;
  background-color: #FFFFFF;
  text-transform: inherit;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
}

.gt-post-table .gt_first_grand_summary_row {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-top-style: double;
  border-top-width: 6px;
  border-top-color: #D3D3D3;
}

.gt-post-table .gt_last_grand_summary_row_top {
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 5px;
  padding-right: 5px;
  border-bottom-style: double;
  border-bottom-width: 6px;
  border-bottom-color: #D3D3D3;
}

.gt-post-table .gt_striped {
  background-color: #F8F9FA;
}

.gt-post-table .gt_table_body {
  border-top-style: solid;
  border-top-width: 2px;
  border-top-color: #D3D3D3;
  border-bottom-style: solid;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
}

.gt-post-table .gt_footnotes {
  color: #333333;
  background-color: #FFFFFF;
  border-bottom-style: none;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
  border-left-style: none;
  border-left-width: 2px;
  border-left-color: #D3D3D3;
  border-right-style: none;
  border-right-width: 2px;
  border-right-color: #D3D3D3;
}

.gt-post-table .gt_footnote {
  margin: 0px;
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}

.gt-post-table .gt_sourcenotes {
  color: #333333;
  background-color: #FFFFFF;
  border-bottom-style: none;
  border-bottom-width: 2px;
  border-bottom-color: #D3D3D3;
  border-left-style: none;
  border-left-width: 2px;
  border-left-color: #D3D3D3;
  border-right-style: none;
  border-right-width: 2px;
  border-right-color: #D3D3D3;
}

.gt-post-table .gt_sourcenote {
  font-size: 90%;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 5px;
  padding-right: 5px;
}

.gt-post-table .gt_left {
  text-align: left;
}

.gt-post-table .gt_center {
  text-align: center;
}

.gt-post-table .gt_right {
  text-align: right;
  font-variant-numeric: tabular-nums;
}

.gt-post-table .gt_font_normal {
  font-weight: normal;
}

.gt-post-table .gt_font_bold {
  font-weight: bold;
}

.gt-post-table .gt_font_italic {
  font-style: italic;
}

.gt-post-table .gt_super {
  font-size: 65%;
}

.gt-post-table .gt_footnote_marks {
  font-size: 75%;
  vertical-align: 0.4em;
  position: initial;
}

.gt-post-table .gt_asterisk {
  font-size: 100%;
  vertical-align: 0;
}

.gt-post-table .gt_indent_1 {
  text-indent: 5px;
}

.gt-post-table .gt_indent_2 {
  text-indent: 10px;
}

.gt-post-table .gt_indent_3 {
  text-indent: 15px;
}

.gt-post-table .gt_indent_4 {
  text-indent: 20px;
}

.gt-post-table .gt_indent_5 {
  text-indent: 25px;
}

.gt-post-table .katex-display {
  display: inline-flex !important;
  margin-bottom: 0.75em !important;
}

.gt-post-table div.Reactable > div.rt-table > div.rt-thead > div.rt-tr.rt-tr-group-header > div.rt-th-group:after {
  height: 0px !important;
}
</style>

## The Reporting Problem

Machine learning in R is powerful, but reporting the results often takes
more effort than building the model itself. Every package returns
results in a different format — a named vector here, a matrix there, a
custom S3 object somewhere else. Even with excellent tidying packages
like `broom`, the column names and available fields change between model
types, and many ML packages aren't supported at all.

The result is that producing consistent, polished visualisations and
tables for a report means writing custom extraction and reshaping code
for each package you use. Change your model, and your reporting code
breaks.

**tidylearn** solves this. Every function — across 20 algorithms —
returns tidy tibbles, ggplot2 plots, and formatted `gt` tables with a
consistent structure. Your reporting pipeline becomes model-agnostic:
swap the algorithm, and the same plot code, table code, and comparison
logic work without modification.

This post walks through real-world analysis tasks — PCA, hierarchical
clustering, regularisation, and multi-model classification — comparing
the tidylearn workflow against the traditional approach.

``` r
library(tidylearn)
library(dplyr)
library(ggplot2)
library(gt)
library(tibble)
```

------------------------------------------------------------------------

## 1. PCA: Biplot, Scree Plot, and Variance Tables

PCA is a staple of exploratory analysis, and producing a polished biplot
or scree plot is one of those tasks that should be straightforward but
rarely is.

### With tidylearn

``` r
pca <- tidy_pca(USArrests, scale = TRUE)
```

Scree plot with cumulative variance line and 80% threshold:

``` r
tidy_pca_screeplot(pca)
```

![]({{ '/assets/tidylearn/tl-pca-scree-1.png' | absolute_url }})

Publication-ready biplot with observation scores and variable loadings:

``` r
tidy_pca_biplot(pca, label_obs = TRUE)
```

![]({{ '/assets/tidylearn/tl-pca-biplot-1.png' | absolute_url }})

And the tables — variance explained and loadings — are one call each,
with colour-coded formatting out of the box:

``` r
pca_model <- tl_model(USArrests, method = "pca")
tl_table_variance(pca_model)
```

<div id="qeayjdrzqo" class="gt-post-table" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">

<table class="gt_table" data-quarto-disable-processing="false" data-quarto-bootstrap="false">
  <thead>
    <tr class="gt_heading">
      <td colspan="5" class="gt_heading gt_title gt_font_normal gt_bottom_border" style>PCA Variance Explained</td>
    </tr>
    
    <tr class="gt_col_headings">
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="color: #FFFFFF;" scope="col" id="component">Component</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="color: #FFFFFF;" scope="col" id="sdev">Std. Dev.</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="color: #FFFFFF;" scope="col" id="variance">Variance</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="color: #FFFFFF;" scope="col" id="prop_variance">Proportion</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="color: #FFFFFF;" scope="col" id="cum_variance">Cumulative</th>
    </tr>
  </thead>
  <tbody class="gt_table_body">
    <tr><td headers="component" class="gt_row gt_left">PC1</td>
<td headers="sdev" class="gt_row gt_right">1.5749</td>
<td headers="variance" class="gt_row gt_right">2.4802</td>
<td headers="prop_variance" class="gt_row gt_right">62.0%</td>
<td headers="cum_variance" class="gt_row gt_right" style="background-color: #FFFFFF; color: #000000;">62.0%</td></tr>
    <tr><td headers="component" class="gt_row gt_left gt_striped">PC2</td>
<td headers="sdev" class="gt_row gt_right gt_striped">0.9949</td>
<td headers="variance" class="gt_row gt_right gt_striped">0.9898</td>
<td headers="prop_variance" class="gt_row gt_right gt_striped">24.7%</td>
<td headers="cum_variance" class="gt_row gt_right gt_striped" style="background-color: #81CB96; color: #000000;">86.8%</td></tr>
    <tr><td headers="component" class="gt_row gt_left">PC3</td>
<td headers="sdev" class="gt_row gt_right">0.5971</td>
<td headers="variance" class="gt_row gt_right">0.3566</td>
<td headers="prop_variance" class="gt_row gt_right">8.9%</td>
<td headers="cum_variance" class="gt_row gt_right" style="background-color: #4CB871; color: #000000;">95.7%</td></tr>
    <tr><td headers="component" class="gt_row gt_left gt_striped">PC4</td>
<td headers="sdev" class="gt_row gt_right gt_striped">0.4164</td>
<td headers="variance" class="gt_row gt_right gt_striped">0.1734</td>
<td headers="prop_variance" class="gt_row gt_right gt_striped">4.3%</td>
<td headers="cum_variance" class="gt_row gt_right gt_striped" style="background-color: #27AE60; color: #FFFFFF;">100.0%</td></tr>
  </tbody>
  <tfoot>
    <tr class="gt_sourcenotes">
      <td class="gt_sourcenote" colspan="5">tidylearn | pca | n = 50</td>
    </tr>
  </tfoot>
</table>
</div>

``` r
tl_table_loadings(pca_model, n_components = 2)
```

<div id="xgdyentzro" class="gt-post-table" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">

<table class="gt_table" data-quarto-disable-processing="false" data-quarto-bootstrap="false">
  <thead>
    <tr class="gt_heading">
      <td colspan="3" class="gt_heading gt_title gt_font_normal gt_bottom_border" style>PCA Loadings</td>
    </tr>
    
    <tr class="gt_col_headings">
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="color: #FFFFFF;" scope="col" id="variable">Variable</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="color: #FFFFFF;" scope="col" id="PC1">PC1</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="color: #FFFFFF;" scope="col" id="PC2">PC2</th>
    </tr>
  </thead>
  <tbody class="gt_table_body">
    <tr><td headers="variable" class="gt_row gt_left">Murder</td>
<td headers="PC1" class="gt_row gt_right" style="background-color: #E89887; color: #000000;">−0.536</td>
<td headers="PC2" class="gt_row gt_right" style="background-color: #EFAEA1; color: #000000;">−0.418</td></tr>
    <tr><td headers="variable" class="gt_row gt_left gt_striped">Assault</td>
<td headers="PC1" class="gt_row gt_right gt_striped" style="background-color: #E58E7D; color: #000000;">−0.583</td>
<td headers="PC2" class="gt_row gt_right gt_striped" style="background-color: #FADAD4; color: #000000;">−0.188</td></tr>
    <tr><td headers="variable" class="gt_row gt_left">UrbanPop</td>
<td headers="PC1" class="gt_row gt_right" style="background-color: #F7C9BF; color: #000000;">−0.278</td>
<td headers="PC2" class="gt_row gt_right" style="background-color: #518FC2; color: #FFFFFF;">0.873</td></tr>
    <tr><td headers="variable" class="gt_row gt_left gt_striped">Rape</td>
<td headers="PC1" class="gt_row gt_right gt_striped" style="background-color: #E89686; color: #000000;">−0.543</td>
<td headers="PC2" class="gt_row gt_right gt_striped" style="background-color: #E0E9F3; color: #000000;">0.167</td></tr>
  </tbody>
  <tfoot>
    <tr class="gt_sourcenotes">
      <td class="gt_sourcenote" colspan="3">tidylearn | pca | n = 50</td>
    </tr>
  </tfoot>
</table>
</div>

The loadings table uses a diverging red–blue colour scale to highlight
strong positive and negative loadings — no manual formatting required.

### Without tidylearn

``` r
pca_base <- prcomp(USArrests, scale. = TRUE)
```

The default R biplot:

``` r
biplot(pca_base)
```

![]({{ '/assets/tidylearn/base-pca-biplot-1.png' | absolute_url }})

This produces a functional but visually rough base R graphic — no
`theme_minimal()`, no consistent colour scheme, no variance-explained
axis labels. To get a ggplot2 biplot, you need to manually extract and
scale the scores and loadings:

``` r
# Extract scores
scores <- as.data.frame(pca_base$x[, 1:2])
scores$label <- rownames(scores)

# Extract loadings and scale to match scores
loadings <- as.data.frame(pca_base$rotation[, 1:2])
loadings$variable <- rownames(loadings)
score_range <- max(abs(scores[, 1:2]))
loading_range <- max(abs(loadings[, 1:2]))
scale_factor <- (score_range / loading_range) * 0.8

loadings$PC1_scaled <- loadings$PC1 * scale_factor
loadings$PC2_scaled <- loadings$PC2 * scale_factor

# Compute variance explained for axis labels
var_exp <- pca_base$sdev^2 / sum(pca_base$sdev^2) * 100

# Build the ggplot manually
ggplot() +
  geom_point(data = scores, aes(x = PC1, y = PC2),
             colour = "steelblue", alpha = 0.7) +
  geom_text(data = scores, aes(x = PC1, y = PC2, label = label),
            size = 2.5, vjust = -0.5) +
  geom_segment(data = loadings,
               aes(x = 0, y = 0, xend = PC1_scaled, yend = PC2_scaled),
               arrow = arrow(length = unit(0.2, "cm")),
               colour = "red", alpha = 0.7) +
  geom_text(data = loadings,
            aes(x = PC1_scaled, y = PC2_scaled, label = variable),
            colour = "red", size = 3, fontface = "bold", vjust = -0.5) +
  labs(
    title = "PCA Biplot",
    x = sprintf("PC1 (%.1f%% variance)", var_exp[1]),
    y = sprintf("PC2 (%.1f%% variance)", var_exp[2])
  ) +
  coord_equal() +
  theme_minimal()
```

![]({{ '/assets/tidylearn/base-pca-ggbiplot-1.png' | absolute_url }})

``` r
# Variance table — manually computed
var_explained <- data.frame(
  component = paste0("PC", seq_along(pca_base$sdev)),
  sdev = pca_base$sdev,
  variance = pca_base$sdev^2,
  prop_variance = pca_base$sdev^2 / sum(pca_base$sdev^2),
  cum_variance = cumsum(pca_base$sdev^2 / sum(pca_base$sdev^2))
)

knitr::kable(var_explained, digits = 3,
             caption = "Variance Explained (manual)")
```

| component |  sdev | variance | prop_variance | cum_variance |
|:----------|------:|---------:|--------------:|-------------:|
| PC1       | 1.575 |    2.480 |         0.620 |        0.620 |
| PC2       | 0.995 |    0.990 |         0.247 |        0.868 |
| PC3       | 0.597 |    0.357 |         0.089 |        0.957 |
| PC4       | 0.416 |    0.173 |         0.043 |        1.000 |

Variance Explained (manual)

The manual biplot requires extracting matrices, scaling loadings to
match score ranges, computing variance percentages for axis labels, and
assembling the ggplot layer by layer. `tidy_pca_biplot()` handles all of
that in one call. And the `kable()` variance table is functional but
plain — no colour coding, no cumulative-variance highlighting.
`tl_table_variance()` adds these by default.

------------------------------------------------------------------------

## 2. Hierarchical Clustering

Hierarchical clustering involves computing distances, fitting the tree,
visualising the dendrogram, cutting it, and augmenting your data with
cluster assignments. Each step traditionally produces a different data
structure.

### With tidylearn

``` r
hc <- tidy_hclust(USArrests, method = "ward.D2")

# Dendrogram with cluster rectangles
tidy_dendrogram(hc, k = 4)
```

![]({{ '/assets/tidylearn/tl-hclust-1.png' | absolute_url }})

Cut the tree and get a tidy tibble of cluster assignments:

``` r
clusters <- tidy_cutree(hc, k = 4)
knitr::kable(head(clusters, 10), caption = "Cluster Assignments (first 10)")
```

| .obs_id     | cluster |
|:------------|--------:|
| Alabama     |       1 |
| Alaska      |       1 |
| Arizona     |       1 |
| Arkansas    |       2 |
| California  |       1 |
| Colorado    |       2 |
| Connecticut |       3 |
| Delaware    |       1 |
| Florida     |       1 |
| Georgia     |       2 |

Cluster Assignments (first 10)

Augment the original data and produce a formatted cluster summary table:

``` r
hc_model <- tl_model(USArrests, method = "hclust")
tl_table_clusters(hc_model, k = 4)
```

<div id="ciydemetbh" class="gt-post-table" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">

<table class="gt_table" data-quarto-disable-processing="false" data-quarto-bootstrap="false">
  <thead>
    <tr class="gt_heading">
      <td colspan="6" class="gt_heading gt_title gt_font_normal" style>Cluster Summary</td>
    </tr>
    <tr class="gt_heading">
      <td colspan="6" class="gt_heading gt_subtitle gt_font_normal gt_bottom_border" style>hclust | 4 clusters</td>
    </tr>
    <tr class="gt_col_headings">
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="color: #FFFFFF;" scope="col" id="cluster">Cluster</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="color: #FFFFFF;" scope="col" id="size">Size</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="color: #FFFFFF;" scope="col" id="Murder">Murder</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="color: #FFFFFF;" scope="col" id="Assault">Assault</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="color: #FFFFFF;" scope="col" id="UrbanPop">UrbanPop</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="color: #FFFFFF;" scope="col" id="Rape">Rape</th>
    </tr>
  </thead>
  <tbody class="gt_table_body">
    <tr><td headers="cluster" class="gt_row gt_right">1</td>
<td headers="size" class="gt_row gt_right">14</td>
<td headers="Murder" class="gt_row gt_right">11.47</td>
<td headers="Assault" class="gt_row gt_right">263.50</td>
<td headers="UrbanPop" class="gt_row gt_right">69.14</td>
<td headers="Rape" class="gt_row gt_right">29.00</td></tr>
    <tr><td headers="cluster" class="gt_row gt_right gt_striped">2</td>
<td headers="size" class="gt_row gt_right gt_striped">14</td>
<td headers="Murder" class="gt_row gt_right gt_striped">8.21</td>
<td headers="Assault" class="gt_row gt_right gt_striped">173.29</td>
<td headers="UrbanPop" class="gt_row gt_right gt_striped">70.64</td>
<td headers="Rape" class="gt_row gt_right gt_striped">22.84</td></tr>
    <tr><td headers="cluster" class="gt_row gt_right">3</td>
<td headers="size" class="gt_row gt_right">20</td>
<td headers="Murder" class="gt_row gt_right">4.27</td>
<td headers="Assault" class="gt_row gt_right">87.55</td>
<td headers="UrbanPop" class="gt_row gt_right">59.75</td>
<td headers="Rape" class="gt_row gt_right">14.39</td></tr>
    <tr><td headers="cluster" class="gt_row gt_right gt_striped">4</td>
<td headers="size" class="gt_row gt_right gt_striped">2</td>
<td headers="Murder" class="gt_row gt_right gt_striped">14.20</td>
<td headers="Assault" class="gt_row gt_right gt_striped">336.00</td>
<td headers="UrbanPop" class="gt_row gt_right gt_striped">62.50</td>
<td headers="Rape" class="gt_row gt_right gt_striped">24.00</td></tr>
  </tbody>
  <tfoot>
    <tr class="gt_sourcenotes">
      <td class="gt_sourcenote" colspan="6">tidylearn | hclust | n = 50</td>
    </tr>
  </tfoot>
</table>
</div>

### Without tidylearn

``` r
# Compute distance matrix
d <- dist(scale(USArrests), method = "euclidean")

# Fit hierarchical clustering
hc_base <- hclust(d, method = "ward.D2")

# Plot dendrogram
plot(hc_base, main = "Hierarchical Clustering Dendrogram",
     xlab = "", sub = "", cex = 0.7)
rect.hclust(hc_base, k = 4, border = 2:5)
```

![]({{ '/assets/tidylearn/base-hclust-1.png' | absolute_url }})

The dendrogram looks similar — both use base R graphics for this. The
real difference is in what happens next:

``` r
# cutree returns a named integer vector — not a tibble
clusters_base <- cutree(hc_base, k = 4)
str(clusters_base)
#>  Named int [1:50] 1 2 2 3 2 2 3 3 2 1 ...
#>  - attr(*, "names")= chr [1:50] "Alabama" "Alaska" "Arizona" "Arkansas" ...
```

``` r
# To get a summary table, manually bind and reshape
USArrests_clustered <- USArrests
USArrests_clustered$cluster <- clusters_base

USArrests_clustered %>%
  group_by(cluster) %>%
  summarise(across(where(is.numeric), mean), .groups = "drop") %>%
  knitr::kable(digits = 1, caption = "Cluster Means (manual)")
```

| cluster | Murder | Assault | UrbanPop | Rape |
|--------:|-------:|--------:|---------:|-----:|
|       1 |   14.7 |   251.3 |     54.3 | 21.7 |
|       2 |   11.0 |   264.0 |     76.5 | 33.6 |
|       3 |    6.2 |   142.1 |     71.3 | 19.2 |
|       4 |    3.1 |    76.0 |     52.1 | 11.8 |

Cluster Means (manual)

The dendrogram itself is comparable. But `cutree()` returns a named
integer vector that needs manual binding to your data, and the resulting
`kable()` is plain text. `tl_table_clusters()` produces a formatted
table with cluster sizes, styled headers, and consistent theming — ready
for a report.

------------------------------------------------------------------------

## 3. Lasso Regularisation: Coefficient Paths and Tables

Regularised models are a common choice, but visualising how coefficients
shrink along the regularisation path is one of those tasks where the
default output is decidedly not report-ready.

### With tidylearn

``` r
lasso <- tl_model(mtcars, mpg ~ ., method = "lasso")

# Coefficient path as a ggplot2 object
tl_plot_regularization_path(lasso)
```

![]({{ '/assets/tidylearn/tl-lasso-1.png' | absolute_url }})

``` r
# Cross-validation curve
tl_plot_regularization_cv(lasso)
```

![]({{ '/assets/tidylearn/tl-lasso-cv-1.png' | absolute_url }})

And a formatted coefficient table, sorted by magnitude with zero
coefficients greyed out:

``` r
tl_table_coefficients(lasso)
```

<div id="wfzjheaqgd" class="gt-post-table" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">

<table class="gt_table" data-quarto-disable-processing="false" data-quarto-bootstrap="false">
  <thead>
    <tr class="gt_heading">
      <td colspan="3" class="gt_heading gt_title gt_font_normal" style>Lasso Coefficients</td>
    </tr>
    <tr class="gt_heading">
      <td colspan="3" class="gt_heading gt_subtitle gt_font_normal gt_bottom_border" style>lambda = 1.275 (1se)</td>
    </tr>
    <tr class="gt_col_headings">
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="color: #FFFFFF;" scope="col" id="term">Term</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="color: #FFFFFF;" scope="col" id="estimate">Coefficient</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="color: #FFFFFF;" scope="col" id="abs_estimate">|Coefficient|</th>
    </tr>
  </thead>
  <tbody class="gt_table_body">
    <tr><td headers="term" class="gt_row gt_left">(Intercept)</td>
<td headers="estimate" class="gt_row gt_right">34.3695</td>
<td headers="abs_estimate" class="gt_row gt_right">34.3695</td></tr>
    <tr><td headers="term" class="gt_row gt_left gt_striped">wt</td>
<td headers="estimate" class="gt_row gt_right gt_striped">−2.4351</td>
<td headers="abs_estimate" class="gt_row gt_right gt_striped">2.4351</td></tr>
    <tr><td headers="term" class="gt_row gt_left">cyl</td>
<td headers="estimate" class="gt_row gt_right">−0.8528</td>
<td headers="abs_estimate" class="gt_row gt_right">0.8528</td></tr>
    <tr><td headers="term" class="gt_row gt_left gt_striped">hp</td>
<td headers="estimate" class="gt_row gt_right gt_striped">−0.0080</td>
<td headers="abs_estimate" class="gt_row gt_right gt_striped">0.0080</td></tr>
    <tr><td headers="term" class="gt_row gt_left" style="color: #999999;">disp</td>
<td headers="estimate" class="gt_row gt_right" style="color: #999999;">0.0000</td>
<td headers="abs_estimate" class="gt_row gt_right" style="color: #999999;">0.0000</td></tr>
    <tr><td headers="term" class="gt_row gt_left gt_striped" style="color: #999999;">drat</td>
<td headers="estimate" class="gt_row gt_right gt_striped" style="color: #999999;">0.0000</td>
<td headers="abs_estimate" class="gt_row gt_right gt_striped" style="color: #999999;">0.0000</td></tr>
    <tr><td headers="term" class="gt_row gt_left" style="color: #999999;">qsec</td>
<td headers="estimate" class="gt_row gt_right" style="color: #999999;">0.0000</td>
<td headers="abs_estimate" class="gt_row gt_right" style="color: #999999;">0.0000</td></tr>
    <tr><td headers="term" class="gt_row gt_left gt_striped" style="color: #999999;">vs</td>
<td headers="estimate" class="gt_row gt_right gt_striped" style="color: #999999;">0.0000</td>
<td headers="abs_estimate" class="gt_row gt_right gt_striped" style="color: #999999;">0.0000</td></tr>
    <tr><td headers="term" class="gt_row gt_left" style="color: #999999;">am</td>
<td headers="estimate" class="gt_row gt_right" style="color: #999999;">0.0000</td>
<td headers="abs_estimate" class="gt_row gt_right" style="color: #999999;">0.0000</td></tr>
    <tr><td headers="term" class="gt_row gt_left gt_striped" style="color: #999999;">gear</td>
<td headers="estimate" class="gt_row gt_right gt_striped" style="color: #999999;">0.0000</td>
<td headers="abs_estimate" class="gt_row gt_right gt_striped" style="color: #999999;">0.0000</td></tr>
    <tr><td headers="term" class="gt_row gt_left" style="color: #999999;">carb</td>
<td headers="estimate" class="gt_row gt_right" style="color: #999999;">0.0000</td>
<td headers="abs_estimate" class="gt_row gt_right" style="color: #999999;">0.0000</td></tr>
  </tbody>
  <tfoot>
    <tr class="gt_sourcenotes">
      <td class="gt_sourcenote" colspan="3">tidylearn | lasso (regression) | mpg ~ . | n = 32</td>
    </tr>
  </tfoot>
</table>
</div>

Both plots are ggplot2 objects — `theme_minimal()`, consistent
aesthetics, and directly passable to `ggplotly()` or `ggsave()`. The
table is a `gt` object with the same consistent styling.

### Without tidylearn

``` r
library(glmnet)

# Prepare model matrix (glmnet doesn't accept formulas)
x <- model.matrix(mpg ~ ., data = mtcars)[, -1]
y <- mtcars$mpg

# Fit with cross-validation
cv_fit <- cv.glmnet(x, y, alpha = 1)
```

The default coefficient path plot:

``` r
plot(cv_fit$glmnet.fit, xvar = "lambda", label = TRUE)
```

![]({{ '/assets/tidylearn/base-lasso-path-1.png' | absolute_url }})

The default cross-validation plot:

``` r
plot(cv_fit)
```

![]({{ '/assets/tidylearn/base-lasso-cv-1.png' | absolute_url }})

These are base R graphics — functional, but they can't be themed,
faceted, combined with other ggplot2 panels, or converted to interactive
plotly charts. Building ggplot2 equivalents from the `glmnet` object
requires extracting the coefficient matrix across all lambda values and
pivoting it to long format:

``` r
# Extract coefficient matrix
coef_matrix <- as.matrix(cv_fit$glmnet.fit$beta)
lambda_vals <- cv_fit$glmnet.fit$lambda

# Reshape to long format for ggplot
coef_df <- as.data.frame(t(coef_matrix))
coef_df$lambda <- lambda_vals
coef_long <- tidyr::pivot_longer(coef_df, -lambda,
                                  names_to = "variable",
                                  values_to = "coefficient")

ggplot(coef_long, aes(x = log(lambda), y = coefficient, colour = variable)) +
  geom_line() +
  labs(title = "Lasso Coefficient Path", x = "log(lambda)",
       y = "Coefficient", colour = "Variable") +
  theme_minimal()
```

![]({{ '/assets/tidylearn/base-lasso-gg-1.png' | absolute_url }})

``` r
# Extract coefficients at lambda.1se — returns a sparse matrix
coefs <- as.matrix(coef(cv_fit, s = "lambda.1se"))
coef_tbl <- data.frame(
  term = rownames(coefs),
  estimate = as.vector(coefs)
)
coef_tbl <- coef_tbl[order(-abs(coef_tbl$estimate)), ]

knitr::kable(coef_tbl, digits = 4, row.names = FALSE,
             caption = "Lasso Coefficients at lambda.1se (manual)")
```

| term        | estimate |
|:------------|---------:|
| (Intercept) |  33.9405 |
| wt          |  -2.3659 |
| cyl         |  -0.8430 |
| hp          |  -0.0070 |
| disp        |   0.0000 |
| drat        |   0.0000 |
| qsec        |   0.0000 |
| vs          |   0.0000 |
| am          |   0.0000 |
| gear        |   0.0000 |
| carb        |   0.0000 |

Lasso Coefficients at lambda.1se (manual)

The manual approach works, but it's the kind of reshaping code that's
easy to get subtly wrong and tedious to repeat.
`tl_plot_regularization_path()` handles extraction, pivoting, labelling,
and theming in one call. And the `kable()` coefficient table is plain —
`tl_table_coefficients()` adds sorting, zero greying, and the selected
lambda value in the subtitle.

------------------------------------------------------------------------

## 4. Multi-Model Classification Comparison

Comparing models across packages is where consistent output structure
matters most. Each package has its own prediction interface, metric
accessors, and plot conventions.

### With tidylearn

``` r
split <- tl_split(iris, prop = 0.7, stratify = "Species", seed = 42)

# Fit three models — same interface for each
m_forest   <- tl_model(split$train, Species ~ ., method = "forest")
m_tree     <- tl_model(split$train, Species ~ ., method = "tree")
m_xgboost  <- tl_model(split$train, Species ~ ., method = "xgboost")
```

A formatted comparison table — one call:

``` r
tl_table_comparison(
  m_forest, m_tree, m_xgboost,
  new_data = split$test,
  names = c("Random Forest", "Decision Tree", "XGBoost")
)
```

<div id="xtzejhxvix" class="gt-post-table" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">

<table class="gt_table" data-quarto-disable-processing="false" data-quarto-bootstrap="false">
  <thead>
    <tr class="gt_heading">
      <td colspan="4" class="gt_heading gt_title gt_font_normal" style>Model Comparison</td>
    </tr>
    <tr class="gt_heading">
      <td colspan="4" class="gt_heading gt_subtitle gt_font_normal gt_bottom_border" style>3 models compared</td>
    </tr>
    <tr class="gt_col_headings">
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="1" colspan="1" style="color: #FFFFFF;" scope="col" id="metric">Metric</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="color: #FFFFFF;" scope="col" id="Random-Forest">Random Forest</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="color: #FFFFFF;" scope="col" id="Decision-Tree">Decision Tree</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="color: #FFFFFF;" scope="col" id="XGBoost">XGBoost</th>
    </tr>
  </thead>
  <tbody class="gt_table_body">
    <tr><td headers="metric" class="gt_row gt_left">Accuracy</td>
<td headers="Random Forest" class="gt_row gt_right">0.9556</td>
<td headers="Decision Tree" class="gt_row gt_right">0.8889</td>
<td headers="XGBoost" class="gt_row gt_right">0.9111</td></tr>
  </tbody>
  <tfoot>
    <tr class="gt_sourcenotes">
      <td class="gt_sourcenote" colspan="4">tidylearn | n = 45</td>
    </tr>
  </tfoot>
</table>
</div>

And a confusion matrix for any model:

``` r
tl_table_confusion(m_forest, new_data = split$test)
```

<div id="zcikultaqv" class="gt-post-table" style="padding-left:0px;padding-right:0px;padding-top:10px;padding-bottom:10px;overflow-x:auto;overflow-y:auto;width:auto;height:auto;">

<table class="gt_table" data-quarto-disable-processing="false" data-quarto-bootstrap="false">
  <thead>
    <tr class="gt_heading">
      <td colspan="4" class="gt_heading gt_title gt_font_normal gt_bottom_border" style>Confusion Matrix</td>
    </tr>
    
    <tr class="gt_col_headings gt_spanner_row">
      <th class="gt_col_heading gt_columns_bottom_border gt_left" rowspan="2" colspan="1" scope="col" id="a::stub">Actual</th>
      <th class="gt_center gt_columns_top_border gt_column_spanner_outer" rowspan="1" colspan="3" scope="colgroup" id="Predicted">
        <div class="gt_column_spanner">Predicted</div>
      </th>
    </tr>
    <tr class="gt_col_headings">
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="color: #FFFFFF;" scope="col" id="setosa">setosa</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="color: #FFFFFF;" scope="col" id="versicolor">versicolor</th>
      <th class="gt_col_heading gt_columns_bottom_border gt_right" rowspan="1" colspan="1" style="color: #FFFFFF;" scope="col" id="virginica">virginica</th>
    </tr>
  </thead>
  <tbody class="gt_table_body">
    <tr><th id="stub_1_1" scope="row" class="gt_row gt_left gt_stub">setosa</th>
<td headers="stub_1_1 setosa" class="gt_row gt_right" style="background-color: #D4EDDA;">15</td>
<td headers="stub_1_1 versicolor" class="gt_row gt_right">0</td>
<td headers="stub_1_1 virginica" class="gt_row gt_right">0</td></tr>
    <tr><th id="stub_1_2" scope="row" class="gt_row gt_left gt_stub">versicolor</th>
<td headers="stub_1_2 setosa" class="gt_row gt_right gt_striped">0</td>
<td headers="stub_1_2 versicolor" class="gt_row gt_right gt_striped" style="background-color: #D4EDDA;">15</td>
<td headers="stub_1_2 virginica" class="gt_row gt_right gt_striped">0</td></tr>
    <tr><th id="stub_1_3" scope="row" class="gt_row gt_left gt_stub">virginica</th>
<td headers="stub_1_3 setosa" class="gt_row gt_right">0</td>
<td headers="stub_1_3 versicolor" class="gt_row gt_right">2</td>
<td headers="stub_1_3 virginica" class="gt_row gt_right" style="background-color: #D4EDDA;">13</td></tr>
  </tbody>
  <tfoot>
    <tr class="gt_sourcenotes">
      <td class="gt_sourcenote" colspan="4">tidylearn | forest (classification) | Species ~ . | n = 105</td>
    </tr>
  </tfoot>
</table>
</div>

Adding a fourth model is just another argument in
`tl_table_comparison()` — the table code stays unchanged.

### Without tidylearn

``` r
library(randomForest)
library(xgboost)

set.seed(42)
train_idx <- unlist(lapply(
  split(seq_len(nrow(iris)), iris$Species),
  function(i) sample(i, size = floor(0.7 * length(i)))
))
train_data <- iris[train_idx, ]
test_data  <- iris[-train_idx, ]

# Two of the three take a formula and a data frame
fit_rf   <- randomForest(Species ~ ., data = train_data)
fit_tree <- rpart::rpart(Species ~ ., data = train_data, method = "class")

# xgboost takes neither: a numeric matrix, integer-encoded labels, and
# xgb.train() rather than xgboost(), which refuses multiclass outright
dtrain <- xgb.DMatrix(
  data  = as.matrix(train_data[, 1:4]),
  label = as.integer(train_data$Species) - 1
)
fit_xgb <- xgb.train(
  params  = list(objective = "multi:softmax", num_class = 3),
  data    = dtrain,
  nrounds = 20,
  verbose = 0
)

# Each returns predictions in a different format
pred_rf   <- predict(fit_rf, newdata = test_data)
pred_tree <- predict(fit_tree, newdata = test_data, type = "class")
pred_xgb  <- predict(fit_xgb, xgb.DMatrix(as.matrix(test_data[, 1:4])))

# And the xgboost predictions are zero-based integers, not factor levels
acc_rf   <- mean(pred_rf == test_data$Species)
acc_tree <- mean(pred_tree == test_data$Species)
acc_xgb  <- mean(levels(iris$Species)[pred_xgb + 1] == test_data$Species)

comparison_base <- data.frame(
  model = c("Random Forest", "Decision Tree", "XGBoost"),
  accuracy = c(acc_rf, acc_tree, acc_xgb)
)

knitr::kable(comparison_base, digits = 3,
             caption = "Model Comparison (manual)")
```

| model         | accuracy |
|:--------------|---------:|
| Random Forest |    0.933 |
| Decision Tree |    0.889 |
| XGBoost       |    0.911 |

Model Comparison (manual)

Three packages, three interfaces. `randomForest` and `rpart` take a
formula and a data frame; `xgboost` takes a numeric matrix wrapped in a
`DMatrix`, integer-encoded labels, and `xgb.train()` rather than
`xgboost()`, which refuses multiclass objectives outright. The
predictions come back as factor levels, factor levels, and zero-based
integers respectively, so each accuracy has to be computed its own way.
The `kable()` output is plain and limited to one metric.

`tl_table_comparison()` takes the fitted models and produces a styled,
multi-metric table without any of that reshaping.

------------------------------------------------------------------------

## 5. Interactive Reporting with plotly

Because tidylearn's plot functions return standard ggplot2 objects,
converting any visualisation to an interactive plotly chart is a
one-liner:

``` r
library(plotly)

# tidylearn's plot returns a ggplot2 object — pass it straight to ggplotly
ggplotly(tidy_pca_biplot(pca, label_obs = TRUE))
ggplotly(tl_plot_regularization_path(lasso))
ggplotly(plot(m_forest, type = "confusion"))
```

`ggplotly()` picks up axis labels, themes, and tooltip data
automatically. Compare this to the base R plots from `biplot()`,
`plot.glmnet()`, or `plot.hclust()` — none of which can be converted to
plotly without rebuilding them from scratch.

------------------------------------------------------------------------

## Why This Matters

**Consistent, polished output by default.** Every model — whether it's a
PCA biplot, a lasso coefficient path, or a confusion matrix — returns
ggplot2 plots and `gt` tables with a consistent visual language. You
don't need to learn each package's idiosyncratic output format or build
custom formatting code to get report-quality visuals and tables.

**Reproducibility through uniformity.** When your reporting pipeline
works the same way for every model type, your analysis becomes genuinely
reproducible. Swap `method = "forest"` for `method = "xgboost"` and
rerun — the same `tl_table()` calls, the same `plot()` calls, the same
comparison logic all work without modification. That means you can
iterate on model selection without touching your reporting layer, and
anyone reading your code can follow the same pattern across different
analyses.

The best analysis code is code that gets out of your way and lets you
focus on the results. That's what tidylearn is for.
