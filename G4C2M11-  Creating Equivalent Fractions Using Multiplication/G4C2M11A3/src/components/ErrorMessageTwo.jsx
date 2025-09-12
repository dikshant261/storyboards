import React from "react";
import "./errormessage.css";
import { useTranslation } from "react-i18next";
const ErrorMessgaeTwo = ({ question, result }) => {
  const { t } = useTranslation();
  return (
    <div>
      {question[0] / result === question[2] &&
      question[1] / result === question[3] ? (
        <p style={{ textAlign: "center" }} className="success-message">
          {t("great_work_divide")}{" "}
          <span className="fraction-inline-align">
            <span className="fraction-question-two">
              <span>{question[0]}</span>
              <span className="fraction-question-line"></span>
              <span>{question[1]}</span>
            </span>
          </span>{" "}
          {t("great_work_divide_two", { count: result })}{" "}
          <span className="fraction-inline-align">
            <span className="fraction-question-two">
              <span>{question[2]}</span>
              <span className="fraction-question-line"></span>
              <span>{question[3]}</span>
            </span>
          </span>
          .
        </p>
      ) : (
        <p className="error-message" style={{ textAlign: "center" }}>
          {t("divide_error", {
            num: question[0],
            result: result,
            deno: question[1],
          })}
          <span className="fraction-inline-align">
            <span className="fraction-question-two">
              <span>{question[2]}</span>
              <span className="fraction-question-line"></span>
              <span>{question[3]}</span>
            </span>
          </span>{" "}
          {t("divide_error_two")} .
        </p>
      )}
    </div>
  );
};

export default ErrorMessgaeTwo;
