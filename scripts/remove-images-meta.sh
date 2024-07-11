#!/bin/bash

directory=public/assets/images

find $directory -type f -iname "*.webp" -print0 | \
  while IFS= read -r -d $'\0' file; do
    mogrify -strip "$file"
  done
