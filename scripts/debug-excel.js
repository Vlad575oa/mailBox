const XLSX = require('xlsx');
const path = require('path');

const EXCEL_FILE = path.resolve(__dirname, '../Book1.xlsx');
try {
    const workbook = XLSX.readFile(EXCEL_FILE);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const imagesFound = [];
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    rawData.forEach((row, i) => {
        if (row) {
            row.forEach((cell, j) => {
                if (typeof cell === 'string') {
                    const lowerCell = cell.toLowerCase();
                    if (imageExtensions.some(ext => lowerCell.includes(ext))) {
                        imagesFound.push({ row: i + 1, col: String.fromCharCode(65 + j), value: cell });
                    }
                }
            });
        }
    });
    console.log('Images Found:', JSON.stringify(imagesFound, null, 2));
} catch (e) {
    console.error(e);
}
