const Box = ({
  content,
  boxCss
}) => {
  
  return /*#__PURE__*/React.createElement("div", {
    className: "alignment"
  }, /*#__PURE__*/React.createElement("span",{style:{marginBottom:"0vw"}}, "="), /*#__PURE__*/React.createElement("div", {
    className: `box ${boxCss}`
  }, content));
};
window.Box=Box;