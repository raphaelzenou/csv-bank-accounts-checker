# Trial Balance data CSV file checker

Tiny full stack web application for the validation of trial balance data.

## Requirements

As the core user,
When I open the web application,
  Then I see a single input field or equivalent component with which I can upload a csv data file.

When I upload a csv file into the field,
  Then the data in the file gets sent to the server for validation.

When the uploaded data is valid,
  Then the server responds with a success message which is shown to the user.

When the uploaded data is invalid,
  Then the server responds with a descriptive error message which is shown to the user. This error message should provide enough detail so the user understands what would need to be fixed.

In order to be a valid trial balance, every row of uploaded data needs to have at least 2 columns with these exact column names:
- AccountName: a string value which is to be unique in the uploaded data set
- AccountValue: a valid number value

Please find below an example extract of valid csv data.

```
AccountName,AccountValue
PETTY CASH,17269.51
CASH IN CURRENT A/C,1333.37
CASH IN SAVINGS A/C,15468.57
ACCOUNTS RECEIVABLE,16602.64
BAD DEBTS RESERVE,-50674.08837
STOCK INVENTORY,9757.97
INSURANCE,4305.42
ADVANCE PAID EXPENSES,15394.75
OFFICE SUPPLY,15705.45
DEPOSITS WITH UTILITY COMPANIES,15138.91
NOTES RECEIVABLE,15364.11
INVESTMENTS,6304.83
ORGANIZATION EXPENSE,3639.15
VEHICLES,17633.24
BANK LOAN,-103243.8184
```

## Description

On the frontend a `React` client lets users upload a CSV file from their storage and allows them to check whether it complies with the strict standardised data structure described in the Feature Requirements section.

On the backend a `Node` / `Express` server accepts `POST` requests to be sent to the `/api` route with a JSON payload that will be checked. Once checks have been performed the api responds with a success `200` and the corresponding message if the data is in the right format. If not the api will responds with an error `400` message and a message detailing where the issue is coming from. 

No database has been used but if needed we would have most likely opted for a MongoDB DaaS offering from Atlas and used Mongoose as ODM.

## Technologies

- The Frontend / client has been built using React
- The Backend is a simplistic Express server with a single POST endpoint
- Git source control has been used separately for the Frontend and Backend repositories
- Testing : Jest / React Testing Library for the Frontend and Jest / Supertest for the Backend


## UX and User Journey

When both frontend and backend servers are running users can access the frontend and benefit from the following features.

Design: as mentioned in the requirements the idea in this application is to provide users with a clean, easy to understand UI. This is why we have only 4 major elements in the page, which itself is based on the `create-react-app` template with some basic tweak : 

- Message center to give users instructions, processing status (loading) and information post data processing
- Upload button that opens a file explorer to allow users uploading a csv file (only)
- Process button that send the POST request to the api once the csv has been uploaded

Note that the process button is only enabled if a file has been uploaded and if the processing is not being done. This avoids sending a request while another one is already running.

User journey: 
- Open the application and be greeted with a message `Please upload a trial balance CSV file to check its format`
- `Process` button is deactivated
- Click on the `Upload` button and :
  - If the file is empty get `The CSV file provided is empty.`
  - If the file is a CSV and looking good `File "[filename].csv" is ready to get processed.`
- `Process` button is now activated, click on it 
- `Loading...` messaged is displayed during processing and the Process button is deactivated
- After receving a response from the api the application with now display:
  - `CSV Data correctly formatted.` if the data is in the right format
  - `CSV Data in wrong format:` and at least one of following error messages depending on the issues found:
    - `No AccountName column`
    - `No AccountValue column`
    - `AccountName(s) not in string format`
    - `AccountValue(s) not in number format`
- After 4 seconds the application resets itself




## Installtion and File structure

Both Backend and Frontend repositories have been compressed together in a .zip file, following the structure described in the instructions.

To run the application you first have to unzip the file and then open each `frontend` and `backend` folders seperately. In each of these folders to be able to use the application you have to first run `npm install` to download and install dependecies and then `npm start` to spin up the servers on `localhost`. Make sure you are at the same level as the `package.json`.

The React client will be running on port `3000` and the Express sever on port `5000`. 

Please note that for the React and Express applications we have tried and keep things simple by sticking to the minimum amount of files possible. Comments have been added to improve readability but conventions on synthax and naming have been implementation as well to help the reviewer.

## Testing

### Automated 

Basic tests have been drafted with Jest / React Testing Library for the Frontend and Jest / Supertest for the Backend. 

The idea was simply to showcase testing abilities and mostly ensure the api was responding with the right messages.

### End to End

End to End testing have been carried out using Postman and the React client directly.

### Running the tests

In both code bases run `npm test` to see the automated tests reports.


## Deployment

No deployment has yet been carried out. The app runs locally when spinning both the Client and Servers using the `npm run start` command.