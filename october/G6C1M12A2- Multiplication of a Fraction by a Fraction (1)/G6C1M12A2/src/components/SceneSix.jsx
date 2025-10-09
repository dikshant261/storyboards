import React from "react";
import "./scenetwo.css";
import { useTranslation } from "react-i18next";
import Fraction from "./Fraction";
import FractionMultiplication from "./FractionMultiplication";
import { playClick } from "./PlayAudio";
import Tap from "./Tap";
const SceneSix = ({ goNext, goPrev }) => {
  const { t } = useTranslation();
  return (
    <div className="scene-conatiner-two">
      <div className="heading">
        {t("sceneTwo.whatResult")}
        <Fraction
          num={5}
          deno={6}
          style={{ fontSize: "2vw", color: "var(--secondary-color)" }}
        />
        {t("sceneTwo.of")}
        <Fraction
          num={1}
          deno={2}
          style={{ fontSize: "2vw", color: "var(--secondary-color)" }}
        />
        <span> ?</span>
      </div>
      <div
        className="question-container"
        style={{
          gap: "15vh",
          padding: "7vh 2vw",
        }}
      >
        <FractionMultiplication
          num1={5}
          num2={6}
          num3={1}
          num4={2}
          num5={5}
          num6={12}
        />
        <p style={{ fontSize: "2.8vw" }}>{t("sceneTwo.message")}</p>
      </div>
      <div className="footer-heading">{t("navigation.tryNext")}</div>
      <div className="footer-button">
        <button
          onClick={() => {
            playClick();
            goPrev();
          }}
        >
          {t("buttons.previous")}
        </button>
        <div>
          <button
            onClick={() => {
              playClick();
              goNext();
            }}
          >
            {t("buttons.next")}
          </button>
          <Tap
            bottom={0}
            onClick={() => {
              playClick();
              goNext();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SceneSix;
