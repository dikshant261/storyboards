const ProgressBar = ({
  total = 10,
  current = 1
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: "progress-container"
  }, Array.from({
    length: total
  }, (_, index) => {
    const step = index + 1;
    const isActive = step === current;
    return /*#__PURE__*/React.createElement("div", {
      key: step,
      className: "dot",
      style: {
        height: isActive ? "3vh" : "2vh",
        width: isActive ? "2vw" : "1.5vw",
        backgroundColor: isActive ? "var(--secondary-color)" : "gray",
        borderRadius: "50%",
        transition: "all 0.3s ease"
      }
    });
  }));
};
window.ProgressBar=ProgressBar;