import React from "react";
import marble from "../assets/marble.png";

const MarbleRender = ({ limit }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "0.5vw",
      }}
    >
      {Array(limit)
        .fill(null)
        .map((_, i) => (
          <img
            key={i}
            src={marble}
            style={{
              width: "4vw",
              objectFit: "contain",
            }}
            alt={`marble-${i}`}
          />
        ))}
    </div>
  );
};

export default MarbleRender;
