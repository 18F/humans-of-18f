#! /bin/sh

set -eu

echo "Regenerating bundle."

rm -rf static/*.bundle.*
NODE_ENV=production npm run bundle

echo "Cloning website into ./website/."

rm -rf website
git clone . website -b gh-pages -o parentdir
cd website
git remote add upstream https://github.com/toolness/humans-of-18f
git pull upstream gh-pages
git rm -rf .
cd ..

echo "Copying files in working dir to ./website/."

cp -r static/* website

echo "Staging new/changed files."

cd website
git add .

#echo "Done. Run 'git diff --staged' to review changes."
#echo "If satisfied, run 'git commit' to commit changes."
echo "Committing changes."

git commit -m "Rebuild site."

echo "Pushing changes."

git push parentdir gh-pages
cd ..
git push origin gh-pages

echo "Done!"