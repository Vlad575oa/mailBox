import openpyxl
import json

wb = openpyxl.load_workbook('Book1.xlsx')
ws = wb.active

products = []

# Iterate through rows, starting from row 1
for row in ws.iter_rows(min_row=1, values_only=False):
    cells = [cell.value for cell in row]
    
    # Find product number in first cell
    if cells and cells[0] and str(cells[0]).isdigit():
        product_id = int(cells[0])
        
        if product_id > 16:
            break
        
        # Find product title and URL
        title = ""
        url = ""
        price = ""
        
        for i, cell in enumerate(cells):
            if cell and isinstance(cell, str):
                # Check if it's a product URL
                if 'ferrumdecorstudio.shop/products/' in cell:
                    url = cell
                # Check if contains 'mailbox' in title
                elif 'mailbox' in cell.lower() or 'brass' in cell.lower() or 'merbau' in cell.lower():
                    if not url:  # This is likely the title
                        title = cell
                # Check if it's a price
                elif '$' in cell or 'USD' in cell:
                    price = cell
        
        # Clean title
        title_clean = ''.join(c for c in title if c.isalnum() or c.isspace() or c in ['-', '.'])
        title_clean = ' '.join(title_clean.split())
        
        if not title_clean:
            title_clean = f"Custom Mailbox {product_id}"
        
        # Clean price
        if 'From' in price:
            price = price.replace('From', '').strip()
        
        products.append({
            'id': product_id,
            'name': title_clean,
            'price': price if price else '$359',
            'url': url if url else 'https://ferrumdecorstudio.shop/collections/mail-boxes',
            'image': f'/images/product-{product_id}.jpg'
        })

print(json.dumps(products, indent=2, ensure_ascii=False))
