const FooterButtons = ({
  disabledNext,
  nextOne,
  nextTwo,
  stepOne,
  stepTwo,
  stepThree,
  prveOne,
  last,
  tapProceed,
  handleNextOne,
  handleNextTwo,
  handleProceed,
  handlePrevOne,
  handlePrevTwo,
  handlePrevThree,
  handlePrevFour
}) => {
  const tap="assets/tap.gif";  
  return React.createElement(
    "div",
    { className: "footer-buttons" },

    stepOne &&
      React.createElement(
        "button",
        { className: "nxt-btn", onClick: handlePrevOne },
        t("buttons.previous")
      ),

    stepTwo &&
      React.createElement(
        "button",
        { className: "nxt-btn", onClick: handlePrevTwo },
        t("buttons.previous")
      ),

    stepThree &&
      React.createElement(
        "button",
        { className: "nxt-btn", onClick: handlePrevThree },
        t("buttons.previous")
      ),

      tapProceed &&
      React.createElement(
        "button",
        { className: "nxt-btn", onClick: handlePrevFour },
        t("buttons.previous")
      ),

    disabledNext &&
      React.createElement(
        "button",
        { className: "nxt-btn", disabled: true,style:{backgroundColor:'gray',borderColor:'gray'} },
        t("buttons.proceed")
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
          t("buttons.proceed")
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
          t("buttons.proceed")
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
          t("buttons.proceed")
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