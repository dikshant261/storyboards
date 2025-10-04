import React from "react";
import "./option.css";
import ErrorMessage from "./ErrorMessage";
import { useTranslation } from "react-i18next";
const DogAndCatOption = ({
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
  showErrorThree
}) => {
  const {
    t
  } = useTranslation();
  const isStepActive = stepOne || stepTwo || stepThree;
  const handleOptionClick = option => {
    boxResultSet(option);
  };
  const renderOption = value => {
    if (typeof value === "string" && value.match(/^\d+\/\d+$/)) {
      const [num, denom] = value.split("/");
      return /*#__PURE__*/React.createElement("span", {
        className: "option-fraction"
      }, num, /*#__PURE__*/React.createElement("span", {
        className: "fraction-line"
      }), denom);
    }
    return value;
  };

  // correct answers from earlier steps stay locked
  const isLockedFromPreviousStep = opt => {
    if (boxResultOne === correctOption[0] && !stepOne && opt === correctOption[0]) return true;
    if (boxResultTwo === correctOption[1] && !stepTwo && opt === correctOption[1]) return true;
    if (boxResultThree === correctOption[2] && !stepThree && opt === correctOption[2]) return true;
    return false;
  };
  const getButtonProps = opt => {
    let className = "option-button";
    let disabled = !isStepActive;

    // lock from previous step
    if (isLockedFromPreviousStep(opt)) {
      className += " option-locked";
      disabled = true;
      return {
        className,
        disabled
      };
    }

    // STEP ONE
    if (stepOne) {
      if (boxResultOne) {
        // correct choice => freeze all
        if (boxResultOne === correctOption[0]) {
          disabled = true;
          if (opt === correctOption[0]) className += " option-correct";
        } else {
          // wrong choice => only disable that wrong button
          if (opt === boxResultOne) {
            disabled = true;
            className += " option-wrong";
          } else {
            disabled = false; // other buttons still active
          }
        }
      } else {
        disabled = false;
      }
      return {
        className,
        disabled
      };
    }

    // STEP TWO
    if (stepTwo) {
      if (boxResultTwo) {
        if (boxResultTwo === correctOption[1]) {
          disabled = true;
          if (opt === correctOption[1]) className += " option-correct";
        } else {
          if (opt === boxResultTwo) {
            disabled = true;
            className += " option-wrong";
          } else {
            disabled = false;
          }
        }
      } else {
        disabled = false;
      }
      return {
        className,
        disabled
      };
    }

    // STEP THREE
    if (stepThree) {
      if (boxResultThree) {
        if (boxResultThree === correctOption[2]) {
          disabled = true;
          if (opt === correctOption[2]) className += " option-correct";
        } else {
          if (opt === boxResultThree) {
            disabled = true;
            className += " option-wrong";
          } else {
            disabled = false;
          }
        }
      } else {
        disabled = false;
      }
      return {
        className,
        disabled
      };
    }
    return {
      className,
      disabled
    };
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "option-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: `feedback-box ${stepOne && boxResultOne === correctOption[0] || stepTwo && boxResultTwo === correctOption[1] || stepThree && boxResultThree === correctOption[2] ? "correct" : stepOne && boxResultOne || stepTwo && boxResultTwo || stepThree && boxResultThree ? "wrong" : ""}`
  }, !showErrorOne && !showErrorTwo && !showErrorThree && /*#__PURE__*/React.createElement("p", {
    className: "para"
  }, t("selectCorrect")), showErrorOne && stepOne && /*#__PURE__*/React.createElement(ErrorMessage, {
    stepOne: stepOne,
    stepTwo: stepTwo,
    stepThree: stepThree,
    boxResultOne: boxResultOne,
    correctOption: correctOption,
    options: options
  }), showErrorTwo && stepTwo && /*#__PURE__*/React.createElement(ErrorMessage, {
    stepOne: stepOne,
    stepTwo: stepTwo,
    stepThree: stepThree,
    boxResultOne: boxResultTwo,
    correctOption: correctOption,
    options: options
  }), showErrorThree && stepThree && /*#__PURE__*/React.createElement(ErrorMessage, {
    stepOne: stepOne,
    stepTwo: stepTwo,
    stepThree: stepThree,
    boxResultOne: boxResultThree,
    correctOption: correctOption,
    options: options
  })), /*#__PURE__*/React.createElement("div", {
    className: "option-grid"
  }, options.map((opt, idx) => {
    const props = getButtonProps(opt);
    return /*#__PURE__*/React.createElement("button", {
      key: idx,
      className: props.className,
      disabled: props.disabled,
      onClick: () => handleOptionClick(opt)
    }, renderOption(opt));
  })));
};
export default DogAndCatOption;