import React from "react";
import "./errormessage.css";
import { useTranslation } from "react-i18next";
const ErrorMessage = ({ result, flag, correctOption }) => {
  const { t } = useTranslation();
  return (
    <div>
      {flag === 0 &&
        (result === correctOption ? (
          <p className="success-message">{t("carToBus.success")}</p>
        ) : result === "7:19" ? (
          <p className="error-message">{t("carToBus.errorThree")}</p>
        ) : result === "12:19" ? (
          <p className="error-message">{t("carToBus.errorTwo")}</p>
        ) : (
          <p className="error-message">{t("carToBus.errorOne")}</p>
        ))}
      {flag === 1 &&
        (result === correctOption ? (
          <p className="success-message">{t("carToWalk.success")}</p>
        ) : result === "7:17" ? (
          <p className="error-message">{t("carToWalk.errorOne")}</p>
        ) : result === "17:12" ? (
          <p className="error-message">{t("carToWalk.errorTwo")}</p>
        ) : (
          <p className="error-message">{t("carToWalk.errorThree")}</p>
        ))}
      {flag === 2 &&
        (result === correctOption ? (
          <p className="success-message">{t("walkToTotal.success")}</p>
        ) : result === "17:26" ? (
          <p className="error-message">{t("walkToTotal.errorOne")}</p>
        ) : result === "7:36" ? (
          <p className="error-message">{t("walkToTotal.errorTwo")}</p>
        ) : (
          <p className="error-message">{t("walkToTotal.errorThree")}</p>
        ))}
      {flag === 3 &&
        (result === correctOption ? (
          <p className="success-message">{t("busToTotal.success")}</p>
        ) : result === "36:12" ? (
          <p className="error-message">{t("busToTotal.errorOne")}</p>
        ) : result === "17:36" ? (
          <p className="error-message">{t("busToTotal.errorTwo")}</p>
        ) : (
          <p className="error-message">{t("busToTotal.errorThree")}</p>
        ))}
    </div>
  );
};

export default ErrorMessage;
