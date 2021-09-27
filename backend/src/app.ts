import express, {Request, Response} from "express";

/**
 * Given the size of this app
 * Choice has been made to keep 
 * the app in 1 module only
 */

const app = express();
app.use(express.json())

// interface
interface IShapeChecker {
  shapeOk: boolean,
  issues: string[],
}

// helper to check the shape of the data provided
const dataShapeChecker = (data: any): IShapeChecker => {
  let issues : string[] = [];
  const shapeOk : boolean = 'AccountName' in data && typeof data['AccountName'] === 'string' &&
  'AccountValue' in data && typeof data['AccountValue'] === 'number';

  if (!shapeOk ) {
    ! ('AccountName' in data) && issues.push('No AccountName column')
    ! (typeof data['AccountName'] === 'string') && issues.push('AccountName(s) not in string format')
    ! ('AccountValue' in data) && issues.push('No AccountValue column')
    ! (typeof data['AccountValue'] === 'number') && issues.push('AccountValue(s) not in number format')
  }
  return {shapeOk, issues};
}

// only endpoint 
app.post('/api', (req: Request, res: Response) => {
  let formatOk : boolean = true;
  let formatIssues : string[] = [];
  let item : any;
  const dataReceived : any = JSON.parse(JSON.stringify(req.body));

  if (dataReceived.length === 0) {
    formatOk = false;
    formatIssues = ['Empty data']
  } else {
    for (item of dataReceived) {  
      // scanning each item for shape issues
      const {shapeOk, issues} : IShapeChecker = dataShapeChecker(item);
      if (!shapeOk){
      formatOk = false;
      formatIssues = [...formatIssues, ...issues];
      }
    }
  }
  
  // removing duplicates if any
  formatIssues = [... new Set(formatIssues)]

  // responding
  formatOk ? 
  res.status(200).send({
    message: 'CSV Data correctly formatted.',
  })
  : 
  res.status(400).send({
    message: `CSV Data in wrong format: ${formatIssues.join(', ')}.` ,
  })

});

app.listen(5000, () => {
  console.log("> CSV checker started on port 5000");
});

module.exports = app;