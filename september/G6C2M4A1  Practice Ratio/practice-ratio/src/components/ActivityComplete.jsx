import React from "react";
import "./startpage.css";
import { useTranslation } from "react-i18next";
import ReusableButton from "./TapButton";
const ActivityComplete = () => {
  const { t } = useTranslation();
  return (
    <div className="start-page-container-complete">
      <div className="top-heading">{t("activityComplete")}</div>
      <div className="sub-heading-one">{t("leraned_forms")}</div>
      <div className="sub-heading-one">{t("startOver")}</div>
      <ReusableButton label={t("buttonStartOver")} width="16vw" height="8vh" fontSize="3vw" onClick={()=>window.location.reload()}/>
    </div>
  );
};

export default ActivityComplete;
