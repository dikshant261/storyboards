const SceneFive = ({
  onNext
}) => {
  const handleNext = () => {
    playClick();
    onNext();
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-conatiner-three"
  }, /*#__PURE__*/React.createElement("div", {
    className: "left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-box"
  }, /*#__PURE__*/React.createElement("p", null, t("sceneFive.equalParts")), /*#__PURE__*/React.createElement("div", {
    className: "triangle"
  }, "\u25B6")), /*#__PURE__*/React.createElement("img", {
    src: images.thinkboy,
    style: {
      width: "16vw",
      objectFit: "contain"
    },
    loading: "lazy"
  })), /*#__PURE__*/React.createElement("div", {
    className: "right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "right-align"
  }, /*#__PURE__*/React.createElement("div", {
    className: "main-container"
  }, /*#__PURE__*/React.createElement("img", {
    src: images.caketwo,
    style: {
      width: "29vw",
      objectFit: "contain"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: `cut-line`,
    style: {
      border: "0.3vw solid black"
    }
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "half-cake"
  }), /*#__PURE__*/React.createElement("div", {
    className: "half-cake-right"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "cutter-box"
  })), /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.previous")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "2.2vw"
    }
  }, t("sceneFive.tapToKnow")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleNext
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: 0
  })))));
};
window.SceneFive=SceneFive;