import React, { useState } from "react";
import "./Slider.css";
import { useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";

const Slider = ({ divisorValue, onCheck,showSlider }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(1);

  const handleChange = (e) => {
    setValue(e.target.value);
    divisorValue(e.target.value);
  };

  return (
    <div className="slider-container">
      <div>
        {/* Slider */}
        <input
          type="range"
          min="1"
          max="9"
          value={value}
          onChange={handleChange}
          className="slider"
          disabled={!showSlider}
        />
        <p>
          {t("sceneThree.divisor")}={value}
        </p>
      </div>
      {showSlider && <button
        className="check-btn"
        onClick={() => {
          playClick();
          onCheck();
        }}
      >
        {t("buttons.check")}
      </button>}
    </div>
  );
};

export default Slider;
