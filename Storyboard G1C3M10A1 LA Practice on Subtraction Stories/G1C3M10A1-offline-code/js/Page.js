const Page = ({ onClose, imageSrc }) => {
  

  const clickAudio = new Audio("assets/click.mp3");
  clickAudio.preload = "auto"; // ensures it's loaded early

  const clickHandle = () => {
    clickAudio.currentTime = 0;
    clickAudio.play();
  };

  const handleStart = () => {
    clickHandle();
    onClose();
  };

  return React.createElement(
    "div",
    { className: "contianer" },

    // Left container
    React.createElement(
      "div",
      { className: "container-left" },
      React.createElement("p", { className: "slide-right" }, t("thePicture")),
      React.createElement("p", { className: "slide-left" }, t("writeStory"))
    ),

    // Right container
    React.createElement(
      "div",
      { className: "container-right" },

      // image
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
        )
      ),

      // button
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
window.Page=Page