const fs = require('fs');
const fsp = require('fs').promises;
const path = require('path');
const csv = require('csv-parser');

/**
 * process CSV files from directories and extract 10 random consecutive rows from each file.
 * @param {string} baseDir - base directory to start processing from.
 * @param {number} maxFilesPerDir - maximum number of files to process per directory.
 * @returns {allExtractedRows} - returns an array of arrays each containing 10 rows from a file.
 */
async function getExchangeCsvFiles(baseDir, maxFilesPerDir) {
    const csvHeaders = ['Stock-ID', 'Timestamp (dd-mm-yyyy)', 'Stock Price Value']; // csv headers
    const allExtractedRows = []; // to store captured rows

    // to traverse all the folders and files within the baseDir
    async function traverseAndProcess(currentDir) {
        try {
            const files = await fsp.readdir(currentDir, { withFileTypes: true });
            const csvFiles = files
                .filter(file => !file.isDirectory() && path.extname(file.name).toLowerCase() === '.csv')
                .map(file => path.join(currentDir, file.name));
            const subDirectories = files.filter(file => file.isDirectory());
    
            for (const file of csvFiles.slice(0, maxFilesPerDir)) {
                try {
                    const rows = await getConsecutiveData(file);
                    if (rows.length > 0) {
                        allExtractedRows.push(rows);
                        let filePath = file.split('/');
                        console.log('>> Processing Exchange: '+filePath[3]);
                        console.log('>> Processing File: '+filePath[4]);
                        console.log('>> Extracted 10 Consecutive Data Points');
                        console.log('------------------------------');
                    }
                } catch (err) {
                    console.error('>> Error processing file: '+file+' ERR: '+err.message);
                }
            }

            for (const subDir of subDirectories) {
                await traverseAndProcess(path.join(currentDir, subDir.name));
            }
        } catch (err) {
            console.error('>> Error accessing directory: '+currentDir+' ERR: '+err.message);
        }
    }

    // to capture 10 consective rows(data points) from csv files
    async function getConsecutiveData(filePath) {
        return new Promise((resolve, reject) => {
            const results = [];
            fs.createReadStream(filePath)
                .pipe(csv({ headers: csvHeaders, skipLines: 0 }))
                .on('data', data => results.push(data))
                .on('end', () => {
                    if (results.length === 0) {
                        console.log('>> No data in file: '+filePath);
                        resolve([]);
                    } else {
                        const maxStartIndex = Math.max(0, results.length - 10);
                        const startIndex = Math.floor(Math.random() * (maxStartIndex + 1));
                        resolve(results.slice(startIndex, startIndex + 10));
                    }
                })
                .on('error', err => reject(err));
        });
    }

    await traverseAndProcess(baseDir); // start processing from the base directory
    return allExtractedRows; // all rows from each file
}

module.exports = getExchangeCsvFiles; // export the method
