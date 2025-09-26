import React from "react";
import "./HintSlide.css";
import ReusableButton from "./ReusableButton";
import { useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";

const HintSlide = ({ onClose }) => {
  const { t } = useTranslation();
  return (
    <div className="hint-container">
      <h2 className="hint-title">{t("hint.hint")}</h2>
      <div className="hint-content">
        {/* Left Side Text */}
        <div className="hint-text">
          <p>{t("hint.heading")}</p>
          <ul>
            <li>{t("hint.listOne")}</li>
            <li>{t("hint.listTwo")}</li>
            <li>{t("hint.listThree")}</li>
          </ul>
        </div>

        {/* Right Side Example */}
        <div className="hint-example">
          <div className="fraction-box">
            <div className="align-row" style={{ marginLeft: "2vw" }}>
              <div className="fraction-align">
                <span>2</span>
                <span className="bar"></span>
                <span>3</span>
              </div>
              <span>÷</span> <span>5</span>
            </div>
            <div className="arrow-one">↓</div>
            <div className="arrow-two">↓</div>
            <div className="align-row" style={{ marginRight: "1vw" }}>
              <span>=</span>
              <div className="fraction-align">
                <span>2</span>
                <span className="bar"></span>
                <span>3</span>
              </div>
              ×{" "}
              <div className="fraction-align">
                <span>1</span>
                <span className="bar"></span>
                <span>5</span>
              </div>
            </div>
            <div className="align-row" style={{ marginRight: "6vw" }}>
              <span>=</span>
              <div className="fraction-align">
                <span>2</span>
                <span className="bar"></span>
                <span>15</span>
              </div>
            </div>
          </div>
          <p className="reciprocal-label">{t("hint.reciprocal")}</p>
        </div>
      </div>
      <div style={{marginTop:"4vw"}}>
      <ReusableButton
        label={t("buttons.close")}
        onClick={() => {
          playClick();
          onClose();
        }}
        width="11vw" height="10vh" fontSize="3vw"
      />
      </div>
    </div>
  );
};

export default HintSlide;
