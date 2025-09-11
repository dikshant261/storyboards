import React from "react";
import "./box.css";
import FractionMultiply from "./FractionMultiply";
import FractionNuber from "./FractionNuber";
import FractionOption from "./FractionOption";
const BoxFour = ({ stepOne, answer, question, red }) => {
    console.log(answer)
  return (

    <div className="box-container">
      <div className={`${red} box-two  ${stepOne ? "active" : ""} `}>
        <FractionOption numerator={answer.num} denominator={answer.deno} fontSize={"5vw"}/>
      </div>
    </div>
  );
};

export default BoxFour;
