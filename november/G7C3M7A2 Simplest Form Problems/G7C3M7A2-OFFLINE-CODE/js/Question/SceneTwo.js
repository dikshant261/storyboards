const SceneTwo = ({
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
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", null, t("sceneTwo.aFrameMeasure"), " "), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "white"
    }
  }, t("sceneTwo.measurement"), " "), /*#__PURE__*/React.createElement("span", null, " ", t("sceneTwo.whatIs")))), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "main-content"
  }, /*#__PURE__*/React.createElement("p", {style:{textAlign:'center'}}, t("sceneTwo.showsTheMeasurement"))), /*#__PURE__*/React.createElement("div", {
    className: "keypad",
    style: {
      padding: "2vh"
    }
  }, /*#__PURE__*/React.createElement(FrameImag, null))), /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      playClick();
      goPrev();
    }
  }, t("buttons.previous")), /*#__PURE__*/React.createElement("p", null, t("navigation.tapContinue")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleClick
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    onClick: handleClick,
    bottom: 0
  }))));
};
window.SceneTwo=SceneTwo;