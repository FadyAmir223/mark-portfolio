#!/bin/bash

download_project() {
  mkdir -p $1
  cd $1

  wget -O $i.jpg https://marc-eg.netlify.app/video/$1.mp4

  mkdir images
  cd images

  for i in $(seq 1 $2); do
    wget -O $i.jpg https://marc-eg.netlify.app/images/$1/$i.jpg

    if [ -f $i.jpg ]; then
      convert $i.jpg $i.webp
      rm $i.jpg
    fi
  done

  cd ../..
}


# commercial
mkdir commercial
cd commercial

download_project fish 12
download_project tree 15
download_project crazy 54


residential
mkdir residential
cd residential

download_project block 20
download_project mad5l1 6
download_project mad5l2 9
