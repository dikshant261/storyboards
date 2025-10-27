const SceneOne = ({ goPrev, goNext }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [buttonStates, setButtonStates] = React.useState({});
  const [next, setNext] = React.useState(false);
  const [message, setMessage] = React.useState(null);
  const [messageType, setMessageType] = React.useState("");

  const questions = [
    {
      imageOne: Onefinger,
      imageTwo: Fivefinger,
      correct: 6,
      options: [4, 5, 6, 8],
    },
    {
      imageOne: fourfinger,
      imageTwo: Fivefinger,
      correct: 9,
      options: [5, 7, 4, 9],
    },
    {
      imageOne: zerofinger,
      imageTwo: Fivefinger,
      correct: 5,
      options: [4, 3, 5, 7],
    },
    {
      imageOne: zerofinger,
      imageTwo: Onefinger,
      correct: 1,
      options: [2, 1, 3, 5],
    },
    {
      imageOne: Threefinger,
      imageTwo: Fivefinger,
      correct: 8,
      options: [6, 10, 7, 8],
    },
    {
      imageOne: Fivefinger,
      imageTwo: Fivefinger,
      correct: 10,
      options: [8, 5, 9, 10],
    },
    {
      imageOne: zerofinger,
      imageTwo: Twofinger,
      correct: 2,
      options: [1, 3, 2, 6],
    },
    {
      imageOne: zerofinger,
      imageTwo: fourfinger,
      correct: 4,
      options: [4, 3, 2, 7],
    },
    {
      imageOne: Twofinger,
      imageTwo: Fivefinger,
      correct: 7,
      options: [9, 7, 8, 2],
    },
    {
      imageOne: zerofinger,
      imageTwo: Threefinger,
      correct: 3,
      options: [5, 2, 3, 8],
    },
  ];

  const currentQuestion = questions[currentIndex];

  React.useEffect(() => {
    const initialStates = {};
    currentQuestion.options.forEach((opt) => {
      initialStates[opt] = { color: "", disabled: false };
    });
    setButtonStates(initialStates);
    setNext(false);
    setMessage(null);
  }, [currentIndex]);

  const handleClick = (value) => {
    if (value === currentQuestion.correct) {
      playCorrect();
      setMessage(t("correct"));
      setMessageType("success");
      setButtonStates((prev) => {
        const newStates = {};
        Object.keys(prev).forEach((key) => {
          newStates[key] = {
            color: key === String(value) ? "green" : "salmon",
            disabled: true,
          };
        });
        return newStates;
      });
      setNext(true);
    } else {
      playWrong();
      setMessage(t("wrong"));
      setMessageType("error");
      setButtonStates((prev) => ({
        ...prev,
        [value]: { color: "salmon", disabled: true },
      }));
    }
  };

  const handleNext = () => {
    playClick();
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      window.location.reload();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    } else {
      playClick();
      goPrev && goPrev();
    }
  };

  return React.createElement(
    "div",
    { className: "scene-container" },
    // Top Section
    React.createElement(
      "div",
      { className: "top" },
      React.createElement("p", { className: "top-heading" }, t("count")),
      React.createElement(
        "div",
        { className: "align-hand-image" },
        React.createElement("p", { className: "shout-loud" }, t("shout")),
        React.createElement("img", {
          src: raisehandchild,
          className: "boy-hand",
          alt: "child",
        })
      )
    ),

    // Main Section
    React.createElement(
      "div",
      { className: "main" },
      React.createElement(
        "div",
        { className: "one" },
        React.createElement(
          "div",
          { className: "align-row" },
          React.createElement("img", {
            src: currentQuestion.imageOne,
            className: "image-two",
            style: { width: "20vw", transform: "scaleX(-1)" },
            alt: "one",
          }),
          React.createElement("img", {
            src: currentQuestion.imageTwo,
            style: { width: "20vw" },
            alt: "five",
          })
        ),
        React.createElement(
          "div",
          { className: "align-row", style: { gap: "5vw", marginTop: "3vh" } },
          currentQuestion.options.map((num) =>
            React.createElement(
              "button",
              {
                key: num,
                className: "number-option",
                disabled: buttonStates[num]?.disabled,
                onClick: () => handleClick(num),
                style: {
                  color:
                    buttonStates[num]?.color === "green"
                      ? "green"
                      : buttonStates[num]?.color === "salmon"
                      ? "salmon"
                      : "white",
                  cursor: buttonStates[num]?.disabled
                    ? "not-allowed"
                    : "pointer",
                },
              },
              num
            )
          )
        )
      ),

      // Previous Button
      React.createElement(
        "button",
        {
          className: "align-previous",
          onClick: handlePrev,
          style: {
            opacity: currentIndex === 0 ? "0.6" : "1",
            cursor: currentIndex === 0 ? "not-allowed" : "pointer",
          },
          disabled: currentIndex === 0,
        },
        t("buttons.previous")
      ),

      // Next Button
      !next
        ? React.createElement(
            "button",
            {
              className: "align-Next",
              style: { opacity: "0.6", cursor: "not-allowed" },
              disabled: true,
            },
            t("buttons.Next")
          )
        : React.createElement(
            React.Fragment,
            null,
            React.createElement(Tap, { bottom: "0vw", right: "2%" }),
            React.createElement(
              "button",
              { className: "align-Next", onClick: handleNext },
              t("buttons.Next")
            )
          )
    ),

    // Message Popup
    message &&
      React.createElement(
        "div",
        {
          style: {
            position: "fixed",
            bottom: "1vh",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: messageType === "success" ? "green" : "salmon",
            color: "white",
            padding: "10px 20px",
            borderRadius: "8px",
            fontSize: "1.9rem",
            fontWeight: "600",
            boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
            transition: "all 0.3s ease-in-out",
            zIndex: 999,
          },
        },
        message
      )
  );
};
window.SceneOne = SceneOne;
