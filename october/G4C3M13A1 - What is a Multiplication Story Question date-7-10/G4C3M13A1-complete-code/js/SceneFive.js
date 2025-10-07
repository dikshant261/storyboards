
const SceneFive = ({
  goNext,
  goPrev
}) => {
  
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, /*#__PURE__*/React.createElement("p", null, t("sceneFive.howWeCalculate"))), /*#__PURE__*/React.createElement("div", {
    className: "main-container "
  }, /*#__PURE__*/React.createElement("p", {
    className: "para",
    style: {
      fontSize: "3vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "1vw"
    }
  }, t("sceneFive.noOfGroups"), " ", /*#__PURE__*/React.createElement("span", null, "\xD7"), " ", /*#__PURE__*/React.createElement("span", null, t("sceneFive.items")), " ", /*#__PURE__*/React.createElement("span", null, "="), " ", /*#__PURE__*/React.createElement("span", null, t("sceneFive.totalItems")))), /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      playClick();
      goPrev();
    }
  }, t("buttons.previous")), /*#__PURE__*/React.createElement("p", null, t("navigation.tapNext")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    className: "next-btn",
    onClick: () => {
      playClick();
      goNext();
    }
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: 0
  }))));
};
window.SceneFive=SceneFive;