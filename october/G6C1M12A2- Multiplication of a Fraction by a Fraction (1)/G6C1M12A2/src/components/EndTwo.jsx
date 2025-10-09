import React from "react";
import { useTranslation } from "react-i18next";
import "./EndTwo.css";

const EndTwo = () => {
  const { t } = useTranslation();

  return (
    <div className="fraction-container-three">
      <h2 className="title-text">
        {t("fraction.title")}
      </h2>

      <p className="description-text">
        {t("fraction.description")}
      </p>

      <div className="formula-section">
        <div className="fraction orange-col">
          <div>{t("fraction.numerator")}</div>
          <div className="line"></div>
          <div>{t("fraction.denominator")}</div>
        </div>

        <div className="multiply-symbol">×</div>

        <div className="fraction green-col">
          <div>{t("fraction.numerator")}</div>
          <div className="line"></div>
          <div>{t("fraction.denominator")}</div>
        </div>

        <div className="equals-symbol">=</div>

        <div className="fraction result">
          <div>
            {t("fraction.numerator")} × {t("fraction.numerator")}
          </div>
          <div className="line"></div>
          <div>
            {t("fraction.denominator")} × {t("fraction.denominator")}
          </div>
        </div>
      </div>

      <p className="footer-text">{t("fraction.restart")}</p>
    </div>
  );
};

export default EndTwo;
