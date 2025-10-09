import React from "react";
import "./scenetwo.css";
import { useTranslation } from "react-i18next";
import Fraction from "./Fraction";
import FractionMultiplication from "./FractionMultiplication";
import { playClick } from "./PlayAudio";
import Tap from "./Tap";
const SceneTwo = ({ goNext, goPrev }) => {
  const { t } = useTranslation();
  return (
    <div className="scene-conatiner-two">
      <div className="heading">
        {t("sceneTwo.whatResult")}
        <Fraction
          num={1}
          deno={3}
          style={{ fontSize: "2vw", color: "var(--secondary-color)" }}
        />
        {t("sceneTwo.of")}
        <Fraction
          num={2}
          deno={5}
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
        <FractionMultiplication num1={1} num2={3} num3={2} num4={5} num5={2} num6={15}/>
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

export default SceneTwo;
