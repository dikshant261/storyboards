const SceneOne = ({
  onSatrt
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scene-container-left"
  }, /*#__PURE__*/React.createElement("p", null, t("sideHeading.thereAre")), /*#__PURE__*/React.createElement("p", null, t("wordProblems.one")), /*#__PURE__*/React.createElement("p", null, t("wordProblems.two")), /*#__PURE__*/React.createElement("p", null, t("wordProblems.three"))), /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-heading-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-heading"
  }, /*#__PURE__*/React.createElement("p", null, t("questionHading.solveSubtraction"))), /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-content"
  })), /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-option"
  }, /*#__PURE__*/React.createElement(ReusableButton, {
    width: "10vw",
    height: "8vh",
    fontSize: "2.6vw",
    label: t("buttons.start"),
    onClick: () => {
      playClick();
      onSatrt();
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-footer-heading"
  }, /*#__PURE__*/React.createElement("p", null, t("navigation.tapStart"))), /*#__PURE__*/React.createElement("div", {
    className: "scene-container-right-footer-button"
  }, /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.previous")), /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.next")))));
};
window.SceneOne=SceneOne;