import React from "react";
import "./errormessage.css";
import { useTranslation } from "react-i18next";
const ErrorMessage = ({ divisor, value, flag }) => {
  const { t } = useTranslation();
  if (flag === 1) {
    return (
      <div>
        {value === 1 ? (
          <p className="success-messaage">{t("sceneFour.success")}</p>
        ) : value === 2 ? (
          <p className="error-messaage">{t("sceneFour.erorrOne")}</p>
        ) : (
          <p className="error-messaage">{t("sceneFour.erorrTwo")}</p>
        )}
      </div>
    );
  }
  return (
    <div>
      {divisor == value ? (
        <p className="success-messaage">{t("sceneThreeError.success")}</p>
      ) : value < divisor ? (
        <p className="error-messaage">{t("sceneThreeError.errorIncrease")}</p>
      ) : (
        <p className="error-messaage">{t("sceneThreeError.errorDecrease")}</p>
      )}
    </div>
  );
};

export default ErrorMessage;
