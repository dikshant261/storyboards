const FrameImageSlide = ({ width = "80%", setNext }) => {
  const frame = "assets/frame.png";
  const slideHand = "assets/fingerSwipeRight.gif";
  const [overlayWidth, setOverlayWidth] = useState(25); // initial width of top image
  const [disabled, setDisabled] = useState(false);
  const [played, setPlayed] = useState(false); // prevents multiple sound plays

  const handleSliderChange = (e) => {
    const newValue = Number(e.target.value);
    setOverlayWidth(newValue);

    // Trigger when reaching or exceeding 78%
    if (newValue >= 80 && !played) {
      playCorrect();
      setNext(true);

      setPlayed(true);
    }
  };
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "frame-container",
      style: {
        justifyContent: "center",
        alignItems: "center",
      },
    },
    /*#__PURE__*/ React.createElement(
      "div",
      {
        className: "frame-wrapper",
      },
      /*#__PURE__*/ React.createElement("img", {
        src: frame,
        alt: "frame",
        className: "frame-base",
      }),
      /*#__PURE__*/ React.createElement("img", {
        src: frame,
        alt: "overlay frame",
        className: "frame-overlay",
        style: {
          width: `${overlayWidth}%`,
        },
      }),
      /*#__PURE__*/ React.createElement(
        "p",
        {
          className: "frame-label",
        },
        "120 cm \xD7 80 cm"
      ),
      overlayWidth <= 25 &&
        /*#__PURE__*/ React.createElement(
        "p",
        {
          className: "frame-label-two",
        },
        "3 cm \xD7 2 cm"
      ),
      React.createElement("img", {
        src: slideHand,
        alt: "hand right slide",
        style: {
          width: '10vw',
          position: 'absolute',
          bottom: '-24%',
          left: '3%'
        }
      })
    ),
    /*#__PURE__*/ React.createElement("input", {
      type: "range",
      min: "25",
      max: "80",
      step: "1",
      value: overlayWidth,
      onChange: handleSliderChange,
      className: "frame-slider",
      disabled: disabled,
    }),
  );
};
window.FrameImageSlide = FrameImageSlide;
