rate=$1
if [[ -n "$rate" ]]; then
    troll -C 164.107.113.18 -S 164.107.113.20 -a 38525 -b 60329 -r -t -x $rate 12503
else
    echo "Did you sepecify the package lost rate?"
    exit 1
fi 
