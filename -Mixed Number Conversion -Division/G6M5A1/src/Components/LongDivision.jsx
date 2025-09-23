import React, { useEffect, useState } from "react";
import "./LongDivision.css";
const LongDivision = ({
  currentQuotient,
  questionData,
  showLongDivision,
  showSimplyAnswer,
}) => {
  let multiply = questionData.divisor * currentQuotient;
  let remainder = questionData.dividend - multiply;
  return (
    <div className="division-box">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="23.9 17.9 4.2 2.2"
        className={`svg-position ${
          showLongDivision ? "bracket-draw-animate" : ""
        }`}
      >
        <path
          d="M 28 18 V 18 H 24 Q 25 19 24 20"
          stroke="#fff"
          stroke-width="0.1"
          fill="none"
        />
      </svg>

      <div className="left-division">
        <div
          className="ld-source ld-divisor"
          style={{
            position: "absolute",
            top: "0",

            left: questionData.dividend === 9 ? "-40%" : "-40%",
          }}
        >
          <p>{questionData.divisor}</p>
          {showSimplyAnswer && (
            <span className="ld-copy ld-copy-divisor">
              {questionData.divisor}
            </span>
          )}
        </div>
      </div>
      <div
        className="right-division"
        style={{
          marginLeft: "2vw",
        }}
      >
        <div className="ld-source ld-quotient">
          <p
            className={`quotient-align ${
              currentQuotient === questionData.correctAnswer ? "fly-right" : ""
            }`}
            style={{
              backgroundColor:
                currentQuotient === null
                  ? "white"
                  : currentQuotient === questionData.correctAnswer
                  ? "transparent"
                  : "transparent",
              color:
                currentQuotient === questionData.correctAnswer
                  ? "var(--success-second-color)"
                  : "lightcoral"
            }}
          >
            {currentQuotient}
          </p>
          {showSimplyAnswer && (
            <span className="ld-copy ld-copy-quotient">{currentQuotient}</span>
          )}
        </div>

        <p
          style={{
            marginTop: "1vh",
            // marginLeft: "0.5vw",
          }}
        >
          {questionData.dividend}
        </p>
        {currentQuotient !== null && (
          <div
            style={{
              color:
                currentQuotient === questionData.correctAnswer
                  ? "var(--success-second-color)"
                  : "lightcoral",
              position: "relative",
            }}
          >
            <p
              style={{
                position: "absolute",
                color: "white",
                bottom: "-1vh",
                left: "-50%",
                fontSize: "4vw",
                color:
                  currentQuotient === questionData.correctAnswer
                    ? "var(--success-second-color)"
                    : "lightcoral",
              }}
            >
              -
            </p>
            <p className="multiply">{multiply}</p>
          </div>
        )}
        {currentQuotient !== null && <div className="line-div"></div>}
        {currentQuotient !== null &&
          currentQuotient !== questionData.correctAnswer && (
            <div
              className="ld-source ld-remainder"
              style={{
                color: "lightcoral",
                display:'flex',
                justifyContent:'center',
                alignItems:"center"
              }}
            >
              {multiply > questionData.dividend ? (
                <p>X</p>
              ) : (
                <p>{questionData.dividend - multiply}</p>
              )}
              {multiply <= questionData.dividend && showSimplyAnswer && (
                <span className="ld-copy ld-copy-remainder">
                  {questionData.dividend - multiply}
                </span>
              )}
            </div>
          )}

        {currentQuotient === questionData.correctAnswer && (
          <div
            className="ld-source ld-remainder"
            style={{
              color:
                currentQuotient === questionData.correctAnswer
                  ? "var(--secondary-color)"
                  : "lightcoral",
            }}
          >
            <p>{remainder}</p>
            {showSimplyAnswer && (
              <span className="ld-copy ld-copy-remainder">{remainder}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LongDivision;
