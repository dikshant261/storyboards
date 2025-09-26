const HintSlide = ({
  onClose
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "hint-container"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "hint-title"
  }, t("hint.hint")), /*#__PURE__*/React.createElement("div", {
    className: "hint-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hint-text"
  }, /*#__PURE__*/React.createElement("p", null, t("hint.heading")), /*#__PURE__*/React.createElement("ul", null, /*#__PURE__*/React.createElement("li", null, t("hint.listOne")), /*#__PURE__*/React.createElement("li", null, t("hint.listTwo")), /*#__PURE__*/React.createElement("li", null, t("hint.listThree")))), /*#__PURE__*/React.createElement("div", {
    className: "hint-example"
  }, /*#__PURE__*/React.createElement("div", {
    className: "fraction-box"
  }, /*#__PURE__*/React.createElement("div", {
    className: "align-row",
    style: {
      marginLeft: "2vw"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "fraction-align"
  }, /*#__PURE__*/React.createElement("span", null, "2"), /*#__PURE__*/React.createElement("span", {
    className: "bar"
  }), /*#__PURE__*/React.createElement("span", null, "3")), /*#__PURE__*/React.createElement("span", null, "\xF7"), " ", /*#__PURE__*/React.createElement("span", null, "5")), /*#__PURE__*/React.createElement("div", {
    className: "arrow-one"
  }, "\u2193"), /*#__PURE__*/React.createElement("div", {
    className: "arrow-two"
  }, "\u2193"), /*#__PURE__*/React.createElement("div", {
    className: "align-row",
    style: {
      marginRight: "1vw"
    }
  }, /*#__PURE__*/React.createElement("span", null, "="), /*#__PURE__*/React.createElement("div", {
    className: "fraction-align"
  }, /*#__PURE__*/React.createElement("span", null, "2"), /*#__PURE__*/React.createElement("span", {
    className: "bar"
  }), /*#__PURE__*/React.createElement("span", null, "3")), "\xD7", " ", /*#__PURE__*/React.createElement("div", {
    className: "fraction-align"
  }, /*#__PURE__*/React.createElement("span", null, "1"), /*#__PURE__*/React.createElement("span", {
    className: "bar"
  }), /*#__PURE__*/React.createElement("span", null, "5"))), /*#__PURE__*/React.createElement("div", {
    className: "align-row",
    style: {
      marginRight: "6vw"
    }
  }, /*#__PURE__*/React.createElement("span", null, "="), /*#__PURE__*/React.createElement("div", {
    className: "fraction-align"
  }, /*#__PURE__*/React.createElement("span", null, "2"), /*#__PURE__*/React.createElement("span", {
    className: "bar"
  }), /*#__PURE__*/React.createElement("span", null, "15")))), /*#__PURE__*/React.createElement("p", {
    className: "reciprocal-label"
  }, t("hint.reciprocal")))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: "4vw"
    }
  }, /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.close"),
    onClick: () => {
      playClick();
      onClose();
    },
    width: "11vw",
    height: "10vh",
    fontSize: "3vw"
  })));
};
window.HintSlide=HintSlide;