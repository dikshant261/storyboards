import React from "react";
import { useTranslation } from "react-i18next";
import "./startpage.css";
import ReusableButton from "./ReusableButton";
import { playClick } from "./PlayAudio";
import frame from "../assets/frame.png";
const StartPage = ({ onClose }) => {
  const { t } = useTranslation();

  return (
    <div className="fraction-container">
      <h2 className="title">{t("startPage.findingFrames")}</h2>
      <div className="align-row">
        <div className="circle">
          <img src={frame} />
        </div>

        <div className="content">
          <p>
            <p className="line-height">{t("startPage.picture")}</p>
            <p style={{ marginTop: "3vw" }}>{t("startPage.verticalside")}</p>
            <p>
              {t("startPage.letFind")}{" "}
              <span style={{ color: "#dfff41" }}>{t("startPage.length")}</span>{" "}
              <span>{t("startPage.andCheck")}</span>
            </p>
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
