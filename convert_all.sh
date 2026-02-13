#!/bin/bash
IMAGES_DIR="public/images"
PRODUCTS_JSON="src/data/products.json"

FILES=$(ls "$IMAGES_DIR"/product-* 2>/dev/null | grep -E '\.(jpg|jpeg|png)$')

echo "Starting conversion..."
for file in $FILES; do
    filename=$(basename "$file")
    basename="${filename%.*}"
    if [ ! -f "$IMAGES_DIR/$basename.webp" ]; then
        echo "Converting $filename..."
        cwebp -q 80 "$file" -o "$IMAGES_DIR/$basename.webp" > /dev/null 2>&1
    fi
done

echo "Updating $PRODUCTS_JSON..."
sed 's|\.jpg"|.webp"|g; s|\.png"|.webp"|g' "$PRODUCTS_JSON" > "$PRODUCTS_JSON.tmp" && mv "$PRODUCTS_JSON.tmp" "$PRODUCTS_JSON"

echo "Deleting original product images..."
for file in $FILES; do
    rm "$file"
done
echo "Clean up done."
