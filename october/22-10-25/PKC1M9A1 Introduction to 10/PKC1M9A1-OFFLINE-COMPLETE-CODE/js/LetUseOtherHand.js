const LetsUseOtherHand = ({
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
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "top-heading",
    style: {
      textAlign: 'center',
      fontSize: '6vw'
    }
  }, t("letUse"))), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "one"
  }, /*#__PURE__*/React.createElement(WhitePointer, {
    top: "17%",
    right: "16.8%",
    width: "5vw",
    height: "8vh"
  }), /*#__PURE__*/React.createElement(WhitePointer, {
    top: "12%",
    right: "23%",
    width: "5vw",
    height: "8vh"
  }), /*#__PURE__*/React.createElement(WhitePointer, {
    top: "17%",
    right: "28.8%",
    width: "5vw",
    height: "8vh"
  }), /*#__PURE__*/React.createElement(WhitePointer, {
    top: "26%",
    right: "33.8%",
    width: "5vw",
    height: "8vh"
  }), /*#__PURE__*/React.createElement(WhitePointer, {
    top: "44%",
    right: "12.8%",
    width: "5vw",
    height: "8vh"
  }), /*#__PURE__*/React.createElement("img", {
    src: zerofinger,
    className: "image-two",
    style: {
      width: "30vw",
      transform: "scaleX(-1)"
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
      goNext();
    },
    label: t("buttons.next"),
    padding: "1vh",
    fontSize: "3vw",
    showActive: false,
    showTap: false
  }))));
};
window.LetsUseOtherHand=LetsUseOtherHand;