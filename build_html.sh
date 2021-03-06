#!/bin/bash
# CI build script

# generate html
for f in `find ./src -type f -not -path "*node_modules*" -not -path "*example*" -name "*.md"`
do fb="${f%.*}"; ./node_modules/.bin/marp $f --html -o "./dist/${fb:5}.html" ; done

# build index
node scripts/generate_navigation.js