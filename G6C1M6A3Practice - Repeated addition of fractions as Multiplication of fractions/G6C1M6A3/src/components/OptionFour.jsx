import { useState } from "react";
import FractionMultiply from "./FractionMultiply";
import FractionOption from "./FractionOption";

const OptionFour = ({ question, response, answer }) => {
  const [disabledOptions, setDisabledOptions] = useState([]); // wrong clicked ones
  const [correctSelected, setCorrectSelected] = useState(false); // when correct is clicked

  // Create a unique key for each option
  const makeKey = (num, deno) => `${num}-${deno}`;

  const handleClick = (num, deno) => {
    const key = makeKey(num, deno);

    if (correctSelected || disabledOptions.includes(key)) return;

    response(num, deno);

    if (num === question[2] * question[0] && deno === question[1]) {
      setCorrectSelected(true); // correct chosen → lock all
    } else {
      setDisabledOptions((prev) => [...prev, key]); // wrong chosen → disable only that one
    }
  };

  const getStyle = (num, deno) => {
    const key = makeKey(num, deno);

    if (
      correctSelected &&
      num === question[2] * question[0] &&
      deno === question[1]
    ) {
      return {
        backgroundColor: "lightgreen",
        color: "white",
        pointerEvents: "none",
        border: "0.3vw solid darkgreen",
      };
    }
    if (disabledOptions.includes(key)) {
      return {
        backgroundColor: "salmon",
        color: "white",
        pointerEvents: "none",
        border: "0.3vw solid darksalmon",
      };
    }
    if (correctSelected) {
      return { pointerEvents: "none", opacity: 0.6 };
    }
    return {};
  };

  return (
    <div className="option-container">
      <div
        className="option-button-multiply"
        style={getStyle(question[1], question[1])}
        onClick={() => handleClick(question[1], question[1])}
      >
        <FractionOption numerator={question[1]} denominator={question[1]} />
      </div>
      <div
        className="option-button-multiply"
        style={getStyle(question[2] * question[0], question[1])}
        onClick={() => handleClick(question[2] * question[0], question[1])}
      >
        <FractionOption
          numerator={question[2] * question[0]}
          denominator={question[1]}
        />
      </div>

      {question[0] === 1 && question[1] === 3 ? (
        <div
          className="option-button-multiply"
          style={getStyle(question[2] + 1, question[1])}
          onClick={() => handleClick(question[2] + 1, question[1])}
        >
          <FractionOption
            numerator={question[2] + 1}
            denominator={question[1]}
          />
        </div>
      ) :question[0] === 1 && question[1] === 6 ? (
        <div
          className="option-button-multiply"
          style={getStyle(question[2] + 1, question[1])}
          onClick={() => handleClick(question[2] + 1, question[1])}
        >
          <FractionOption
            numerator={question[2] + 1}
            denominator={question[1]}
          />
        </div>
      ): (
        <div
          className="option-button-multiply"
          style={getStyle(question[2], question[1])}
          onClick={() => handleClick(question[2], question[1])}
        >
          <FractionOption numerator={question[2]} denominator={question[1]} />
        </div>
      )}
    </div>
  );
};

export default OptionFour;
