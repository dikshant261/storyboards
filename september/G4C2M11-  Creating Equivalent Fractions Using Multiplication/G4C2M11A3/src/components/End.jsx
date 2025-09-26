import React from "react";
import "./startpage.css";
import { useTranslation } from "react-i18next";
import ReusableButton from "./TapButton";
import { playClick } from "./PlayAudio";
const End = ({ onClose }) => {
  const { t } = useTranslation();
  return (
    <div className="start-page-container">
      <div className="top-heading">{t("Equivalent_Fractions")}</div>
      <div className="sub-heading-one">{t("great_you_have_learned")}</div>
      <div className="top-margin">
        <ReusableButton
          label={t("start_over")}
          width="16vw"
          height="12vh"
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

export default End;
