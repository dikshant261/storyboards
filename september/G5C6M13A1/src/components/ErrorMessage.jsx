import React from "react";
import "./errormessage.css";
import { useTranslation } from "react-i18next";
const ErrorMessage = ({ flag }) => {
  const { t } = useTranslation();
  return (
    <div>
      {flag === 1 ? (
        <p className="success-message">{t("error.goodJob")}</p>
      ) : flag === 2 ? (
        <p className="error-message">{t("error.notDivisibleByFive")}</p>
      ) : flag === 3 ? (
        <p className="error-message">{t("error.notDivide")}</p>
      ) : flag === 4 ? (
        <p className="success-message">{t("error.thatCorrect")}</p>
      ) : flag === 5 ? (
        <p className="error-message">{t("error.notYet")}</p>
      ) : flag === 6 ? (
        <p className="error-message">{t("error.notDivide")}</p>
      ) : (
        ""
      )}
    </div>
  );
};

export default ErrorMessage;
