import React from "react";
import "./result.css";
import { useTranslation } from "react-i18next";
const Result = () => {
  const { t } = useTranslation();
  return (
    <div className="result-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 25 25"
        style={{
          position: "fixed",
          right: "7%",
          top: "45%",
          width: "6vw",
        }}
      >
        <path
          style={{ fill: "white" }}
          d="m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 25 25"
        style={{
          position: "fixed",
          right: "10%",
          top: "45%",
          width: "9vw",
          height: "14vh",
        }}
      >
        <path
          style={{ fill: "white" }}
          d="m18.294 16.793-5.293 5.293V1h-1v21.086l-5.295-5.294-.707.707L12.501 24l6.5-6.5-.707-.707z"
        />
      </svg>
      <p
        style={{
          position: "fixed",
          top: "50%",
          right: "12%",
        }}
      >
        {t("changeSign")}
      </p>
      <p
        style={{
          position: "fixed",
          top: "50%",
          right: "10%",
        }}
      >
        {t("reciprocal")}
      </p>
      <div>
        <div className="result-row">
          <span>{t("result")}</span>
        </div>
        <br />
        <div className="result-row">
          <span>2</span>
          <span>÷</span>
          <span>3</span>
        </div>
      </div>
      <div className="result-row">
        <span>2</span>
        <span>×</span>
        <span
          style={{
            display: "inline-flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <span>{1}</span>
          <span
            style={{
              borderTop: "0.2vw solid white",
              width: "100%",
              display: "block",
            }}
          ></span>
          <span>{3}</span>
        </span>
      </div>
    </div>
  );
};

export default Result;
