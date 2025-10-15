import React, { useEffect, useState } from "react";
import "./division.css";
import DivideSvg from "./DivideSvg";

const DivisionTwo = ({ anime, remainder, num, deno,question }) => {
  const [showAnime, setShowAnime] = useState(false);
  const [multiply, setMultiply] = useState(null);
  const [quotientAnimation, setQuotientAnimation] = useState(false);
  const [correctOption, setCorrectOption] = useState(null);
  const [remainderOption, setRemainderOption] = useState(null);
  // Calculate multiplication only if quotient.option exists
  useEffect(() => {
    if (!question) return;

    const correctedItem = question.quotient.find(
      (item) => item.isCorrected
    );
    if (correctedItem) {
      setMultiply(deno * correctedItem.option);
      setCorrectOption(correctedItem.option);
    } else {
      setMultiply(null);
      setCorrectOption(null);
    }
  }, [question, deno]);

  console.log(correctOption);
  // Trigger quotient fly animation when correct
  useEffect(() => {
    setRemainderOption(remainder.option);
  }, [remainder]);
  useEffect(() => {
    if (remainder.isCorrected) {
      setQuotientAnimation(false); // reset animation
      setTimeout(() => setQuotientAnimation(true), 50); // re-trigger
    }
  }, [remainder.isCorrected]);

  return (
    <div>
      <div className="division-container">
        <DivideSvg />

        {/* Quotient box */}
        <div className="column-adjust num">
          <div
            className="box"
            style={{
              color: "green",
            }}
          >
            {correctOption}
          </div>
        </div>

        {/* Animated denominator */}

        {/* Static numbers */}
        <div className="num">{deno}</div>
        <div className="num">{num}</div>

        {/* Show rest of division only if multiply is not null */}

        <div
          className="num column-adjust"
          style={{
            borderBottom: "0.6vh solid white",
            color: "green",
          }}
        >
          {multiply}
        </div>
        <div className="num column-adjust">
          {remainderOption === null ? (
            <div className="box-two"></div>
          ) : (
            <div
              className="box-two"
              style={{
                background: remainder.isCorrected ? "transparent" : "salmon",
                color: remainder.isCorrected ? "orange" : "black",
              }}
            >
              {remainderOption}
              <p
                className={`quotient-fly-two ${
                  quotientAnimation ? "fly-four" : ""
                }`}
                style={{ color: "orange" }}
              >
                {remainderOption}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DivisionTwo;
