const Main = ({ onNext, question }) => {
  const [showNav, setShowNav] = React.useState(false);
  const [erroShow, setErrorShow] = React.useState(false);
  const [keypadShow, setKeypadShow] = React.useState(true);
  const [showNext, setShowNext] = React.useState(false);
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

  const input1Ref = React.useRef(null);
  const input2Ref = React.useRef(null);
  const input3Ref = React.useRef(null);

  const click = "assets/click.mp3";
  const wrong = "assets/wrong.mp3";
  const correct = "assets/correct.mp3";
  // Audio refs
  const clickAudioRef = React.useRef(new Audio(click));
  const wrongAudioRef = React.useRef(new Audio(wrong));
  const rightAudioRef = React.useRef(new Audio(correct));

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

  const focusNext = () => {
    if (!numbers.number1) input1Ref.current?.focus();
    else if (!numbers.number2) input2Ref.current?.focus();
    else if (!numbers.number3) input3Ref.current?.focus();
  };

  const handleKeypadInput = (num) => {
    setShowNav(false);
    setNumbers((prev) => {
      if (!prev.number1) {
        setStatus((s) => ({ ...s, number1: "" }));
        return { ...prev, number1: String(num) };
      } else if (!prev.number2) {
        setStatus((s) => ({ ...s, number2: "" }));
        return { ...prev, number2: String(num) };
      } else if (!prev.number3) {
        setStatus((s) => ({ ...s, number3: "" }));
        return { ...prev, number3: String(num) };
      }
      return prev;
    });
    play(clickAudioRef);
    focusNext();
  };

  const handleChange = (field, value) => {
    if (/^\d?$/.test(value)) {
      setNumbers((prev) => ({ ...prev, [field]: value }));
      setStatus((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const checkNumber = () => {
    const is1 = numbers.number1 === question[0];
    const is2 = numbers.number2 === question[1];
    const is3 = numbers.number3 === question[2];

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
      setShowNav(true);
      play(wrongAudioRef);
    }
  };

  const handleNext = () => {
    play();
    setErrorShow(false);
    setKeypadShow(true);
    onNext();
  };

  return React.createElement(
    "div",
    { className: "main-container" },

    // Left
    React.createElement(
      "div",
      { className: "main-container-left" },
      keypadShow &&
        React.createElement(
          "div",
          null,
          React.createElement("p", { className: "slide-left" }, t("writing")),
          React.createElement(
            "p",
            { className: "slide-right" },
            t("givenPicture")
          )
        ),
      showNext &&
        React.createElement(
          "div",
          null,
          React.createElement(
            "p",
            {
              style: { fontWeight: 900, textAlign: "left" },
              className: "slide-left",
            },
            t("subtractionSentance")
          ),
          React.createElement(
            "ul",
            null,
            React.createElement(
              "li",
              { className: "slide-left" },
              t("stepOne", { count: question[0] })
            ),
            React.createElement(
              "li",
              { className: "slide-right" },
              t("stepTwo", { count: question[1] })
            ),
            React.createElement(
              "li",
              { className: "slide-left" },
              t("stepThree", { count: question[2] })
            )
          ),
          React.createElement(
            "p",
            {
              style: { textAlign: "left", marginTop: "0" },
              className: "slide-up",
            },
            t("weWrite"),
            React.createElement("br"),
            `${question[0]}-${question[1]}=${question[2]}`
          )
        )
    ),

    // Right
    React.createElement(
      "div",
      { className: "main-container-right" },
      React.createElement(
        "div",
        { className: "main-container-right-main" },

        // Car + subtraction area
        React.createElement(
          "div",
          { className: "main-container-right-main-car" },
          React.createElement(
            "div",
            {
              className: "subtraction-align-box slide-right",
              style: { position: "relative" },
            },
            showNav &&
              React.createElement(
                "div",
                { className: "show-in" },
                React.createElement(Instruction)
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
                className: `subtraction-image-box ${status.number1}`,
              }),
              React.createElement("div", {
                className: "subtraction-minus-line",
              }),
              React.createElement("input", {
                type: "text",
                maxLength: 1,
                ref: input2Ref,
                value: numbers.number2,
                onChange: (e) => handleChange("number2", e.target.value),
                className: `subtraction-image-box ${status.number2}`,
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
                className: `subtraction-image-box ${status.number3}`,
              })
            )
          ),
          React.createElement(CarOne, {
            totalCars: parseInt(question[0]),
            crossCars: parseInt(question[1]),
          })
        ),

        // Keypad
        React.createElement(
          "div",
          { className: "main-container-right-main-keypad scale-up" },
          React.createElement(Keypad, {
            setShowNav: () => setShowNav(true),
            onNumberClick: handleKeypadInput,
            checkNumber: checkNumber,
            numbers: numbers,
            question: question,
            erroShow: erroShow,
            keypadShow: keypadShow,
            setErrorShow: () => setErrorShow(false),
          })
        )
      ),

      // Footer
      React.createElement(
        "div",
        { className: "main-container-right-footer" },
        keypadShow && React.createElement("h3", null, t("tapNumber")),
        showNext && React.createElement("h3", null, t("nextQuestion"))
      ),
      React.createElement(
        "div",
        { className: "main-container-right-footer-2" },
        showNext &&
          React.createElement(
            "button",
            { className: "next-button", onClick: handleNext },
            "▶"
          )
      )
    )
  );
};

window.Main = Main;
