import React, { useEffect, useRef, useState } from "react";
import "./box.css";

const Boxes = ({ currentQuotient, dividend, divisor, questionData }) => {
  const [correctAnswer, setCorrectAnswer] = useState(false);
  const [lineLefts, setLineLefts] = useState([]);
  const containerRef = useRef(null);
  const firstBoxRef = useRef(null);
  // Calculate total boxes as the smallest multiple of divisor >= dividend
  const totalBoxes = Math.ceil(dividend / divisor) * divisor;
  // Create an array for all boxes
  const boxes = Array.from({ length: totalBoxes });

  // Split boxes into rows
  const rows = [];
  for (let i = 0; i < boxes.length; i += divisor) {
    rows.push(boxes.slice(i, i + divisor));
  }
  useEffect(() => {
    if (currentQuotient === questionData.correctAnswer) {
      setCorrectAnswer(true);
    } else {
      setCorrectAnswer(false);
    }
  }, [currentQuotient, questionData.correctAnswer]);
  // Calculate how many boxes should be colored
  const multiplyBoxes = currentQuotient * divisor;

  // Recalculate dotted line positions when layout changes
  useEffect(() => {
    const computeLines = () => {
      const containerEl = containerRef.current;
      const firstBoxEl = firstBoxRef.current;
      if (!containerEl || !firstBoxEl) return;

      const containerRect = containerEl.getBoundingClientRect();
      const firstBoxRect = firstBoxEl.getBoundingClientRect();

      const offsetLeft = firstBoxRect.left - containerRect.left; // left edge of first column
      const columnWidth = firstBoxRect.width; // includes borders

      // Draw one line at each column boundary, including leftmost (0) and rightmost (divisor)
      const newLefts = [];
      for (let i = 0; i <= divisor; i += 1) {
        newLefts.push(`${offsetLeft + i * columnWidth}px`);
      }
      setLineLefts(newLefts);
    };

    computeLines();
    window.addEventListener("resize", computeLines);
    return () => window.removeEventListener("resize", computeLines);
  }, [divisor]);

  return (
    <div className="box-container" ref={containerRef}>
      {rows.map((row, rowIndex) => (
        <div className="box-direction" key={rowIndex}>
          {row.map((_, colIndex) => {
            const boxNumber = rowIndex * divisor + colIndex;
            let boxClass = "box box-yellow";
            let boxContent = null;
            if (currentQuotient === null || currentQuotient === undefined) {
              // Show dividend number of yellow boxes, rest blue
              if (boxNumber >= dividend) {
                boxClass = "box box-blue";
              }
            } else if (!correctAnswer && multiplyBoxes > dividend) {
              // Special case: quotient is wrong and (quotient*divisor) > dividend
              const fullRows = Math.floor(dividend / divisor);
              const remainder = dividend % divisor;
              const currentRow = Math.floor(boxNumber / divisor);
              const posInRow = boxNumber % divisor;
              boxContent = posInRow + 1;
              if (currentRow < fullRows) {
                boxClass = "box box-yellow";
              } else if (currentRow === fullRows) {
                if (posInRow < remainder) {
                  boxClass = "box box-lightcoral";
                } else {
                  boxClass = "box box-blue";
                }
              } else {
                boxClass = "box box-blue";
              }
            } else if (!correctAnswer && multiplyBoxes < dividend) {
              // Special case: quotient is wrong and (quotient*divisor) < dividend
              const diff = dividend - multiplyBoxes;
              if (boxNumber < multiplyBoxes) {
                boxClass = "box box-yellow";
                boxContent = (boxNumber % divisor) + 1;
              } else if (boxNumber < multiplyBoxes + diff) {
                boxClass = "box box-lightcoral";
                boxContent = boxNumber - multiplyBoxes + 1;
              } else {
                boxClass = "box box-blue";
                boxContent = null;
              }
            } else if (correctAnswer) {
              // Special case: quotient is correct
              const diff = dividend - multiplyBoxes;
              if (boxNumber < multiplyBoxes) {
                boxClass = "box box-lightgreen";
                boxContent = boxNumber + 1;
              } else if (boxNumber < multiplyBoxes + diff) {
                boxClass = "box box-yellow";
                boxContent = boxNumber - multiplyBoxes + 1;
              } else {
                boxClass = "box box-blue";
                boxContent = boxNumber - multiplyBoxes + 1;
              }
            } else {
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
            return (
              <div
                className={boxClass}
                key={boxNumber}
                ref={boxNumber === 0 ? firstBoxRef : null}
              >
                {boxContent}
              </div>
            );
          })}
        </div>
      ))}

      {lineLefts.map((left, i) => (
        <div className="box-lines" key={i} style={{ left }}></div>
      ))}
    </div>
  );
};

export default Boxes;
