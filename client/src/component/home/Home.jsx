import React, { useState, useEffect } from "react";
import "./home.css";
import blankPage from "../../assets/blankPage.png";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import PopUp from "../pop/PopUp";
import DocumentCard from "../Documents/DocumentCard";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import { BACKEND_URL } from "../../utils/constant";

const Home = () => {
  const [popUp, setPopUp] = useState(false);
  const [rowData, setRowData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(BACKEND_URL + "documents");
      const data = await response.json();
      setRowData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDelete = (_id, index) => {
    fetch(BACKEND_URL + "document/" + _id, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          const docList = [...rowData];
          docList.splice(index, 1);
          setRowData(docList);
        } else {
          alert("Error deleting document.");
        }
      })
      .catch((err) => {
        console.error("Error :", err);
      });
  };

  return (
    <div className="home-layout">
      <div className="blank-page">
        <h4>Start a new document</h4>
        <img onClick={() => setPopUp(true)} alt="blank-page" src={blankPage} />
        <h3>blank</h3>
      </div>
      {popUp && (
        <div className="popUpHome">
          <PopUp state={popUp} setState={setPopUp} />
        </div>
      )}
      <div className="doc-list-header">
        <div className="my-doc">My Documents</div>
        <div className="date-created">Date Created</div>
      </div>
      <div className="doc-list">
        {rowData.map((row, index) => (
          <div className="doc-cards-list" key={row._id}>
            <Link className="card" to={`docs/${row.name}/${row._id}`}>
              {" "}
              <DocumentCard
                name={row.name}
                creationDate={row.creationDate}
              />{" "}
            </Link>{" "}
            <div
              className="delete-icon"
              onClick={() => handleDelete(row._id, index)}
            >
              <DeleteIcon />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
