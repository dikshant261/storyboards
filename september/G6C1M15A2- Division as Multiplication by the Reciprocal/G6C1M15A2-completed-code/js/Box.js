const Box = ({
  content,
  boxCss
}) => {
  console.log(boxCss);
  return /*#__PURE__*/React.createElement("div", {
    className: "alignment"
  }, /*#__PURE__*/React.createElement("span",{style:{marginBottom:"8vw"}}, "="), /*#__PURE__*/React.createElement("div", {
    className: `box ${boxCss}`
  }, content));
};
window.Box=Box;