import React from "react";
import "./DynamicTable.css";
const DynamicTable = ({
  rows,
  cols,
  coloredCells,
  style
}) => {
  // coloredCells = object with cell positions and their colors
  // Example:
  // { "0-0": "cyan", "1-0": "cyan", "2-0": "green", "2-1": "green" }

  return /*#__PURE__*/React.createElement("table", {
    className: "custom-table"
  }, /*#__PURE__*/React.createElement("tbody", null, Array.from({
    length: rows
  }).map((_, rowIndex) => /*#__PURE__*/React.createElement("tr", {
    key: rowIndex
  }, Array.from({
    length: cols
  }).map((_, colIndex) => {
    const cellKey = `${rowIndex}-${colIndex}`;
    const cellColor = coloredCells[cellKey]?.color || "";
    const cellText = coloredCells[cellKey]?.text || "";
    return /*#__PURE__*/React.createElement("td", {
      key: colIndex,
      className: cellColor,
      style: style
    }, cellText);
  })))));
};
export default DynamicTable;