import React from "react";
import "./ResultBox.css";
import { useTranslation } from "react-i18next";
const ResultBoxTwo = ({
  stepOne,
  stepTwo,
  boxResultOne,
  boxOneHeading,
  boxTwoHeading,
  boxOneCss,
  boxResultTwo,
  boxTwoCss,
}) => {
  const { t } = useTranslation();
  // Helper to render fraction if value is in a/b form
  const renderFraction = (value) => {
    if (typeof value === "string" && value.includes("/")) {
      const [num, denom] = value.split("/");
      if (!isNaN(num) && !isNaN(denom)) {
        return (
          <span className="fraction-align">
            <span>{num}</span>
            <span className="fraction-line-box"></span>
            <span>{denom}</span>
          </span>
        );
      }
    }
    return value;
  };
  return (
    <div className="result-box">
      <div className={`result-box-container ${stepOne ? "active" : ""}`}>
        <div className={`box ${boxOneCss}`}>{renderFraction(boxResultOne)}</div>
        <div className="box-title">{t(boxOneHeading)}</div>
      </div>
      <div className={`result-box-container ${stepTwo ? "active" : ""}`}>
        <div className={`box ${boxTwoCss}`}>{renderFraction(boxResultTwo)}</div>
        <div className="box-title">{t(boxTwoHeading)}</div>
      </div>
    </div>
  );
};

export default ResultBoxTwo;
