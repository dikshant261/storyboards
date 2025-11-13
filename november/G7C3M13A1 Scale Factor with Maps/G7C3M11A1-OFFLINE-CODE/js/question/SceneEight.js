
const SceneEight = ({
  goNext,
  goPrev
}) => {
  const handleClick = () => {
    playClick();
    goNext();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "scenetwo-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", null, t("sceneTwo.clickIf"), " "), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "white"
    }
  }, t("sceneTwo.ratioOfRed"), " "), /*#__PURE__*/React.createElement("span", null, " ", t("sceneTwo.inPaintA")))), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "image-1"
  }, /*#__PURE__*/React.createElement("p", null, t("paintA")), /*#__PURE__*/React.createElement(FrameImagTwoL, {
    width: "8vw",
    redml: "1.5",
    blueml: "2"
  })), /*#__PURE__*/React.createElement("div", {
    className: "image-2"
  }, /*#__PURE__*/React.createElement("p", null, t("paintB")), /*#__PURE__*/React.createElement(FrameImagTwoL, {
    width: "10vw",
    redml: "2.25",
    blueml: "3"
  })), /*#__PURE__*/React.createElement("div", {
    className: "keypad"
  }, /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, t("sceneTwo.keypadHeading")))), /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      playClick();
      goPrev();
    }
  }, t("buttons.previous")), /*#__PURE__*/React.createElement("p", null, t("navigation.tapStart")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleClick
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    onClick: handleClick,
    bottom: 0
  }))));
};
window.SceneEight=SceneEight;