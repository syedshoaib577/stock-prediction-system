
const getExchangeCsvFiles = require('../functions/1stFunction.js'); // import 1st function
const predictNextValues = require('../functions/2ndFunction.js'); // import 2nd function
const { generateReport } = require('../functions/logReporter.js'); // import logReporter

(async () => {
  const exchangeDir = 'stockPredictionSystem/test_data/stockExchanges/'; // specify the path for testdata
  const maxFilesPerDir = 2; // specify the maximum number of files to process per directory
  
  try {
    console.log('> Processing '+maxFilesPerDir+' Files per Exchange from the DataSet');
    const stockDataList = await getExchangeCsvFiles(exchangeDir, maxFilesPerDir);
    console.log('> Overall capatured '+stockDataList.length+' stocksFiles from the Exchanges');
    console.log('------------------------------');
    await predictNextValues(stockDataList);
    console.log('> Processed '+stockDataList.length+' stocksFiles from the Exchanges');
    await generateReport();
  } catch (err) {
      console.error('> Error during processing:', err.message);
  }
})();

