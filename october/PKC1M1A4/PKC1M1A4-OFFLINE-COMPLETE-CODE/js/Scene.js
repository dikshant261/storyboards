const Scene = () => {
  const raisehandchild = "assets/raisehandchild.png";
  const Mindy_Pointing_Up_Mid = "assets/Mindy_Pointing_Up_Mid.png";
  const one = "assets/one.png";
  const two = "assets/two.png";
  const three = "assets/three.png";
  const speaker = "assets/speaker.png";
  const [clicked, setClicked] = useState({
    one: false,
    two: false,
    three: false,
  });
  const handleClick = (key, playFn) => {
    playFn();
    setClicked((prev) => {
      const updated = {
        ...prev,
        [key]: true,
      };
      return updated;
    });
  };

  // If all three are clicked at least once, button becomes enabled
  const allClicked = clicked.one && clicked.two && clicked.three;
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "scene-container",
    },
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "top",
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "align-hand-image",
        },
        /*#__PURE__*/ React.createElement(
          "p",
          {
            className: "shout-loud",
          },
          t("shoutLound")
        ),
        /*#__PURE__*/ React.createElement("img", {
          src: raisehandchild,
          className: "boy-hand",
        })
      )
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "main",
      },
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "one",
        },
        /*#__PURE__*/ React.createElement(Tap, {
          bottom: "0",
          left: "19%",
          width: "6vw",
        }),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "speaker-image-align",
          },
          /*#__PURE__*/ React.createElement("img", {
            src: one,
            className: "image-one",
            onClick: () => handleClick("one", playOne),
          }),
          /*#__PURE__*/ React.createElement("img", {
            src: speaker,
            className: "speaker",
            onClick: () => handleClick("one", playOne),
          })
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "speaker-image-align",
          },
          /*#__PURE__*/ React.createElement("img", {
            src: two,
            className: "image-two",
            onClick: () => handleClick("two", playTwo),
          }),
          /*#__PURE__*/ React.createElement("img", {
            src: speaker,
            className: "speaker",
            onClick: () => handleClick("two", playTwo),
          })
        ),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "speaker-image-align",
          },
          /*#__PURE__*/ React.createElement("img", {
            src: three,
            className: "image-three",
            onClick: () => handleClick("three", playThree),
          }),
          /*#__PURE__*/ React.createElement("img", {
            src: speaker,
            className: "speaker",
            onClick: () => handleClick("three", playThree),
          })
        )
      )
    )
  );
};
window.Scene = Scene;
