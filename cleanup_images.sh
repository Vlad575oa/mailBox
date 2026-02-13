#!/bin/bash
IMAGES_DIR="public/images"
PRODUCTS_JSON="src/data/products.json"

# Get used images from JSON
USED_IMAGES=$(grep -o '/images/product-[^"]*' "$PRODUCTS_JSON" | sed 's|/images/||' | sort -u)

# Get all product images from disk
ALL_IMAGES=$(ls "$IMAGES_DIR"/product-* 2>/dev/null | xargs -n1 basename | sort -u)

echo "Used images from JSON:"
echo "$USED_IMAGES"
echo "---"

for img in $ALL_IMAGES; do
    # Check if this image is in the used list
    if ! echo "$USED_IMAGES" | grep -q "^$img$"; then
        echo "Deleting unused image: $img"
        rm "$IMAGES_DIR/$img"
    fi
done
