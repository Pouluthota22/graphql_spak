const XLSX = require('xlsx');

module.exports = {
    loadDataFromCSV: (path) => {
        let wb = XLSX.readFile(path);
        return XLSX.utils.sheet_to_json(wb.Sheets['Sheet1']);
    }
}