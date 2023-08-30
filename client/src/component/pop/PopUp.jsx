import React, { useState } from "react";
import "./popUp.css";
import { v4 as uuid } from "uuid";
import { Link } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";

const PopUp = ({ state, setState }) => {
  const [text, setText] = useState("Untitle");
  return (
    <div className="popUp">
      <div className="popUp-header">
        <CloseIcon onClick={() => setState(false)} />
      </div>
      <div className="popUp-body">
        <h4>Enter the name of document</h4>
        <input
          type="text"
          placeholder="Name"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Link to={`/docs/${text.length > 0 ? text : "Untitle"}/${uuid()}`}>
          <button className="submit-btn" onClick={() => setState(false)}>
            Submit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default PopUp;
