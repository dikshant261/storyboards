const SceneFour = ({
  goNext,
  goPrev
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-conatiner-two"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, t("sceneTwo.whatResult"), /*#__PURE__*/React.createElement(Fraction, {
    num: 3,
    deno: 4,
    style: {
      fontSize: "2vw",
      color: "var(--secondary-color)"
    }
  }), t("sceneTwo.of"), /*#__PURE__*/React.createElement(Fraction, {
    num: 2,
    deno: 3,
    style: {
      fontSize: "2vw",
      color: "var(--secondary-color)"
    }
  }), /*#__PURE__*/React.createElement("span", null, " ?")), /*#__PURE__*/React.createElement("div", {
    className: "question-container",
    style: {
      gap: "15vh",
      padding: "7vh 2vw"
    }
  }, /*#__PURE__*/React.createElement(FractionMultiplication, {
    num1: 3,
    num2: 4,
    num3: 2,
    num4: 3,
    num5: 6,
    num6: 12
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "2.8vw"
    }
  }, t("sceneTwo.message"))), /*#__PURE__*/React.createElement("div", {
    className: "footer-heading"
  }, t("navigation.tryNext")), /*#__PURE__*/React.createElement("div", {
    className: "footer-button"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      playClick();
      goPrev();
    }
  }, t("buttons.previous")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      playClick();
      goNext();
    }
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: 0,
    onClick: () => {
      playClick();
      goNext();
    }
  }))));
};
window.SceneFour=SceneFour;