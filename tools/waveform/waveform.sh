#! /bin/bash -e

# Absolute path to this script, e.g. /home/user/bin/foo.sh
# SCRIPT=$(readlink -f "$0")
# Absolute path this script is in, thus /home/user/bin
SCRIPTPATH=$(dirname $0)

ffmpeg -i "$1" -ac 1 -filter:a aresample=8000 -map 0:a -c:a pcm_s16le -f data - | \
   gnuplot -e "filename='$2'" ${SCRIPTPATH}/waveform.gnuplot
# ffmpeg -y -i "$1" -ac 1 -filter:a aresample=8000 -map 0:a -c:a pcm_s8 -f data data.bin
# ffmpeg -y -i "$1" -ac 1 -filter:a aresample=8000 -map 0:a -c:a pcm_s8 -f data - | node waveform.js

# cp *.png ../../public/files/
