import React from "react";
import "./errormessage.css";
import { useTranslation } from "react-i18next";
const ErrorMessage = ({ wrongId, correctId }) => {
  console.log(wrongId, "wrong id");
  const { t } = useTranslation();
  return (
    <div>
      {correctId === "D" ? (
        <p className="success-message" style={{ color: "black" }}>
          {t("error.success")}
        </p>
      ) : wrongId === "A" ? (
        <p className="error-message" style={{ color: "black" }}>
          {t("error.errorOne")}
        </p>
      ) : wrongId === "C" ? (
        <p className="error-message" style={{ color: "black" }}>
          {t("error.errorThree")}
        </p>
      ) : (
        <p className="error-message" style={{ color: "black" }}>
          {t("error.errorTwo")}
        </p>
      )}
    </div>
  );
};

export default ErrorMessage;
