import React from "react";
import "./errormessage.css";
import { useTranslation } from "react-i18next";
const ErrorMessageTwo = ({ answer, question }) => {
  const { t } = useTranslation();
  return (
    <div>
      {answer.num === question[2] &&
      answer.count === question[0] &&
      answer.pluse === "x" ? (
        <p className="success-message">{t("wholeNumberSuccess")}</p>
      ) : answer.num === question[2] &&
      answer.count === question[2] &&
      answer.pluse === "x"  ? (
        <p className="error-message">
          {t("wholeTwiceError")}
        </p>
      ) : (
        <p className="error-message">
          {t("add_or_multiplyError")}
        </p>
      )}
    </div>
  );
};

export default ErrorMessageTwo;
