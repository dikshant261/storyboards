import React from "react";
import "./HalfLesson.css";
import ReusableButton from "./ReusableButton";
import { useTranslation } from "react-i18next";
import { playClick } from "./PlayAudio";

const HalfLesson = () => {
    const {t}=useTranslation();
  return (
    <div className="lesson-container">
      <h2 className="lesson-title">What is half?</h2>
      <div className="lesson-box">
        <p className="lesson-subtitle">We learnt!</p>

        <div className="lesson-item">
          <span className="check">✔</span>
          <span className="highlight">Half</span> = One of two equal parts of a
          whole.
        </div>

        <div className="lesson-item">
          <span className="check">✔</span>
          <span className="highlight">If the parts are not equal,</span> they
          are not halves
        </div>

        <div className="lesson-item">
          <span className="check">✔</span>
          <span className="highlight">Two halves together</span> make a whole.
        </div>

        <div style={{
            textAlign:"center",
            marginTop:"3vw"
        }}>
          <ReusableButton
            label={t("buttons.startOver")}
            width="23vw"
            height="10vh"
            fontSize="3vw"
            onClick={()=>{
                playClick();
                window.location.reload();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default HalfLesson;
