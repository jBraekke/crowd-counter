import React from "react";
import "./Skilt.css";

interface ISkilt {
  platenumber: string;
}

function Skilt(props: ISkilt) {
  return (
    <div className="sign">
      <div className="sign_indicator">
        <span className="sign_flag" />
        <span className="sign_name">N</span>
      </div>
      <div className="sign_platenumber">{props.platenumber}</div>
    </div>
  );
}

export default Skilt;
