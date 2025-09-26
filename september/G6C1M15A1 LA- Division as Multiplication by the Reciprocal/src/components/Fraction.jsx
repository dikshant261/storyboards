const Fraction = ({ numerator, denominator }) => (
  <span
    style={{
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "center",
      fontSize: "2vw",
    }}
  >
    <span>{numerator}</span>
    <span
      style={{
        borderTop: "0.2vw solid white",
        width: "100%",
        display: "block",
      }}
    ></span>
    <span>{denominator}</span>
  </span>
);

export default Fraction;
