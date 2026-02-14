const XLSX = require('xlsx');
const workbook = XLSX.readFile('Book1.xlsx');
const sheet = workbook.Sheets['Sheet1'] || workbook.Sheets[workbook.SheetNames[0]];
const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

console.log(JSON.stringify(rawData.slice(0, 500), null, 2));
