import React from "react";
import frame from "../../assets/frame.png";
import "./FrameImage.css";
import { useTranslation } from "react-i18next";
const FrameImag = ({ width = "80%" }) => {
  const { t } = useTranslation();
  return (
    <div className="frame-container" style={{
      justifyContent:'center',
      alignItems:'flex-end'
    }}>
      <img
        src={frame}
        style={{
          width: "80%",
          background: "white",
        }}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="43.9 35.9 311.2 20.2"
        className="length-line"
      >
        <path
          d="M 57 38 L 44 48 L 57 56 V 50 L 340 48 V 55 L 355 45 L 340 36 V 43 L 57 45 Z"
          stroke="white"
          stroke-width="0.1"
          fill="#fff"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="43.9 35.9 311.2 20.2"
        className="width-line"
      >
        <path
          d="M 57 38 L 44 48 L 57 56 V 50 L 340 48 V 55 L 355 45 L 340 36 V 43 L 57 45 Z"
          stroke="white"
          stroke-width="0.1"
          fill="#fff"
        />
      </svg>
      <p className="length">120 cm</p>
      <p className="width">80 cm</p>
    </div>
  );
};

export default FrameImag;
