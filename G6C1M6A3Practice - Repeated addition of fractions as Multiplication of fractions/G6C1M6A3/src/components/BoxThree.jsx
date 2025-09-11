import React from "react";
import "./box.css";
import FractionMultiply from "./FractionMultiply";
const BoxThree = ({ stepOne, answer, question, red }) => {
  return (
    <div className="box-container">
      <div className={`${red} box-two  ${stepOne ? "active" : ""} `}>
        <FractionMultiply
          numerator={answer.num}
          denominator={question[1]}
          count={answer.count}
          fontSize={"4vw"}
          add={answer.pluse}
        />
      </div>
    </div>
  );
};

export default BoxThree;
