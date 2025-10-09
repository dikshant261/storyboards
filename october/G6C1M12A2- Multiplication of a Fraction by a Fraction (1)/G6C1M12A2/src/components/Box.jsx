import React from "react";
import "./box.css";

const Box = ({ beat, value, onClick, fontSize = "5vw" }) => {
  return (
    <div
      className={`box-container ${beat ? "pulsate" : ""}`}
      style={{ fontSize }}
      onClick={onClick}
    >
      <span className="box-value">{value}</span>
    </div>
  );
};

export default Box;