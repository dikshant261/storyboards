const SceneNine = ({
  goPrev,
  goNext
}) => {
  const [clicked, setClicked] = useState({
    one: false,
    two: false,
    three: false
  });
  useEffect(() => {
    setTimeout(() => {
      playEight();
    }, 1000);
  }, []);
  const handleClick = (key, playFn) => {
    playFn();
    setClicked(prev => {
      const updated = {
        ...prev,
        [key]: true
      };
      return updated;
    });
  };

  // If all three are clicked at least once, button becomes enabled
  const allClicked = clicked.one && clicked.two && clicked.three;
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "top"
  }, /*#__PURE__*/React.createElement("p", {
    className: "top-heading"
  }, t("count")), /*#__PURE__*/React.createElement("div", {
    className: "align-hand-image"
  }, /*#__PURE__*/React.createElement("p", {
    className: "shout-loud"
  }, t("shout")), /*#__PURE__*/React.createElement("img", {
    src: raisehandchild,
    className: "boy-hand"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "one"
  }, /*#__PURE__*/React.createElement(WhitePointer, {
    top: "17%",
    right: "19.8%",
    width: "5vw",
    height: "8vh"
  }), /*#__PURE__*/React.createElement(WhitePointer, {
    top: "12%",
    right: "26%",
    width: "5vw",
    height: "8vh"
  }), /*#__PURE__*/React.createElement(WhitePointer, {
    top: "17%",
    right: "30.8%",
    width: "5vw",
    height: "8vh"
  }), /*#__PURE__*/React.createElement(WhitePointer, {
    top: "26%",
    right: "35.8%",
    width: "5vw",
    height: "8vh"
  }), /*#__PURE__*/React.createElement(WhitePointer, {
    top: "44%",
    right: "14.8%",
    width: "5vw",
    height: "8vh"
  }), /*#__PURE__*/React.createElement(WhitePointer, {
    top: "18%",
    left: "18.8%",
    width: "5vw",
    height: "8vh"
  }), /*#__PURE__*/React.createElement(WhitePointer, {
    top: "14%",
    left: "24.8%",
    width: "5vw",
    height: "8vh"
  }), /*#__PURE__*/React.createElement(WhitePointer, {
    top: "17%",
    left: "30.8%",
    width: "5vw",
    height: "8vh"
  }), /*#__PURE__*/React.createElement("img", {
    src: Threefinger,
    className: "image-two",
    style: {
      width: "27vw",
      transform: "translateY(2.4vw) scaleX(-1)"
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: Fivefinger,
    style: {
      width: "27vw",
      transform: "translateY(2.4vw)"
    }
  })), /*#__PURE__*/React.createElement("button", {
    className: "align-previous",
    onClick: () => {
      playClick();
      goPrev();
    }
  }, t("buttons.previous")), /*#__PURE__*/React.createElement("button", {
    className: "align-Next",
    onClick: () => {
      playClick();
      goNext();
    }
  }, t("buttons.Next"))));
};
window.SceneNine=SceneNine;