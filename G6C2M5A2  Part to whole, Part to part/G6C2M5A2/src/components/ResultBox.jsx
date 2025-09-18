import React from "react";
import "./ResultBox.css";
import { useTranslation } from "react-i18next";
const ResultBox = ({
  stepOne,
  stepTwo,
  stepThree,
  beatOne,
  beatTwo,
  beatThree,
  boxResultOne,
  boxOneCss,
  boxResultTwo,
  boxTwoCss,
  boxResultThree,
  boxThreeCss,
  boxContent,
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
      <div className={`result-box-container ${beatOne ? "active" : ""}`}>
        <div className={`box ${boxOneCss}`}>{renderFraction(boxResultOne)}</div>
        <div className="box-title">{t(boxContent[0])}</div>
      </div>
      <div className={`result-box-container ${beatTwo ? "active" : ""}`}>
        <div className={`box ${boxTwoCss}`}>{renderFraction(boxResultTwo)}</div>
        <div className="box-title">{t(boxContent[1])}</div>
      </div>
      <div className={`result-box-container ${beatThree ? "active" : ""}`}>
        <div className={`box ${boxThreeCss}`}>
          {renderFraction(boxResultThree)}
        </div>
        <div className="box-title">{t(boxContent[2])}</div>
      </div>
    </div>
  );
};

export default ResultBox;
