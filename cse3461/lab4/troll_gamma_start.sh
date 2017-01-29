rate=$1
if [[ -n "$rate" ]]; then
    troll -C 164.107.113.20 -S 164.107.113.18 -a 60329 -b 38525 -r -t -x $rate 12504
else
    echo "Did you sepecify the package lost rate?"
    exit 1
fi
