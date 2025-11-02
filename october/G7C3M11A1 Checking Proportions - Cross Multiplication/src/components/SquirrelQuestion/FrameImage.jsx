import React from "react";
import redBlueCircle from "../../assets/redBlueCircle.png";
import "./FrameImage.css";
import { useTranslation } from "react-i18next";
const FrameImag = ({ width = "70%" }) => {
  const { t } = useTranslation();
  return (
    <div className="frame-container">
      <img
        src={redBlueCircle}
        style={{
          width: "90%",
        }}
      />
    </div>
  );
};

export default FrameImag;
