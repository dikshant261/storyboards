import React from "react";
import "./lengthbox.css";
import { playClick } from "./PlayAudio";
import { useTranslation } from "react-i18next";
const LenghtBoxTwo = ({
  beatOne,
  boxOneValue,
  boxCss,
  success = false,
  value,
  color,
  num,
}) => {
  const { t } = useTranslation();
  return (
    <div>
      {!success && (
        <div
          className="box-container"
          style={{
            width: "19vw",
            height: "17vh",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "3%",
              left: "3%",
              fontSize: "1.3vw",
              color: "white",
            }}
          >
            <span>
              {t("crossProduct")} {num}
            </span>
          </div>
          <div
            className={`box ${beatOne ? "active" : ""} ${
              beatOne ? boxCss : ""
            }`}
            style={{
              width: "10vw",
              height: "11vh",
            }}
          >
            {boxOneValue}
          </div>
        </div>
      )}
      {success && (
        <div
          className="box-container"
          style={{
            background: color || "#5a7f5e",
            color: "white",
            fontSize: "5vw",

            width: "19vw",
            height: "17vh",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "3%",
              left: "3%",
              fontSize: "1.3vw",
              color: "white",
            }}
          >
            <span>
              {t("crossProduct")} {num}
            </span>
          </div>
          <div>{boxOneValue}</div>
        </div>
      )}
    </div>
  );
};

export default LenghtBoxTwo;
