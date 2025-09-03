const correctNumber = ["6", "2", "4"];

const SubtractionSentanceOne = ({ onNext }) => {
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
  const [erroShow, setErrorShow] = React.useState(false);
  const [keypadShow, setKeypadShow] = React.useState(true);
  const [showNext, setShowNext] = React.useState(false);
  const input1Ref = React.useRef(null);
  const input2Ref = React.useRef(null);
  const input3Ref = React.useRef(null);
  const imageone = "assets/imageone.png";
  const click = "assets/click.mp3";
  const right = "assets/correct.mp3";
  const wrong = "assets/wrong.mp3";
  // Create audio once
  const clickAudioRef = React.useRef(new Audio(click));
  const wrongAudioRef = React.useRef(new Audio(wrong));
  const rightAudioRef = React.useRef(new Audio(right));
  clickAudioRef.current.preload = "auto";
  wrongAudioRef.current.preload = "auto";
  rightAudioRef.current.preload = "auto";

  const play = (ref) => {
    try {
      ref.current.currentTime = 0;
      const p = ref.current.play();
      if (p && typeof p.then === "function") p.catch(() => {}); // ignore autoplay errors
    } catch {}
  };

  const focusNext = () => {
    if (!numbers.number1) input1Ref.current?.focus();
    else if (!numbers.number2) input2Ref.current?.focus();
    else if (!numbers.number3) input3Ref.current?.focus();
  };

  // Keypad input: fill first empty, clear colors for that box, click sound
  const handleKeypadInput = (num) => {
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

  // Manual typing: only digits, clear color for that box
  const handleChange = (field, value) => {
    if (/^\d?$/.test(value)) {
      setNumbers((prev) => ({ ...prev, [field]: value }));
      setStatus((prev) => ({ ...prev, [field]: "" }));
    }
  };

  // ✅ Define checkNumber
  const checkNumber = () => {
    const is1 = numbers.number1 === "6";
    const is2 = numbers.number2 === "2";
    const is3 = numbers.number3 === "4";

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
    setErrorShow(false);
    setKeypadShow(true);
    onNext();
  };

  return React.createElement(
    "div",
    { className: "subtraction" },
    React.createElement(
      "div",
      { className: "subtraction-left" },
      React.createElement(
        "p",
        { className: "slide-left" },
        t("writingStory"),
        "✅"
      ),
      React.createElement("p", { className: "slide-right" }, t("writingNumpad"))
    ),
    React.createElement(
      "div",
      { className: "subtraction-right" },
      React.createElement(
        "div",
        { className: "subtraction-right-main" },
        React.createElement(
          "div",
          { className: "subtraction-right-main-one" },
          React.createElement(
            "div",
            { className: "subtraction-image-container scale-up" },
            React.createElement("img", {
              src: imageone,
              className: "subtraction-image",
              alt: "story",
            })
          ),
          React.createElement(
            "div",
            { className: "sentance-story slide-mid" },
            React.createElement("p", null, t("storyOneText"))
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
            React.createElement("div", { className: "subtraction-minus-line" }),
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
            )
          )
      )
    )
  );
};

window.SubtractionSentanceOne = SubtractionSentanceOne;
