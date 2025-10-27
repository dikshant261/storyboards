import React from "react";

const WhitePointer = ({ top, right, height = "11vh", width = "7vw",left }) => {
  return (
    <div
      style={{
        height,
        width,
        background: "#ffffffc9",
        borderRadius: "50%",
        top,
        left,
        right,
        position: "absolute",
        zIndex: 1,
        filter: "drop-shadow(2px 4px 6px white)",
      }}
    ></div>
  );
};

export default WhitePointer;
