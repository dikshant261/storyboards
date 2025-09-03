const FirstPage = ({ onClose, imageSrc, number }) => {
  
  const clickAudio = new Audio("assets/click.mp3");
  clickAudio.preload = "auto"; // ensures it's loaded early

  const clickHandle = () => {
    clickAudio.currentTime = 0; // reset to start
    clickAudio.play();
  };

  const handleStart = () => {
    clickHandle();
    onClose();
  };

  return React.createElement(
    "div",
    { className: "contianer" },

    // left section
    React.createElement(
      "div",
      { className: "container-left" },
      React.createElement("p", { className: "slide-right" }, t("thePicture")),
      React.createElement("p", { className: "slide-left" }, t("writeStory"))
    ),

    // right section
    React.createElement(
      "div",
      { className: "container-right" },

      // image + numbers
      React.createElement(
        "div",
        { className: "contianer-img-item" },
        React.createElement(
          "div",
          { className: "image-container" },
          React.createElement("img", {
            src: imageSrc,
            alt: "image",
            className: "image scale-up",
          })
        ),
        React.createElement(
          "div",
          { className: "align-box" },
          React.createElement("div", { className: "image-box slide-right" }, number[0]),
          React.createElement("div", { className: "minus-line" }),
          React.createElement("div", { className: "image-box slide-mid" }, number[1]),
          React.createElement(
            "div",
            {
              style: {
                display: "flex",
                flexDirection: "column",
                gap: "0.5vw",
              },
            },
            React.createElement("div", { className: "minus-line" }),
            React.createElement("div", { className: "minus-line" })
          ),
          React.createElement("div", { className: "image-box slide-right" }, number[2])
        )
      ),

      // start button
      React.createElement(
        "div",
        { className: "container-left-option" },
        React.createElement(
          "div",
          { className: "slide-mid" },
          React.createElement(ReusableButton, {
            label: t("start"),
            onClick: handleStart,
            width: "13vw",
            height: "9vh",
            fontSize: "2.5vw",
          })
        )
      ),

      // footer
      React.createElement(
        "div",
        { className: "container-left-navigation" },
        React.createElement(
          "h3",
          { className: "footer-heading" },
          React.createElement("h2", { className: "slide-left" }, t("tapStart"))
        )
      )
    )
  );
};
window.FirstPage=FirstPage;