import React from "react";
import "./TriangleImage.css";
import { useTranslation } from "react-i18next";
const TriangleBox = ({
  beat,beatOne,
  stepOne,
  stepTwo,
  boxResultOne,
  boxOneCss,
  boxResultTwo,
  boxTwoCss,
}) => {
  const { t } = useTranslation();
  return (
    <div className="triangle-box-container">
      <div className="triangle-inner">
        <p>{t("ratio_of_triangles")}</p>
        <div className={`triangle-box ${beat ? "active" : ""} ${boxOneCss}`}>
          {boxResultOne}
        </div>
      </div>
      <div className="triangle-inner">
        <p>{t("ratio_of_pentagons")}</p>
        <div className={`triangle-box ${beatOne ? "active" : ""} ${boxTwoCss}`}>
          {boxResultTwo}
        </div>
      </div>
    </div>
  );
};

export default TriangleBox;
