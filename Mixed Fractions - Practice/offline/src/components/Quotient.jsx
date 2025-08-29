import React from "react";
import "./quotient.css";
const Quotient = ({ quotientOption, onClick}) => {
  return (
    <div className="quotient-container" onClick={onClick}>
      {quotientOption}
    </div>
  );
};
export default Quotient;
