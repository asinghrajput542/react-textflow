import React, {useState,useEffect} from 'react'
import './home.css'
import blankPage from '../../assets/blankPage.png';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import PopUp from '../pop/PopUp';


const Home = () => {

    const [popUp,setPopUp]=useState(false);
        const [rowData, setRowData] = useState([]);
      
        useEffect(() => {
            console.log("aya...");
          fetchData();
        }, []);
      
        const fetchData = async () => {
          try {
            console.log("aya")
            const response = await fetch('http://localhost:9000/documents');
            const data=await response.json()
            setRowData(data);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    const columnDefs = [
        { headerName: 'Name', field: 'name' },
        { headerName: 'Created', field: 'creationDate' },
        { headerName: 'Modified', field: 'modificationDate' }
      ];

  return (
    <div>
     
        <div className='blank-page' onClick={()=>setPopUp(true)}>
            <h4>Start a new document</h4>
            <img alt='blank-page' src={blankPage} />
            <h3>blank</h3>
        </div>
        {popUp&&<div className="popUpHome"><PopUp state={popUp} setState={setPopUp}/></div>}
        <div className="ag-theme-alpine" style={{ height: 400, width: 600 }}>
      <AgGridReact columnDefs={columnDefs} rowData={rowData} />
    </div> 
      
    </div>
  )

}

export default Home;
