import React from "react";
import "./design.css";
import { useTranslation } from "react-i18next";

const Design = () => {
  const { t } = useTranslation();
  return (
    <div className="design-container">
      <div className="line-one"></div>
      <div className="line-two"></div>

      <div className="left">
        <div>
          <div className="big-circle"></div>
          <br />
          <p>{t("figureName.total")}</p>
        </div>
      </div>
      <div className="right">
        <div>
          <div className="blue-circle"></div>
          <p style={{ fontSize: "2vw" }}>{t("figureName.part")}</p>
        </div>
        <div>
          <div className="pink-circle"></div>
          <p style={{ fontSize: "2vw" }}>{t("figureName.part")}</p>
        </div>
      </div>
    </div>
  );
};

export default Design;
