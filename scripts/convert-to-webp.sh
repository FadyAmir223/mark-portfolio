#!/bin/bash

convert_to_webp() {
  mkdir _${1}

  for jpg_file in $1/*.jpg; do
    convert $jpg_file "_${jpg_file%.jpg}.webp"
  done
}

# commercial
convert_to_webp fish
convert_to_webp tree
convert_to_webp crazy

# residential
convert_to_webp block
convert_to_webp mad5l1
convert_to_webp mad5l2
