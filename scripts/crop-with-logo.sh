#!/bin/bash

set -e

output_dir="$input_dir/output"

if [ ! -d "$output_dir" ]; then
  mkdir -p "$output_dir"
fi

convert logo.webp -resize 200x logo-small.webp

echo hello
for input_image in "$input_dir"/*.{jpg,webp}; do
  filename=$input_image
  echo$filename

  if [[ $filename == logo* || ! -f "$input_image" ]]; then
    continue
  fi 
  
  output_image="${output_dir}/${filename}"
  
  convert "$input_image" -strip "$output_image"
  
  composite -gravity north-east -geometry +0+10 logo-small.webp "$output_image" "$output_image"
done

rm logo-small.webp
