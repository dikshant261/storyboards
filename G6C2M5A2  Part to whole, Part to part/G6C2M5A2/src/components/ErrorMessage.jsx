import React from "react";
import "./errormessage.css";
import { useTranslation } from "react-i18next";
const ErrorMessage = ({
  stepOne,
  stepTwo,
  stepThree,
  boxResultOne,
  correctOption,
  options,
  flag,
}) => {
  const { t } = useTranslation();
  // stepOne: for first box, stepTwo: for second box, stepThree: for third box
  return (
    <div>
      {/* question one */}
      <div>
        {flag === 0 && stepOne && (
          <div>
            {boxResultOne === correctOption[0] ? (
              <p className="success-message">{t("marblesSucces.succesOne")}</p>
            ) : (
              <p className="error-message">{t("error.tryAgain")}</p>
            )}
          </div>
        )}
        {flag === 0 && stepTwo && (
          <div>
            {boxResultOne === correctOption[1] ? (
              <p className="success-message">{t("marblesSucces.succesTwo")}</p>
            ) : (
              <p className="error-message">{t("error.tryAgain")}</p>
            )}
          </div>
        )}
        {flag === 0 && stepThree && (
          <div>
            {boxResultOne === correctOption[2] ? (
              <p className="success-message">
                {t("marblesSucces.succesThree")}
              </p>
            ) : (
              <p className="error-message">{t("error.tryAgain")}</p>
            )}
          </div>
        )}
      </div>
      <div>
        {/* question Two */}
        {flag === 2 && stepOne && (
          <div>
            {boxResultOne === correctOption[0] ? (
              <p className="success-message">{t("circleSuccess.succesOne")}</p>
            ) : (
              <p className="error-message">{t("error.tryAgain")}</p>
            )}
          </div>
        )}
        {flag === 2 && stepTwo && (
          <div>
            {boxResultOne === correctOption[1] ? (
              <p className="success-message">{t("circleSuccess.succesTwo")}</p>
            ) : (
              <p className="error-message">{t("error.tryAgain")}</p>
            )}
          </div>
        )}
        {flag === 2 && stepThree && (
          <div>
            {boxResultOne === correctOption[2] ? (
              <p className="success-message">
                {t("circleSuccess.succesThree")}
              </p>
            ) : (
              <p className="error-message">{t("error.tryAgain")}</p>
            )}
          </div>
        )}
      </div>
      <div>
        {/* question Two */}
        {flag === 1 && stepOne && (
          <div>
            {boxResultOne === correctOption[0] ? (
              <p className="success-message">
                {t("triangleContent.succesOne")}
              </p>
            ) : (
              <p className="error-message">{t("error.tryAgain")}</p>
            )}
          </div>
        )}
        {flag === 1 && stepTwo && (
          <div>
            {boxResultOne === correctOption[1] ? (
              <p className="success-message">
                {t("triangleContent.succesTwo")}
              </p>
            ) : (
              <p className="error-message">{t("error.tryAgain")}</p>
            )}
          </div>
        )}
        {flag === 1 && stepThree && (
          <div>
            {boxResultOne === correctOption[2] ? (
              <p className="success-message">
                {t("triangleContent.succesThree")}
              </p>
            ) : (
              <p className="error-message">{t("error.tryAgain")}</p>
            )}
          </div>
        )}
      </div>
      <div>
        {" "}
        {/* question Two */}
        {flag === 3 && stepOne && (
          <div>
            {boxResultOne === correctOption[0] ? (
              <p className="success-message">{t("chitraSuccess.succesOne")}</p>
            ) : (
              <p className="error-message">{t("error.tryAgain")}</p>
            )}
          </div>
        )}
        {flag === 3 && stepTwo && (
          <div>
            {boxResultOne === correctOption[1] ? (
              <p className="success-message">{t("chitraSuccess.succesTwo")}</p>
            ) : (
              <p className="error-message">{t("error.tryAgain")}</p>
            )}
          </div>
        )}
        {flag === 3 && stepThree && (
          <div>
            {boxResultOne === correctOption[2] ? (
              <p className="success-message">
                {t("chitraSuccess.succesThree")}
              </p>
            ) : (
              <p className="error-message">{t("error.tryAgain")}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
