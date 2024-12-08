# lseg_challenge | stock-prediction-system
The Stock Prediction System forecasts the stock prices for the next 3 days based on historical data. The predictions are stored in CSV files for each stock, allowing for easy analysis.

---
### Features
- **File Processing**: Processing CSV files from dataset directories.
- **Random Sampling**: Extracts 10 random consecutive data points from each file.
- **Stock Price Prediction**: Predicts stock prices for the next three days using historical data.
- **Output File Creation**: Saves predictions in CSV format under the output_results directory.
- **Log Reporter**: Generates a html report with all the logs from execution.

---
### Technologies Used
- **Node.js**: Runtime environment for executing JavaScript code.
- **fs**: File system module for reading and writing files.
- **csv-parser**: Library for parsing CSV files.
- **Promises**: For handling asynchronous operations.

---
### Project Structure
```plaintext
.
├── lseg_challenge/                  # Root directory
│   ├── log_reports                  # Directory containing log reports after execution.
│   ├── node_modules                 # Directory containing all node dependencies
│   ├── stockPredictionSystem        # Directory containing functions, specs, testdata
│   │   ├── functions                # Subdirectory containing functions
│   │   ├── spec_files               # Subdirectory containing main program file
│   │   │   ├── stockPrediction.js   # Main program file
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
   ```
   or
   **Download the Repo ZIP**:
      - Extract and open the project
   
   
### Install Dependencies
Run the following command in terminal to install the required packages:
```bash
   npm install
```

### Input Data Structure
Place the input CSV files under the test_data/stockExchanges/ directory. Each CSV file must follow the structure:
```csv
   Stock-ID,Timestamp (dd-mm-yyyy),Stock Price Value
   <stock_id>,<date>,<price>
```

### Running the Project
To execute the project, make sure you are in the home directory **'lseg_challenge'** and give absolute path of the **stockPrediction.js** file:
**example on mac:** syedmacos@Syeds-MacBook-Pro lseg_challenge % **node "/Users/syedmacos/MyLearnings/lseg_challenge/stockPredictionSystem/spec_files/stockPrediction.js"**
```bash
   node "/../lseg_challenge/stockPredictionSystem/spec_files/stockPrediction.js"
```

#### Configurable Parameters
- **baseDirectory:** Specifies the directory containing stock exchange data. Default: test_data/stockExchanges/.
- **maxFilesPerDirectory:** Limits the number of CSV files processed per directory. Default: 2.

### How It Works
- Directory Traversal:
    - Recursively scans directories for CSV files.
    - Processes up to maxFilesPerDirectory files in each directory.

- Data Sampling:
    - Extracts 10 consecutive rows randomly from each file.

- Prediction Algorithm:
    - Determines the second-highest stock price (n+1).
    - Uses n and n+1 to calculate n+2 and n+3 predictions based on a custom formula.

- Output Generation:
    - Appends predictions to the original data.
    - Saves results to the output_results/ directory as StockID-Predictions.csv.

### Sample CSV Output:
```csv
    Stock-ID,Timestamp,Stock Price Value
    ABC123,01-12-2024,150.25
    ...
    ABC123,10-12-2024,155.50
    ABC123,11-12-2024,156.25
    ABC123,12-12-2024,157.55
    ABC123,13-12-2024,156.15
```

### Error Handling
- Logs errors for missing or unreadable files.
- Skips files without valid data rows.
- Prints detailed error messages for debugging.

### Future Enhancements
- Implementation: Follow object-oriented programming practices.
- Improved Prediction: Use machine learning algorithms for more accurate predictions.
- Visualization: Add support for generating graphs of stock trends.
- Use Containers: Provide a docker file in the repo.
- Rich Reporter: Use Rich reporter, which make the report more presentable and interactive.
