import React from "react";
import "./design.css";
import { useTranslation } from "react-i18next";
const DesignOption = ({ total, red, blue, style }) => {
  const { t } = useTranslation();
  return (
    <div className="design-container-two">
      <div className="line-one"></div>
      <div className="line-two"></div>
      <div className="left">
        <div>
          <div className="big-circle" style={style}>
            {total}
          </div>
        </div>
      </div>
      <div className="right">
        <div>
          <div className="blue-circle" style={style}>
            {red}
          </div>
        </div>
        <div>
          <div className="pink-circle" style={style}>
            {blue}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignOption;
