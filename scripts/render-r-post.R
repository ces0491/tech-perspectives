#!/usr/bin/env Rscript

# Render an R article in `_source/` to a Jekyll post in `_posts/`.
#
# The article is knitted, not written by hand: its figures, tables and printed
# output are the real thing, produced by running the code against a real
# tidylearn. That is the point of the piece, and it is also why the post cannot
# be edited directly - the next render would overwrite the edit. Edit the .Rmd.
#
# Usage:
#   Rscript scripts/render-r-post.R
#   Rscript scripts/render-r-post.R --pkg "C:/path/to/tidylearn"
#
# With --pkg, the package is loaded from source with pkgload rather than from
# the library, so an article can be re-rendered against a fix that has not been
# released yet. Nothing is installed and the library is left alone.

suppressPackageStartupMessages({
  library(rmarkdown)
  library(knitr)
})

SOURCE   <- "_source/tidylearn-reporting.Rmd"
POST     <- "_posts/2026-08-21-tidylearn-reporting.md"
FIG_DIR  <- "assets/tidylearn/"
# gt scopes its stylesheet to the random id of the table it belongs to. Every
# table gets the same class instead, so one stylesheet serves all of them.
GT_CLASS <- "gt-post-table"

args <- commandArgs(trailingOnly = TRUE)
pkg_src <- if ("--pkg" %in% args) args[which(args == "--pkg") + 1L] else NA_character_

# --- the package under test -------------------------------------------------

if (!is.na(pkg_src)) {
  if (!requireNamespace("pkgload", quietly = TRUE)) {
    stop("--pkg needs the pkgload package", call. = FALSE)
  }
  message("Loading tidylearn from source: ", pkg_src)
  pkgload::load_all(pkg_src, quiet = TRUE, export_all = FALSE)
  # `library(tidylearn)` in the article is a no-op once it is attached, so the
  # source version is what the chunks call.
} else {
  message("Using the installed tidylearn: ", as.character(utils::packageVersion("tidylearn")))
}

# --- knit -------------------------------------------------------------------

root <- normalizePath(".", winslash = "/")
tmp  <- tempfile(fileext = ".md")

# fig.path is set in the article's setup chunk, not here: render() rebuilds
# knitr's options from the output format before the first chunk runs, so
# anything set at this point is discarded.

rmarkdown::render(
  input         = SOURCE,
  output_format = rmarkdown::md_document(variant = "markdown-smart-simple_tables-multiline_tables-grid_tables-table_captions", md_extensions = "-smart", preserve_yaml = FALSE),
  output_file   = tmp,
  knit_root_dir = root,
  envir         = new.env(parent = globalenv()),
  quiet         = TRUE
)

# knitr resolves a relative fig.path against the directory holding the .Rmd,
# which knit_root_dir does not change. The figures therefore arrive beside the
# source and belong at the root of the site.
staged <- file.path(dirname(SOURCE), FIG_DIR)
if (dir.exists(staged)) {
  dir.create(FIG_DIR, recursive = TRUE, showWarnings = FALSE)
  moved <- list.files(staged, full.names = TRUE)
  file.copy(moved, FIG_DIR, overwrite = TRUE)
  unlink(file.path(dirname(SOURCE), strsplit(FIG_DIR, "/")[[1]][1]), recursive = TRUE)
  message("Moved ", length(moved), " figures into ", FIG_DIR)
}

md <- readLines(tmp, warn = FALSE, encoding = "UTF-8")
md <- paste(md, collapse = "\n")

# --- front matter, carried from the source's own YAML -----------------------

src <- readLines(SOURCE, warn = FALSE, encoding = "UTF-8")
ends <- which(trimws(src) == "---")
stopifnot(length(ends) >= 2L, ends[1] == 1L)
yaml_lines <- src[(ends[1] + 1L):(ends[2] - 1L)]
# `output:` drives the render and has no business in the published post.
yaml_lines <- yaml_lines[!grepl("^output:", yaml_lines)]

title <- sub("^title:\\s*", "", grep("^title:", yaml_lines, value = TRUE)[1])
title <- gsub("^['\"]|['\"]$", "", title)

# --- gt: one stylesheet, hoisted, scoped by class ---------------------------

blocks <- regmatches(md, gregexpr("(?s)<style>.*?</style>", md, perl = TRUE))[[1]]
style <- ""
if (length(blocks)) {
  style <- blocks[1]
  # gt escapes the newlines in its stylesheet as `&#10;`. That is correct inside
  # markdown and wrong inside a <style> element: a browser does not decode
  # entities there, so the whole sheet collapses into one unparsed line and the
  # table headers render invisible.
  style <- gsub("&#10;", "\n", style, fixed = TRUE)
  # Re-scope from `#<random id>` to the shared class.
  ids <- unique(regmatches(style, gregexpr("#[a-z]{10}\\b", style, perl = TRUE))[[1]])
  for (id in ids) style <- gsub(id, paste0(".", GT_CLASS), style, fixed = TRUE)
  # Every table's copy comes out; the hoisted one goes back at the top.
  for (b in blocks) md <- sub(b, "", md, fixed = TRUE)
}

# Tag gt's wrapper div so the hoisted stylesheet applies to it.
md <- gsub("(<div id=\"[a-z]{10}\")( style=)",
           paste0("\\1 class=\"", GT_CLASS, "\"\\2"), md, perl = TRUE)

# --- figures: Jekyll needs an absolute_url, not a repo-relative path ---------

md <- gsub(paste0("!\\[\\]\\(", FIG_DIR, "([^)]+)\\)"),
           paste0("![]({{ '/", FIG_DIR, "\\1' | absolute_url }})"), md, perl = TRUE)

# --- assemble ---------------------------------------------------------------

out <- c("---", yaml_lines, "---", "", paste("#", title), "")
if (nzchar(style)) out <- c(out, style, "")
out <- c(out, trimws(md, which = "left"))

writeLines(out, POST, useBytes = TRUE)
message("Wrote ", POST)

figs <- list.files(FIG_DIR, pattern = "[.]png$")
message("Figures in ", FIG_DIR, ": ", length(figs))
