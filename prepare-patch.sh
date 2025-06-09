#!/bin/bash

TEMP_DIR=`mktemp -d`
APPLY_PATCH=`realpath $1`

if ! [[ -d "$TEMP_DIR" ]]; then
  echo 'mktemp failed!'
  exit 1
fi

echo "folder $TEMP_DIR"
echo -n "$TEMP_DIR" > .patch-folder
cp -r base/ "$TEMP_DIR"
cd "$TEMP_DIR"

git init
git config user.name anonymous
git config user.email anonymous@nobody.com
git add .
git commit -m "base"

if [[ -e "$APPLY_PATCH" ]]; then
  git apply "$APPLY_PATCH"
fi
