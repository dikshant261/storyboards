import React from "react";
import "./ErrorMessage.css";
import { useTranslation } from "react-i18next";
const ErrorMessageTwo = ({ question, number }) => {
  const { t } = useTranslation();
  return (
    <div>
      {number === question[1] ? (
        <p className="success">{t("successTwo", { count: number })}</p>
      ) : number > question[1] ? (
        <p className="error-2">{t("errorCrossMessaageBig")}</p>
      ) : (
        <p className="error-2">{t("errorCrossMessaageSmall")}</p>
      )}
    </div>
  );
};

export default ErrorMessageTwo;
