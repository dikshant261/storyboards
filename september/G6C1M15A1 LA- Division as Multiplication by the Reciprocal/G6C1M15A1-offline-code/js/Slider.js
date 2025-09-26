const Slider = ({ divisorValue, onCheck, showSlider }) => {
  const [value, setValue] = useState(1);
  const handleChange = (e) => {
    setValue(e.target.value);
    divisorValue(e.target.value);
  };
  return /*#__PURE__*/ React.createElement(
    "div",
    {
      className: "slider-container",
    },
    /*#__PURE__*/ React.createElement(
      "div",
      null,
      /*#__PURE__*/ React.createElement("input", {
        type: "range",
        min: "1",
        max: "9",
        value: value,
        onChange: handleChange,
        className: "slider",
        disabled: !showSlider,
      }),
      /*#__PURE__*/ React.createElement(
        "p",
        null,
        t("sceneThree.divisor"),
        "=",
        value
      )
    ),
    showSlider &&
      /*#__PURE__*/ React.createElement(
        "button",
        {
          className: "check-btn",
          onClick: () => {
            playClick();
            onCheck();
          },
        },
        t("buttons.check")
      )
  );
};
window.Slider = Slider;
