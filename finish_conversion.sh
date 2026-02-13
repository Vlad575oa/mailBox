#!/bin/bash
IMAGES_DIR="public/images"
PRODUCTS_JSON="src/data/products.json"

FILES=$(ls "$IMAGES_DIR"/product-* 2>/dev/null | grep -E '\.(jpg|jpeg|png)$')

echo "Converting remaining files..."
for file in $FILES; do
    filename=$(basename "$file")
    basename="${filename%.*}"
    if [ ! -f "$IMAGES_DIR/$basename.webp" ]; then
        cwebp -q 80 "$file" -o "$IMAGES_DIR/$basename.webp" > /dev/null 2>&1
    fi
done

echo "Updating JSON..."
# Use python for reliable JSON update if available, or just sed if it's safe
sed -i '' 's|\.jpg"|.webp"|g' "$PRODUCTS_JSON"
sed -i '' 's|\.png"|.webp"|g' "$PRODUCTS_JSON"

echo "Deleting original files..."
for file in $FILES; do
    rm "$file"
done

echo "Done."
