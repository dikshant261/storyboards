import React from "react";
import { useTranslation } from "react-i18next";
import "./startpage.css";
import ReusableButton from "./ReusableButton";
import { playClick } from "./PlayAudio";

const StartPage = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="fraction-container">
      <h2 className="title">{t("startPage.simplestForm")}</h2>
      <div className="align-row">
        <div className="circle">
          <p className="fraction">
            <span className="numerator">12</span>
            <span className="line"></span>
            <span className="denominator">24</span>
          </p>
        </div>

        <div className="content">
          <p>
            <p className="line-height">{t("startPage.keep")}</p>
            <p style={{ marginTop: "3vw" }}>{t("startPage.tapStart")}</p>
          </p>
          <ReusableButton
            label={t("buttons.start")}
            width="13vw"
            height="9vh"
            fontSize="3vw"
            onClick={() => {
              playClick();
              onClose();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StartPage;
