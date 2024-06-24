#!/bin/bash

set -e

input_dir="/home/fezza/Downloads/fady"
output_dir="$input_dir/output"

if [ ! -d "$output_dir" ]; then
  mkdir -p "$output_dir"
fi

convert logo.png -resize 200x logo-small.png

counter=0

for input_image in "$input_dir"/*.{jpg,png,webp}; do
  filename=$(basename "$input_image")

  if [[ $filename == logo* || ! -f "$input_image" ]]; then
    continue
  fi 
  
  output_image="${output_dir}/$((counter++)).${filename##*.}"
  
  convert "$input_image" -crop +29+29 -crop -29-75 +repage "$output_image"
  
  composite -gravity north-east -geometry +0+10 logo-small.png "$output_image" "$output_image"
done

rm logo-small.png
