import React from "react";
import "./fraction.css";
const ConvertFractionTwo = ({ question,answer }) => {
  const isSpecial = answer === question[0];
  return (
    <div className="fraction-container">
      {Array(question[2])
        .fill()
        .map((_, key) => {
          let fractionClass = "fraction";
          if(answer===null){
            fractionClass+=""
          }
          else if (isSpecial) {
            if (key === question[2] - 1) {
              fractionClass += " fraction-salmon-dashed";
            } else {
              fractionClass += " fraction-blue-dashed";
            }
          } else {
            fractionClass += " fraction-blue-dashed";
          }
          return (
            <span
              key={key}
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              <div className={fractionClass}>
                <p>{question[0]}</p>
                <span className="fraction-line"></span>
                <p>{question[1]}</p>
              </div>
              {key !== question[2] - 1 && (
                <span
                  style={{ margin: "0 2vw", color: "white", fontSize: "6vw" }}
                >
                  +
                </span>
              )}
            </span>
          );
        })}
    </div>
  );
};

export default ConvertFractionTwo;
