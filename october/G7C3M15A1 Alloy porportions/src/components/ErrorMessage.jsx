import React from "react";
import "./errormessage.css";
import { useTranslation } from "react-i18next";
const ErrorMessage = ({
  flag,
  num1,
  num2,
  frame,
  response,
  responseTwo,
  ratio,
}) => {
  const { t } = useTranslation();
  console.log("frame:", frame);
  return (
    <div>
      {flag === 1 && (
        <div>
          {response === num1 ? (
            <p>""</p>
          ) : (
            <p className="error">{t("feedBack.errorOne", { frame: frame })}</p>
          )}
        </div>
      )}
      {flag === 2 && (
        <div>
          {responseTwo === num2 ? (
            <p className="success">
              {t("feedBack.success", { num1: num1, num2: num2, frame: frame })}
            </p>
          ) : (
            <p className="error">{t("feedBack.errorTwo", { frame: frame })}</p>
          )}
        </div>
      )}
      {flag === 3 && (
        <div>
          {response === num1 ? (
            <p>""</p>
          ) : (
            <p className="error">
              {t("feedBack.errorThree", {
                response: ratio[0],
                num1: ratio[0],
                num2: ratio[1],
              })}
            </p>
          )}
        </div>
      )}
      {flag === 4 && (
        <div>
          {responseTwo === num2 ? (
            <p className="success">
              {t("feedBack.successTwo", {
                frame: frame,
                num1: num1,
                num2: num2,
              })}
            </p>
          ) : (
            <p className="error">
              {t("feedBack.errorThree", {
                response: ratio[1],
                num1: ratio[0],
                num2: ratio[1],
              })}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
