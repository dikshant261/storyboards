import React from "react";
import "./lengthbox.css";
import { playClick } from "./PlayAudio";
import { useTranslation } from "react-i18next";
const LenghtBox = ({
  beatOne,
  beatTwo,
  boxOneValue,
  boxTwoValue,
  boxCss,
  success,
  value,
  color,
  numberColor,
  allGray,
}) => {
  const { t } = useTranslation();
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
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                fontSize: "1.5vw",
                color: "white",
              }}
            >
              <span>{t("red")}</span>
              <span
                style={{
                  width: "3vw",
                  backgroundColor: "white",
                  height: "0.2vh",
                }}
              ></span>
              <span>{t("blue")}</span>
            </p>
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
              width: "11vw",
              backgroundColor: "white",
              height: "1vh",
            }}
          ></div>
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
            background: color || "#5a7f5e",
            color: allGray ? "gray" : "white",
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
            <p
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                fontSize: "1.5vw",
                color: allGray ? "gray" : "white",
              }}
            >
              <span>{t("red")}</span>
              <span
                style={{
                  width: "3vw",
                  backgroundColor:allGray ? "gray" : "white",
                  height: "0.2vh",
                }}
              ></span>
              <span>{t("blue")}</span>
            </p>
          </div>
          <div
            style={{
              color: value === 1 ? numberColor : "",
            }}
          >
            {boxOneValue}
          </div>
          <div
            style={{
              width: "11vw",
              backgroundColor:allGray ? "gray" : "white",
              height: "1vh",
            }}
          ></div>
          <div
            style={{
              color: value === 2 ? numberColor : "",
            }}
          >
            {boxTwoValue}
          </div>
        </div>
      )}
    </div>
  );
};

export default LenghtBox;
