import React from "react";
import "./ErrorMessage.css";
import { useTranslation } from "react-i18next";
const ErrorMessage = ({ numbers, currentNumber }) => {
  const { t } = useTranslation();
  if (currentNumber === null) {
    return <p className="error-2">{t("nullError", { cross: numbers[1] })}</p>;
  }
  return (
    <div>
      {numbers[0] - numbers[1] === currentNumber ? (
        <p className="success">
          {t("successMessage", {
            total: numbers[0],
            cross: numbers[1],
            left: currentNumber,
          })}
        </p>
      ) : numbers[0] - numbers[1] < currentNumber ? (
        <p className="error-2">
          {t("greaterErrorMessage", { total: numbers[0], cross: numbers[1] })}
        </p>
      ) : numbers[0] - numbers[1] > currentNumber ? (
        <p className="error-2">
          {t("biggerErrorMessage", {
            left: numbers[0] - numbers[1] - currentNumber,
          })}
        </p>
      ) : (
        <p className="error-2">{t("nullError", { cross: numbers[1] })}</p>
      )}
    </div>
  );
};

export default ErrorMessage;
