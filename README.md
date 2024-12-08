# lseg_challenege | stock-prediction-system
 The Stock Prediction System forecasts the stock prices for the next 3 days based on historical data. The predictions are stored in CSV files for each stock, allowing for easy analysis.

---

## Features

- **Recursive File Processing**: Processes CSV files from nested directories.
- **Random Sampling**: Extracts 10 random consecutive data points from each file.
- **Stock Price Prediction**: Predicts stock prices for the next three days using historical data.
- **Dynamic Output**: Saves predictions in CSV format under the output_results.

---

## Technologies Used

- **Node.js**: Runtime environment for executing JavaScript code.
- **fs**: File system module for reading and writing files.
- **csv-parser**: Library for parsing CSV files.
- **Promises**: For handling asynchronous operations.

---

## Project Structure

```plaintext
.
├── lseg_challenge/
│   ├── log_reports                  # Directory containing log reports after execution.
│   ├── node_modules                 # Directory containing all node dependencies
│   ├── output_results/              # Directory for saving prediction CSV files
│   ├── stockPredictionSystem        # Directory containing functions, specs, testdata
│   │   ├── functions                # Subdirectory containing functions
│   │   ├── spec_files               # Subdirectory containing main program file
│   │   │   ├── stockPrediction.js   # Main application file
│   │   ├── test_data                # Subdirectories containing dataset with exchanges and respective files
│   │   │   ├── stockExchanges/      # Subdirectories for stock exchange and its files
│   └── output_results/              # Directory for saving prediction CSV files
├── README.md                        # Documentation
└── package.json                     # Dependencies and project metadata
```

---
## Setup and Usage

### Prerequisites

1. **Install Node.js**: Ensure that Node.js is installed on your system. [Download Node.js here](https://nodejs.org/).
2. **Clone the Repository**:
   ```bash
   git clone [<repository_url>](https://github.com/syedshoaib577/lseg_challenege.git)
   cd stockPredictionSystem
   
### Install Dependencies
Run the following command to install the required packages:
```bash
   npm install
```
### Input Data Structure
Place the input CSV files under the test_data/stockExchanges/ directory. Each CSV file must follow the structure:

```php
   Stock-ID,Timestamp (dd-mm-yyyy),Stock Price Value
   <stock_id>,<date>,<price>
```

...
### Running the Project
To execute the project, run:

```bash
node stockPrediction.js
```
#### Configurable Parameters
- **baseDirectory:** Specifies the directory containing stock exchange data. Default: test_data/stockExchanges/.
- **maxFilesPerDirectory:** Limits the number of CSV files processed per directory. Default: 2.

### How It Works
Directory Traversal:

Recursively scans directories for CSV files.
Processes up to maxFilesPerDirectory files in each directory.
Data Sampling:

Extracts 10 consecutive rows randomly from each file.
Prediction Algorithm:

Determines the second-highest stock price (n+1).
Uses n+1 to calculate n+2 and n+3 predictions based on a custom formula.
Output Generation:

Appends predictions to the original data.
Saves results to the output_results/ directory as StockID_predictions.csv.

### Sample CSV Output:
```csv
Stock-ID,Timestamp,Stock Price Value
ABC123,01-12-2024,150.25
ABC123,02-12-2024,151.35
ABC123,03-12-2024,152.45
ABC123,04-12-2024,153.75
...
ABC123,05-12-2024,155.50
ABC123,06-12-2024,156.25
```
### Error Handling
- Logs errors for missing or unreadable files.
- Skips files without valid data rows.
- Prints detailed error messages for debugging.

### Future Enhancements
- Visualization: Add support for generating graphs of stock trends.
- Improved Prediction: Use machine learning algorithms for more accurate predictions.
- Dynamic Configuration: Support environment-based configurations.
