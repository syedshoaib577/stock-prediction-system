
const fsp = require('fs').promises;
const path = require('path');
let logs = []; // this will store all the logs

// override console.log globally to capture logs
const originalLog = console.log;
console.log = function (...args) {
    logs.push(args.join(' ')); // store logs in the array
    originalLog(...args); // call the original console.log to keep logging to the console
};

// function to generate an HTML report
async function generateReport() {
    let reportContent = `
        <html>
            <head>
                <title>Stock Prediction System</title>
                <style>
                    body { font-family: Arial, sans-serif; }
                    h1 { text-align: center; }
                    .log { margin: 10px 0; padding: 10px; border: 1px solid #ccc; background-color: #f9f9f9; }
                </style>
            </head>
            <body>
                <h1>Stock Prediction System Log Report</h1>
                <div>
    `;

    logs.forEach(log => {
        reportContent += `<div class="log">${log}</div>`;
    });

    reportContent += `
                </div>
            </body>
        </html>
    `;
    const outputPath = path.join('log_reports', 'stockPrediction-logReport.html');
    try {
        await fsp.writeFile(outputPath, reportContent);
        console.log("> Report generated successfully! Saved as stockPrediction-logReport.html.");
    } catch (error) {
        console.error("> Error writing the report:", error);
    }
}

module.exports = { generateReport }; // Export the generateReport function so it can be used in other files
