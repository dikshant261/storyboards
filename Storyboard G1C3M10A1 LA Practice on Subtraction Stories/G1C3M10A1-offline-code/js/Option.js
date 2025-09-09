const Option = ({ content, onClick, style }) => {
  return React.createElement(
    "div",
    {
      className: "option",
      onClick: onClick,
      style: style,
    },
    content
  );
};
window.Option=Option;