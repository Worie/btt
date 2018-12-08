#!/usr/bin/env sh

# abort on errors
set -e

# build
vuepress build docs

# navigate into the build output directory
cd dist/docs

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:worie/btt.git master:gh-pages

cd -