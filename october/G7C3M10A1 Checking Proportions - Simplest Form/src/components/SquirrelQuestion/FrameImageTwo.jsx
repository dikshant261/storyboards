import React from "react";
import frameA from "../../assets/frameA.png";
import "./FrameImageTwo.css";
import { useTranslation } from "react-i18next";
const FrameImagTwo = ({ width = "70vw", length, breadth, height = "auto", }) => {
  const { t } = useTranslation();
  return (
    <div className="frame-two-container">
      <img
        src={frameA}
        style={{
          width: width,
          height:height
        }}
      />
      <div className="length-line"></div>
      <div className="width-line"></div>
      <div className="length">
        <p className="para">
          {length}
          <br />
          <span>cm</span>
        </p>
      </div>
      <div className="width">
        <p className="para">{breadth} cm</p>
      </div>
    </div>
  );
};

export default FrameImagTwo;
