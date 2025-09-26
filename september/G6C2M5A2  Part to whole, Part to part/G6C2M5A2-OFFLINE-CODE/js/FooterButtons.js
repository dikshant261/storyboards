function FooterButtons({
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
  handlePrevFour,
  prevButton,
}) {
  const tap="assets/tap.gif";  
  return React.createElement(
    "div",
    { className: "footer-buttons" },

    // Step One Previous
    stepOne &&
      React.createElement(
        "button",
        { className: "nxt-btn", onClick: handlePrevOne },
        t("buttons.previous")
      ),

    // Step Two Previous
    stepTwo &&
      React.createElement(
        "button",
        { className: "nxt-btn", onClick: handlePrevTwo },
        t("buttons.previous")
      ),

    // Prev Button
    prevButton &&
      React.createElement(
        "button",
        { className: "nxt-btn", onClick: handlePrevThree },
        t("buttons.previous")
      ),

    // Tap Proceed Previous
    tapProceed &&
      React.createElement(
        "button",
        { className: "nxt-btn", onClick: handlePrevFour },
        t("buttons.previous")
      ),

    // Disabled Next
    disabledNext &&
      React.createElement(
        "button",
        {
          className: "nxt-btn",
          disabled: true,
          style: { backgroundColor: "gray", borderColor: "gray" },
        },
        t("buttons.nextarrow")
      ),

    // Next One
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
          t("buttons.nextarrow")
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

    // Next Two
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
          t("buttons.nextarrow")
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

    // Tap Proceed Next
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
          t("buttons.nextarrow")
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
}
window.FooterButtons=FooterButtons;