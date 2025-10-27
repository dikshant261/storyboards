const FrameImagTwo = ({
  width = "70vw",
  length,
  breadth,
  height = "auto"
}) => {
  const frameA="assets/frameA.png";
  return /*#__PURE__*/React.createElement("div", {
    className: "frame-two-container"
  }, /*#__PURE__*/React.createElement("img", {
    src: frameA,
    style: {
      width: width,
      height: height
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "length-line"
  }), /*#__PURE__*/React.createElement("div", {
    className: "width-line"
  }), /*#__PURE__*/React.createElement("div", {
    className: "length"
  }, /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, length, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", null, "cm"))), /*#__PURE__*/React.createElement("div", {
    className: "width"
  }, /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, breadth, " cm")));
};
window.FrameImagTwo=FrameImagTwo;