import React from "react";
import "./BoxLayout.css";

const BoxLayout = ({
  line,
  boxNumber,
  denominatorFind,
  animate,
  finalResult,
}) => {
  let denominator = 0;
  let division = 0;
  let remainder = 0;
  if (denominatorFind) {
    denominator = 5;
    division = Math.floor(boxNumber / denominator);
    remainder = boxNumber % denominator;
  }
  console.log("division:", division);
  console.log("remainder:", remainder);
  return (
    <div className="box-main">
      <h2 className="box-heading">Mixed Number</h2>

      <div className={`box-container${animate ? " box-animate" : ""}`}>
        <div className="box-row">
          <div
            className={`box dashed${
              finalResult ? " number-change-animate" : ""
            }`}
            style={{
              backgroundColor: finalResult ? "rgba(0,112,192)" : "",
              border: finalResult ? "none" : "",
            }}
          >
            {division}
          </div>
        </div>

        <div className="box-row">
          <div
            className={`box dashed${
              finalResult ? " number-change-animate" : ""
            }`}
            style={{
              backgroundColor: finalResult ? "rgba(0,112,192)" : "",
              border: finalResult ? "none" : "",
            }}
          >
            {remainder}
          </div>
          <div className="divider"></div>
          <div
            className={`box dashed${
              finalResult ? " number-change-animate" : ""
            }`}
            style={{
              backgroundColor: finalResult ? "rgba(0,112,192)" : "",
              border: finalResult ? "none" : "",
            }}
          >
            {denominator === 0 ? line : denominator}
          </div>
        </div>
      </div>
      <div>
        {finalResult && (
          <div>
            <div className="line-whole "></div>
            <div className="line-whole-2 "></div>
            <p className="line-label">Whole(s)</p>
            <p className="line-label-2">Proper Fraction</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoxLayout;
