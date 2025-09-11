import React from "react";
import "./ActivityComplete.css";
import ReusableButton from "./TapButton";
import { playClick } from "./PlayAudio";

const ActivityComplete = ({ onRestart }) => {
  return (
    <div className="activity-container">
      <h1 className="title">Activity Completed!</h1>

      <div className="content">
        <p className="text">
          For any addition sentence,
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <span className="fraction">
              <span className="num">Numerator</span>
              <span className="fraction-line-one"></span>
              <span className="den">Denominator</span>
            </span>
            <span style={{ fontSize: "4vw" }}>+</span>
          </span>
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
            }}
          >
            <span className="fraction">
              <span className="num">Numerator</span>
              <span className="fraction-line-one"></span>
              <span className="den">Denominator</span>
            </span>
            <span style={{ fontSize: "4vw" }}>+</span>
          </span>
          <span className="fraction">
            <span className="num">Numerator</span>
            <span className="fraction-line-one"></span>
            <span className="den">Denominator</span>
          </span>
        </p>

        <p className="text">Multiplication sentences can be written as:</p>

        <div className="equation">
          <span
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "2vw",
            }}
          >
            <span className="whole">Whole</span>
            <span style={{ fontSize: "4vw" }}>x</span>
            <span className="fraction">
              <span className="num">Numerator</span>
              <span className="fraction-line-one"></span>
              <span className="den">Denominator</span>
            </span>
            <span style={{ fontSize: "4vw" }}>=</span>

            <span className="fraction">
              <span>
                <span className="whole">Whole</span>
                <span style={{ fontSize: "3vw" }}>x</span>
                <span className="num orange">Numerator</span>
              </span>
              <span className="fraction-line-one"></span>
              <span className="den">Denominator</span>
            </span>
          </span>
        </div>
      </div>

      <p className="restart-text">Tap “Start Over” to restart the activity.</p>
      <div style={{ marginTop: "3vw" }}>
        <ReusableButton
          label={"Start Over"}
          width="15vw"
          height="9vh"
          fontSize="3vw"
          onClick={()=>{
            playClick();
            window.location.reload();
          }}
        />
      </div>
    </div>
  );
};

export default ActivityComplete;
