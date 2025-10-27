const tap = "assets/tap.gif";
const Tap = ({
  width,
  top,
  left,
  right,
  bottom,
  style = {},
  className = "",
}) => {
  return /*#__PURE__*/ React.createElement("img", {
    src: tap,
    alt: "tap",
    className: className,
    style: {
      position: "absolute",
      width: width || "4vw",
      top: top,
      left: left,
      right: right,
      bottom: bottom,
      zIndex:1,
      ...style, // allow extra custom styling
    },
  });
};
window.Tap = Tap;
