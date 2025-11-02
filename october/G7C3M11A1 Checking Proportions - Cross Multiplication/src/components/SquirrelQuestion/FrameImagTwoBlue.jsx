import React from "react";
import blue from "../../assets/blue.png";
import "./FrameImageTwo.css";
import { useTranslation } from "react-i18next";
const FrameImagTwoBlue = ({
  width = "70vw",
  length,
  breadth,
  height = "auto",
}) => {
  const { t } = useTranslation();
  return (
    <div className="frame-two-container">
      <img
        src={blue}
        style={{
          width: width,
          height: height,
        }}
      />
    </div>
  );
};

export default FrameImagTwoBlue;
