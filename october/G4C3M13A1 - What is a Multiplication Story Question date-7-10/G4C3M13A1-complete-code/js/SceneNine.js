const SceneNine = ({
  goNext,
  goPrev
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, /*#__PURE__*/React.createElement("p", null, t("sceneSeven.letsTry"))), /*#__PURE__*/React.createElement("div", {
    className: "main-container ",
    style: {
      flexDirection: "column",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, t("sceneSeven.onceAgain"), " "), /*#__PURE__*/React.createElement("p", {
    className: "para",
    style: {
      textAlign: "left"
    }
  }, /*#__PURE__*/React.createElement("span", null, "1. "), t("sceneSeven.noOfGroups"), " "), /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, /*#__PURE__*/React.createElement("span", null, "2. "), t("sceneSeven.itemInEachGroup"))), /*#__PURE__*/React.createElement("div", {
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
window.SceneNine=SceneNine;