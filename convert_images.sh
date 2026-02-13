#!/bin/bash
IMAGES_DIR="public/images"
PRODUCTS_JSON="src/data/products.json"

# Find all product files (jpg, jpeg, png)
FILES=$(ls "$IMAGES_DIR"/product-* 2>/dev/null | grep -E '\.(jpg|jpeg|png)$')

for file in $FILES; do
    filename=$(basename "$file")
    extension="${filename##*.}"
    basename="${filename%.*}"
    
    echo "Converting $filename to webp..."
    cwebp -q 80 "$file" -o "$IMAGES_DIR/$basename.webp"
done

# Update JSON
echo "Updating products.json..."
# Replace .jpg with .webp and .png with .webp for product lines
sed -i '' 's|/images/product-\(.*\)\.\(jpg\|png\)|/images/product-\1.webp|g' "$PRODUCTS_JSON"

# Finally, delete old files
echo "Deleting original files..."
for file in $FILES; do
    rm "$file"
done
