import React from "react";
import "./MixedFraction.css";
import "./Main.css"
const DynamicText = ({ questionData }) => {
  let rem = questionData.dividend % questionData.divisor;
  return (
    <div>
      <div
        style={{
          position: "absolute",
          right: "8vw",
          top: "27vh",
        }}
      >
        <div className="mf-mixed">
          <div className="mf-quotient">{questionData.correctAnswer}</div>
          <div className="mf-fraction">
            <div
              className="mf-num remainder"
              style={{
                borderBottom: "none",
              }}
            >
              {rem}
            </div>
            <div className="mf-line"></div>
            <div
              className="mf-den remainder"
              style={{
                borderBottom: "none",
              }}
            >
              {questionData.divisor}
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          position: "absolute",
          top: "24vh",
          left: "44.4vw",
        }}
      >
        <p
          style={{
            color: "white",
            fontSize: "5vw",
          }}
        >
          {questionData.divisor}
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          top: "14.9vh",
          left: "51vw",
        }}
      >
        <p
          style={{
            color: "var(--success-second-color)",
            fontSize: "4vw",
          }}
        >
          {questionData.correctAnswer}
        </p>
      </div>
      <div
        style={{
          position: "absolute",
          top: "49.5vh",
          left: "51.7vw",
        }}
      >
        <p
          style={{
            color: "var(--secondary-color)",
            fontSize: "5vw",
          }}
        >
          {rem}
        </p>
      </div>
      <div style={{
        position:"absolute",
        top:"0vh",
        right:"20vw"
      }}>
          <h3 className="simplified-answer fade-in" style={{
            fontSize:"2.3vw",
            color:"var(--secondary-color)"
          }}>
            We have {questionData.correctAnswer} wholes and a fractional{" "}
            {questionData.dividend % questionData.divisor} parts of{" "}
            {questionData.divisor} in
            <span
              style={{
                display: "inline-block",
                verticalAlign: "middle",
                margin: "0 0.5em",
              }}
            >
              <span style={{ display: "block", textAlign: "center" }}>
                {questionData.dividend % questionData.divisor}
              </span>
              <span
                style={{
                  display: "block",
                  borderTop: "2px solid #333",
                  width: "100%",
                }}
              ></span>
              <span style={{ display: "block", textAlign: "center" }}>
                {questionData.divisor}
              </span>
            </span>
            .
          </h3>
      </div>
      <div style={{
        position:"absolute",
        bottom:"2vh",
        left:"34vw"
      }}> <h4 className="container-footer-heading">
            Tap Next For Next Challenge
          </h4></div>
    </div>
  );
};

export default DynamicText;
