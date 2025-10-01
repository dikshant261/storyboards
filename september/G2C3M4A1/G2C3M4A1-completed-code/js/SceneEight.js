const SceneEight = ({
  onNext
}) => {
 
  const [cut, setCut] = useState(false);
  const [beforeCut, setBeforeCut] = useState(true);
  const [next, setNext] = useState(false);
  const [nextTwo, setNextTwo] = useState(false);
  const [afterCut, setAfterCut] = useState(false);
  const handleNext = () => {
    playClick();
    onNext();
  };
  const handleLine = () => {
    playClick();
    setCut(true);
  };
  const handleCutter = () => {
    playCorrect();
    setBeforeCut(false);
    setAfterCut(true);
    setNext(true);
  };
  console.log("next", next, afterCut);
  const handleNextTwo = () => {
    playClick();
    setNext(false);
    setNextTwo(true);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-conatiner-three"
  }, /*#__PURE__*/React.createElement("div", {
    className: "left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-box"
  }, beforeCut && /*#__PURE__*/React.createElement("p", null, t("sceneEight.whyNot")), next && /*#__PURE__*/React.createElement("p", null, t("sceneEight.wowTwo")), nextTwo && /*#__PURE__*/React.createElement("p", null, t("sceneEight.wowPerfect")), /*#__PURE__*/React.createElement("div", {
    className: "triangle"
  }, "\u25B6")), beforeCut && /*#__PURE__*/React.createElement("img", {
    src: images.manhand,
    style: {
      width: "21.3vw",
      objectFit: "contain"
    },
    loading: "lazy"
  }), afterCut && /*#__PURE__*/React.createElement("img", {
    src: images.girl,
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
    src: images.cakethree,
    style: {
      width: "37vw",
      objectFit: "contain"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: `${cut ? "cut-line-black" : "cut-line-diagonal"}`,
    onClick: handleLine
  })), /*#__PURE__*/React.createElement("div", {
    className: "cutter-box"
  }, /*#__PURE__*/React.createElement("img", {
    src: images.cutter,
    style: {
      width: "10vw",
      objectFit: "contain",
      cursor: "pointer"
    },
    onClick: handleCutter
  }))), /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.previous")), beforeCut && /*#__PURE__*/React.createElement("p", null, t("sceneEight.tapCutting")), afterCut && /*#__PURE__*/React.createElement("p", null, t("sceneEight.tapKnow")), beforeCut && /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.next")), next && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleNextTwo
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: 0
  })), nextTwo && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleNext
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: 0
  })))));
};
window.SceneEight=SceneEight;