import React from "react";
import "./errormessage.css";
import { useTranslation } from "react-i18next";
const TableMessage = ({
  stepOne,
  stepTwo,
  stepThree,
  boxResultOne,
  correctOption,
  options,
  flag,
}) => {
  const { t } = useTranslation();
  if (flag === 1) {
    return (
      <div>
        {stepOne && (
          <div>
            {boxResultOne === correctOption[0] ? (
              <p className="success-message">
                {t("great")} {correctOption[0]}{" "}
                {t("success", { word: "symbol" })}
              </p>
            ) : boxResultOne === options[5] ? (
              <p className="error-message">{t("yellowMarble")}</p>
            ) : (
              <p className="error-message">
                {t("dogErrorone", { word: "symbol :" })}
              </p>
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
              <p className="error-message">{t("yellowMarble")}</p>
            ) : (
              <p className="error-message">
                {t("dogErrorone", { word: "word to" })}
              </p>
            )}
          </div>
        )}
        {stepThree && (
          <div>
            {boxResultOne === correctOption[2] ? (
              <p className="success-message">
                {t("great")}{" "}
                <span className="option-fraction-error">
                  <span>9</span>
                  <span className="fraction-line-error"></span>
                  <span>7</span>
                </span>
                {t("success", { word: "fraction" })}
              </p>
            ) : boxResultOne === options[4] ? (
              <p className="error-message">{t("yellowMarbleFraction")}</p>
            ) : (
              <p className="error-message">
                {t("dogErrorone", { word: "fraction form" })}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
  if (flag === 2) {
    return (
      <div>
        {stepOne && (
          <div>
            {boxResultOne === correctOption[0] ? (
              <p className="success-message">
                {t("great")} {correctOption[0]}{" "}
                {t("success", { word: "symbol" })}
              </p>
            ) : boxResultOne === options[5] ? (
              <p className="error-message">{t("blueMarbles")}</p>
            ) : (
              <p className="error-message">
                {t("dogErrorone", { word: "symbol :" })}
              </p>
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
              <p className="error-message">{t("blueMarbles")}</p>
            ) : (
              <p className="error-message">
                {t("dogErrorone", { word: "word to" })}
              </p>
            )}
          </div>
        )}
        {stepThree && (
          <div>
            {boxResultOne === correctOption[2] ? (
              <p className="success-message">
                {t("great")}{" "}
                <span className="option-fraction-error">
                  <span>7</span>
                  <span className="fraction-line-error"></span>
                  <span>9</span>
                </span>
                {t("success", { word: "fraction" })}
              </p>
            ) : boxResultOne === options[4] ? (
              <p className="error-message">{t("blueMarblesFraction")}</p>
            ) : (
              <p className="error-message">
                {t("dogErrorone", { word: "fraction form" })}
              </p>
            )}
          </div>
        )}
      </div>
    );
  }
  return (
    <div>
      {stepOne && (
        <div>
          {boxResultOne === correctOption[0] ? (
            <p className="success-message">
              {t("great")} {correctOption[0]} {t("success", { word: "symbol" })}
            </p>
          ) : boxResultOne === options[5] ? (
            <p className="error-message">{t("tableErrorSymbol")}</p>
          ) : (
            <p className="error-message">
              {t("dogErrorone", { word: "symbol :" })}
            </p>
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
            <p className="error-message">{t("tableErrorSymbol")}</p>
          ) : (
            <p className="error-message">
              {t("dogErrorone", { word: "word to" })}
            </p>
          )}
        </div>
      )}
      {stepThree && (
        <div>
          {boxResultOne === correctOption[2] ? (
            <p className="success-message">
              {t("great")}{" "}
              <span className="option-fraction-error">
                <span>6</span>
                <span className="fraction-line-error"></span>
                <span>2</span>
              </span>
              {t("success", { word: "fraction" })}
            </p>
          ) : boxResultOne === options[4] ? (
            <p className="error-message">{t("tableErrorFraction")}</p>
          ) : (
            <p className="error-message">
              {t("dogErrorone", { word: "fraction form" })}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TableMessage;
