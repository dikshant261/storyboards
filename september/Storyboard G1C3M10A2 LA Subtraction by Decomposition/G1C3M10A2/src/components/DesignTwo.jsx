import React from "react";
import "./design.css";
import { useTranslation } from "react-i18next";
const DesignTwo = ({ option, beat, circleCss, total, number,red,blue,a,b }) => {
  const { t } = useTranslation();
  return (
    <div className="design-container">
      <div className="line-one"></div>
      <div className="line-two"></div>
      <div className="left">
        <div>
          <div className={`big-circle ${beat ? "active" : ""} ${circleCss}`}>
            {option} {total}
          </div>
          <br />
          <p>{t("figureName.total")}</p>
        </div>
      </div>
      <div className="right">
        <div>
          <div className="blue-circle">{number?.[0] ?? ""}{red}</div>
          <p style={{ fontSize: "2vw" }}>{t("figureName.part")} {a}</p>
        </div>
        <div>
          <div className="pink-circle">{number?.[1] ?? ""}{blue}</div>
          <p style={{ fontSize: "2vw" }}>{t("figureName.part")} {b}</p>
        </div>
      </div>
    </div>
  );
};

export default DesignTwo;
