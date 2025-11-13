import React from "react";
import { useTranslation } from "react-i18next";
import "./startpage.css";
import ReusableButton from "./ReusableButton";
import { playClick } from "./PlayAudio";
const StartPage = ({ goNext }) => {
  const { t } = useTranslation();

  return (
    <div className="startpage-fraction-container">
      <h2 className="title">
        {t("startPage.mixedNumbersAndImproperFractions")}
      </h2>
      <p className="startpage-content">
        <span style={{ color: "var(--secondary-color)" }}>
          {t("startPage.mixedNumbers")}
        </span>
        <span> {t("startPage.and")}</span>
        <span style={{ color: "var(--secondary-color)" }}>
          {t("startPage.improperFractions")}
        </span>
        <span>{t("startPage.areUsed")}</span>
        <span style={{ color: "var(--secondary-color)" }}>
          {t("startPage.greaterThan")}
        </span>
        <span>{t("startPage.itsVeryUsefull")}</span>
      </p>
      <div style={{ paddingTop: "8vh" }}>
        <ReusableButton
          label={t("buttons.start")}
          width="13vw"
          height="9vh"
          fontSize="3vw"
          onClick={() => {
            playClick();
            goNext();
          }}
        />
      </div>
    </div>
  );
};

export default StartPage;
