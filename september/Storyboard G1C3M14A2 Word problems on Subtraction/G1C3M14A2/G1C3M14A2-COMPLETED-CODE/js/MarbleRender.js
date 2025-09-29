const marble = "assets/marble.png";
const MarbleRender = ({
  limit
}) => {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "0.5vw"
    }
  }, Array(limit).fill(null).map((_, i) => /*#__PURE__*/React.createElement("img", {
    key: i,
    src: marble,
    style: {
      width: "4vw",
      objectFit: "contain"
    },
    alt: `marble-${i}`
  })));
};
window.MarbleRender=MarbleRender;