import React from "react";
import "./box.css";
const BoxTwo = ({ stepOne, answer, question,red }) => {
     
  return (
    <div className="box-container">
      <div className={`${red} box-two  ${stepOne ? "active" : ""} `}>
        {answer == `${question[0]}/${question[1]}` ? (
          <span className="box-fraction">
            <span>{question[0]}</span>
            <span className="box-fraction-line"></span>
            <span>{question[1]}</span>
          </span>
        ) : (
          answer
        )}
      </div>
    </div>
  );
};

export default BoxTwo;
