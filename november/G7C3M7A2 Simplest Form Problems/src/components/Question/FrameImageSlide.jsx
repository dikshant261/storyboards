import React, { useState } from "react";
import frame from "../../assets/frame.png";
import "./FrameImage.css";
import { useTranslation } from "react-i18next";
import { playCorrect } from "../PlayAudio";

const FrameImageSlide = ({ width = "80%", setNext }) => {
  const { t } = useTranslation();
  const [overlayWidth, setOverlayWidth] = useState(25); // initial width of top image
  const [disabled, setDisabled] = useState(false);
  const [played, setPlayed] = useState(false); // prevents multiple sound plays

  const handleSliderChange = (e) => {
    const newValue = Number(e.target.value);
    setOverlayWidth(newValue);

    // Trigger when reaching or exceeding 78%
    if (newValue >= 80 && !played) {
      playCorrect();
      setNext(true);
      setDisabled(true);
      setPlayed(true);
    }
  };

  return (
    <div
      className="frame-container"
      style={{
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Background Frame */}
      {/* Background Frame */}
      <div className="frame-wrapper">
        <img src={frame} alt="frame" className="frame-base" />

        {/* Overlay Frame */}
        <img
          src={frame}
          alt="overlay frame"
          className="frame-overlay"
          style={{ width: `${overlayWidth}%` }}
        />

        {/* Label */}
        <p className="frame-label">120 cm × 80 cm</p>
        {overlayWidth <= 25 && <p className="frame-label-two">3 cm × 2 cm</p>}
      </div>

      {/* Slider Control */}
      <input
        type="range"
        min="25"
        max="80"
        step="1"
        value={overlayWidth}
        onChange={handleSliderChange}
        className="frame-slider"
        disabled={disabled}
      />
    </div>
  );
};

export default FrameImageSlide;
