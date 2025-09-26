import React from "react";
import { useTranslation } from "react-i18next";
import ReusableButton from "./TapButton";
import "./startpage.css";
import { playClick } from "./PlayAudio";
const StartPage = ({ onClose }) => {
  const { t } = useTranslation();
  return (
    <div className="start-page-container">
      <div className="top-heading">{t("startEndPage.ExploringRatios")}</div>
      <div className="sub-heading">{t("startEndPage.LetPracticeFinding")}</div>
      <div className="sub-heading">{t("startEndPage.clickStart")}</div>
      <div>
        <ReusableButton
          label={t("buttons.start")}
          width="12vw"
          height="10vh"
          fontSize="3vw"
          onClick={() => {
            playClick();
            onClose();
          }}
        />
      </div>
    </div>
  );
};

export default StartPage;
