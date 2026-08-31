#!/bin/bash

# You can specify a directory as an argument, defaults to current directory
TARGET_DIR="${1:-.}"

# Loop through all .JPG files in the target directory
for img in "$TARGET_DIR"/*.JPG; do
    # Skip if no .JPG files are found
    [ -e "$img" ] || continue

    # Strip the .JPG extension and add .webp
    webp_file="${img%.JPG}.webp"

    # Check if the .webp version does NOT exist
    if [ ! -f "$webp_file" ]; then
        echo "Converting $img to $webp_file..."
        
        # Run the cwebp command
        cwebp -q 75 "$img" -o "$webp_file"
        
        echo "----------------------------------------"
    else
        echo "Skipping $img (webp version already exists)"
    fi
done
