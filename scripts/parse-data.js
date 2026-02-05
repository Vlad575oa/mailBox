const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const https = require('https');

const EXCEL_FILE = path.resolve(__dirname, '../Book1.xlsx');
const IMAGES_DIR = path.resolve(__dirname, '../public/images');
const OUTPUT_FILE = path.resolve(__dirname, '../src/data/products.json');

// Ensure images dir exists
if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

function downloadImage(url, filepath) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${url}: Status ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => { });
            reject(err);
        });
    });
}

async function parseData() {
    const workbook = XLSX.readFile(EXCEL_FILE);
    const sheet = workbook.Sheets['Sheet1'];
    const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    const products = [];
    let currentProduct = null;

    console.log('Parsing Excel...');

    for (let i = 0; i < rawData.length; i++) {
        const row = rawData[i];
        const cell = row[0];

        // Check for start of new item (Number)
        if (typeof cell === 'number') {
            if (currentProduct && currentProduct.title) {
                products.push(currentProduct);
            }
            currentProduct = { id: cell };
            continue;
        }

        if (!currentProduct) continue;

        if (cell === '🔗') {
            // Check next line
            const nextRow = rawData[i + 1];
            if (nextRow && nextRow[0]) {
                const url = nextRow[0];
                if (url.includes('cdn/shop') || url.includes('.jpg') || url.includes('.png')) {
                    // Remote Image URL
                    // Clean URL (remove query params)
                    const cleanUrl = url.split('?')[0];
                    // We use the original full URL for downloading to ensure we get the right version if params matter,
                    // but usually Shopify params are for resizing. Let's try downloading the raw URL provided.
                    currentProduct.remoteImage = url;
                    i++; // skip next line
                } else if (url.includes('products/') || url.includes('collections/')) {
                    currentProduct.link = url;
                    i++; // skip
                }
            }
        } else if (cell === '💰') {
            const nextRow = rawData[i + 1];
            if (nextRow && nextRow[0]) {
                currentProduct.price = nextRow[0];
                i++;
            }
        } else if (typeof cell === 'string') {
            // Potential title or clutter
            if (cell === 'Preview 1' || cell === '✏️') continue;

            if (!cell.startsWith('http') && cell.length > 3) {
                currentProduct.title = cell.replace('✏️', '').trim();
            }
        }
    }

    // Push last one
    if (currentProduct && currentProduct.title) {
        products.push(currentProduct);
    }

    console.log(`Found ${products.length} products. Starting image downloads...`);

    // Post-process: Download images
    const finalProducts = [];

    for (const p of products) {
        let localImagePath = '/images/placeholder.jpg';

        if (p.remoteImage) {
            const extension = path.extname(p.remoteImage.split('?')[0]) || '.jpg';
            const filename = `product-${p.id}${extension}`;
            const downloadPath = path.join(IMAGES_DIR, filename);

            try {
                console.log(`Downloading image for product ${p.id}...`);
                await downloadImage(p.remoteImage, downloadPath);
                localImagePath = `/images/${filename}`;
            } catch (err) {
                console.error(`Error downloading image for product ${p.id}:`, err.message);
                // Fallback to existing logic if download fails? Or just keep placeholder
            }
        }

        finalProducts.push({
            ...p,
            image: localImagePath,
            priceNumeric: parseFloat((p.price || '0').replace(/[^0-9.]/g, '')),
            category: 'Mailbox',
            material: p.title.toLowerCase().includes('corten') ? 'Corten Steel' :
                p.title.toLowerCase().includes('brass') ? 'Brass' : 'Steel'
        });
    }

    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalProducts, null, 2));
    console.log(`Saved ${finalProducts.length} products to ${OUTPUT_FILE}`);
}

parseData();
