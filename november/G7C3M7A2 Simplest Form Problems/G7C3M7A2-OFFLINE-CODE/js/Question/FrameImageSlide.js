const FrameImageSlide = ({
  width = "80%",
  setNext
}) => {
  const frame = "assets/frame.png";
  const [overlayWidth, setOverlayWidth] = useState(25); // initial width of top image
  const [disabled, setDisabled] = useState(false);
  const [played, setPlayed] = useState(false); // prevents multiple sound plays

  const handleSliderChange = e => {
    const newValue = Number(e.target.value);
    setOverlayWidth(newValue);

    // Trigger when reaching or exceeding 78%
    if (newValue >= 80 && !played) {
      playCorrect();
      setNext(true);
      setDisabled(true);
      setPlayed(true);
    }
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "frame-container",
    style: {
      justifyContent: "center",
      alignItems: "center",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: frame,
    alt: "frame",
    style: {
      width: width,
      background: "white"
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: frame,
    alt: "overlay frame",
    style: {
      width: `${overlayWidth}%`,
      background: "white",
      position: "absolute",
      top: "4%",
      left: "10%",
      opacity: "0.9",
      transition: "width 0.6s ease"
    }
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      position: "absolute",
      top: "60%",
      left: "22%",
      fontSize: "2.5vw",
      backgroundColor: "rgba(255, 255, 255, 0.718)",
      padding: "1vh",
      zIndex: "0",
      fontWeight: "600"
    }
  }, "120 cm \xD7 80 cm"), /*#__PURE__*/React.createElement("input", {
    type: "range",
    min: "25",
    max: "80",
    step: "1",
    value: overlayWidth,
    onChange: handleSliderChange,
    className: "frame-slider",
    disabled: disabled
  }));
};
window.FrameImageSlide=FrameImageSlide;