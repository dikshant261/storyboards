import React, { useState } from "react";
import "./scene.css";
import { useTranslation } from "react-i18next";
import ReusableButton from "./ReusableButton";
import FractionMatch from "./FractionMatch";
import { playClick } from "./PlayAudio";
import Tap from "./Tap";
const SceneOne = ({ goNext, close }) => {
  const { t } = useTranslation();
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [final, setFinal] = useState(false);
  return (
    <div className="scene-container">
      <div className="heading">
        <p>{t("sceneOne.heading")}</p>
      </div>
      <div className="main-container">
        <FractionMatch
          setShowError={setShowError}
          setShowSuccess={setShowSuccess}
          setFinal={setFinal}
        />
      </div>
      <div className="footer">
        <ReusableButton
          label={t("buttons.hint")}
          showTap={false}
          showActive={false}
          fontSize="3vw"
          width="10vw"
          height="9vh"
          onClick={() => {
            playClick();
            close();
          }}
        />
        {showSuccess && (
          <p
            style={{
              background: "#849939",
              padding: "1vh 2vw",
              borderRadius: "1vw",
            }}
          >
            {t("sceneOne.success")}
          </p>
        )}
        {showError && (
          <p
            style={{
              background: "#c75a4e",
              padding: "1vh 2vw",
              borderRadius: "1vw",
            }}
          >
            {t("sceneOne.error")}
          </p>
        )}
      </div>
      <div className="footer-two">
        <button className="disabled">{t("buttons.previous")}</button>
        {!final && <p>{t("navigation.tapFraction")}</p>}
        {final && <p>{t("navigation.tapContinue")}</p>}
        {!final && <button className="disabled">{t("buttons.next")}</button>}
        {final && (
          <div>
            <button
              onClick={() => {
                playClick();
                goNext();
              }}
            >
              {t("buttons.next")}
            </button>
            <Tap bottom={0} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SceneOne;
