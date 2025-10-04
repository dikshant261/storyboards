const ResultBox = ({
  beat,
  beatOne,
  beatTwo,
  stepOne,
  stepTwo,
  stepThree,
  boxResultOne,
  boxOneCss,
  boxResultTwo,
  boxTwoCss,
  boxResultThree,
  boxThreeCss
}) => {
  // Helper to render fraction if value is in a/b form
  const renderFraction = value => {
    if (typeof value === "string" && value.includes("/")) {
      const [num, denom] = value.split("/");
      if (!isNaN(num) && !isNaN(denom)) {
        return /*#__PURE__*/React.createElement("span", {
          className: "fraction-align"
        }, /*#__PURE__*/React.createElement("span", null, num), /*#__PURE__*/React.createElement("span", {
          className: "fraction-line-box"
        }), /*#__PURE__*/React.createElement("span", null, denom));
      }
    }
    return value;
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "result-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: `result-box-container ${beat ? "active" : ""}`
  }, /*#__PURE__*/React.createElement("div", {
    className: `box ${boxOneCss}`
  }, renderFraction(boxResultOne)), /*#__PURE__*/React.createElement("div", {
    className: "box-title"
  }, t("symbol"))), /*#__PURE__*/React.createElement("div", {
    className: `result-box-container ${beatOne ? "active" : ""}`
  }, /*#__PURE__*/React.createElement("div", {
    className: `box ${boxTwoCss}`
  }, renderFraction(boxResultTwo)), /*#__PURE__*/React.createElement("div", {
    className: "box-title"
  }, t("word"))), /*#__PURE__*/React.createElement("div", {
    className: `result-box-container ${beatTwo ? "active" : ""}`
  }, /*#__PURE__*/React.createElement("div", {
    className: `box ${boxThreeCss}`
  }, renderFraction(boxResultThree)), /*#__PURE__*/React.createElement("div", {
    className: "box-title"
  }, t("fraction"))));
};
window.ResultBox=ResultBox;