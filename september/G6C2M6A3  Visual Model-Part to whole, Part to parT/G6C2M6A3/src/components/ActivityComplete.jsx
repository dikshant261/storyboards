import React from "react";
import "./startpage.css";
import { useTranslation } from "react-i18next";
import ReusableButton from "./TapButton";
const ActivityComplete = () => {
  const { t } = useTranslation();
  return (
    <div className="start-page-container-complete">
      <div className="top-heading">{t("startEndPage.activityCompleted")}</div>
      <div className="sub-heading-one">{t("startEndPage.youHaveLearned")}</div>
      <div className="sub-heading-one">{t("startEndPage.nowYouCan")}</div>
      <div className="sub-heading-one">{t("startEndPage.toGoStartOver")}</div>
      <ReusableButton
        label={t("buttons.startOver")}
        width="28vw"
        height="10vh"
        fontSize="3.5vw"
        onClick={() => window.location.reload()}
      />
    </div>
  );
};

export default ActivityComplete;
