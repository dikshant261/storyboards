import React, { useState } from "react";
import "./option.css";
import ErrorMessage from "./ErrorMessage";

export const Option = ({
  option,
  correctOption,
  response,
  result,
  errorShow,
  flag,
  boxCss,
}) => {
  const correct = correctOption;
  const [clicked, setClicked] = useState(null);
  const [disabledButtons, setDisabledButtons] = useState([]);
  const [answered, setAnswered] = useState(false);

  const handleClick = (opt, index) => {
    response(opt);
    if (disabledButtons.includes(index) || answered) return;

    if (opt === correct) {
      setClicked(index);
      setDisabledButtons([0, 1, 2, 3]); // disable all
      setAnswered(true);
    } else {
      setDisabledButtons([...disabledButtons, index]); // disable only wrong one
    }
  };

  return (
    <div className="option-container">
      <div className="option-grid">
        {option.map((opt, index) => {
          let btnClass = "";
          if (opt === correct && (clicked === index || answered)) {
            btnClass = "correct";
          } else if (disabledButtons.includes(index) && opt !== correct) {
            btnClass = "wrong";
          }
          return (
            <button
              key={index}
              onClick={() => handleClick(opt, index)}
              disabled={answered || disabledButtons.includes(index)}
              className={btnClass}
            >
              {opt}
            </button>
          );
        })}
      </div>
      <div className={`feedback-box ${boxCss}`}>
        {errorShow && (
          <ErrorMessage
            result={result}
            flag={flag}
            correctOption={correctOption}
          />
        )}
      </div>
    </div>
  );
};
