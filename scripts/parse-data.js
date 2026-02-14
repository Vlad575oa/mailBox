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

const FAST_MODE = process.argv.includes('--fast');

function downloadImage(url, filepath) {
    if (fs.existsSync(filepath)) {
        return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        const protocol = url.startsWith('https') ? https : http;
        const options = {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        };
        protocol.get(url, options, (response) => {
            if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
                // Handle redirects
                downloadImage(response.headers.location, filepath).then(resolve).catch(reject);
                return;
            }
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
                currentProduct.price = String(nextRow[0]);
                i++;
            }
        } else if (typeof cell === 'string') {
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

    console.log(`Found ${products.length} products. Starting scraping and downloads...`);

    // Post-process: Download images
    const finalProducts = [];

    for (const p of products) {
        // If we have a link, scrape for more images
        let allRemote = [...p.remoteImages];
        if (p.link) {
            const scraped = await fetchProductGallery(p.link);
            allRemote = [...new Set([...allRemote, ...scraped])];
        }

        const localImages = [];
        for (let idx = 0; idx < allRemote.length; idx++) {
            const url = allRemote[idx];
            const cleanUrl = url.split('?')[0];
            const extension = path.extname(cleanUrl) || '.jpg';
            const filename = `product-${p.id}-${idx}${extension}`;
            const downloadPath = path.join(IMAGES_DIR, filename);

            try {
                process.stdout.write(`Product ${p.id}: Downloading ${idx + 1}/${allRemote.length}\r`);
                await downloadImage(url, downloadPath);
                localImages.push(`/images/${filename}`);
            } catch (err) {
                // console.error(`\nError downloading for ${p.id}:`, err.message);
            }
        }
        console.log(`\nProduct ${p.id}: ${localImages.length} images saved.`);

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
