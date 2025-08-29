import React from "react";
import "./ErrorMessage.css";
import { useTranslation } from "react-i18next";
const ErrorMessageThree = ({ question, number }) => {
  const { t } = useTranslation();
  return (
    <div>
      {number === question[2] ? (
        <p className="success">{t("successThree")}</p>
      ) : number > question[2] ? (
        <p className="error-2">{t("countErrorMessageBig")}</p>
      ) : (
        <p className="error-2">{t("countErrorMessageSmall")}</p>
      )}
    </div>
  );
};

export default ErrorMessageThree;
