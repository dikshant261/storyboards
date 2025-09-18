import React from "react";
import { useTranslation } from "react-i18next";
import "./errormessage.css";
const ErrorMessage = ({ option, flag }) => {
  const { t } = useTranslation();
  return (
    <div>
      {flag === 0 && (
        <div>
          {option === 7 ? (
            <p className="success-messaage">{t("sceneTwo.success")}</p>
          ) : option === 4 ? (
            <p className="error-messaage">{t("sceneTwo.FourRedError")}</p>
          ) : option === 3 ? (
            <p className="error-messaage">{t("sceneTwo.ThreeBlueError")}</p>
          ) : option > 7 ? (
            <p className="error-messaage">{t("sceneTwo.largeNumberError")}</p>
          ) : (
            <p className="error-messaage">{t("sceneTwo.smallerNumberError")}</p>
          )}
        </div>
      )}
      {flag === 1 && (
        <div>
          {option === 3 ? (
            <p className="success-messaage">{t("sentanceOneError.success")}</p>
          ) : option === 4 ? (
            <p className="error-messaage">{t("sentanceOneError.partBError")}</p>
          ) : option > 3 ? (
            <p className="error-messaage">
              {t("sentanceOneError.largerNUmberError")}
            </p>
          ) : (
            <p className="error-messaage">
              {t("sentanceOneError.smallNumberError")}
            </p>
          )}
        </div>
      )}
      {flag === 2 && (
        <div>
          {option === 4 ? (
            <p className="success-messaage">{t("sentanceTwoError.success")}</p>
          ) : option === 3 ? (
            <p className="error-messaage">{t("sentanceTwoError.partAError")}</p>
          ) : option > 4 ? (
            <p className="error-messaage">
              {t("sentanceTwoError.largeNumberError")}
            </p>
          ) : (
            <p className="error-messaage">
              {t("sentanceTwoError.smallNumberError")}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
