const DynamicTableTwo = ({
  tables,
  style
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "tables-container-two",
    style: style
  }, tables.map((table, tableIndex) => /*#__PURE__*/React.createElement("table", {
    key: tableIndex,
    className: "custom-table-two"
  }, /*#__PURE__*/React.createElement("tbody", null, Array.from({
    length: table.rows
  }).map((_, rowIndex) => /*#__PURE__*/React.createElement("tr", {
    key: rowIndex
  }, Array.from({
    length: table.cols
  }).map((_, colIndex) => {
    const key = `${rowIndex}-${colIndex}`;
    const cellColor = table.coloredCells[key] || "";
    return /*#__PURE__*/React.createElement("td", {
      key: colIndex,
      className: cellColor,
      style: table.style
    });
  })))))));
};
window.DynamicTableTwo=DynamicTableTwo;