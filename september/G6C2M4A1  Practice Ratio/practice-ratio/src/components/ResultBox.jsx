import React from "react";
import "./ResultBox.css";
import { useTranslation } from "react-i18next";
const ResultBox = ({
  beat,
  beatOne,
  beatTwo,
  stepOne,
  stepTwo,
  stepThree,
  boxResultOne,
  boxOneCss,
  boxResultTwo,
  boxTwoCss,
  boxResultThree,
  boxThreeCss,
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
      <div className={`result-box-container ${beat ? "active" : ""}`}>
        <div className={`box ${boxOneCss}`}>{renderFraction(boxResultOne)}</div>
        <div className="box-title">{t("symbol")}</div>
      </div>
      <div className={`result-box-container ${beatOne ? "active" : ""}`}>
        <div className={`box ${boxTwoCss}`}>{renderFraction(boxResultTwo)}</div>
        <div className="box-title">{t("word")}</div>
      </div>
      <div className={`result-box-container ${beatTwo ? "active" : ""}`}>
        <div className={`box ${boxThreeCss}`}>
          {renderFraction(boxResultThree)}
        </div>
        <div className="box-title">{t("fraction")}</div>
      </div>
    </div>
  );
};

export default ResultBox;
