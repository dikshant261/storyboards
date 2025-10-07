const SceneThree = ({
  goNext,
  goPrev
}) => {
  const [additionStory, setAdditionStory] = useState(true);
  const [subtractionStory, setSubtractionStory] = useState(false);
  const [multiplicationStory, setMultiplicationStory] = useState(false);
  const [buttonIds, setButtonIds] = useState([]);
  const [currentId, setCurrentId] = useState(null);
  const [next, setNext] = useState(false);
  useEffect(() => {
    if (buttonIds.length >= 2) {
      setNext(true);
    }
  }, [buttonIds]);
  const handleButtonClick = (storyType, id) => {
    if (storyType === "addition") {
      playClick();
      setCurrentId(id);
      setAdditionStory(true);
      setSubtractionStory(false);
      setMultiplicationStory(false);
    } else if (storyType === "subtraction") {
      playClick();
      setCurrentId(id);
      setSubtractionStory(true);
      setAdditionStory(false);
      setMultiplicationStory(false);
    } else if (storyType === "multiplication") {
      playClick();
      setCurrentId(id);
      setMultiplicationStory(true);
      setAdditionStory(false);
      setSubtractionStory(false);
    }
    setButtonIds(prevIds => [...prevIds, id]);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "scene-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heading"
  }, /*#__PURE__*/React.createElement("p", null, t("sceneThree.typesOfQuestion"))), /*#__PURE__*/React.createElement("div", {
    className: "main-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "story-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "left-buttons"
  }, /*#__PURE__*/React.createElement("button", {
    className: `btn ${currentId === 1 || additionStory ? "addition" : "multiplication"}`,
    onClick: () => handleButtonClick("addition", 1)
  }, t("sceneThree.additionStoryQuestion")), /*#__PURE__*/React.createElement("button", {
    className: `btn ${currentId === 2 ? "addition" : "multiplication"}`,
    onClick: () => handleButtonClick("subtraction", 2)
  }, t("sceneThree.subtractionStoryQuestion")), /*#__PURE__*/React.createElement("button", {
    className: `btn ${currentId === 3 ? "addition" : "multiplication"}`,
    onClick: () => handleButtonClick("multiplication", 3)
  }, t("sceneThree.multiplicationStoryQuestion"))), additionStory && /*#__PURE__*/React.createElement("div", {
    className: "right-box"
  }, /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, t("sceneThree.storyQuestionDescription")), /*#__PURE__*/React.createElement("h4", {
    className: "example-title"
  }, t("sceneThree.example")), /*#__PURE__*/React.createElement("p", {
    className: "example-text"
  }, t("sceneThree.exampleText")), /*#__PURE__*/React.createElement("p", {
    className: "answer"
  }, t("sceneThree.answerLabel"), ":", " ", /*#__PURE__*/React.createElement("span", {
    className: "answer-value"
  }, t("sceneThree.exampleAnswer")))), subtractionStory && /*#__PURE__*/React.createElement("div", {
    className: "right-box"
  }, /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, t("sceneThree.subtractionGivesYou")), /*#__PURE__*/React.createElement("h4", {
    className: "example-title"
  }, t("sceneThree.example")), /*#__PURE__*/React.createElement("p", {
    className: "example-text"
  }, t("sceneThree.mrRehmadSubtractionText")), /*#__PURE__*/React.createElement("p", {
    className: "answer"
  }, t("sceneThree.answerLabel"), ":", " ", /*#__PURE__*/React.createElement("span", {
    className: "answer-value"
  }, t("sceneThree.subtractAnswer")))), multiplicationStory && /*#__PURE__*/React.createElement("div", {
    className: "right-box",
    style: {
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("p", {
    className: "description"
  }, t("sceneThree.multiplicationGivesYOu")), /*#__PURE__*/React.createElement("p", {
    className: "example-text"
  }, /*#__PURE__*/React.createElement("u", null, t("sceneThree.weWillLearn")))))), /*#__PURE__*/React.createElement("div", {
    className: "footer"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      playClick();
      goPrev();
    }
  }, t("buttons.previous")), /*#__PURE__*/React.createElement("p", {style:{fontSize:"2vw"}}, t("navigation.tapEachWord")), !next && /*#__PURE__*/React.createElement("button", {
    className: "disabled"
  }, t("buttons.next")), next && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      playClick();
      goNext();
    }
  }, t("buttons.next")), /*#__PURE__*/React.createElement(Tap, {
    bottom: 0
  }))));
};
window.SceneThree= SceneThree;