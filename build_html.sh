#!/bin/bash
# CI build script

# generate html
for f in `find ./src -type f -name "*.md"`
do fb="${f%.*}"; ./node_modules/.bin/marp $f --html  --theme ./theme/dark.css -o "./dist/${fb:5}.html" ; done

# build index
node scripts/generate_navigation.js