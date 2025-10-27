import React from "react";
import "./lengthbox.css";
import { playClick } from "./PlayAudio";
const LenghtBox = ({
  beatOne,
  beatTwo,
  boxOneValue,
  boxTwoValue,
  boxCss,
  success,
  value,
  color,
}) => {
  return (
    <div>
      {!success && (
        <div className="box-container">
          <div
            style={{
              position: "absolute",
              top: "1%",
              left: "7%",
              fontSize: "1vw",
              color: "white",
            }}
          >
            {value === 1 ? "Lenght:Width" : "Simplest Form"}
          </div>
          <div
            className={`box ${beatOne ? "active" : ""} ${
              beatOne ? boxCss : ""
            }`}
          >
            {boxOneValue}
          </div>
          <div
            style={{
              fontSize: "3vw",
              color: "white",
            }}
          >
            :
          </div>
          <div
            className={`box ${beatTwo ? "active" : ""} ${
              beatTwo ? boxCss : ""
            }`}
          >
            {boxTwoValue}
          </div>
        </div>
      )}
      {success && (
        <div
          className="box-container"
          style={{
            background: color || "rgba(0, 128, 0, 0.735)",
            color: "white",
            fontSize: "5vw",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "1%",
              left: "7%",
              fontSize: "1vw",
              color: "white",
            }}
          >
            {value === 1 ? "Length:Width" : "Simplest Form"}
          </div>
          <div>{boxOneValue}</div>
          <div
            style={{
              fontSize: "4vw",
              color: "white",
            }}
          >
            :
          </div>
          <div>{boxTwoValue}</div>
        </div>
      )}
    </div>
  );
};

export default LenghtBox;
