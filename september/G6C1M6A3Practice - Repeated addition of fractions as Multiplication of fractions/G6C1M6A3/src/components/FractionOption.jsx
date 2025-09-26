import React from "react";
import "./fraction.css";
const FractionOption = ({ numerator,denominator,fontSize }) => {
  return (
    <div className="fraction-option" style={{
        fontSize:"3vw"
    }}>

      <p style={{fontSize:fontSize}}>{numerator}</p>
      <p className="fraction-line"></p>
      <p style={{fontSize:fontSize}}>{denominator}</p>
    </div>
  );
};

export default FractionOption;
