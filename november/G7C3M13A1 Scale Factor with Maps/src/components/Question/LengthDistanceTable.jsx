import React from "react";
import { useTranslation } from "react-i18next";
import "./LengthDistanceTable.css";

const LengthDistanceTable = () => {
  const { t } = useTranslation();

  const rows = [
    { city: t("table.black_line"), map: "", actual: "175" },
    { city: t("table.jakarta_jayapura"), map: "", actual: "" },
    { city: t("table.jakarta_medan"), map: "", actual: "" },
    { city: t("table.jakarta_palangkarya"), map: "", actual: "" },
  ];

  return (
    <div className="table-container">
      <div className="table-heading">{t("table.heading")}</div>

      {/* Header Row */}
      <div className="table-grid header-row">
        <div className="table-tile">{t("table.city_to_city")}</div>
        <div className="table-tile">{t("table.length_on_map")}</div>
        <div className="table-tile">{t("table.actual_distance")}</div>
      </div>

      {/* Data Rows */}
      {rows.map((row, index) => (
        <div
          key={index}
          className={`table-grid ${index % 2 === 0 ? "even" : "odd"}`}
        >
          <div className="table-tile">{row.city}</div>
          <div className="table-tile">{row.map}</div>
          <div className="table-tile">{row.actual}</div>
        </div>
      ))}
    </div>
  );
};

export default LengthDistanceTable;
