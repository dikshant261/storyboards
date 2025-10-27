const Scene = () => {
  const [clicked, setClicked] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false
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
  const allClicked = clicked.one && clicked.two && clicked.three && clicked.four && clicked.five;
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "top"
  }, /*#__PURE__*/React.createElement("div", {
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
  }, /*#__PURE__*/React.createElement("img", {
    src: Onefinger,
    style: {
      width: "19vw",
      cursor: "pointer"
    },
    onClick: () => {
      handleClick("one", playOne);
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: Twofinger,
    style: {
      width: "19vw",
      cursor: "pointer"
    },
    onClick: () => {
      handleClick("two", playTwo);
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: Threefinger,
    style: {
      width: "19vw",
      cursor: "pointer"
    },
    onClick: () => {
      handleClick("three", playThree);
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: fourfinger,
    style: {
      width: "19vw",
      cursor: "pointer"
    },
    onClick: () => {
      handleClick("four", playFour);
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: Fivefinger,
    style: {
      width: "19vw",
      cursor: "pointer"
    },
    onClick: () => {
      handleClick("five", playFive);
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("p", null, t("tap")), /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.next"),
    padding: "1vh",
    fontSize: "3vw",
    showTap: false,
    showActive: false,
    onClick: () => {
      playClick();
      window.location.reload();
    },
    disabled: !allClicked // Enable when all images are clicked
  })));
};
window.Scene=Scene;