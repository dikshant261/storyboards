import React from "react";
import tap from "../assets/tap.gif";
const Tap = ({
  width,
  top,
  left,
  right,
  bottom,
  style = {},
  className = "",
  onClick
}) => {
  return /*#__PURE__*/React.createElement("img", {
    src: tap,
    alt: "tap",
    onClick: onClick,
    className: className,
    style: {
      position: "absolute",
      width: width || "4vw",
      top: top,
      left: left,
      right: right,
      bottom: bottom,
      cursor: "pointer",
      ...style // allow extra custom styling
    }
  });
};
export default Tap;