import React from "react";
import "./box.css";
const Boxes = ({
  number,
  style
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "box-container"
  }, /*#__PURE__*/React.createElement("p", null, number), /*#__PURE__*/React.createElement("div", {
    className: "box",
    style: style
  }, "2"));
};
export default Boxes;