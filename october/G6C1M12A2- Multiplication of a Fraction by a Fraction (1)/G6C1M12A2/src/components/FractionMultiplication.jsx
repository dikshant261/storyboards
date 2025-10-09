import React from "react";
import "./FractionMultiplication.css";
import { useTranslation } from "react-i18next";

const FractionMultiplication = ({num1,num2,num3,num4,num5,num6}) => {
  const { t } = useTranslation();

  return (
    <div className="fraction-container-two">
      {/* Left Part */}
      <div className="fraction-box">
        <div className="fraction-heading">
          <div>
            <b>{t("numerator1")}</b>
            <div className="line"></div>
            {t("denominator1")}
          </div>
          <span className="multiply-symbol">×</span>
          <div>
            <b>{t("numerator2")}</b>
            <div className="line"></div>
            {t("denominator2")}
          </div>
        </div>

        <div className="fraction-content">
          <div className="fraction">
            <span className="num green-color">{num1}</span>
            <div className="line"></div>
            <span className="den green-color">{num2}</span>
          </div>

          <span className="multiply-symbol">×</span>

          <div className="fraction">
            <span className="num orange-color">{num3}</span>
            <div className="line"></div>
            <span className="den orange-color">{num4}</span>
          </div>
        </div>
      </div>

      <span className="equal-symbol">=</span>

      {/* Right Part */}
      <div className="fraction-box">
        <div className="fraction-heading" style={{
            flexDirection:"column"
        }}>
          <div>
            {t("numerator1")} × {t("numerator2")}
          </div>
          <div className="line"></div>
          <div>
            {t("denominator1")} × {t("denominator2")}
          </div>
        </div>

        <div className="fraction-content">
          <div className="fraction">
            <span className="num green-color">{num1} × {num2}</span>
            <div className="line"></div>
            <span className="den green-color">{num3} × {num4}</span>
          </div>

          <span className="equal-symbol">=</span>

          <div className="fraction">
            <span className="num orange-color">{num5}</span>
            <div className="line"></div>
            <span className="den orange-color">{num6}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FractionMultiplication;
