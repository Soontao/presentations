#!/bin/bash
# CI build script

# generate html
for f in `find ./src -type f -name "*.md"`
do fb="${f%.*}"; ./node_modules/.bin/marp $f --html -o "./dist/${fb:5}.html" ; done
