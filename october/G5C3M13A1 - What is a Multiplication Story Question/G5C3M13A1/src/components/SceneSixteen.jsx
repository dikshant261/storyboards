import React from "react";
import "./scene.css";
import Tap from "./Tap";
import { useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";
import ReusableButton from "./ReusableButton";
const SceneSixteen = ({ goNext, goPrev }) => {
  const { t } = useTranslation();
  return (
    <div className="scene-container">
      <div className="heading"></div>
      <div
        className="main-container "
        style={{
          flexDirection: "column",
          background: "none",
        }}
      >
        <p className="para">{t("sceneSixteen.letSeeSome")} </p>
        <ReusableButton
          label={t("buttons.startOver")}
          width="20vw"
          height="10vh"
          fontSize="3vw"
          onClick={() => {
            playClick();
            window.location.reload();
          }}
        />
      </div>
    </div>
  );
};

export default SceneSixteen;
