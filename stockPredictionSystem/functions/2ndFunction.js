const fsp = require('fs').promises;
const path = require('path');

/**
 * process the stockDataList and apply the prediction algorithm
 * @param {arrayList} stockDataList - array of arrays containing data points.
 */
async function predictNextValues(stockDataList) {
    for (const stockData of stockDataList) {
        const rows = [];
        const stockId = stockData[0]['Stock-ID'];
        const stockPrices = stockData.map(item => parseFloat(item['Stock Price Value']));
        const sortedPrices = [...stockPrices].sort((a, b) => b - a);
        const secondHighest = sortedPrices[1];
        console.log('>>> Applying Prediction Logic on: '+ stockId);
        
        // calculate predictions
        const n = stockPrices[stockPrices.length - 1];
        console.log('>>> n: ' + n);
        const nPlus1 = secondHighest;
        console.log('>>> n+1: ' + nPlus1);
        const nPlus2 = n + (nPlus1 - n) / 2;
        console.log('>>> n+2: ' + nPlus2);
        const nPlus3 = nPlus2 + (nPlus1 - nPlus2) / 4;
        console.log('>>> n+3: ' + nPlus3);
        const predictions = [nPlus1, nPlus2, nPlus3];

        // extend timestamps for predictions
        const lastTimestamp = stockData[stockData.length - 1]['Timestamp (dd-mm-yyyy)'];
        const predictionTimestamps = Array.from({ length: 3 }, (_, i) => {
            const date = new Date(lastTimestamp.split('-').reverse().join('-'));
            date.setDate(date.getDate() + i + 1);
            const dd = String(date.getDate()).padStart(2, '0');
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const yyyy = date.getFullYear();
            return `${dd}-${mm}-${yyyy}`;
        });

        // combine original and prediction data into rows
        stockData.forEach(item => {rows.push([item['Stock-ID'], item['Timestamp (dd-mm-yyyy)'], item['Stock Price Value']]);
        });
        predictions.forEach((prediction, index) => {rows.push([stockId, predictionTimestamps[index], prediction.toFixed(2)]);
        });

        const csvContent = [
            ['Stock-ID', 'Timestamp', 'Stock Price Value'],
            ...rows
        ].map(row => row.join(',')).join('\n');

        // write to CSV file
        const outputPath = path.join('output_results', stockId+'-Predictions.csv');
        try {
            await fsp.writeFile(outputPath, csvContent);
            console.log('>>> Data for ' + stockId + ' written to '+ outputPath);
            console.log('--------------------');
        } catch (error) {
            console.error('>> Error writing file for '+stockId+' ERR: '+err.message);
        }
    }
}

module.exports = predictNextValues; // export the method
