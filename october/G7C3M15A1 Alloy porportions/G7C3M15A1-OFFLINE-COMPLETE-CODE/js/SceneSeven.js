const SceneSeven = ({
  goNext,
  goPrev
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", null, t("sceneOne.aCertain")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "white"
    }
  }, t("sceneOne.twoMetals")), /*#__PURE__*/React.createElement("span", null, t("sceneOne.ifANew")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "white"
    }
  }, t("sceneOne.sameAlloy")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#b6d7a8"
    }
  }, t("sceneOne.howManyGrams")))), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "left"
  }, /*#__PURE__*/React.createElement("p", null, t("sceneSeven.soThe"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "white"
    }
  }, t("sceneSeven.metalA")), /*#__PURE__*/React.createElement("span", null, t("sceneSeven.metalB")))), /*#__PURE__*/React.createElement("div", {
    className: "right",
    style: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement(MetalRatio, {
    xValue: "112.5"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "3vw",
      textAlign: "center",
      color: "white"
    }
  }, t("sceneSeven.isPerportional")))), /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      playClick();
      goPrev();
    }
  }, t("buttons.previous")), /*#__PURE__*/React.createElement("p", null, t("instructions.tapToStartOver")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      playClick();
      window.location.reload();
    }
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: "0%",
    onClick: () => {
      playClick();
      window.location.reload();
    }
  }))));
};
window.SceneSeven=SceneSeven;