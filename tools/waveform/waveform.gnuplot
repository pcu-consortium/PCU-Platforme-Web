  set terminal png transparent truecolor size 40000,50;
  set output filename;

  unset key;
  unset tics;
  unset border;
  set lmargin 0;
  set rmargin 0;
  set tmargin 0;
  set bmargin 0;

  plot '<cat' binary filetype=bin format='%int16' endian=little array=1:0  lt rgb "#303F9F" with lines;
