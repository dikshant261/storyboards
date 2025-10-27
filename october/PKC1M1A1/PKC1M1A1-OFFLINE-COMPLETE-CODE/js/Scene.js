const Scene = () => {
  const raisehandchild = "assets/raisehandchild.png";
  const Mindy_Pointing_Up_Mid = "assets/Mindy_Pointing_Up_Mid.png";
  const one = "assets/one.png";
  const two = "assets/two.png";
  const three = "assets/three.png";
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
          className: "top-heading",
        },
        t("tapNumbers")
      ),
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
          className: "girl-container",
        },
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "box",
          },
          t("tapTheNumbers"),
          /*#__PURE__*/ React.createElement(
            "div",
            {
              className: "align-triangle",
            },
            "\u25BC"
          )
        ),
        /*#__PURE__*/ React.createElement("img", {
          src: Mindy_Pointing_Up_Mid,
          className: "girl-image",
        })
      ),
      /*#__PURE__*/ React.createElement(
        "div",
        {
          className: "one",
        },
        /*#__PURE__*/ React.createElement(Tap, {
          top: "38%",
          left: "19%",
          width: "9vw",
        }),
        /*#__PURE__*/ React.createElement(
          "div",
          {
            className: "align-next",
          },
          /*#__PURE__*/ React.createElement(ReusableButton, {
            label: t("buttons.next"),
            fontSize: "3vw",
            padding:"2vh",
            showTap: false,
            showActive: false,
            onClick: () => {
              playClick();
              window.location.reload();
            },
            disabled: !allClicked, // Enable when all images are clicked
          })
        ),
        /*#__PURE__*/ React.createElement("img", {
          src: one,
          className: "image-one",
          onClick: () => handleClick("one", playOne),
        }),
        /*#__PURE__*/ React.createElement("img", {
          src: two,
          className: "image-two",
          onClick: () => handleClick("two", playTwo),
        }),
        /*#__PURE__*/ React.createElement("img", {
          src: three,
          className: "image-three",
          onClick: () => handleClick("three", playThree),
        })
      )
    )
  );
};
window.Scene=Scene;
