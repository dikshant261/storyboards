import React from "react";
import "./ErrorMessage.css";
import { useTranslation } from "react-i18next";
const ErrorMessage = ({ numbers,correctNumber }) => {

const {t}=useTranslation();
  return (
    <div>
      {numbers.number1 === correctNumber[0] &&
      numbers.number2 === correctNumber[1] &&
      numbers.number3 === correctNumber[2] ? (
        <p className="success">
          {t("successMeassage")}
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
