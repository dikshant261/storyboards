import React from "react";

/**
 * Scalable SVG for the long-division bracket (curve + top bar).
 * Size with the `width` prop (height is computed from viewBox to keep ratio).
 */
const DivisionBracket = ({
  width = "300",
  stroke = "#FFFFFF",
  strokeWidth = 6,
  className = "",
}) => {
  // viewBox is 320x140; scale will keep stroke visually similar via vector stroke
  return (
    <svg
      className={className}
      width="15vw"
      viewBox="0 0 320 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Top bar */}
      <path
        d="M80 22 H310"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Curved hook at left (like √ corner) */}
      <path
        d="M80 22 C70 60, 45 63, 40 62"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};

export default DivisionBracket;
