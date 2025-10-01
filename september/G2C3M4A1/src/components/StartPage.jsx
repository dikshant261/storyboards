import React from "react";
import "./startpage.css";
import { useTranslation } from "react-i18next";
import ReusableButton from "./ReusableButton";
import { playClick } from "./PlayAudio";

const StartPage = ({ onStart }) => {
  const { t } = useTranslation();
  return (
    <div className="intro-container">
      <h2 className="title">What is Half?</h2>

      <div className="content">
        {/* Left side - square box */}
        <div className="square-box"></div>

        {/* Right side - text and button */}
        <div className="text-section">
          <p>{t("startPage.areReady")}</p>
          <p style={{ marginBottom: "4vw" }}>{t("startPage.celebration")}</p>
          <ReusableButton
            label={t("buttons.start")}
            width="12vw"
            height="9vh"
            fontSize="3vw"
            onClick={() => {
              playClick();
              onStart();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StartPage;
