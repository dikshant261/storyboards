import React, { useEffect, useState } from "react";
import { InlineMath } from "react-katex";
import "katex/dist/katex.min.css";
import "./option.css";
import { playCorrect, playWrong } from "../PlayAudio";

const Option = ({
  setTapOption,
  setShowAnimationHeading,
  setShowDisabledButton,
  setShowError,
  setOptionValue,
  question
}) => {
  const [disabledButtons, setDisabledButtons] = useState([]); // store disabled button indexes
  const [isAnsweredCorrectly, setIsAnsweredCorrectly] = useState(false);
  const [feedbackIndex, setFeedbackIndex] = useState(null);
  useEffect(()=>{
    setDisabledButtons([]);
    setIsAnsweredCorrectly(false);
  }, [question]);
  const handleClick = (index, numerator, denominator, isCorrect, feedback) => {
    if (isCorrect) {
      // Correct answer
      playCorrect();
      setIsAnsweredCorrectly(true);
      setTapOption(false);
      setShowAnimationHeading(true);
      setShowDisabledButton(false);
      setShowError(feedback);
      setOptionValue({ num: numerator, den: denominator });
      setDisabledButtons(question.options.map((_, i) => i)); // disable all
    } else {
      // Wrong answer
      playWrong();
      setShowError(feedback);
      setOptionValue({ num: numerator, den: denominator });
      setDisabledButtons((prev) => [...prev, index]); // disable only that one
    }
  };

  return (
    <div className="question-container">
      <div className="options-grid">
        {question.options.map((opt, index) => {
          const isCorrect = opt.correct;
          const isDisabled = disabledButtons.includes(index);

          let className = "option";

          if (isAnsweredCorrectly && isCorrect) className += " correct";
          else if (isAnsweredCorrectly && !isCorrect) className += " wrong";
          else if (isDisabled && !isCorrect) className += " wrong";

          return (
            <button
              key={index}
              className={className}
              disabled={isDisabled || isAnsweredCorrectly}
              onClick={() =>
                handleClick(
                  index,
                  opt.numerator,
                  opt.denominator,
                  opt.correct,
                  opt.feedback
                )
              }
            >
              <InlineMath
                math={`\\frac{${opt.numerator}}{${opt.denominator}}`}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Option;
