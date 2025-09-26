import React from "react";
import "./errormessage.css";
import { useTranslation } from "react-i18next";
const ErrorMessage = ({
  stepOne,
  stepTwo,
  stepThree,
  boxResultOne,
  correctOption,
  options,
}) => {
  const { t } = useTranslation();
  // stepOne: for first box, stepTwo: for second box, stepThree: for third box
  return (
    <div>
      {stepOne && (
        <div>
          {boxResultOne === correctOption[0] ? (
            <p className="success-message">
              {t("great")} {correctOption[0]} {t("success", { word: "symbol" })}
            </p>
          ) : boxResultOne === options[5] ? (
            <p className="error-message">{t("dogErrortwo")}</p>
          ) : (
            <p className="error-message">{t("dogErrorone", { word: "symbol :" })}</p>
          )}
        </div>
      )}
      {stepTwo && (
        <div>
          {boxResultOne === correctOption[1] ? (
            <p className="success-message">
              {t("great")} {correctOption[1]} {t("success", { word: "word" })}
            </p>
          ) : boxResultOne === options[2] ? (
            <p className="error-message">{t("dogErrortwo")}</p>
          ) : (
            <p className="error-message">{t("dogErrorone", { word: "word to" })}</p>
          )}
        </div>
      )}
      {stepThree && (
        <div>
          {boxResultOne === correctOption[2] ? (
            <p className="success-message">
              {t("great")}{" "}
              <span className="option-fraction-error">
                <span>3</span>
                <span className="fraction-line-error"></span>
                <span>2</span>
              </span>
              {t("success", { word: "fraction" })}
            </p>
          ) : boxResultOne === options[4] ? (
            <p className="error-message">{t("dogErrorFraction")}</p>
          ) : (
            <p className="error-message">{t("dogErrorone", { word: "fraction form" })}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
