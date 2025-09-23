const ProgressBar = ({ current }) => {
  return React.createElement(
    "div",
    { className: "progress-container" },
    [1, 2, 3, 4, 5].map((num) =>
      React.createElement("div", {
        key: num,
        className: "dot",
        style: {
          height: current === num ? "3vh" : "",
          backgroundColor: current === num ? "var(--secondary-color)" : "",
          width: current === num ? "2vw" : "",
        },
      })
    )
  );
};
window.ProgressBar=ProgressBar;