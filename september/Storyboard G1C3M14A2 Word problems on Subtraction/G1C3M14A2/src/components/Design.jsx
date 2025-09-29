import React from "react";
import "./design.css";
import { useTranslation } from "react-i18next";

const Design = ({ mangoes, ripe }) => {
  const { t } = useTranslation();
  return (
    <div className="design-container">
      <div className="line-one"></div>
      <div className="line-two"></div>

      <div className="left">
        <div>
          <div className="big-circle">{mangoes}</div>
          <br />
          <p>{t("questionThree.mangoes")}</p>
        </div>
      </div>
      <div className="right">
        <div>
          <div className="blue-circle">{ripe}</div>
          <p style={{ fontSize: "1.5vw" }}>{t("questionThree.ripe")}</p>
        </div>
        <div>
          <div className="pink-circle">"?"</div>
          <p style={{ fontSize: "1.5vw" }}>{t("questionThree.unripe")}</p>
        </div>
      </div>
    </div>
  );
};

export default Design;
