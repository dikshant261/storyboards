import React, { useEffect, useState } from "react";
import "./LongDivision.css";
import DivideSvg from "./DivideSvg";
const LongDivision = ({
  quotient,
  questionData,
  remainder,
  handleQuotient,
  handleRemainder,
}) => {
  const [showEQ, setShowEQ] = useState(false);
  const [showEQVisible, setShowEQVisible] = useState(false);
  const [showBoxRem, setShowBoxRem] = useState(false);
  let multiply = questionData.divisor * quotient;
  console.log(showEQ);
  useEffect(() => {
    if (quotient === questionData.rightQuotient) {
      setShowBoxRem(true);
      handleQuotient();
      setShowEQ(false);
      setShowEQVisible(false);
    } else if (
      quotient !== questionData.rightQuotient &&
      multiply < questionData.dividend &&
      quotient !== null
    ) {
      setShowEQ(false);
      const timer = setTimeout(() => {
        setShowEQ(true);
        setShowEQVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setShowEQ(false);
      setShowEQVisible(false);
    }
  }, [quotient, questionData.rightQuotient, multiply, questionData.dividend]);

  useEffect(() => {
    if (remainder === questionData.rightRemainder && remainder !== null) {
      handleRemainder();
    }
  }, [remainder, questionData]);
  useEffect(() => {
    if (remainder !== null) {
      setShowBoxRem(false);
    }
  }, [remainder]);
  return (
    <div className="division-box">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="23.9 17.9 4.2 2.2" className="svg-position">
        <path
          d="M 28 18 V 18 H 24 Q 25 19 24 20"
          stroke="#fff"
          stroke-width="0.1"
          fill="none"
        />
      </svg>

      <div className="left-division">
        <p
          id="long-division-divisor"
          style={{
            position: "absolute",
            top: "1.5vh",
            right: "6.6vw",
          }}
        >
          {questionData.divisor}
        </p>
      </div>
      <div
        className="right-division"
        style={{
          marginLeft: "2vw",
        }}
      >
        <p
          id="long-division-quotient"
          className="quotient-align"
          style={{
            backgroundColor:
              quotient === null
                ? "white"
                : quotient === questionData.rightQuotient
                ? "transparent"
                : "transparent",
                color:
              quotient === null
                ? "white"
                : quotient === questionData.rightQuotient
                ? "var(--success-second-color)"
                : "lightcoral",
          }}
        >
          {quotient}
        </p>

        <p
          style={{
            marginBottom: "10vh",
            position:"absolute",
            top:"2vh",
            left:"3.3vw"
          }}
        >
          {questionData.dividend}
        </p>
        {quotient !== null && (
          <div
            style={{
              color:
                quotient === questionData.rightQuotient
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
                left: "-40%",
                fontSize: "4vw",
                color:
                  quotient === questionData.rightQuotient
                    ? "var(--success-second-color)"
                    : "lightcoral",
              }}
            >
              -
            </p>
            <p className="multiply" 
            style={{
              marginTop:"10vh"
            }}
            >{multiply}</p>
          </div>
        )}
        {quotient !== null && <div className="line-div"></div>}
        {quotient !== null && quotient !== questionData.rightQuotient && (
          <p
            style={{
              color: "lightcoral",
            }}
          >
            {multiply > questionData.dividend ? (
              <p>X</p>
            ) : (
              <p>{questionData.dividend - multiply}</p>
            )}
          </p>
        )}
        {showBoxRem && <div className="rem-box-div"></div>}
        {remainder !== null && (
          <p
            id="long-division-remainder"
            className="rem-fly"
            style={{
              color:
                remainder === questionData.rightRemainder
                  ? "var(--secondary-color)"
                  : "lightcoral",
            }}
          >
            {remainder}
          </p>
        )}
        {showEQVisible && (
          <div className={`fade-in`}>
            <p
              style={{
                position: "absolute",
                bottom: "1vh",
                right: "-20vh",
                fontSize: "3vw",
                color: "lightcoral",
              }}
            >
              {questionData.divisor}+
              {questionData.dividend - multiply - questionData.divisor}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LongDivision;
