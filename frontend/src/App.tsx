import React, { useState } from 'react';
import CSVReader from "react-csv-reader";
import './App.css';
import Logo from './logo.png';

/**
 * Given the size of this app
 * Choice has been made to keep 
 * all functionality in the same module
 */

function App() {

  // local state
  const [csvData, setCsvData] = useState<any[] | [] >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOkToProcess, setIsOkToProcess] = useState<boolean>(false);
  const [message, setMessage ] = useState<string | Promise<string> >('Please upload a trial balance CSV file to check its format.');

  interface IFileInfo {
    name: string,
    size: number,
    type: string,
  }

  interface IResponse {
    status: number,
    ok: boolean,
    message: string,
  }
  // re-initialising state
  const resetApp = () : void  => {
    // local state
    setCsvData([]);
    setIsOkToProcess(false);
    setIsLoading(false);
    setMessage('Please upload a trial balance CSV file to check its format.');

    // below line is necessary to get the onFileLoaded
    // prop function of CSVReader to work with repeated
    // uploads of the same file

    /** TODO - replace with useRef */
    (document.querySelector('.csv-reader-input__button') as HTMLInputElement).value = '';
  }
  // action on csv file upload
  const onFileUpload = (data : any[], fileInfo : IFileInfo) : void => {
    console.table('DATA', data);

    if (data.length > 0) {
      if(fileInfo?.type === 'text/csv'){ 
        setCsvData(data);
        setIsOkToProcess(true);
        setMessage(`File "${fileInfo.name}" is ready to get processed.`);
      } else {
        setIsOkToProcess(false);
      }
    } else {
      setIsOkToProcess(false);
      setMessage('The CSV file provided is empty.');
    }
  }

  // action on press of the Process button
  const onClickProcess = async () : Promise<void> => {
    setIsOkToProcess(false);
    setIsLoading(true);
    setMessage('Loading...')

    try {

      const response: Response  = await postData('/api', csvData);
      const json : IResponse = await response.json();
      setIsLoading(false);
      setMessage(json.message)

    } catch (error : any) {
      setIsLoading(false);
    } finally {
      setTimeout(()=> resetApp(), 4000);
    }
  }

  // Http POST request helper
  const  postData = async (url: string = '', data: any[] = []) : Promise<Response> => {

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response;
  }

  return (
    <div className="app">
      <header className="app-header">
        <img src={Logo} className="app-logo" alt="logo" />
    
        <p>{message}</p>

        <div>
          <CSVReader
            label={'Upload'}
            parserOptions={{
              header: true,
              dynamicTyping: true,
              skipEmptyLines: true,
            }}
            onFileLoaded={(data , fileInfo) => onFileUpload(data, fileInfo)} 
            cssInputClass={'csv-reader-input__button'}
            cssLabelClass={'csv-reader-input__label'}	
          />
        </div>
        <div>
          <button 
            disabled={!isOkToProcess || isLoading} 
            onClick={()=>onClickProcess()} 
            className="process-button">
              Process
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
