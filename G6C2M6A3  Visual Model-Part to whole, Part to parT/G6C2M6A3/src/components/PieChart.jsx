import React, { useTransition } from "react";
import "./chart.css";
import { useTranslation } from "react-i18next";
const PieChart = () => {
  const { t } = useTranslation();
  return (
    <div className="pie-chart">
      <div className="line-one">
        <p>
          {t("chartHeading.car")}
          <br />7
        </p>
      </div>
      <div className="line-two">
        <p>
          {t("chartHeading.bus")}
          <br />
          12
        </p>
      </div>
      <div className="line-three">
        <p>
          {t("chartHeading.walk")}
          <br />
          17
        </p>
      </div>
    </div>
  );
};

export default PieChart;
