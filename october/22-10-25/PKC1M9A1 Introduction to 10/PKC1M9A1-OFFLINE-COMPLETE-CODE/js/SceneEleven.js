const SceneEleven = ({
  goPrev,
  goNext
}) => {
  const [clicked, setClicked] = useState({
    one: false,
    two: false,
    three: false
  });
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
    className: "top",
    style: {
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "top-heading",
    style: {
      textAlign: "center",
      fontSize: "5vw"
    }
  }, t("afterNine"))), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "one"
  }, /*#__PURE__*/React.createElement(WhitePointer, {
    top: "17%",
    right: "18.8%",
    width: "5vw",
    height: "8vh"
  }), /*#__PURE__*/React.createElement(WhitePointer, {
    top: "12%",
    right: "25%",
    width: "5vw",
    height: "8vh"
  }), /*#__PURE__*/React.createElement(WhitePointer, {
    top: "17%",
    right: "31.8%",
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
    top: "17%",
    left: "18.8%",
    width: "5vw",
    height: "8vh"
  }), /*#__PURE__*/React.createElement(WhitePointer, {
    top: "12%",
    left: "25%",
    width: "5vw",
    height: "8vh"
  }), /*#__PURE__*/React.createElement(WhitePointer, {
    top: "17%",
    left: "30.8%",
    width: "5vw",
    height: "8vh"
  }), /*#__PURE__*/React.createElement(WhitePointer, {
    top: "26%",
    left: "35.8%",
    width: "5vw",
    height: "8vh"
  }), /*#__PURE__*/React.createElement(WhitePointer, {
    top: "44%",
    left: "14.8%",
    width: "5vw",
    height: "8vh"
  }), /*#__PURE__*/React.createElement("img", {
    src: Fivefinger,
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
  }, t("buttons.previous")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: "1%",
      right: "-4%",
      border: "0.3vw solid orange",
      borderRadius: "1.3vw"
    }
  }, /*#__PURE__*/React.createElement(ReusableButton, {
    onClick: () => {
      playClick();
      window.location.reload();
    },
    label: t("buttons.startOver"),
    padding: "1vh",
    fontSize: "3vw",
    showActive: false,
    showTap: false
  }))));
};
window.SceneEleven=SceneEleven;