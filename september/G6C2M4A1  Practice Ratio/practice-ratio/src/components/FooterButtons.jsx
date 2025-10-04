import React from "react";
import { useTranslation } from "react-i18next";
import tap from "../assets/tap.gif";
const FooterButtons = ({
  disabledNext,
  nextOne,
  nextTwo,
  stepOne,
  stepTwo,
  stepThree,
  btnTwo,
  prveOne,
  last,
  tapProceed,
  handleNextOne,
  handleNextTwo,
  handleProceed,
  handlePrevOne,
  handlePrevTwo,
  handlePrevThree,
  handlePrevFour,
}) => {
  const { t } = useTranslation();

  return (
    <div className="footer-buttons">
      {stepOne && (
        <button className="nxt-btn" onClick={handlePrevOne}>
          {t("buttons.previous")}
        </button>
      )}

      {stepTwo && (
        <button className="nxt-btn" onClick={handlePrevTwo}>
          {t("buttons.previous")}
        </button>
      )}

      {btnTwo && (
        <button className="nxt-btn" onClick={handlePrevThree}>
          {t("buttons.previous")}
        </button>
      )}

      {tapProceed && (
        <button className="nxt-btn" onClick={handlePrevFour}>
          {t("buttons.previous")}
        </button>
      )}

      {disabledNext && (
        <button
          className="nxt-btn"
          disabled
          style={{ backgroundColor: "gray", borderColor: "gray" }}
        >
          {t("buttons.proceed")}
        </button>
      )}

      {nextOne && (
        <div>
          <button
            className="nxt-btn"
            onClick={handleNextOne}
            style={{ position: "relative" }}
          >
            {t("buttons.proceed")}
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
            {t("buttons.proceed")}
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
            {t("buttons.proceed")}
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
};

export default FooterButtons;
