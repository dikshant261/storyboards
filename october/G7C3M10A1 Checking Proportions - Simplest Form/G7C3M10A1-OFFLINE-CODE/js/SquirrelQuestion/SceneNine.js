const SceneNine = ({
  goNext
}) => {
  const [next, setNext] = useState(false);
  const [firstClick, setFirstClick] = useState(null);
  const [secondClick, setSecondClick] = useState(null);
  const [animateMove, setAnimateMove] = useState(false);
  const [showError, setShowError] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const handleClick = (frame, id) => {
    playClick();

    // If no first click yet
    if (!firstClick) {
      setFirstClick(frame);
      return;
    }

    // If clicking second frame (different from first)
    if (firstClick && !secondClick && firstClick !== frame) {
      setSecondClick(frame);
      setAnimateMove(true);
      if (id === firstClick) {
        playCorrect();
        setShowSuccess(true);
        setNext(true);
      } else {
        playWrong();
        setShowError(true);
      }
      // reset after animation
      // setTimeout(() => {
      //   setAnimateMove(false);
      //   setFirstClick(null);
      //   setSecondClick(null);
      // }, 1200);
    }
  };
  const handleNext = () => {
    goNext();
  };

  // ✅ RESET FUNCTION — resets all to initial state
  const handleReset = () => {
    playClick();
    setNext(false);
    setFirstClick(null);
    setSecondClick(null);
    setAnimateMove(false);
    setShowError(false);
  };

  // ✅ Utility: determine if this frame should beat
  const isBeating = frame => {
    if (animateMove) return false;
    if (firstClick === frame || secondClick === frame) return false;
    return true;
  };

  // ✅ Utility: determine animation class between any two frames
  const getMoveClass = (from, to) => {
    if (!animateMove) return "";
    if (firstClick === from && secondClick === to) return `move-${from.toLowerCase()}-${to.toLowerCase()}`;
    return "";
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "scenetwo-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, /*#__PURE__*/React.createElement("p", null, t("sceneThree.whichTwo"))), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "image-1"
  }, /*#__PURE__*/React.createElement("p", null, t("frameA")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FrameImageThree, {
    width: "16vw",
    beat: isBeating("A"),
    onClick: () => handleClick("A", "A")
  })), /*#__PURE__*/React.createElement("div", {
    className: getMoveClass("A", "B") || getMoveClass("A", "C"),
    style: {
      position: "absolute",
      top: "4.5vw",
      opacity: "0",
      zIndex: "1"
    }
  }, /*#__PURE__*/React.createElement(FrameImageThree, {
    width: "16vw",
    onClick: () => handleClick("A", "A")
  })), /*#__PURE__*/React.createElement(LenghtBox, {
    success: true,
    value: 1,
    boxOneValue: 10,
    boxTwoValue: 6,
    color: "rgba(2, 2, 63, 0.758)"
  }), /*#__PURE__*/React.createElement(LenghtBox, {
    success: true,
    boxOneValue: 5,
    boxTwoValue: 3,
    color: "rgba(2, 2, 63, 0.758)",
    value: 2
  })), /*#__PURE__*/React.createElement("div", {
    className: "image-2"
  }, /*#__PURE__*/React.createElement("p", null, t("frameB")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FrameImageThree, {
    width: "19vw",
    height: "33vh",
    beat: isBeating("B"),
    onClick: () => handleClick("B", "B")
  })), /*#__PURE__*/React.createElement("div", {
    className: getMoveClass("B", "A") || getMoveClass("B", "C"),
    style: {
      position: "absolute",
      top: "4.5vw",
      opacity: "0"
    }
  }, /*#__PURE__*/React.createElement(FrameImageThree, {
    width: "19vw",
    height: "33vh",
    onClick: () => handleClick("B", "B")
  })), /*#__PURE__*/React.createElement(LenghtBox, {
    success: true,
    value: 1,
    boxOneValue: 10,
    boxTwoValue: 8,
    color: "rgba(2, 2, 63, 0.758)"
  }), /*#__PURE__*/React.createElement(LenghtBox, {
    success: true,
    value: 2,
    boxOneValue: 5,
    boxTwoValue: 4,
    color: "rgba(2, 2, 63, 0.758)"
  })), /*#__PURE__*/React.createElement("div", {
    className: "image-3"
  }, /*#__PURE__*/React.createElement("p", null, t("frameC")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(FrameImageThree, {
    width: "18vw",
    beat: isBeating("C"),
    onClick: () => handleClick("C", "A")
  })), /*#__PURE__*/React.createElement("div", {
    className: getMoveClass("C", "A") || getMoveClass("C", "B"),
    style: {
      position: "absolute",
      top: "4.5vw",
      opacity: "0"
    }
  }, /*#__PURE__*/React.createElement(FrameImageThree, {
    width: "18vw",
    onClick: () => handleClick("C", "A")
  })), /*#__PURE__*/React.createElement(LenghtBox, {
    success: true,
    value: 1,
    boxOneValue: 15,
    boxTwoValue: 9,
    color: "rgba(2, 2, 63, 0.758)"
  }), /*#__PURE__*/React.createElement(LenghtBox, {
    success: true,
    value: 2,
    boxOneValue: 5,
    boxTwoValue: 3,
    color: "rgba(2, 2, 63, 0.758)"
  })), /*#__PURE__*/React.createElement("div", {
    className: "keypad",
    style: {
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, t("sceneTwo.keypadHeading")), showError && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    className: "frame-error"
  }, t("sceneNine.error")), /*#__PURE__*/React.createElement("div", {
    className: "try-again"
  }, /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.tryAgain"),
    onClick: handleReset,
    width: "12vw",
    height: "8vh"
  }))), showSuccess && /*#__PURE__*/React.createElement("p", {
    className: "frame-success"
  }, t("sceneNine.success")))), /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.previous")), !next && /*#__PURE__*/React.createElement("p", null, t("navigation.tapTwoFrame")), next && /*#__PURE__*/React.createElement("p", null, t("navigation.tapForNextChallange")), !next && /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.next")), next && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleNext
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    onClick: handleNext,
    bottom: 0
  }))));
};
window.SceneNine=SceneNine;