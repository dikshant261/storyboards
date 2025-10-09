const Fraction = ({
  num,
  deno,
  fontSize,
  style
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "fraction-conatiner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fraction",
    style: style
  }, /*#__PURE__*/React.createElement("span", null, num), /*#__PURE__*/React.createElement("span", {
    className: "fraction-line"
  }), /*#__PURE__*/React.createElement("span", null, deno)));
};
window.Fraction=Fraction;