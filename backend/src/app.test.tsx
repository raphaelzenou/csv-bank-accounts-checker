const request = require('supertest');
const app = require('./app');

const json = [
  {
    "AccountName": "PETTY CASH",
    "AccountValue": 17269.51
  },
  {
    "AccountName": "CASH IN CURRENT A/C",
    "AccountValue": 1333.37
  },
  {
    "AccountName": "CASH IN SAVINGS A/C",
    "AccountValue": 15468.57
  },
  {
    "AccountName": "ACCOUNTS RECEIVABLE",
    "AccountValue": 16602.64
  },
  {
    "AccountName": "BAD DEBTS RESERVE",
    "AccountValue": -50674.08837
  },
  {
    "AccountName": "STOCK INVENTORY",
    "AccountValue": 9757.97
  },
  {
    "AccountName": "INSURANCE",
    "AccountValue": 4305.42
  },
  {
    "AccountName": "ADVANCE PAID EXPENSES",
    "AccountValue": 15394.75
  },
  {
    "AccountName": "OFFICE SUPPLY",
    "AccountValue": 15705.45
  },
  {
    "AccountName": "DEPOSITS WITH UTILITY COMPANIES",
    "AccountValue": 15138.91
  },
  {
    "AccountName": "NOTES RECEIVABLE",
    "AccountValue": 15364.11
  },
  {
    "AccountName": "INVESTMENTS",
    "AccountValue": 6304.83
  },
  {
    "AccountName": "ORGANIZATION EXPENSE",
    "AccountValue": 3639.15
  },
  {
    "AccountName": "VEHICLES",
    "AccountValue": 17633.24
  },
  {
    "AccountName": "BANK LOAN",
    "AccountValue": -103243.8184
  }
];

const erroneousJson = [
  {
    "AccountName": "PETTY CASH",
    "AccountValue": 'ABC'
  },
  {
    "AccountName": "CASH IN CURRENT A/C",
    "AccountValue": 1333.37
  },
  {
    "AccountName": "CASH IN SAVINGS A/C",
    "AccountValue": 15468.57
  },
  {
    "AccountName": "ACCOUNTS RECEIVABLE",
    "AccountValue": 16602.64
  },
  {
    "AccountName": "BAD DEBTS RESERVE",
  },
  {
    "AccountName": "STOCK INVENTORY",
    "AccountValue": 9757.97
  },
  {
    "AccountName": "INSURANCE",
    "AccountValue": 4305.42
  },
  {
    "AccountName": "ADVANCE PAID EXPENSES",
    "AccountValue": 15394.75
  },
  {
    "AccountName": "OFFICE SUPPLY",
    "AccountValue": 15705.45
  },
  {
    "AccountName": "DEPOSITS WITH UTILITY COMPANIES",
    "AccountValue": 15138.91
  },
  {
    "AccountValue": 15364.11
  },
  {
    "ABCDE": "INVESTMENTS",
    "AccountValue": 6304.83
  },
  {
    "AccountName": "ORGANIZATION EXPENSE",
    "AccountValue": 3639.15
  },
  {
    "AccountValue": 17633.24
  },
  {
    "AccountName": "BANK LOAN",
    "AccountValue": -103243.8184
  }
];

describe('Endpoints', () => {

  it('POST should respond with a success code with correctly formatted data', async () => {
    const res = await request(app)
      .post('/api')
      .send(json);

    expect(res.statusCode).toEqual(200);

  });

  it('POST should respond with an error with wrongly formatted data', async () => {
    const res = await request(app)
      .post('/api')
      .send(erroneousJson);

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('CSV Data in wrong format: AccountValue(s) not in number format, No AccountValue column, No AccountName column, AccountName(s) not in string format.');

  });

  it('POST should respond with an error with empty data []', async () => {
    const res = await request(app)
      .post('/api')
      .send([]);

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toBe('CSV Data in wrong format: Empty data.');

  });

  it('POST should respond with a 500 error with null data', async () => {
    const res = await request(app)
      .post('/api')
      .send(null);

    expect(res.statusCode).toEqual(500);

  });
  
});