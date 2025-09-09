import React from "react";
import "./errormessage.css";
import { useTranslation } from "react-i18next";
const AppleMessage = ({
  stepOne,
  stepTwo,
  boxResultOne,
  correctOption,
  options,
  flag,
}) => {
  const { t } = useTranslation();
  if (flag === 1) {
    return (
      <div>
        {stepOne && (
          <div>
            {boxResultOne === correctOption[0] ? (
              <p className="success-message">
                {t("successTwo", { count: correctOption[0] })}
              </p>
            ) : boxResultOne === options[3] ? (
              <p className="error-message">{t("triangleErrorTwo")}</p>
            ) : (
              <p className="error-message">{t("triangleErrorOne")}</p>
            )}
          </div>
        )}
        {stepTwo && (
          <div>
            {boxResultOne === correctOption[1] ? (
              <p className="success-message">
                {t("successTwo", { count: correctOption[1] })}
              </p>
            ) : boxResultOne === options[1] ? (
              <p className="error-message">{t("pentagonErrorTwo")}</p>
            ) : (
              <p className="error-message">{t("pentagonErrorOne")}</p>
            )}
          </div>
        )}
      </div>
    );
  }
  if (flag === 2) {
    return (
      <div>
        {stepOne && (
          <div>
            {boxResultOne === correctOption[0] ? (
              <p className="success-message">
                {t("great")}
                <span className="option-fraction-error">
                  <span>9</span>
                  <span className="fraction-line-error"></span>
                  <span>14</span>
                </span>
                {t("successThree")}
              </p>
            ) : boxResultOne === options[3] ? (
              <p className="error-message">{t("boyFirstErrorTwo")}</p>
            ) : (
              <p className="error-message">{t("boyFirstErrorOne")}</p>
            )}
          </div>
        )}
        {stepTwo && (
          <div>
            {boxResultOne === correctOption[1] ? (
              <p className="success-message">
                {t("great")}
                <span className="option-fraction-error">
                  <span>14</span>
                  <span className="fraction-line-error"></span>
                  <span>9</span>
                </span>
                {t("successThree")}
              </p>
            ) : boxResultOne === options[1] ? (
              <p className="error-message">{t("girlsFirstErrorTwo")}</p>
            ) : (
              <p className="error-message">{t("girlsFirstErrorOne")}</p>
            )}
          </div>
        )}
      </div>
    );
  }
  if (flag === 3) {
    return (
      <div>
        {stepOne && (
          <div>
            {boxResultOne === correctOption[0] ? (
              <p className="success-message">
                {t("successTwo", { count: correctOption[0] })}
              </p>
            ) : boxResultOne === options[3] ? (
              <p className="error-message">{t("bananaFirstErrorTwo")}</p>
            ) : (
              <p className="error-message">{t("bananaFirstErrorOne")}</p>
            )}
          </div>
        )}
        {stepTwo && (
          <div>
            {boxResultOne === correctOption[1] ? (
              <p className="success-message">
                {t("successTwo", { count: correctOption[1] })}
              </p>
            ) : boxResultOne === options[1] ? (
              <p className="error-message">{t("appleFirstErrorTwo")}</p>
            ) : (
              <p className="error-message">{t("appleFirstErrorOne")}</p>
            )}
          </div>
        )}
      </div>
    );
  }
  if (flag === 4) {
    return (
      <div>
        {stepOne && (
          <div>
            {boxResultOne === correctOption[0] ? (
              <p className="success-message">
                {t("successTwo", { count: correctOption[0] })}
              </p>
            ) : boxResultOne === options[3] ? (
              <p className="error-message">{t("studentErrorTwo")}</p>
            ) : (
              <p className="error-message">{t("studentErrorOne")}</p>
            )}
          </div>
        )}
        {stepTwo && (
          <div>
            {boxResultOne === correctOption[1] ? (
              <p className="success-message">
                {t("successTwo", { count: correctOption[1] })}
              </p>
            ) : boxResultOne === options[1] ? (
              <p className="error-message">{t("studentPalygroundTwo")}</p>
            ) : (
              <p className="error-message">{t("studentPalygroundOne")}</p>
            )}
          </div>
        )}
      </div>
    );
  }
  return (
    <div>
      {stepOne && (
        <div>
          {boxResultOne === correctOption[0] ? (
            <p className="success-message">
              {t("successTwo", { count: correctOption[0] })}
            </p>
          ) : boxResultOne === options[3] ? (
            <p className="error-message">{t("appleErrorOne")}</p>
          ) : (
            <p className="error-message">{t("appleErrorTwo")}</p>
          )}
        </div>
      )}
      {stepTwo && (
        <div>
          {boxResultOne === correctOption[1] ? (
            <p className="success-message">
              {t("successTwo", { count: correctOption[1] })}
            </p>
          ) : boxResultOne === options[1] ? (
            <p className="error-message">{t("orangeErrorOne")}</p>
          ) : (
            <p className="error-message">{t("orangeErrorTwo")}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default AppleMessage;
