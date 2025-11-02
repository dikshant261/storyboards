const SceneSix = ({
  goNext,
  goPrev
}) => {
  const {useState}=React;
  const [buttonId, setButtonId] = useState(null);
  const [disabledButtons, setDisabledButtons] = useState([]); // track disabled buttons
  const [allDisabled, setAllDisabled] = useState(false); // disable all after correct
  const [message, setMessage] = useState("");
  const [next, setNext] = useState(false);
  const handleClick = id => {
    if (id === 3) {
      playCorrect();
      setButtonId(3);
      setMessage(t("sceneSix.success"));
      setAllDisabled(true);
      setNext(true);
    } else if (id === 1) {
      playWrong();
      setButtonId(id);
      setMessage(t("sceneSix.errorOne"));
      setDisabledButtons(prev => [...prev, id]); // disable only wrong clicked button
    } else if (id === 2) {
      playWrong();
      setButtonId(id);
      setMessage(t("sceneSix.errorTwo"));
      setDisabledButtons(prev => [...prev, id]); // disable only wrong clicked button
    } else if (id === 4) {
      playWrong();
      setButtonId(id);
      setMessage(t("sceneSix.errorThree"));
      setDisabledButtons(prev => [...prev, id]); // disable only wrong clicked button
    }
  };
  const getButtonStyle = id => {
    // Correct and selected
    if (buttonId === 3 && id === 3) {
      return {
        backgroundColor: "#354b46",
        color: "white",
        border: "0.3vw dashed darkgreen",
        cursor: "not-allowed"
      };
    }
    // Wrong and clicked
    if (disabledButtons.includes(id)) {
      return {
        backgroundColor: "#8d6a68",
        color: "white",
        border: "0.3vw dashed darksalmon",
        cursor: "not-allowed"
      };
    }
    // After correct answer: make other buttons salmon
    if (allDisabled && id !== 3) {
      return {
        backgroundColor: "#8d6a68",
        color: "white",
        border: "0.3vw dashed darksalmon",
        cursor: "not-allowed"
      };
    }
    // Default
    return {
      backgroundColor: "var(--secondary-color)",
      color: "white",
      border: "0.3vw solid transparent"
    };
  };
  const isDisabled = id => {
    if (allDisabled) return true; // disable all after correct
    return disabledButtons.includes(id); // disable wrong clicked ones
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", null, t("sceneOne.aCertain")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "white"
    }
  }, t("sceneOne.twoMetals")), /*#__PURE__*/React.createElement("span", null, t("sceneOne.ifANew")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "white"
    }
  }, t("sceneOne.sameAlloy")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#b6d7a8"
    }
  }, t("sceneOne.howManyGrams")))), /*#__PURE__*/React.createElement("div", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "left"
  }, /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("span", null, t("sceneSix.sloveThis")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "white"
    }
  }, t("sceneSix.findTheValue")))), /*#__PURE__*/React.createElement("div", {
    className: "right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "given",
    style: {
      alignItems: "center",
      gap: "7vh"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "3vw"
    }
  }, t("sceneFive.qs")), /*#__PURE__*/React.createElement("div", {
    className: "align-fraction"
  }, /*#__PURE__*/React.createElement("p", null, "\uD835\uDCB3"), /*#__PURE__*/React.createElement("p", null, "="), /*#__PURE__*/React.createElement(Fraction, {
    numerator: "7.5 × 45",
    denominator: 3,
    fontSize: "4vw",
    lineHeight: "0.5vh"
  })), message !== "" && /*#__PURE__*/React.createElement("p", {
    style: {
      background: buttonId === 3 ? "#354b46" : "#8d6a68",
      border: buttonId === 3 ? "0.3vw dashed darkgreen" : "0.3vw dashed darksalmon",
      width: "28vw",
      height: "18vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
      borderRadius: "1.3vw",
      fontSize:"2vw"
    }
  }, message)), /*#__PURE__*/React.createElement("div", {
    className: "tofind",
    style: {
      alignItems: "center",
      gap: "5vh"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: "2vw",
      textAlign: "center"
    }
  }, t("sceneSix.findValueX")), /*#__PURE__*/React.createElement(ReusableButton, {
    label: "𝒳 = 18",
    width: "15vw",
    height: "9vh",
    showActive: false,
    showTap: false,
    fontSize: "3vw",
    onClick: () => handleClick(1),
    disabled: isDisabled(1),
    style: getButtonStyle(1)
  }), /*#__PURE__*/React.createElement(ReusableButton, {
    label: "𝒳 = 202.5",
    width: "15vw",
    height: "9vh",
    showActive: false,
    showTap: false,
    fontSize: "3vw",
    onClick: () => handleClick(2),
    disabled: isDisabled(2),
    style: getButtonStyle(2)
  }), /*#__PURE__*/React.createElement(ReusableButton, {
    label: "𝒳 = 112.5",
    width: "15vw",
    height: "9vh",
    showActive: false,
    showTap: false,
    fontSize: "3vw",
    onClick: () => handleClick(3),
    disabled: isDisabled(3),
    style: getButtonStyle(3)
  }), /*#__PURE__*/React.createElement(ReusableButton, {
    label: "𝒳 = 1125",
    width: "15vw",
    height: "9vh",
    showActive: false,
    showTap: false,
    fontSize: "3vw",
    onClick: () => handleClick(4),
    disabled: isDisabled(4),
    style: getButtonStyle(4)
  })))), /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      playClick();
      goPrev();
    }
  }, t("buttons.previous")), !next && /*#__PURE__*/React.createElement("p", null, t("instructions.correctOption")), next && /*#__PURE__*/React.createElement("p", null, t("instructions.tapToContinue")), !next && /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.next")), next && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      playClick();
      goNext();
    }
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: "0%",
    onClick: () => {
      playClick();
      goNext();
    }
  }))));
};
window.SceneSix=SceneSix;