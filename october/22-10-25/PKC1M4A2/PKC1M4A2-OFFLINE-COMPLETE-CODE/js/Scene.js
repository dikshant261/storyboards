const question = [
  { image: "assets/one.png", audio: playOne, number: "one" },
  { image: "assets/two.png", audio: playTwo, number: "two" },
  { image: "assets/three.png", audio: playThree, number: "three" },
  { image: "assets/four.png", audio: playFour, number: "four" },
  { image: "assets/five.png", audio: playFive, number: "five" },
];

function Scene() {
  const [disabled, setDisabled] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = (key, playFn) => {
    playFn();
    setDisabled(false);
  };

  const handleNext = () => {
    playClick();
    if (currentIndex === question.length - 1) {
      window.location.reload();
    } else {
      setDisabled(true);
      setCurrentIndex(prev => prev + 1);
    }
  };

  return React.createElement(
    "div",
    { className: "scene-container" },
    // Top section
    React.createElement(
      "div",
      { className: "top" },
      React.createElement("div", { className: "top-heading" }, t("count")),
      React.createElement(
        "div",
        { className: "align-hand-image" },
        React.createElement("p", { className: "shout-loud" }, t("shout")),
        React.createElement("img", { src: raisehandchild, className: "boy-hand" })
      )
    ),

    // Main section
    React.createElement(
      "div",
      { className: "main" },
      React.createElement(
        "div",
        { className: "girl-container" },
        React.createElement(
          "div",
          { className: "box" },
          t("tap"),
          React.createElement("div", { className: "align-triangle" }, "▼")
        ),
        React.createElement("img", { src: Mindy_Pointing_Up_Mid, className: "girl-image" })
      ),
      React.createElement(
        "div",
        { className: "one" },
        React.createElement(Tap, { top: "74%", left: "32%", width: "6vw" }),
        React.createElement(
          "div",
          { className: "align-next" },
          React.createElement(ReusableButton, {
            label: t("buttons.Next"),
            padding: "1vh 3vw",
            fontSize: "3vw",
            showTap: false,
            showActive: false,
            onClick: handleNext,
            disabled: disabled
          })
        ),
        React.createElement(
          "div",
          { className: "align-row" },
          React.createElement(
            "div",
            { className: "align-num-col" },
            React.createElement("img", {
              src: question[currentIndex].image,
              className: "image-one",
              onClick: () => handleClick("one", question[currentIndex].audio)
            }),
            React.createElement("p", null, t(question[currentIndex].number))
          )
        )
      )
    )
  );
}
window.Scene=Scene