const FrameImageThree = ({
  width = "70vw",
  height = "auto",
  onClick,
  beat
}) => {
  const frame="assets/frame.png";
  return /*#__PURE__*/React.createElement("div", {
    className: "frame-two-container"
  }, /*#__PURE__*/React.createElement("img", {
    src: frame,
    style: {
      width: width,
      height: height,
      cursor: "pointer"
    },
    onClick: onClick,
    className: `${beat ? "beat" : ""}`
  }));
};
window.FrameImageThree=FrameImageThree;