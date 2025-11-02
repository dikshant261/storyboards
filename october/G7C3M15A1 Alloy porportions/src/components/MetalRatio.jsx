import React from "react";
import "./MetalRatio.css"; // CSS below handles grid and responsiveness
import { useTranslation } from "react-i18next";

const MetalRatio = ({ xValue = "𝒳" }) => {
  const { t } = useTranslation();

  return (
    <div className="metal-grid">
      <div className="metal-cell header">{t("metalA")}</div>
      <div className="metal-cell header">{t("metalB")}</div>

      <div className="metal-cell left-color">{7.5}</div>
      <div className="metal-cell right-color">{3}</div>

      <div className="metal-cell highlight left-color">{xValue}</div>
      <div className="metal-cell right-color">{45}</div>
    </div>
  );
};

export default MetalRatio;
