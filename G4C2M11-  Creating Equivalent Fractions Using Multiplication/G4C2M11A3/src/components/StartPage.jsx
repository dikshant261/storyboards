import React from "react";
import { useTranslation } from "react-i18next";
import ReusableButton from "./TapButton";
import "./startpage.css";
import { playClick } from "./PlayAudio";
const StartPage = ({ onClose }) => {
  const { t } = useTranslation();
  return (
    <div className="start-page-container">
      <div className="top-heading">{t("reapeatedAddition")}</div>
      <div className="sub-heading">{t("we_multiply")}</div>
      <div className="sub-heading">{t("let_find")}</div>
      <div className="top-margin">
        <ReusableButton
          label={t("start")}
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
