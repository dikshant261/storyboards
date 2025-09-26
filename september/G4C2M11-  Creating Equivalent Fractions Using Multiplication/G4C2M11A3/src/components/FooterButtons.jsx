import React from "react";

import tap from '../assets/tap.gif';
const FooterButtons = ({
  disabledNext,
  nextOne,
  nextTwo,
  stepOne,
  stepTwo,
  stepThree,
  prveOne,
  tapProceed,
  handleNextOne,
  handleNextTwo,
  handleProceed,
  handlePrevOne,
  handlePrevTwo,
  handlePrevThree
}) => (
  <div className="footer-buttons">
    {stepOne && <button className="nxt-btn" onClick={handlePrevOne}>◀</button>}
    {stepTwo && <button className="nxt-btn" onClick={handlePrevTwo}>◀</button>}
    {stepThree && <button className="nxt-btn" onClick={handlePrevThree}>◀</button>}

    {disabledNext && (
      <button className="nxt-btn" disabled>
        ▶
      </button>
    )}
    {nextOne && (
      <div>
        <button
          className="nxt-btn"
          onClick={handleNextOne}
          style={{ position: "relative" }}
        >
          ▶
        </button>
        <img
          src={tap}
          alt="Proceed"
          style={{
            position: "absolute",
            bottom: "0%",
            width: "3vw",
            height: "3vw",
            animation: "bounce 1s infinite",
          }}
        />
      </div>
    )}
    {nextTwo && (
      <div>
        <button
          className="nxt-btn"
          onClick={handleNextTwo}
          style={{ position: "relative" }}
        >
          ▶
        </button>
        <img
          src={tap}
          alt="Proceed"
          style={{
            position: "absolute",
            bottom: "0%",
            width: "3vw",
            height: "3vw",
            animation: "bounce 1s infinite",
          }}
        />
      </div>
    )}
    {tapProceed && (
      <div>
        <button
          className="nxt-btn"
          onClick={handleProceed}
          style={{ position: "relative" }}
        >
          ▶
        </button>
        <img
          src={tap}
          alt="Proceed"
          style={{
            position: "absolute",
            bottom: "0%",
            width: "3vw",
            height: "3vw",
            animation: "bounce 1s infinite",
          }}
        />
      </div>
    )}
  </div>
);

export default FooterButtons;
