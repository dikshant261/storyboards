import React, { useEffect, useState } from "react";
import "./division.css";
import DivideSvg from "./DivideSvg";

const Division = ({ anime, quotient,question }) => {
  const [showAnime, setShowAnime] = useState(false);

  useEffect(() => {
    if (anime) {
      setShowAnime(true);
    }
  }, [anime]);
  return (
    <div>
      <div className="division-container">
        <DivideSvg />
        <div className="column-adjust num">
          <div className="box"></div>
        </div>
        {showAnime && (
          <div
            className={`num ${showAnime ? "fly-two" : ""}`}
            style={{ position: "absolute", top: "54%", left: "16%" }}
          >
            {question.divisor}
          </div>
        )}
        <div className="num">{question.divisor}</div>
        <div className="num">{question.dividend}</div>
      </div>
    </div>
  );
};

export default Division;
