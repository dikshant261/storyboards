import React from "react";
import "./HintSlide.css"; // External CSS
import ReusableButton from "./ReusableButton";
import { useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";

const HintSlide = ({ onClose }) => {
  const { t } = useTranslation();
  return (
    <div className="hint-slide-container">
      <h2 className="hint-title">{t("hint.hint")}</h2>
      <p className="hint-description">{t("hint.description")}</p>

      <div className="hint-box">
        <p
          style={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "2vw",
            paddingLeft: "7.6vw",
          }}
        >
          <span className="highlight-yellow">{t("hint.numberOne")}</span> ÷{" "}
          <span className="highlight-blue">{t("hint.numberTwo")}</span>
        </p>
        <p
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "2vw",
          }}
        >
          ={" "}
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "2vw",
            }}
          >
            <span className="highlight-yellow">{t("hint.numberOne")}</span> ×{" "}
            <span className="highlight-blue">
              {t("hint.reciprocal")} {t("hint.numberTwo")}
            </span>
          </span>
        </p>
        <p
          style={{
            display: "flex",
            
            alignItems: "center",
            gap: "2vw",
            paddingLeft: "4vw",
          }}
        >
          <span>=</span>
          <span
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "2vw",
            }}
          >
            <span className="highlight-yellow">{t("hint.numberOne")}</span> ×{" "}
            <span className="fraction">
              <span className="numerator">1</span>
              <br />
              <span className="denominator">{t("hint.numberOne")}</span>
            </span>
          </span>
        </p>
      </div>
      <div style={{ marginTop: "3vw" }}>
        <ReusableButton
          label={t("buttons.close")}
          width="10vw"
          height="8vh"
          onClick={() => {
            playClick();
            onClose();
          }}
        />
      </div>
    </div>
  );
};

export default HintSlide;
