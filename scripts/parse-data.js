const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const sharp = require('sharp');

const EXCEL_FILE = path.resolve(__dirname, '../Book1.xlsx');
const IMAGES_DIR = path.resolve(__dirname, '../public/images');
const OUTPUT_FILE = path.resolve(__dirname, '../src/data/products.json');

// Ensure images dir exists
if (!fs.existsSync(IMAGES_DIR)) {
    fs.mkdirSync(IMAGES_DIR, { recursive: true });
}

const FAST_MODE = process.argv.includes('--fast');

async function downloadAndProcessImage(url, pId, index) {
    const cleanUrl = url.split('?')[0];
    const extension = path.extname(cleanUrl) || '.jpg';
    const webpFilename = `product-${pId}-${index}.webp`;
    const webpPath = path.join(IMAGES_DIR, webpFilename);

    // CACHE: If .webp already exists, skip everything
    if (fs.existsSync(webpPath) && !process.argv.includes('--force')) {
        return `/images/${webpFilename}`;
    }

    const tempFilename = `temp-${pId}-${index}${extension}`;
    const tempPath = path.join(IMAGES_DIR, tempFilename);

    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(tempPath);
        const protocol = url.startsWith('https') ? https : http;
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        };

        protocol.get(url, options, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                downloadAndProcessImage(response.headers.location, pId, index).then(resolve).catch(reject);
                return;
            }
            if (response.statusCode !== 200) {
                reject(new Error(`Status ${response.statusCode}`));
                return;
            }

            response.pipe(file);
            file.on('finish', async () => {
                file.close();
                try {
                    // Convert to WebP using sharp
                    await sharp(tempPath)
                        .webp({ quality: 80 })
                        .toFile(webpPath);

                    // Cleanup temp file
                    fs.unlinkSync(tempPath);
                    resolve(`/images/${webpFilename}`);
                } catch (err) {
                    fs.unlink(tempPath, () => { });
                    reject(err);
                }
            });
        }).on('error', (err) => {
            fs.unlink(tempPath, () => { });
            reject(err);
        });
    });
}

function fetchProductGallery(url) {
    return new Promise((resolve) => {
        if (!url || !url.startsWith('http')) return resolve([]);

        console.log(`Scraping gallery from: ${url}`);
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.9'
            }
        };
        https.get(url, options, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                // Look for Shopify product JSON in script tags
                // Pattern: _TC.product = { ... }; or window.Shopify.product = { ... };
                const tcMatch = data.match(/_TC\.product\s*=\s*({[\s\S]+?});/);
                const shopifyMatch = data.match(/window\.Shopify\.product\s*=\s*({[\s\S]+?});/);
                const jsonContent = tcMatch ? tcMatch[1] : (shopifyMatch ? shopifyMatch[1] : null);

                let cleanUrls = [];
                if (jsonContent) {
                    try {
                        const product = JSON.parse(jsonContent);
                        if (product.images && Array.isArray(product.images)) {
                            cleanUrls = product.images.map(img => {
                                let url = img.startsWith('//') ? 'https:' + img : img;
                                return url.split('?')[0].split('&')[0];
                            });
                        }
                    } catch (e) {
                        console.error('JSON Parse error for product data');
                    }
                }

                // Fallback to broader regex if JSON parsing fails or returns no images
                if (cleanUrls.length === 0) {
                    const regex = /\/\/(?:cdn\.shopify\.com|ferrumdecorstudio\.shop\/cdn\/shop\/files)\/[^"']+\.(?:jpg|png|webp|jpeg)/gi;
                    const matches = data.match(regex) || [];
                    cleanUrls = [...new Set(matches.map(m => {
                        let url = m.startsWith('//') ? 'https:' + m : m;
                        return url.split('?')[0].split('&')[0];
                    }))].filter(url => !url.includes('icon') && !url.includes('logo'));
                }

                console.log(`Found ${cleanUrls.length} potential images for ${url}`);
                resolve(cleanUrls);
            });
        }).on('error', (err) => {
            console.error(`Scrape error for ${url}:`, err.message);
            resolve([]);
        });
    });
}

async function parseData() {
    const workbook = XLSX.readFile(EXCEL_FILE);
    const sheet = workbook.Sheets['Sheet1'] || workbook.Sheets[workbook.SheetNames[0]];
    const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    const products = [];
    let currentProduct = null;

    console.log('Parsing Excel...');

    for (let i = 0; i < rawData.length; i++) {
        const row = rawData[i];
        if (!row || row.length === 0) continue;
        const cell = row[0];

        // Check for start of new item (Number)
        if (typeof cell === 'number') {
            if (currentProduct && currentProduct.title) {
                products.push(currentProduct);
            }
            currentProduct = { id: cell, remoteImages: [] };
            continue;
        }

        if (!currentProduct) continue;

        if (cell === '🔗') {
            // Collect all following URLs until next emoji or ID
            let j = i + 1;
            while (j < rawData.length) {
                const nextRow = rawData[j];
                if (!nextRow || nextRow.length === 0) break;
                const nextCell = nextRow[0];

                if (typeof nextCell === 'string' && nextCell.trim().startsWith('http')) {
                    const url = nextCell.trim();
                    if (url.includes('products/')) {
                        currentProduct.link = url;
                    } else if (url.includes('cdn/shop')) {
                        currentProduct.remoteImages.push(url);
                    }
                    j++;
                } else {
                    break;
                }
            }
            i = j - 1; // skip processed lines
        } else if (cell === '💰') {
            const nextRow = rawData[i + 1];
            if (nextRow && nextRow[0]) {
                currentProduct.price = String(nextRow[0]).replace('✏️', '').trim();
                i++;
            }
        } else if (typeof cell === 'string') {
            const cleanCell = cell.replace('✏️', '').trim();
            if (cleanCell === 'Preview 1' || cleanCell === '' || cell === '✏️') continue;
            if (cleanCell.startsWith('http')) continue;

            // Detect price - if it contains currency symbols or USD/EUR
            if (cleanCell.includes('$') || cleanCell.toLowerCase().includes('usd')) {
                currentProduct.price = cleanCell;
            } else if (cleanCell.length > 3) {
                currentProduct.title = cleanCell;
            }
        }
    }

    // Push last one
    if (currentProduct && currentProduct.title) {
        products.push(currentProduct);
    }

    console.log(`Found ${products.length} products. Starting scraping and downloads...`);

    // Post-process: Download images
    const finalProducts = [];

    for (const p of products) {
        // Deduplicate URLs and apply special logic for products 1-16
        let allRemote = [...new Set(p.remoteImages.map(url => url.split('?')[0]))];

        if (p.link) {
            const scraped = await fetchProductGallery(p.link);
            const cleanScraped = scraped.map(url => url.split('?')[0]);
            allRemote = [...new Set([...allRemote, ...cleanScraped])];
        }

        // SPECIAL FIX: For products 1-16, the first image is often a duplicate 
        // of a later one or just a redundant copy.
        // User specifically asked to skip the duplicate with prefix 0 (the first one) 
        // as they are duplicates with prefix 1.
        if (p.id >= 1 && p.id <= 16 && allRemote.length > 1) {
            console.log(`Product ${p.id}: Skipping the first (duplicate) image as requested.`);
            allRemote.shift();
        }

        const localImages = [];
        for (let idx = 0; idx < allRemote.length; idx++) {
            const url = allRemote[idx];
            try {
                process.stdout.write(`Product ${p.id}: Processing image ${idx + 1}/${allRemote.length}\r`);
                const localPath = await downloadAndProcessImage(url, p.id, idx);
                localImages.push(localPath);
            } catch (err) {
                // console.error(`\nError downloading for ${p.id}:`, err.message);
            }
        }
        console.log(`\nProduct ${p.id}: ${localImages.length} images processed (WebP).`);

        finalProducts.push({
            id: p.id,
            title: p.title,
            link: p.link || '',
            price: p.price || 'Price on request',
            image: localImages[0] || '/images/placeholder.jpg',
            images: localImages.length > 0 ? localImages : ['/images/placeholder.jpg'],
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
