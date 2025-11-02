import React from "react";
import { useTranslation } from "react-i18next";
import "./startpage.css";
import ReusableButton from "./ReusableButton";
import { playClick } from "./PlayAudio";
import FrameImag from "./SquirrelQuestion/FrameImage";
const StartPage = ({ goNext }) => {
  const { t } = useTranslation();

  return (
    <div className="fraction-container">
      <h2 className="title">{t("startPage.checkProportionality")}</h2>
      <div className="align-row">
        <div className="circle">
          <FrameImag width="63%" />
        </div>

        <div className="content">
          <p>
            <p className="line-height">{t("startPage.getPurple")}</p>
            <p style={{ marginTop: "3vw" }}>{t("startPage.mixGiven")}</p>
          </p>
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
    </div>
  );
};

export default StartPage;
