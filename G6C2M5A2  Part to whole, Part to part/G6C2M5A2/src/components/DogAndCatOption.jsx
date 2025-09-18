import React from "react";
import { playClick } from "./PlayAudio";
import ErrorMessage from "./ErrorMessage";
import './option.css'
function DogAndCatOption({
  options,
  correctOption,
  boxResultSet,
  stepOne,
  stepTwo,
  stepThree,
  boxResultOne,
  boxResultTwo,
  boxResultThree,
  showErrorOne,
  showErrorTwo,
  showErrorThree,
  flag
}) {
  let currentStep = 0;
  let boxResult = "";
  let correct = "";

  if (stepOne) {
    currentStep = 1;
    boxResult = boxResultOne;
    correct = correctOption[0];
  } else if (stepTwo) {
    currentStep = 2;
    boxResult = boxResultTwo;
    correct = correctOption[1];
  } else if (stepThree) {
    currentStep = 3;
    boxResult = boxResultThree;
    correct = correctOption[2];
  }

  const handleOptionClick = (option) => {
    playClick();
    boxResultSet(option);
  };

  // Button state logic
  const getButtonProps = (index) => {
    if (currentStep > 0) {
      const isCorrect = options[index] === correct;
      const isAnswered = boxResult !== "";
      const isThisClicked = boxResult === options[index];

      if (isAnswered && boxResult === correct) {
        return {
          className: "option-button option-correct-disabled",
          disabled: true,
        };
      }
      if (isAnswered && isThisClicked && !isCorrect) {
        return {
          className: "option-button option-wrong-disabled",
          disabled: true,
        };
      }
      return {
        className: "option-button",
        disabled: false,
        onClick: () => handleOptionClick(options[index]),
      };
    }

    return {
      className: "option-button",
      disabled: false,
      onClick: () => handleOptionClick(options[index]),
    };
  };

  const renderOption = (value) => {
    if (typeof value === "string" && value.match(/^\d+\/\d+$/)) {
      const [num, denom] = value.split("/");
      return (
        <span className="option-fraction">
          {num}
          <span className="fraction-line" />
          {denom}
        </span>
      );
    }
    return value;
  };

  return (
    <div className="option-container">
      {/* feedback-box */}
      <div
        className={`feedback-box ${
          currentStep > 0 && boxResult !== ""
            ? boxResult === correct
              ? "correct"
              : "wrong"
            : ""
        }`}
      >
        {(showErrorOne && stepOne && (
          <ErrorMessage
            stepOne={stepOne}
            stepTwo={stepTwo}
            stepThree={stepThree}
            boxResultOne={boxResultOne}
            correctOption={correctOption}
            options={options}
            flag={flag}
          />
        )) ||
          (showErrorTwo && stepTwo && (
            <ErrorMessage
              stepOne={stepOne}
              stepTwo={stepTwo}
              stepThree={stepThree}
              boxResultOne={boxResultTwo}
              correctOption={correctOption}
              options={options}
              flag={flag}
            />
          )) ||
          (showErrorThree && stepThree && (
            <ErrorMessage
              stepOne={stepOne}
              stepTwo={stepTwo}
              stepThree={stepThree}
              boxResultOne={boxResultThree}
              correctOption={correctOption}
              options={options}
              flag={flag}
            />
          ))}
      </div>

      {/* option-grid */}
      <div className="option-grid">
        {options.map((opt, idx) => (
          <button key={idx} {...getButtonProps(idx)}>
            {renderOption(opt)}
          </button>
        ))}
      </div>
    </div>
  );
}

export default DogAndCatOption;
