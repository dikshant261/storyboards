import React from "react";
import "./ErrorMessage.css";
import { useTranslation } from "react-i18next";
const ErrorMessage = ({ question, numbers }) => {
  const {t}=useTranslation();
  return (
    <div>
      {numbers.number1 === question[0] &&
      numbers.number2 === question[1] &&
      numbers.number3 === question[2] ? (
        <p className="success">
          {t("successMessage")}
        </p>
      ) : (
        <p className="error-2">
          {t("errorMessage")}
        </p>
      )}
    </div>
  );
};

export default ErrorMessage;
