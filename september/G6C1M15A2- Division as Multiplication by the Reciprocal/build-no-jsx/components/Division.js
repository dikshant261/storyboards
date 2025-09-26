import React from "react";
const Division = ({
  numerator,
  denominator,
  fontSize = "2vw",
  color = "#fff",
  gap = "1vw"
}) => {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: gap,
      fontSize: fontSize,
      color: color,
      fontWeight: "bold",
      position: "fixed",
      top: "18%"
    }
  }, /*#__PURE__*/React.createElement("span", null, numerator), /*#__PURE__*/React.createElement("span", null, "\xF7"), /*#__PURE__*/React.createElement("span", null, denominator));
};
export default Division;