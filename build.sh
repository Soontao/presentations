#!/bin/bash
# CI build script

for f in `find ./src -type f -not -path "*node_modules*" -name "*.md"`
do 
  fb="${f%.*}"; 
  # generate pdf
  ./node_modules/.bin/marp $f --pdf -o "./dist/${fb:5}.pdf"; 
  # generate html
  ./node_modules/.bin/marp $f --html -o "./dist/${fb:5}.html";
  # generate ppt
  ./node_modules/.bin/marp $f --pptx -o "./dist/${fb:5}.pptx"; 
done
