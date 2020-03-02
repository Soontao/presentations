#!/bin/bash
# CI build script

# generate pdf
for f in `find ./src -type f -name "*.md"`
do fb="${f%.*}"; ./node_modules/.bin/marp $f --pdf -o "./dist/${fb:5}.pdf" ; done

# generate html
for f in `find ./src -type f -name "*.md"`
do fb="${f%.*}"; ./node_modules/.bin/marp $f --html -o "./dist/${fb:5}.html" ; done

# generate ppt
for f in `find ./src -type f -name "*.md"`
do fb="${f%.*}"; ./node_modules/.bin/marp $f --pptx -o "./dist/${fb:5}.pptx" ; done