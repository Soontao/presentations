#!/bin/bash
# CI build script


# install marp clie
npm i -g @marp-team/marp-cli

# generate pdf
for f in `find . -type f -name "*.md"`
do marp $f --pdf -o "./dist/$f.pdf" ; done