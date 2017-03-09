# Fate SRDs

This repository contains formatted SRD documents for the Fate Roleplaying Game. The source documents are from [Evil Hat Productions, LLC](http://www.faterpg.com/licensing/).

You'll find the following rules in this project:

- Fate Core System System Reference Document
- Fate Accelerated Edition System Reference Document
- Fate System Toolkit System Reference Document
- Atomic Robo RPG System Reference Document
- Venture City System Reference Document
- Sails Full of Stars System Reference Document
- Gods & Monsters System Reference Document
- Frontier Spirit System Reference Document
- Fate Conspiracies (from The Three Rocketeers) System Reference Document
- No-Skill Swashbuckling (from The Three Rocketeers) System Reference Document

# How to use this project

If you're looking for the Fate SRD rules in a clean text format, this is the place. The files in the `docs` folder have everything in several formats, e.g. markdown, HTML, and Docx (Word).

[Download Files](https://github.com/amazingrando/fate-srd/archive/master.zip)

If you are looking for the 100% official SRD rules, you can find them at http://www.faterpg.com/licensing/. That said, the files in the `source` folder are copies of those files.

# Project structure

- `docs/markdown` folder includes the docs in markdown format
- `docs/html` folder includes the docs in HTML format
- `docs/word` folder includes the docs in DOCX (Word) format
- `source` contains copies of the files provided at the licensing link above.

# Technical and nerdy things

This section is for formatting and editing the files from source to the many output formats. If you're just looking to use or read the files then ignore this section.

- Install the project with `npm install`
- Install Pandoc with
  - `brew install pandoc` (on MacOS) or
  - `apt install pandoc` (on Ubuntu or a derivative)

## How to add new sources

This section is for maintainers.

- Download the HTML into `/source`.
- Run Beautify HTML in Sublime Text.
- Run `gulp make-md` and check the created markdown file in `/docs/markdown`.
  - Revise `gulp make-md` as needed to fix the output.

## Snowflakes

Due to formatting, some of the source documents are unique snowflakes and have to be processed by hand. Currently that list is:

- Fate Core (not done)
- Fate Accelerated (not done)
- Fate System Toolkit (not done)
- War of Ashes

# License

This work is based on [Fate Core System](http://www.faterpg.com/) and Fate Accelerated Edition, products of Evil Hat Productions, LLC, developed, authored, and edited by Leonard Balsera, Brian Engard, Jeremy Keller, Ryan Macklin, Mike Olson, Clark Valentine, Amanda Valentine, Fred Hicks, and Rob Donoghue, and licensed for our use under the [Creative Commons Attribution 3.0 Unported license](http://creativecommons.org/licenses/by/3.0/).
