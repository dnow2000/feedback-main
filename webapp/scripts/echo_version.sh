echo $(grep -m1 version package.json | awk -F: '{ print $2 }' | sed 's/[\", ]//g');
