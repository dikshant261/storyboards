const FooterButtons = ({
  disabledNext,
  nextOne,
  nextTwo,
  stepOne,
  stepTwo,
  stepThree,
  prveOne,
  tapProceed,
  handleNextOne,
  handleNextTwo,
  handleProceed,
  handlePrevOne,
  handlePrevTwo,
  handlePrevThree,
}) => {
  const tap="assets/tap.gif";  
  return React.createElement(
    "div",
    { className: "footer-buttons" },

    stepOne &&
      React.createElement(
        "button",
        { className: "nxt-btn", onClick: handlePrevOne },
        "◀"
      ),

    stepTwo &&
      React.createElement(
        "button",
        { className: "nxt-btn", onClick: handlePrevTwo },
        "◀"
      ),

    stepThree &&
      React.createElement(
        "button",
        { className: "nxt-btn", onClick: handlePrevThree },
        "◀"
      ),

    disabledNext &&
      React.createElement(
        "button",
        { className: "nxt-btn", disabled: true },
        "▶"
      ),

    nextOne &&
      React.createElement(
        "div",
        null,
        React.createElement(
          "button",
          {
            className: "nxt-btn",
            onClick: handleNextOne,
            style: { position: "relative" },
          },
          "▶"
        ),
        React.createElement("img", {
          src: tap,
          alt: "Proceed",
          style: {
            position: "absolute",
            bottom: "0%",
            width: "3vw",
            height: "3vw",
            animation: "bounce 1s infinite",
          },
        })
      ),

    nextTwo &&
      React.createElement(
        "div",
        null,
        React.createElement(
          "button",
          {
            className: "nxt-btn",
            onClick: handleNextTwo,
            style: { position: "relative" },
          },
          "▶"
        ),
        React.createElement("img", {
          src: tap,
          alt: "Proceed",
          style: {
            position: "absolute",
            bottom: "0%",
            width: "3vw",
            height: "3vw",
            animation: "bounce 1s infinite",
          },
        })
      ),

    tapProceed &&
      React.createElement(
        "div",
        null,
        React.createElement(
          "button",
          {
            className: "nxt-btn",
            onClick: handleProceed,
            style: { position: "relative" },
          },
          "▶"
        ),
        React.createElement("img", {
          src: tap,
          alt: "Proceed",
          style: {
            position: "absolute",
            bottom: "0%",
            width: "3vw",
            height: "3vw",
            animation: "bounce 1s infinite",
          },
        })
      )
  );
};
window.FooterButtons=FooterButtons;