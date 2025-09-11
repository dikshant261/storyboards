import React from "react";
import "./errormessage.css";
import { useTranslation } from "react-i18next";
const ErrorMessageThree = ({ answer, question }) => {
  const { t } = useTranslation();
  return (
    <div>
      {answer.num === question[2] * question[0] &&
      answer.deno === question[1] ? (
        <p className="success-message">
          {t("well_done")}
          <span className="option-fraction-error">
            <span>{question[0]}</span>
            <span className="fraction-line-error"></span>
            <span>{question[1]}</span>
          </span>
          {t("added_times_gives", { count: question[2] })}
          <span className="option-fraction-error">
            <span>{question[2] * question[0]}</span>
            <span className="fraction-line-error"></span>
            <span>{question[1]}</span>
          </span>
        </p>
      ) : (
        <p className="error-message">
          {t("the_numerator", {
            count: question[2],
            num: question[0],
            deno: answer.num,
          })}
        </p>
      )}
    </div>
  );
};

export default ErrorMessageThree;
