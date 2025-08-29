import React from "react";
import "./ErrorMessage.css";
import { useTranslation } from "react-i18next";
const ErrorMessage = ({ question, number }) => {
  const { t } = useTranslation();
  return (
    <div>
      {number === question[0] ? (
        <p className="success">{t("successOne", { count: number })}</p>
      ) : number > question[0] ? (
        <p className="error-2">{t("errorMessageBig")}</p>
      ) : (
        <p className="error-2">{t("errorMessageSmall")}</p>
      )}
    </div>
  );
};

export default ErrorMessage;
