import React from "react";
import "./startpage.css";
import { useTranslation } from "react-i18next";
import ReusableButton from "./TapButton";
import { playClick } from "./PlayAudio";
const RepersentinRatio = ({ onNext }) => {
  const { t } = useTranslation();
  return (
    <div className="start-page-container-part">
      <div className="top-heading">{t("writingRatio")}</div>
      <div className="sub-heading-one">{t("practiceStart")}</div>
      <div className="sub-heading-one">{t("getReady")}</div>
      <div className="sub-heading-one">{t("nextContinue")}</div>
      <ReusableButton
        label={t("next")}
        width="12vw"
        height="10vh"
        fontSize="3vw"
        onClick={() => {
          playClick();
          onNext();
        }}
      />
    </div>
  );
};

export default RepersentinRatio;
