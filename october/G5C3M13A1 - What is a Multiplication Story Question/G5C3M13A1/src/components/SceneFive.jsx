import React from "react";
import "./scene.css";
import Tap from "./Tap";
import { useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";
const SceneFive = ({ goNext, goPrev }) => {
  const { t } = useTranslation();
  return (
    <div className="scene-container">
      <div className="heading">
        <p>{t("sceneFive.howWeCalculate")}</p>
      </div>
      <div className="main-container ">
        <p
          className="para"
          style={{
            fontSize: "4vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "1vw",
          }}
        >
          {t("sceneFive.noOfGroups")} <span>×</span>{" "}
          <span>{t("sceneFive.items")}</span> <span>=</span>{" "}
          <span>{t("sceneFive.totalItems")}</span>
        </p>
      </div>
      <div className="footer">
        <button
          onClick={() => {
            playClick();
            goPrev();
          }}
        >
          {t("buttons.previous")}
        </button>
        <p>{t("navigation.tapNext")}</p>
        <div>
          <button
            className="next-btn"
            onClick={() => {
              playClick();
              goNext();
            }}
          >
            {t("buttons.next")}
          </button>
          <Tap bottom={0} />
        </div>
      </div>
    </div>
  );
};

export default SceneFive;
