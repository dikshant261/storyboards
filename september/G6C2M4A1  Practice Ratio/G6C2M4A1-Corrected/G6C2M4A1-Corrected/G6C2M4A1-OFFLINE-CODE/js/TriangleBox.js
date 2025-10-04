const TriangleBox = ({
  beat,
  beatOne,
  stepOne,
  stepTwo,
  boxResultOne,
  boxOneCss,
  boxResultTwo,
  boxTwoCss
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "triangle-box-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "triangle-inner"
  }, /*#__PURE__*/React.createElement("p", null, t("ratio_of_triangles")), /*#__PURE__*/React.createElement("div", {
    className: `triangle-box ${beat ? "active" : ""} ${boxOneCss}`
  }, boxResultOne)), /*#__PURE__*/React.createElement("div", {
    className: "triangle-inner"
  }, /*#__PURE__*/React.createElement("p", null, t("ratio_of_pentagons")), /*#__PURE__*/React.createElement("div", {
    className: `triangle-box ${beatOne ? "active" : ""} ${boxTwoCss}`
  }, boxResultTwo)));
};
window.TriangleBox=TriangleBox;