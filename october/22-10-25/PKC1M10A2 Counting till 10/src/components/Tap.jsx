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
}) => {
  return (
    <img
      src={tap}
      alt="tap"
      className={className}
      style={{
        position: "absolute",
        width: width || "4vw",
        top: top,
        left: left,
        right: right,
        bottom: bottom,
        cursor:"pointer",
        zIndex:1,
        ...style, // allow extra custom styling
      }}
    />
  );
};

export default Tap;
