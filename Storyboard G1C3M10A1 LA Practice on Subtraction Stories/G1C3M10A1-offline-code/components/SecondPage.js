const SecondPage = ({ onClose }) => {
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
    React.createElement(
      "div",
      { className: "container-left" },
      React.createElement("p", { className: "slide-right" }, t("thePicture")),
      React.createElement("p", { className: "slide-left" }, t("writeStory"))
    ),
    React.createElement(
      "div",
      { className: "container-right" },
      React.createElement(
        "div",
        { className: "contianer-img-item" },
        React.createElement(
          "div",
          { className: "image-container" },
          React.createElement("img", {
            src: "assets/imagetwo.png",
            alt: "image",
            className: "image scale-up",
          })
        )
      ),
      React.createElement(
        "div",
        { className: "container-left-option " },
        React.createElement(
          "div",
          { className: "slide-mid" },
          React.createElement(
            "button",
            {
              className: "start-button",
              onClick: () => {
                handleStart();
              },
            },
            t("start")
          )
        )
      ),
      React.createElement(
        "div",
        { className: "container-left-navigation" },
        React.createElement(
          "div",
          { className: "footer-heading" },
          React.createElement("h2", { className: "slide-left" }, t("tapStart"))
        )
      )
    )
  );
};

window.SecondPage = SecondPage;
