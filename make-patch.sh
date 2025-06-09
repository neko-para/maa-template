#!/bin/bash

TEMP_DIR=`cat .patch-folder`
APPLY_PATCH="$1"

if ! [[ -d "$TEMP_DIR" ]]; then
  echo "cannot find patch folder"
  exit 1
fi

git -C "$TEMP_DIR" add .
git -C "$TEMP_DIR" diff --staged -p > "$APPLY_PATCH"

rm -rf "$TEMP_DIR"
