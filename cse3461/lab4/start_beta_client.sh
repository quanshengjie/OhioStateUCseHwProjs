name=$1
if [[ -n "$name" ]]; then
    python3 ftpc.py 164.107.113.20 60329 12503 $name
else
    echo "Did you sepecify the name of the file to transfer?"
    exit 1
fi
