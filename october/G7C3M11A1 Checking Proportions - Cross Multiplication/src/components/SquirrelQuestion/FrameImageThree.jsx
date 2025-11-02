import React from "react";
import frame from "../../assets/frame.png";
import "./FrameImageTwo.css";
import { useTranslation } from "react-i18next";
const FrameImageThree = ({
  width = "70vw",
  height = "auto",
  onClick,
  beat,
}) => {
  const { t } = useTranslation();
  return (
    <div className="frame-two-container">
      <img
        src={frame}
        style={{
          width: width,
          height: height,
          cursor: "pointer",
        }}
        onClick={onClick}
        className={`${beat ? "beat" : ""}`}
      />
    </div>
  );
};

export default FrameImageThree;
