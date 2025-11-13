import React from "react";
import { useTranslation } from "react-i18next";
import "./startpage.css";
import ReusableButton from "./ReusableButton";
import { playClick } from "./PlayAudio";
const NextQuestion = ({ goNext }) => {
  const { t } = useTranslation();

  return (
    <div className="fraction-container">
      <h2 className="title">{t("startPage.letWrite")}</h2>
      <p
        className="startpage-content"
        style={{
          paddingTop: "5%",
        }}
      >
        {t("nextQuestion.motherBought")}
      </p>
      <div
        style={{
          paddingTop: "6%",
        }}
      >
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

export default NextQuestion;
