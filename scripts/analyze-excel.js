/* eslint-disable */
const XLSX = require('xlsx');
const path = require('path');

const file = path.resolve(__dirname, '../Book1.xlsx');
const workbook = XLSX.readFile(file);
console.log('Sheet Names:', workbook.SheetNames);

const sheet1 = workbook.Sheets['Sheet1'];
const data1 = XLSX.utils.sheet_to_json(sheet1, { header: 1 });
console.log('Sheet1 First 20 Rows:', JSON.stringify(data1.slice(0, 20), null, 2));

const sheet3 = workbook.Sheets['Sheet3'];
const data3 = XLSX.utils.sheet_to_json(sheet3, { header: 1 });
console.log('Sheet3 First 20 Rows:', JSON.stringify(data3.slice(0, 20), null, 2));
