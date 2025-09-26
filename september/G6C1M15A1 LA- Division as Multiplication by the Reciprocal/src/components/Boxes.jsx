import React from "react";
import "./box.css";
const Boxes = ({ number, style }) => {
  return (
    <div className="box-container">
      <p>{number}</p>
      <div className="box" style={style}>2</div>
    </div>
  );
};

export default Boxes;
