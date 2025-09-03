const { useRef, useState } = React;
const correctNumberThree = ["6", "1", "5"];

const SubtractionSentanceThree = ({ onNext }) => {
  const [numbers, setNumbers] = useState({
    number1: "",
    number2: "",
    number3: "",
  });
  const [status, setStatus] = useState({
    number1: "",
    number2: "",
    number3: "",
  });
  const [erroShow, setErrorShow] = useState(false);
  const [keypadShow, setKeypadShow] = useState(true);
  const [showNext, setShowNext] = useState(false);
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);

  // Create audio once
  const clickAudioRef = useRef(new Audio("assets/click.mp3"));
  const wrongAudioRef = useRef(new Audio("assets/wrong.mp3"));
  const rightAudioRef = useRef(new Audio("assets/correct.mp3"));
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
    const is2 = numbers.number2 === "1";
    const is3 = numbers.number3 === "5";

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
    play();
    window.location.reload();
  };

  return React.createElement(
    "div",
    { className: "subtraction" },
    React.createElement(
      "div",
      { className: "subtraction-left" },
      React.createElement("p", { className: "slide-left" }, t("writingStory"), "✅"),
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
            { className: "subtraction-image-container" },
            React.createElement("img", {
              src: "assets/imagethree.png",
              className: "subtraction-image scale-up",
              alt: "story",
            })
          ),
          React.createElement(
            "div",
            { className: "sentance-story" },
            React.createElement("p", { className: "slide-left" }, t("storyThreeText"))
          ),
          React.createElement(
            "div",
            { className: "subtraction-align-box" },
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
              { style: { display: "flex", flexDirection: "column", gap: "0.5vw" } },
              React.createElement("div", { className: "subtraction-minus-line" }),
              React.createElement("div", { className: "subtraction-minus-line" })
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
          React.createElement(window.Keypad, {
            onNumberClick: handleKeypadInput,
            checkNumber: checkNumber,
            numbers: numbers,
            keypadShow: keypadShow,
            correctNumber: correctNumberThree,
            erroShow: erroShow,
            setErrorShow: () => setErrorShow(false),
          })
        )
      ),
      React.createElement(
        "div",
        { className: "subtraction-right-footer", style: { position: "relative" } },
        keypadShow && React.createElement("h3", { className: "slide-mid" }, t("tapCheck")),
        showNext && React.createElement("h3", { className: "slide-right" }, t("tapNextQuestion")),
        showNext &&
          React.createElement(
            "div",
            null,
            React.createElement(
              "button",
              { className: "subtraction-next-button slide-left", onClick: handleNext },
              "▶"
            )
          )
      )
    )
  );
};

window.SubtractionSentanceThree = SubtractionSentanceThree;
