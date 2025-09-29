import React from "react";
import { useTranslation } from "react-i18next";

const ErrorMessage = ({ result, flag }) => {
  const { t } = useTranslation();
  return (
    <div>
      {flag === 1 && (
        <div>
          {result === 7 ? (
            <p>{t("PencilErrors.totalSuccess")}</p>
          ) : result > 7 ? (
            <p>{t("PencilErrors.largeNumber")}</p>
          ) : result === null ? (
            <p>{t("PencilErrors.emptyError")}</p>
          ) : (
            <p>{t("PencilErrors.smallerNumber")}</p>
          )}
        </div>
      )}
      {flag === 2 && (
        <div>
          {result === 4 ? (
            <p>{t("pencilTakenAwayError.success")}</p>
          ) : result > 4 ? (
            <p>{t("pencilTakenAwayError.largerError")}</p>
          ) : result === null ? (
            <p>{t("pencilTakenAwayError.emptyError")}</p>
          ) : (
            <p>{t("pencilTakenAwayError.smallerError")}</p>
          )}
        </div>
      )}
      {flag === 3 && (
        <div>
          {result === 3 ? (
            <p>{t("pencilSentanceError.success")}</p>
          ) : result > 3 ? (
            <p>{t("pencilSentanceError.largerError")}</p>
          ) : result === null ? (
            <p>{t("pencilSentanceError.emptyError")}</p>
          ) : (
            <p>{t("pencilSentanceError.smallerError")}</p>
          )}
        </div>
      )}
      {flag === 4 && (
        <div>
          {result === 9 ? (
            <p>{t("marbleLargerError.success")}</p>
          ) : result > 9 ? (
            <p>{t("marbleLargerError.smallerError")}</p>
          ) : result === null ? (
            <p>{t("")}</p>
          ) : (
            <p>{t("marbleLargerError.smallerError")}</p>
          )}
        </div>
      )}
      {flag === 5 && (
        <div>
          {result === 7 ? (
            <p>{t("marbleSmallerError.success")}</p>
          ) : result > 7 ? (
            <p>{t("marbleSmallerError.largerError")}</p>
          ) : result === null ? (
            <p>{t("")}</p>
          ) : (
            <p>{t("marbleSmallerError.smallerError")}</p>
          )}
        </div>
      )}
      {flag === 6 && (
        <div>
          {result === 2 ? (
            <p>{t("marbleSenetanceError.success")}</p>
          ) : result > 2 ? (
            <p>{t("marbleSenetanceError.largerNumber")}</p>
          ) : result === null ? (
            <p>{t("")}</p>
          ) : (
            <p>{t("marbleSenetanceError.smallerError")}</p>
          )}
        </div>
      )}
      {flag === 7 && (
        <div>
          {result === 6 ? (
            <p>{t("mangoeTotal.success")}</p>
          ) : result === 2 ? (
            <p>{t("mangoeTotal.partError")}</p>
          ) : result > 6 ? (
            <p>{t("mangoeTotal.largerError")}</p>
          ) : (
            <p>{t("mangoeTotal.smallerError")}</p>
          )}
        </div>
      )}
      {flag === 8 && (
        <div>
          {result === 2 ? (
            <p>{t("mangoesRipe.success")}</p>
          ) : result === 6 ? (
            <p>{t("mangoesRipe.partError")}</p>
          ) : result > 2 ? (
            <p>{t("mangoesRipe.largerError")}</p>
          ) : (
            <p>{t("mangoesRipe.smallerError")}</p>
          )}
        </div>
      )}
      {flag === 9 && (
        <div>
          {result === 4 ? (
            <p>{t("mangoSentanceError.success")}</p>
          ) : result > 4 ? (
            <p>{t("mangoSentanceError.largerError")}</p>
          ) : (
            <p>{t("mangoSentanceError.smallerError")}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ErrorMessage;
