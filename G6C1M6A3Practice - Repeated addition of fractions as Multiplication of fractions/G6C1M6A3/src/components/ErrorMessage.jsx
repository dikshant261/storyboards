import React, { useTransition } from "react";
import "./errormessage.css";
import { useTranslation } from "react-i18next";
const ErrorMessage = ({ answer, question, flag, numberString }) => {
  const { t } = useTranslation();
  console.log(answer, flag);
  if (flag === 0) {
    return (
      <div>
        {answer === question[2] ? (
          <p className="success-message">
            {t("yes_we_added")}
            <span className="option-fraction-error">
              <span>{question[0]}</span>
              <span className="fraction-line-error"></span>
              <span>{question[1]}</span>
            </span>
            {t("three_times",{count:question[2]})}
          </p>
        ) : (
          <p className="error-message">
            {t("two_fifith_error", { word: numberString })}
          </p>
        )}
      </div>
    );
  }
  return (
    <div>
      {answer === question[1] ? (
        <p className="error-message">{t("denominatorError")}</p>
      ) : answer === question[2] ? (
        <p className="error-message">
          {t("countError", { count: question[2] })}
        </p>
      ) : (
        <p className="success-message">
          {t("goodGoing")}
          <span className="option-fraction-error">
            <span>{question[0]}</span>
            <span className="fraction-line-error"></span>
            <span>{question[1]}</span>
          </span>
          {t("repeatedly")}
        </p>
      )}
    </div>
  );
};

export default ErrorMessage;
