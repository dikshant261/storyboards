import React, { useEffect, useState } from "react";
import "./division.css";
import DivideSvg from "./DivideSvg";

const DivisionOne = ({ anime, quotient, num, deno }) => {
  const [showAnime, setShowAnime] = useState(false);
  const [multiply, setMultiply] = useState(null);
  const [quotientAnimation, setQuotientAnimation] = useState(false);

  // Handle number flying animation
  useEffect(() => {
    if (anime) setShowAnime(true);
  }, [anime]);

  // Calculate multiplication only if quotient.option exists
  useEffect(() => {
    if (quotient?.option != null) {
      const mul = deno * quotient.option;
      setMultiply(mul);
    } else {
      setMultiply(null);
    }
  }, [quotient, deno]);

  // Trigger quotient fly animation when correct
  useEffect(() => {
    if (quotient.isCorrected) {
      setQuotientAnimation(false); // reset animation
      setTimeout(() => setQuotientAnimation(true), 50); // re-trigger
    }
  }, [quotient]);

  return (
    <div>
      <div className="division-container">
        <DivideSvg />

        {/* Quotient box */}
        <div className="column-adjust num">
          <div
            className="box"
            style={{
              backgroundColor: quotient.isCorrected
                ? ""
                : multiply === null
                ? "transparent"
                : "salmon",
              color: quotient.isCorrected ? "green" : "black",
              border: quotient.isCorrected ? "none" : "",
              position: "relative",
              overflow: "visible",
            }}
          >
            {quotient.option}
            {/* Animated quotient when correct */}
            <p
              className={`quotient-fly ${quotientAnimation ? "fly-three" : ""}`}
              style={{ color: "green" }}
            >
              {quotient.option}
            </p>
          </div>
        </div>

        {/* Animated denominator */}
        {showAnime && (
          <div
            className={`num ${showAnime ? "fly-two" : ""}`}
            style={{ position: "absolute", top: "54%", left: "16%" }}
          >
            {deno}
          </div>
        )}

        {/* Static numbers */}
        <div className="num">{deno}</div>
        <div className="num">{num}</div>

        {/* Show rest of division only if multiply is not null */}
        {multiply !== null && (
          <>
            <div
              className="num column-adjust"
              style={{
                borderBottom: "0.6vh solid white",
                color: quotient.isCorrected ? "green" : "salmon",
              }}
            >
              {multiply}
            </div>

            {quotient.isCorrected ? (
              <div></div>
            ) : deno * quotient.option > num ? (
              <div
                className="num column-adjust"
                style={{
                  color: quotient.isCorrected ? "green" : "salmon",
                }}
              >
                x
              </div>
            ) : (
              <div
                className="num column-adjust"
                style={{
                  color: quotient.isCorrected ? "green" : "salmon",
                }}
              >
                {num - multiply}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DivisionOne;
