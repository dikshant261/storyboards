import React from "react";
import "./startpage.css";
import { useTranslation } from "react-i18next";
import ReusableButton from "./ReusableButton";
import { playClick } from "./PlayAudio";
const StartPage = ({goNext}) => {
  const { t } = useTranslation();
  return (
    <div className="intro-container">
      <div className="title">{t("startPage.title")}</div>
      <div className="content">
        <p className="text-section">{t("startPage.content")}</p>
      </div>
      <div style={{marginTop:"4vw"}}>
      <ReusableButton
        width="12vw"
        height="10vh"
        fontSize="3vw"
        label={t("buttons.start")}
        onClick={()=>{
            playClick();
            goNext();
        }}
      />
      </div>
    </div>
  );
};

export default StartPage;
