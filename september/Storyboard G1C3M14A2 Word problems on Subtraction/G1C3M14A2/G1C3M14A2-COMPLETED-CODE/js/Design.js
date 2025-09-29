const Design = ({
  mangoes,
  ripe
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "design-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "line-one"
  }), /*#__PURE__*/React.createElement("div", {
    className: "line-two"
  }), /*#__PURE__*/React.createElement("div", {
    className: "left"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "big-circle"
  }, mangoes), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("p", null, t("questionThree.mangoes")))), /*#__PURE__*/React.createElement("div", {
    className: "right"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "blue-circle"
  }, ripe), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "1.5vw"
    }
  }, t("questionThree.ripe"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "pink-circle"
  }, "\"?\""), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "1.5vw"
    }
  }, t("questionThree.unripe")))));
};
window.Design=Design;