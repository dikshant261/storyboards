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
      <p className="hint-description">
        {t("hint.description")}
      </p>

      <div className="hint-box">
        <p>
          <span className="highlight-yellow">{t("hint.numberOne")}</span> ÷{" "}
          <span className="highlight-blue">{t("hint.numberTwo")}</span>
        </p>
        <p>
          = <span className="highlight-yellow">{t("hint.numberOne")}</span> ×{" "}
          <span className="highlight-blue">{t("hint.reciprocal")} {t("hint.numberTwo")}</span>
        </p>
        <p>
          = <span className="highlight-yellow">{t("hint.numberOne")}</span> ×{" "}
          <span className="fraction">
            <span className="numerator">1</span>
            <br />
            <span className="denominator">{t("hint.numberOne")}</span>
          </span>
        </p>
      </div>
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
  );
};

export default HintSlide;
