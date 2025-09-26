const Box = ({
  content,
  boxCss
}) => {
  console.log(boxCss);
  return /*#__PURE__*/React.createElement("div", {
    className: "alignment"
  }, /*#__PURE__*/React.createElement("span", null, "="), /*#__PURE__*/React.createElement("div", {
    className: `box ${boxCss}`
  }, content));
};
window.Box=Box;