import React from "react";
import "./errormessage.css";
import { useTranslation } from "react-i18next";
const ErrorMessgae = ({ question, result }) => {
  const { t } = useTranslation();
  return (
    <div>
      {result * question[0] === question[2] &&
      result * question[1] === question[3] ? (
        <p style={{ textAlign: "center" }} className="success-message">
          {t("greatWork")}{" "}
          <span className="fraction-inline-align">
            <span className="fraction-question-two">
              <span>{question[0]}</span>
              <span className="fraction-question-line"></span>
              <span>{question[1]}</span>
            </span>
          </span>{" "}
          {t("gives_it", { count: result })}{" "}
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
        <p className="error-message">
          {t("error_message", {
            num: question[0],
            result: result,
            multiply: question[0] * result,
            num_result: question[2],
            deno: question[1],
            multiplyTwo: question[1] * result,
            deno_result: question[3],
          })}
        </p>
      )}
    </div>
  );
};

export default ErrorMessgae;
