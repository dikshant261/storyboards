import React from "react";
import "./fraction.css";
const Fraction = ({ num, deno,fontSize }) => {
  return (
    <div className="fraction-conatiner">
      <div className="fraction" style={{fontSize:fontSize}}>
        <span>{num}</span>
        <span className="fraction-line"></span>
        <span>{deno}</span>
      </div>
    </div>
  );
};

export default Fraction;
