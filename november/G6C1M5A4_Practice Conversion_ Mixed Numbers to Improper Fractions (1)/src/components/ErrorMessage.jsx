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
  ans,
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
            <p className="error">{t("feedBack.errorOne")}</p>
          )}
        </div>
      )}
      {flag === 2 && (
        <div>
          {responseTwo === num2 ? (
            <p className="success">
              <span style={{ display: "inline" }}>
                {t("feedBack.success", { frame: frame })}
              </span>
              &nbsp;
              <span
                style={{
                  display: "inline-flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  verticalAlign: "middle",
                  lineHeight: "1",
                }}
              >
                <span>{num1}</span>
                <span
                  style={{
                    width: "100%",
                    height: "0.2vh",
                    backgroundColor: "white",
                  }}
                ></span>
                <span>{num2}</span>
              </span>
              .
            </p>
          ) : (
            <p className="error">{t("feedBack.errorTwo")}</p>
          )}
        </div>
      )}
      {flag === 3 && (
        <div>
          {response === ans ? (
            <p className="success">
              {t("feedBack.crossSuccess", { num1: num1, num2: num2, ans: ans })}
            </p>
          ) : (
            <p className="error">
              {t("feedBack.crossError", {
                num1: num1,
                num2: num2,
                ans: response,
              })}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
