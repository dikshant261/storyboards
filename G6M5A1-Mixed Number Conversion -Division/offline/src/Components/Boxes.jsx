import React, { useEffect, useState } from "react";
import "./box.css";

const Boxes = ({ currentQuotient, dividend, divisor, questionData }) => {
   const [correctAnswer,setCorrectAnswer]=useState(false);
  // Calculate total boxes as the smallest multiple of divisor >= dividend
  const totalBoxes = Math.ceil(dividend / divisor) * divisor;
  // Create an array for all boxes
  const boxes = Array.from({ length: totalBoxes });

  // Split boxes into rows
  const rows = [];
  for (let i = 0; i < boxes.length; i += divisor) {
    rows.push(boxes.slice(i, i + divisor));
  }
useEffect(()=>{
    if(currentQuotient===questionData.correctAnswer){
      setCorrectAnswer(true);
    }
},[currentQuotient, questionData.correctAnswer])
  // Calculate how many boxes should be colored
  const multiplyBoxes = currentQuotient * divisor;

  return (
    <div>
      {rows.map((row, rowIndex) => (
        <div className="box-direction" key={rowIndex}>
          {row.map((_, colIndex) => {
            const boxNumber = rowIndex * divisor + colIndex;
            let boxClass = "box box-yellow"; // default is yellow
            let boxContent = null;
            if (currentQuotient !== null && currentQuotient !== undefined) {
              if (boxNumber < multiplyBoxes) {
                boxContent = boxNumber + 1;
              }
              if (correctAnswer) {
                if (boxNumber < multiplyBoxes) {
                  boxClass = "box box-green";
                } else {
                  boxClass = "box box-blue";
                }
              } else {
                if (boxNumber < multiplyBoxes) {
                  boxClass = "box box-yellow";
                } else {
                  boxClass = "box box-blue";
                }
              }
            }
            return <div className={boxClass} key={boxNumber}>{boxContent}</div>;
          })}
        </div>
      ))}
    </div>
  );
};

export default Boxes;
