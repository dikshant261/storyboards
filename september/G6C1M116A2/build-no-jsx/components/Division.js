import React from "react";
const Division = ({
  numerator,
  denominator,
  mixed,
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
      top: "14%"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column"
    }
  }, /*#__PURE__*/React.createElement("span", null, numerator), /*#__PURE__*/React.createElement("span", {
    style: {
      width: "100%",
      height: "0.3vh",
      backgroundColor: "currentcolor"
    }
  }), /*#__PURE__*/React.createElement("span", null, denominator)), /*#__PURE__*/React.createElement("span", null, "\xF7"), /*#__PURE__*/React.createElement("span", null, mixed));
};
export default Division;