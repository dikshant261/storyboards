const SubtractionSentanceOne = ({
  onNext,
  correctNumber,
  imageSrc,
  storyTextKey,
  prev,
  flag = false,
}) => {
  const [numbers, setNumbers] = React.useState({
    number1: "",
    number2: "",
    number3: "",
  });
  const [status, setStatus] = React.useState({
    number1: "",
    number2: "",
    number3: "",
  });
  const [focusedField, setFocusedField] = React.useState(null);
  const [erroShow, setErrorShow] = React.useState(false);
  const [keypadShow, setKeypadShow] = React.useState(true);
  const [showNext, setShowNext] = React.useState(false);

  const input1Ref = React.useRef(null);
  const input2Ref = React.useRef(null);
  const input3Ref = React.useRef(null);

  // Audio refs
  const tap = "assets/tap.gif";
  const clickAudioRef = React.useRef(new Audio("assets/click.mp3"));
  const wrongAudioRef = React.useRef(new Audio("assets/wrong.mp3"));
  const rightAudioRef = React.useRef(new Audio("assets/correct.mp3"));

  clickAudioRef.current.preload = "auto";
  wrongAudioRef.current.preload = "auto";
  rightAudioRef.current.preload = "auto";

  const play = (ref) => {
    try {
      ref.current.currentTime = 0;
      const p = ref.current.play();
      if (p && typeof p.then === "function") p.catch(() => {});
    } catch {}
  };

  // Keypad input
  const handleKeypadInput = (num) => {
    setNumbers((prev) => {
      let updated = { ...prev };

      if (focusedField) {
        updated[focusedField] = String(num);

        if (focusedField === "number1") {
          input2Ref.current?.focus();
          setFocusedField("number2");
        } else if (focusedField === "number2") {
          input3Ref.current?.focus();
          setFocusedField("number3");
        }
        return updated;
      }

      // fallback → fill sequential
      if (!prev.number1) {
        updated.number1 = String(num);
        input2Ref.current?.focus();
        setFocusedField("number2");
      } else if (!prev.number2) {
        updated.number2 = String(num);
        input3Ref.current?.focus();
        setFocusedField("number3");
      } else if (!prev.number3) {
        updated.number3 = String(num);
      }
      return updated;
    });

    play(clickAudioRef);
  };

  // Manual typing
  const handleChange = (field, value) => {
    if (/^\d?$/.test(value)) {
      setNumbers((prev) => ({ ...prev, [field]: value }));
      setStatus((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const checkNumber = () => {
    const is1 = numbers.number1 === correctNumber[0];
    const is2 = numbers.number2 === correctNumber[1];
    const is3 = numbers.number3 === correctNumber[2];

    const newStatus = {
      number1: is1 ? "correct" : "wrong",
      number2: is2 ? "correct" : "wrong",
      number3: is3 ? "correct" : "wrong",
    };
    setStatus(newStatus);

    if (is1 && is2 && is3) {
      setErrorShow(true);
      setKeypadShow(false);
      setShowNext(true);
      play(rightAudioRef);
    } else {
      setErrorShow(true);
      play(wrongAudioRef);
    }
  };

  const handleNext = () => {
    if (flag) {
      window.location.reload();
    }
    setErrorShow(false);
    setKeypadShow(true);
    onNext();
  };

  const handleBoxClick = (field, ref) => {
    setFocusedField(field);
    if (ref.current) {
      ref.current.classList.add("pulse-click");
      setTimeout(() => {
        ref.current?.classList.remove("pulse-click");
      }, 600);
    }
  };

  const handlePrev = () => {
    prev();
  };

  return React.createElement(
    "div",
    { className: "subtraction" },

    // Left section
    React.createElement(
      "div",
      { className: "subtraction-left" },
      React.createElement(
        "p",
        { className: "slide-left", style: { color: "lightgreen" } },
        t("writingStory") + "✅"
      ),
      React.createElement("p", { className: "slide-right" }, t("writingNumpad"))
    ),

    // Right section
    React.createElement(
      "div",
      { className: "subtraction-right" },

      // Main container
      React.createElement(
        "div",
        { className: "subtraction-right-main" },

        // Top section
        React.createElement(
          "div",
          { className: "subtraction-right-main-one" },

          React.createElement(
            "div",
            { className: "subtraction-image-container scale-up" },
            React.createElement("img", {
              src: imageSrc,
              className: "subtraction-image",
              alt: "story",
            })
          ),

          React.createElement(
            "div",
            { className: "sentance-story slide-mid" },
            React.createElement("p", null, t(storyTextKey))
          ),

          React.createElement(
            "div",
            { className: "subtraction-align-box slide-right" },

            React.createElement("input", {
              type: "text",
              maxLength: 1,
              ref: input1Ref,
              value: numbers.number1,
              onChange: (e) => handleChange("number1", e.target.value),
              onFocus: () => setFocusedField("number1"),
              onClick: () => handleBoxClick("number1", input1Ref),
              className: "subtraction-image-box " + status.number1,
            }),

            React.createElement("div", { className: "subtraction-minus-line" }),

            React.createElement("input", {
              type: "text",
              maxLength: 1,
              ref: input2Ref,
              value: numbers.number2,
              onChange: (e) => handleChange("number2", e.target.value),
              onFocus: () => setFocusedField("number2"),
              onClick: () => handleBoxClick("number2", input2Ref),
              className: "subtraction-image-box " + status.number2,
            }),

            React.createElement(
              "div",
              {
                style: {
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5vw",
                },
              },
              React.createElement("div", {
                className: "subtraction-minus-line",
              }),
              React.createElement("div", {
                className: "subtraction-minus-line",
              })
            ),

            React.createElement("input", {
              type: "text",
              maxLength: 1,
              ref: input3Ref,
              value: numbers.number3,
              onChange: (e) => handleChange("number3", e.target.value),
              onFocus: () => setFocusedField("number3"),
              onClick: () => handleBoxClick("number3", input3Ref),
              className: "subtraction-image-box " + status.number3,
            })
          )
        ),

        // Keypad
        React.createElement(
          "div",
          { className: "subtraction-right-main-two scale-up" },
          React.createElement(Keypad, {
            onNumberClick: handleKeypadInput,
            checkNumber: checkNumber,
            numbers: numbers,
            correctNumber: correctNumber,
            erroShow: erroShow,
            keypadShow: keypadShow,
            setErrorShow: () => setErrorShow(false),
          })
        )
      ),

      // Footer
      React.createElement(
        "div",
        {
          className: "subtraction-right-footer",
          style: { position: "relative" },
        },
        keypadShow &&
          React.createElement("h3", { className: "slide-left" }, t("tapCheck")),
        showNext &&
          React.createElement(
            "h3",
            { className: "slide-left" },
            t("tapNextQuestion")
          ),
        showNext &&
          React.createElement(
            "div",
            null,
            React.createElement(
              "button",
              { className: "subtraction-next-button", onClick: handleNext },
              "▶"
            ),
            React.createElement("img", {
              src: tap,
              alt: "tap",
              style: {
                position: "absolute",
                bottom: "0%",
                right: "2%",
                width: "4vw",
              },
            })
          ),
        React.createElement(
          "button",
          { className: "subtraction-next-button-left", onClick: handlePrev },
          "◀"
        )
      )
    )
  );
};
window.SubtractionSentanceOne = SubtractionSentanceOne;
