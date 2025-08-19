import React from "react";
import "./grid.css";

const Grid = ({
  line,
  denominatorResult,
  boxNumber,
  borderLine,
  lineAnimate,
  columnAnimate,
  finalResult,
  numberChangeAnimate,
}) => {
  let number = [];
  for (let i = 1; i <= boxNumber; i++) {
    number.push(i);
  }

  const getBoxBorder = (index) => {
    const isFilled = !!number[index];

    if (borderLine === "green") {
      return isFilled ? "0.2vw solid rgb(146,208,80)" : "0.2vw dashed white";
    }
    if (borderLine === "red") {
      return isFilled ? "0.2vw solid rgb(255, 126, 121)" : "0.2vw dashed white";
    }
    return isFilled ? "0.2vw solid white" : "0.2vw dashed white";
  };

  return (
    <div>
      <div className="grid-container">
        <h2 className="box-heading">Visual Representation</h2>

        {finalResult && (
          <div className="grid-headings">
            <div className="heading-wholes">Whole(s)</div>
            <div className="heading-wholes-1">Whole(s)</div>
            <div className="line-proper"></div>
            <div className="heading-fraction">Proper Fraction</div>
          </div>
        )}

        {[0, 1, 2].map((row) => (
          <div
            className={`row${lineAnimate ? " grid-line-animate" : ""}`}
            key={row}
          >
            {Array(5)
              .fill()
              .map((_, col) => {
                const index = row * 5 + col;
                return (
                  <div
                    key={index}
                    className={`box-result ${index < 12 ? "filled" : ""}${
                      columnAnimate ? " grid-column-animate" : ""
                    }${numberChangeAnimate ? " number-change-animate" : ""}`}
                    style={{
                      border: getBoxBorder(index),
                      animationDelay: columnAnimate ? `${col * 0.12}s` : "0s",
                    }}
                  >
                    {number[index]}
                  </div>
                );
              })}
          </div>
        ))}
      </div>

      {line > 0 &&
        denominatorResult === 0 &&
        Array(Math.min(line, 5))
          .fill()
          .map((_, index) => {
            let leftPosition = 12 + index * 4;
            return (
              <div className="vertical" key={index}>
                <div
                  className="vertical-line"
                  style={{ left: `${leftPosition}%` }}
                ></div>
              </div>
            );
          })}

      {denominatorResult > 0 &&
        Array(5)
          .fill()
          .map((_, index) => {
            let leftPosition = 8.2 + index * 4;
            let numberLeft = 10 + index * 4;
            let backgroundColor, border;

            if (denominatorResult === 5) {
              backgroundColor = "rgba(146,208,80, 0.5)";
              border = "0.2vw dashed rgba(146,208,80)";
            } else if (index < denominatorResult) {
              backgroundColor = "rgba(255, 126, 121, 0.5)";
              border = "0.2vw dashed rgba(255, 126, 121)";
            } else {
              backgroundColor = "rgba(121, 188, 255, 0.5)";
              border = "0.2vw dashed rgba(121, 188, 255)";
            }

            return (
              <div key={index}>
                <div
                  className="column-border"
                  style={{
                    left: `${leftPosition}%`,
                    backgroundColor,
                    border,
                  }}
                ></div>
                <div
                  className="column-index"
                  style={{ left: `${numberLeft}%` }}
                >
                  {index + 1}
                </div>
              </div>
            );
          })}
    </div>
  );
};

export default Grid;
