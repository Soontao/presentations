#!/bin/bash
# CI build script

for f in `find ./src -type f -not -path "*node_modules*" -not -path "*example*" -name "*.md"`
do 
  fb="${f%.*}"; 
  # generate pdf
  ./node_modules/.bin/marp $f --pdf --theme ./theme/dark.css -o "./dist/${fb:5}.pdf"; 
  # generate html
  ./node_modules/.bin/marp $f --html --theme ./theme/dark.css -o "./dist/${fb:5}.html";
  # generate ppt
  ./node_modules/.bin/marp $f --pptx --theme ./theme/dark.css -o "./dist/${fb:5}.pptx"; 
done
