// components/Keypad.js  (no imports, no JSX)

// Adjust these paths to where your files actually are relative to index.html
const HINT_IMG_SRC = "assets/hint.png";
const CLICK_AUDIO_SRC = "assets/click.mp3";

const Keypad = ({
  setShowNav,
  onNumberClick,
  checkNumber,
  numbers,
  question,
  erroShow,
  keypadShow,
  setErrorShow,
}) => {
  const [hintMessage, setHintMessage] = React.useState(false);


  // One Audio instance (persisted via ref)
  const clickAudioRef = React.useRef(null);
  if (!clickAudioRef.current) {
    clickAudioRef.current = new Audio(CLICK_AUDIO_SRC);
    clickAudioRef.current.preload = "auto";
  }

  const clickHandle = () => {
    try {
      clickAudioRef.current.currentTime = 0;
      const p = clickAudioRef.current.play();
      if (p && typeof p.then === "function") p.catch(() => {});
    } catch {}
  };

  const handleHint = () => {
    clickHandle();
    setShowNav();
    setHintMessage(true);
  };

  const handleNumber = (num) => {
    clickHandle();
    setHintMessage(false);
    setErrorShow();
    onNumberClick(num);
  };

  return React.createElement(
    "div",
    { className: "keypad-container" },
    // Hint button
    keypadShow &&
      React.createElement(
        "button",
        { className: "hint-btn", onClick: handleHint },
        t("show"),
        React.createElement(
          "span",
          { className: "icon" },
          React.createElement("img", {
            src: HINT_IMG_SRC,
            alt: "bulb",
            className: "bulb",
          })
        )
      ),

    // Hint text
    hintMessage &&
      React.createElement(
        "p",
        { className: "hint-message" },
        t("hintMessage")
      ),

    // Error message component (must be loaded globally as window.ErrorMessage)
    erroShow &&
      React.createElement(window.ErrorMessage || (() => null), {
        question,
        numbers,
      }),

    // Keypad grid
    keypadShow &&
      React.createElement(
        "div",
        { className: "keypad-grid" },
        [1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) =>
          React.createElement(
            "button",
            { key: n, onClick: () => handleNumber(n) },
            String(n)
          )
        ),
        React.createElement(
          "button",
          { className: "zero", onClick: () => handleNumber(0) },
         "0"
        )
      ),

    // Check button
    keypadShow &&
      React.createElement(
        "button",
        { className: "check-btn", onClick: checkNumber },
        t("check")
      )
  );
};

window.Keypad = Keypad;
