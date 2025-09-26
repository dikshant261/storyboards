import React from "react";
import "./fraction.css";
const ConvertFraction = ({ question }) => {
  return (
    <div className="fraction-container">
         {Array(question[2])
           .fill()
           .map((_, key) => (
             <span key={key} style={{ display: 'inline-flex', alignItems: 'center' }}>
               <div className="fraction">
                 <p>{question[0]}</p>
                 <span className="fraction-line"></span>
                 <p>{question[1]}</p>
               </div>
               {key !== question[2] - 1 && <span style={{ margin: '0 2vw',color:"white",fontSize:"6vw" }}>+</span>}
             </span>
           ))}
    </div>
  );
};

export default ConvertFraction;
