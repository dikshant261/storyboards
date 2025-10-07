const SceneTwelve = ({
  goNext,
  goPrev
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, /*#__PURE__*/React.createElement("p", {style:{
    fontSize:"2.6vw"
  }}, t("sceneTwelve.howTobeSure"))), /*#__PURE__*/React.createElement("div", {
    className: "main-container ",
    style: {
      flexDirection: "column",
      justifyContent: "space-between",
      paddingTop: "3vw"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, t("sceneTwelve.nextWillLearn"), " "), /*#__PURE__*/React.createElement("table", null, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "para"
  }, t("sceneTwelve.clueWords")), /*#__PURE__*/React.createElement("th", {
    className: "para"
  }, t("sceneTwelve.checkWords")))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, t("sceneTwelve.eachEvery"))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, t("sceneTwelve.inAllHow")))))), /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, t("sceneTwelve.whenBoth"))), /*#__PURE__*/React.createElement("div", {
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
window.SceneTwelve=SceneTwelve;