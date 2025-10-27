import React from "react";
import frame from "../../assets/frame.png";
import "./FrameImage.css";
import { useTranslation } from "react-i18next";
const FrameImag = ({ width = "70%" }) => {
  const { t } = useTranslation();
  return (
    <div className="frame-container">
      <img
        src={frame}
        style={{
          width: width,
        }}
      />
      <div className="length-line"></div>
      <div className="width-line"></div>
      <div className="length">{t("length")}</div>
      <div className="width">{t("width")}</div>
    </div>
  );
};

export default FrameImag;
