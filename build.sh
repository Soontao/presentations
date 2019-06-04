#!/bin/bash
# CI build script

# generate pdf
for f in `find ./src -type f -name "*.md"`
do ./node_modules/.bin/marp $f --pdf -o "./dist/${f:5}.pdf" ; done

# generate html
for f in `find ./src -type f -name "*.md"`
do ./node_modules/.bin/marp $f --html -o "./dist/${f:5}.html" ; done