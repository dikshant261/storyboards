const SceneOne = ({
  onNext,
  onPrev,
  questions
}) => {
  const [disabled, setDisabled] = useState([]);
  const [show, setShow] = useState(false);
  const [navHeading, setNavHeading] = useState(true);
  const [next, setNext] = useState(false);
  useEffect(() => {
    const result = sessionStorage.getItem(`marbleExample${questions.one}`);
    if (result) {
      const parsed = JSON.parse(result);
      setShow(parsed.show);
      setNavHeading(parsed.nav);
      setDisabled(parsed.disabled);
      setNext(parsed.next);
    }
  }, []);
  const handleNext = () => {
    playClick();
    onNext();
  };
  const handlePrev = () => {
    playClick();
    onPrev();
  };
  const handleClick = (ans, num) => {
    if (ans === questions.for) {
      playCorrect();
      setShow(true);
      setNavHeading(false);
      setNext(true);
      setDisabled([1, 2]);
      sessionStorage.setItem(`marbleExample${questions.one}`, JSON.stringify({
        show: true,
        nav: false,
        disabled: [1, 2],
        next: true
      }));
    } else {
      playWrong();
      setDisabled(prev => prev.includes(num) ? prev : [...prev, num]);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-constainer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scene-heading"
  }, /*#__PURE__*/React.createElement("p", null, t(questions.question))), /*#__PURE__*/React.createElement("div", {
    className: "scene-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "scene-main-first"
  }, show && questions.for === "ratio" && /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("p", null, t(questions.heading)), /*#__PURE__*/React.createElement(ImageRenderer, {
    src: questions.image,
    width: questions.width
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.ratio"),
    showTap: false,
    width: "15vw",
    height: "8vh",
    fontSize: "3vw",
    backgroundColor: disabled.includes(1) && questions.for === "ratio" ? "#93c47d" : disabled.includes(1) && questions.for !== "ratio" ? "salmon" : "#cfe2f3",
    disabled: disabled.includes(1),
    showActive: false,
    onClick: () => handleClick("ratio", 1)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "scene-main-second"
  }, show && questions.for === "fraction" && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", null, t(questions.heading)), /*#__PURE__*/React.createElement(ImageRenderer, {
    src: questions.image,
    width: questions.width
  })), /*#__PURE__*/React.createElement(ReusableButton, {
    label: t("buttons.fraction"),
    width: "15vw",
    height: "8vh",
    fontSize: "3vw",
    showTap: false,
    showActive: false,
    backgroundColor: disabled.includes(2) && questions.for === "fraction" ? "#93c47d" : disabled.includes(2) && questions.for !== "fraction" ? "salmon" : "#cfe2f3",
    disabled: disabled.includes(2),
    onClick: () => handleClick("fraction", 2)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "scene-footer"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handlePrev
  }, t("buttons.previous")), navHeading && /*#__PURE__*/React.createElement("p", null, t("navigation.correctRepresentation")), next && /*#__PURE__*/React.createElement("p", null, t("navigation.tapContinue")), navHeading && /*#__PURE__*/React.createElement("button", {
    style: {
      backgroundColor: "gray",
      borderColor: "gray"
    }
  }, t("buttons.next")), next && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: handleNext
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: "0%"
  }))));
};
window.SceneOne=SceneOne;