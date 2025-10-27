const Scene = () => {
  const [clicked, setClicked] = useState({
    one: false,
    two: false,
    three: false,
    four: false,
    five: false,
  });
  const [wordNumbers, setWordNumbers] = useState("one");
  const handleClick = (key, playFn) => {
    playFn();
    setWordNumbers(key);
    setClicked((prev) => {
      const updated = {
        ...prev,
        [key]: true,
      };
      return updated;
    });
  };

  // If all three are clicked at least once, button becomes enabled
  const allClicked =
    clicked.one && clicked.two && clicked.three && clicked.four && clicked.five;
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
        t("count")
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
          t("shout")
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
        /*#__PURE__*/ React.createElement("img", {
          src: one,
          style: {
            width: "15vw",
            cursor: "pointer",
            filter:
              wordNumbers === "one" ? "drop-shadow(2px 4px 6px white)" : "",
          },
          onClick: () => {
            handleClick("one", playOne);
          },
        }),
        /*#__PURE__*/ React.createElement("img", {
          src: two,
          style: {
            width: "13vw",
            cursor: "pointer",
            filter:
              wordNumbers === "two" ? "drop-shadow(2px 4px 6px white)" : "",
          },
          onClick: () => {
            handleClick("two", playTwo);
          },
        }),
        /*#__PURE__*/ React.createElement("img", {
          src: three,
          style: {
            width: "13vw",
            cursor: "pointer",
            filter:
              wordNumbers === "three" ? "drop-shadow(2px 4px 6px white)" : "",
          },
          onClick: () => {
            handleClick("three", playThree);
          },
        }),
        /*#__PURE__*/ React.createElement("img", {
          src: four,
          style: {
            width: "14vw",
            cursor: "pointer",
            filter:
              wordNumbers === "four" ? "drop-shadow(2px 4px 6px white)" : "",
          },
          onClick: () => {
            handleClick("four", playFour);
          },
        }),
        /*#__PURE__*/ React.createElement("img", {
          src: five,
          style: {
            width: "12vw",
            cursor: "pointer",
            filter:
              wordNumbers === "five" ? "drop-shadow(2px 4px 6px white)" : "",
          },
          onClick: () => {
            handleClick("five", playFive);
          },
        })
      )
    ),
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "footer",
      },
      /*#__PURE__*/ React.createElement("p", null, t(wordNumbers)),
      /*#__PURE__*/ React.createElement(ReusableButton, {
        label: t("buttons.next"),
        padding: "1vh",
        fontSize: "3vw",
        showTap: false,
        showActive: false,
        onClick: () => {
          playClick();
          window.location.reload();
        },
        disabled: !allClicked, // Enable when all images are clicked
      })
    )
  );
};
window.Scene = Scene;
