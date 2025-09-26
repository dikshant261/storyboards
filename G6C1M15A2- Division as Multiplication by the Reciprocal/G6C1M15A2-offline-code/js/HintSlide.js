const HintSlide = ({
  onClose
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "hint-slide-container"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "hint-title"
  }, t("hint.hint")), /*#__PURE__*/React.createElement("p", {
    className: "hint-description"
  }, t("hint.description")), /*#__PURE__*/React.createElement("div", {
    className: "hint-box"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", {
    className: "highlight-yellow"
  }, t("hint.numberOne")), " \xF7", " ", /*#__PURE__*/React.createElement("span", {
    className: "highlight-blue"
  }, t("hint.numberTwo"))), /*#__PURE__*/React.createElement("p", null, "= ", /*#__PURE__*/React.createElement("span", {
    className: "highlight-yellow"
  }, t("hint.numberOne")), " \xD7", " ", /*#__PURE__*/React.createElement("span", {
    className: "highlight-blue"
  }, t("hint.reciprocal"), " ", t("hint.numberTwo"))), /*#__PURE__*/React.createElement("p", null, "= ", /*#__PURE__*/React.createElement("span", {
    className: "highlight-yellow"
  }, t("hint.numberOne")), " \xD7", " ", /*#__PURE__*/React.createElement("span", {
    className: "fraction"
  }, /*#__PURE__*/React.createElement("span", {
    className: "numerator"
  }, "1"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    className: "denominator"
  }, t("hint.numberOne"))))), /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.close"),
    width: "10vw",
    height: "8vh",
    onClick: () => {
      playClick();
      onClose();
    }
  }));
};
window.HintSlide=HintSlide;