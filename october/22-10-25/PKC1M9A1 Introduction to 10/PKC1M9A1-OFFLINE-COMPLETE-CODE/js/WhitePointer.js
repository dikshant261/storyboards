const WhitePointer = ({
  top,
  right,
  height = "11vh",
  width = "7vw",
  left
}) => {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height,
      width,
      background: "#ffffffc9",
      borderRadius: "50%",
      top,
      right,
      left,
      position: "absolute",
      zIndex: 1,
      filter: "drop-shadow(2px 4px 6px white)"
    }
  });
};
window.WhitePointer=WhitePointer;