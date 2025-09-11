import React, { useState } from "react";

const OptionTwo = ({ question, response }) => {
  const [disabledOptions, setDisabledOptions] = useState([]); // wrong clicked ones
  const [correctSelected, setCorrectSelected] = useState(false); // when correct is clicked

  const correctAnswer = question[2]; // ✅ correct answer is always question[2]

  const handleClick = (option) => {
    if (correctSelected || disabledOptions.includes(option)) return;

    response(option);

    if (option === correctAnswer) {
      setCorrectSelected(true); // correct chosen → lock all
    } else {
      setDisabledOptions((prev) => [...prev, option]); // wrong chosen → disable only that one
    }
  };

  const getStyle = (option) => {
    if (correctSelected && option === correctAnswer) {
      return { backgroundColor: "lightgreen", color: "white", pointerEvents: "none",border:"0.3vw solid darkgreen" };
    }
    if (disabledOptions.includes(option)) {
      return { backgroundColor: "salmon", color: "white", pointerEvents: "none",border:"0.3vw solid darksalmon" };
    }
    if (correctSelected) {
      return { pointerEvents: "none", opacity: 0.6 };
    }
    return {};
  };

  return (
    <div className="option-container">
      {question.map((opt, index) => (
        <div
          key={index}
          className="option-button"
          style={getStyle(opt)}
          onClick={() => handleClick(opt)}
        >
          {opt}
        </div>
      ))}
    </div>
  );
};

export default OptionTwo;
