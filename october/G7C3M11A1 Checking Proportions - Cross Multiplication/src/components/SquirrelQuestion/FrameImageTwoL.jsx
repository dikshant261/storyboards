import React from "react";
import red from "../../assets/red.png";
import blue from "../../assets/blue.png";
import "./FrameImageTwo.css";
import { useTranslation } from "react-i18next";
const FrameImagTwoL = ({ width = "8vw", redml, blueml }) => {
  const { t } = useTranslation();
  return (
    <div className="frame-two-container">
      <div className="ml-align">
        <img
          src={red}
          style={{
            width: width,
          }}
        />
        <p>
          {redml} {t("l")}
        </p>
      </div>
      <div className="ml-align">
        <img
          src={blue}
          style={{
            width: width,
          }}
        />
        <p>
          {blueml} {t("l")}
        </p>
      </div>
    </div>
  );
};

export default FrameImagTwoL;
