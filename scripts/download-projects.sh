#!/bin/bash

download_project() {
  mkdir -p $1

  for i in $(seq 1 $2); do    
    wget -P $1 https://marc-eg.netlify.app/images/$1/$i.jpg
  done
}

# residential
mkdir residential
cd residential

download_project fish 12
download_project tree 15
download_project crazy 54

cd ..


# commercial
mkdir commercial
cd commercial

download_project block 20
download_project mad5l1 6
download_project mad5l2 9
